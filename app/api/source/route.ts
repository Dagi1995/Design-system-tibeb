import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Restrict reads to the project root and below
const ROOT = process.cwd();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const requestedPath = url.searchParams.get("path");
  if (!requestedPath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  try {
    const abs = path.resolve(ROOT, requestedPath);
    if (!abs.startsWith(ROOT)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const code = await fs.readFile(abs, "utf8");
    return NextResponse.json({ code });
  } catch (e) {
    return NextResponse.json({ error: "Unable to read file" }, { status: 404 });
  }
}


