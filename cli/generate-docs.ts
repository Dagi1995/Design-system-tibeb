import fs from "fs";
import path from "path";
// Note: We avoid importing story modules at runtime to prevent execution errors.
// Instead, we statically analyze the story files to detect component imports and
// generate a single Preview per file (rendering the base component without story args).

function walk(dir: string, out: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".stories.tsx")) out.push(full);
  }
  return out;
}

function safeStringify(value: unknown): string {
  return JSON.stringify(
    value,
    (_k, v) => {
      if (typeof v === "function") return "/* function */";
      if (typeof v === "undefined") return null;
      return v;
    },
    2
  );
}

function extractComponentImport(
  storyFilePath: string,
  fileContent: string
): { importName: string; aliasImportPath: string; sourcePath: string } | null {
  // Match default import: import Button from "../../components/atoms/Button"
  const defaultImportRegex = /import\s+(\w+)\s+from\s+"([^"']*components\/[^"']+)"/;
  // Match named imports (possibly multiple): import { Button, X } from "../../components/..."
  const namedImportRegex = /import\s+\{([^}]+)\}\s+from\s+"([^"']*components\/[^"']+)"/;

  let importName: string | null = null;
  let importRel: string | null = null;

  const baseName = path.basename(storyFilePath).replace(/\.stories\.tsx$/, "");

  const namedMatch = fileContent.match(namedImportRegex);
  if (namedMatch) {
    importRel = namedMatch[2].trim();
    const names = namedMatch[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/\sas\s+\w+$/, ""));
    // Prefer a name that matches the base file name, else the first
    importName = names.find((n) => n === baseName) || names[0] || null;
  }

  if (!importName) {
    const defaultMatch = fileContent.match(defaultImportRegex);
    if (defaultMatch) {
      importName = defaultMatch[1];
      importRel = defaultMatch[2];
    }
  }

  if (!importName || !importRel) return null;

  const baseResolved = path.normalize(path.join(path.dirname(storyFilePath), importRel));

  // Resolve to an existing file for source reading
  const candidates = [
    baseResolved,
    `${baseResolved}.tsx`,
    `${baseResolved}.ts`,
    `${baseResolved}.jsx`,
    `${baseResolved}.js`,
    path.join(baseResolved, "index.tsx"),
    path.join(baseResolved, "index.ts"),
    path.join(baseResolved, "index.jsx"),
    path.join(baseResolved, "index.js"),
  ];
  const existing = candidates.find((p) => {
    try {
      return fs.existsSync(p) && fs.statSync(p).isFile();
    } catch {
      return false;
    }
  });

  // Alias import path should mirror how the story imported it (no enforced extension)
  const aliasImportPath =
    "@/" + path.relative(process.cwd(), baseResolved).replace(/\\/g, "/");

  const sourcePath = existing
    ? path.relative(process.cwd(), existing).replace(/\\/g, "/")
    : path.relative(process.cwd(), baseResolved).replace(/\\/g, "/");

  return { importName, aliasImportPath, sourcePath };
}

async function main() {
  const storiesRoot = path.join(process.cwd(), "design-system", "src", "stories");
  const outRoot = path.join(process.cwd(), "app", "docs");
  const storyFiles = walk(storiesRoot);
  const manifest: Record<string, Array<{ name: string; route: string }>> = {};

  for (const storyFile of storyFiles) {
    const content = fs.readFileSync(storyFile, "utf8");
    const compImport = extractComponentImport(storyFile, content);
    if (!compImport) {
      console.warn(`Skipping ${storyFile}: could not detect component import.`);
      continue;
    }

    // Attempt to extract title from default export using a light regex; fallback to file name
    const titleMatch = content.match(/title\s*:\s*"([^"]+)"/);
    const rawCategory = path.basename(path.dirname(storyFile));
    const category = rawCategory === "atomos" ? "atoms" : rawCategory;
    const baseName = path.basename(storyFile).replace(/\.stories\.tsx$/, "");
    const titleSlug = (titleMatch?.[1]?.split("/").pop() || baseName).replace(/\s+/g, " ");

    const outDir = path.join(outRoot, category, baseName);
    fs.mkdirSync(outDir, { recursive: true });

    // Generate page content with a single preview per file (no story args to avoid runtime issues)
    const outPage = `"use client";
import { Preview } from "@/components/Preview";
import { ${compImport.importName} } from "${compImport.aliasImportPath}";

export default function DocPage() {
  return (
    <div className=\"flex flex-col items-center justify-center min-h-screen p-6\">\n      <div className=\"w-full space-y-6\">
        <Preview title={"${titleSlug}"} sourcePath={"${compImport.sourcePath}"}>
          <${compImport.importName} />
        </Preview>
      </div>
    </div>
  );
}
`;

    fs.writeFileSync(path.join(outDir, "page.tsx"), outPage, "utf8");
    const route = `/docs/${category}/${baseName}`;
    if (!manifest[category]) manifest[category] = [];
    manifest[category].push({ name: titleSlug, route });
    console.log(`✅ Generated docs: ${path.join("app", "docs", category, baseName, "page.tsx")} → ${route}`);
  }

  // Write a manifest JSON the app can consume for navigation
  const appManifestPath = path.join(outRoot, "manifest.json");
  fs.writeFileSync(appManifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`🗂️  Wrote docs manifest: app/docs/manifest.json`);

  // Also write to public so the app can fetch without module imports
  const publicManifestPath = path.join(process.cwd(), "public", "docs-manifest.json");
  fs.writeFileSync(publicManifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`🗂️  Wrote public manifest: public/docs-manifest.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


