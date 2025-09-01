// components/Preview.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/design-system/src/components/atoms/Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/design-system/src/components/atoms/Tooltip";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/design-system/src/components/atoms/Tabs";
import { ScrollArea } from "@/design-system/src/components/atoms/ScrollArea";

interface PreviewProps {
  title?: string;
  children: React.ReactNode;
  code?: string;
  sourcePath?: string;
}

export function Preview({ title, children, code, sourcePath }: PreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [loadedCode, setLoadedCode] = useState<string | null>(null);
  const effectiveCode = sourcePath ? loadedCode ?? "" : code ?? "";

  useEffect(() => {
    const load = async () => {
      if (!sourcePath || tab !== "code" || loadedCode !== null) return;
      try {
        const res = await fetch(`/api/source?path=${encodeURIComponent(sourcePath)}`);
        if (res.ok) {
          const data = await res.json();
          setLoadedCode(data.code ?? "");
        } else {
          setLoadedCode("// Failed to load source");
        }
      } catch {
        setLoadedCode("// Failed to load source");
      }
    };
    load();
    
  }, [tab, sourcePath]);

  const handleCopy = async () => {
    try {
     
      let textToCopy = effectiveCode;
      if (sourcePath && (loadedCode === null || loadedCode === "")) {
        const res = await fetch(`/api/source?path=${encodeURIComponent(sourcePath)}`);
        const data = await res.json();
        textToCopy = data.code ?? "";
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v as "preview" | "code")}> 
        <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2">
          <div className="text-sm font-semibold truncate">
            {title ?? "Preview"}
          </div>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            {tab === "code" && (
              <Button
                aria-label="Copy code"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2"
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-foreground">
                    <CheckIcon className="h-4 w-4" />
                    Copied
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-foreground">
                    <CopyIcon className="h-4 w-4" />
                    Copy
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="preview">
          <div className="p-4 bg-white">
            <div className="max-w-md mx-auto">{children}</div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="bg-gray-100">
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="overflow-x-auto">
                <ScrollArea className="h-[520px] w-[1000px]">
                  <div className="p-4 inline-block w-max">
                    <SyntaxHighlighter language="tsx" style={oneDark}>
                      {effectiveCode}
                    </SyntaxHighlighter>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
