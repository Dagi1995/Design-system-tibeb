"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

// Code highlighting languages
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";

// Custom components
import { Button } from "../atoms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../molecules/DropdownMenu";
import { Tooltip, TooltipTrigger, TooltipContent } from "../atoms/Tooltip";

// Icons
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Code,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  Quote,
  ChevronDown,
  Check,
} from "lucide-react";

// Initialize lowlight for syntax highlighting
const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("python", python);
lowlight.register("json", json);

interface TextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  onSave?: (content: string) => void;
  className?: string;
  placeholder?: string;
  showSubmitButton?: boolean;
  submitButtonText?: string;
}

export function TextEditor({
  content = "",
  onChange = () => {},
  onSave = () => {},
  className = "",
  placeholder = "Write something...",
  showSubmitButton = true,
  submitButtonText = "Save Content",
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Blockquote,
      TextStyle,
      Color,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: `prose max-w-none focus:outline-none min-h-[200px] p-4 ${className}`,
        placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleSave = () => {
    if (editor) {
      onSave(editor.getHTML());
    }
  };

  if (!editor) {
    return <div className="border rounded-md bg-white p-4 min-h-[200px]" />;
  }

  return (
    <div className="space-y-2">
      <div className="border rounded-md bg-white">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {showSubmitButton && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Check className="w-4 h-4" />
            {submitButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}

interface MenuBarProps {
  editor: Editor;
}
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

function MenuBar({ editor }: MenuBarProps) {
  const [selectionInTable, setSelectionInTable] = useState(false);

  const codeLanguages = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "CSS", value: "css" },
    { label: "HTML", value: "html" },
    { label: "Python", value: "python" },
    { label: "JSON", value: "json" },
  ];

  useEffect(() => {
    const checkTableSelection = () => {
      setSelectionInTable(editor.isActive("table"));
    };

    editor.on("transaction", checkTableSelection);
    editor.on("selectionUpdate", checkTableSelection);
    return () => {
      editor.off("transaction", checkTableSelection);
      editor.off("selectionUpdate", checkTableSelection);
    };
  }, [editor]);

  const currentHeadingLabel = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) {
        return `H${i}`;
      }
    }
    return "Paragraph";
  };

  const setHeading = (level: HeadingLevel | "paragraph") => {
    if (level === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const insertCodeBlock = (language: string) => {
    editor.chain().focus().toggleCodeBlock({ language }).run();
  };

  // Table commands
  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();
  const toggleHeaderRow = () => editor.chain().focus().toggleHeaderRow().run();

  return (
    <div className="border-b">
      {/* Top Toolbar Row */}
      <div className="flex items-center gap-1 p-2 border-b">
        {/* Format Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>{currentHeadingLabel()}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setHeading("paragraph")}>
              <Pilcrow className="w-4 h-4 mr-2" />
              Paragraph
            </DropdownMenuItem>
            {([1, 2, 3, 4, 5, 6] as HeadingLevel[]).map((level) => (
              <DropdownMenuItem key={level} onClick={() => setHeading(level)}>
                {level === 1 && <Heading1 className="w-4 h-4 mr-2" />}
                {level === 2 && <Heading2 className="w-4 h-4 mr-2" />}
                {level === 3 && <Heading3 className="w-4 h-4 mr-2" />}
                {level === 4 && <Heading4 className="w-4 h-4 mr-2" />}
                {level === 5 && <Heading5 className="w-4 h-4 mr-2" />}
                {level === 6 && <Heading6 className="w-4 h-4 mr-2" />}
                <span>Heading {level}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Basic formatting buttons */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              >
                <Bold className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              >
                <Italic className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
              >
                <Strikethrough className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
        </div>

        <div className="border-l h-6 mx-2" />

        {/* Text alignment */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                active={editor.isActive({ textAlign: "left" })}
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                active={editor.isActive({ textAlign: "center" })}
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                active={editor.isActive({ textAlign: "right" })}
              >
                <AlignRight className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align right</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Bottom Toolbar Row */}
      <div className="flex items-center gap-1 p-2">
        {/* Lists */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
            >
              <List className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bullet list</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Numbered list</TooltipContent>
        </Tooltip>

        <div className="border-l h-6 mx-2" />

        {/* Blockquote */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
            >
              <Quote className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>

        {/* Code block */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  active={editor.isActive("codeBlock")}
                >
                  <Code className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Code block</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            {codeLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => insertCodeBlock(lang.value)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Table */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              active={editor.isActive("table")}
            >
              <TableIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert table</TooltipContent>
        </Tooltip>

        {/* Table controls (shown when in table) */}
        {selectionInTable && (
          <div className="flex items-center gap-1 ml-2 pl-2 border-l">
            <Button variant="ghost" size="sm" onClick={addColumnBefore}>
              +Col ←
            </Button>
            <Button variant="ghost" size="sm" onClick={addColumnAfter}>
              +Col →
            </Button>
            <Button variant="ghost" size="sm" onClick={deleteColumn}>
              -Col
            </Button>

            <Button variant="ghost" size="sm" onClick={addRowBefore}>
              +Row ↑
            </Button>
            <Button variant="ghost" size="sm" onClick={addRowAfter}>
              +Row ↓
            </Button>
            <Button variant="ghost" size="sm" onClick={deleteRow}>
              -Row
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleHeaderRow}>
              Toggle Header
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={deleteTable}
            >
              Delete Table
            </Button>
          </div>
        )}
      </div>

      {/* Editor styles */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
          padding: 1rem;
          outline: none;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p {
          margin: 0.5rem 0;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }

        .ProseMirror h4 {
          font-weight: bold;
          margin: 1.33em 0;
        }

        .ProseMirror h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.67em 0;
        }

        .ProseMirror h6 {
          font-size: 0.67em;
          font-weight: bold;
          margin: 2.33em 0;
        }

        .ProseMirror pre {
          background: #1e293b;
          color: #f8fafc;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 0.75rem 0;
          overflow-x: auto;
        }

        .ProseMirror code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          background: #e2e8f0;
          color: #334155;
          padding: 0.2em 0.4em;
          border-radius: 0.2em;
          font-size: 0.9em;
        }

        .ProseMirror blockquote {
          border-left: 3px solid #94a3b8;
          padding-left: 1rem;
          margin: 0.5rem 0;
          color: #64748b;
        }

        .ProseMirror table {
          border-collapse: collapse;
          margin: 0.75rem 0;
          width: 100%;
        }

        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
        }

        .ProseMirror th {
          background-color: #f1f5f9;
          font-weight: bold;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .ProseMirror ul {
          list-style-type: disc;
        }

        .ProseMirror ol {
          list-style-type: decimal;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}
