// src/components/blog/code-block.tsx
"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";
import { Copy, Check, Play, Download } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  allowCopy?: boolean;
  allowDownload?: boolean;
  isExecutable?: boolean;
}

export function CodeBlock({
  children,
  language = "text",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  allowCopy = true,
  allowDownload = false,
  isExecutable = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clean up code (remove extra whitespace, normalize line endings)
  const cleanCode = children.trim();
  const lineCount = cleanCode.split("\n").length;

  // Auto-detect language if not provided
  const detectLanguage = (code: string): string => {
    if (language !== "text") return language;
    if (code.includes("import ") && code.includes("from ")) return "python";
    if (
      code.includes("def ") ||
      code.includes("numpy") ||
      code.includes("pandas")
    )
      return "python";
    if (
      code.includes("const ") ||
      code.includes("let ") ||
      code.includes("function ")
    )
      return "javascript";
    if (code.includes("interface ") || code.includes("type "))
      return "typescript";
    if (code.includes("<!DOCTYPE") || code.includes("<html")) return "html";
    if (code.includes("SELECT ") || code.includes("FROM ")) return "sql";
    if (code.includes("<?php")) return "php";
    if (code.includes("public class") || code.includes("import java"))
      return "java";
    if (code.includes("#include") || code.includes("int main")) return "cpp";
    if (
      code.includes("#!/bin/bash") ||
      code.includes("mkdir") ||
      code.includes("curl")
    )
      return "bash";

    const trimmed = code.trim();
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      return "json";
    }

    return "text";
  };

  const detectedLang =
    language !== "text" ? language : detectLanguage(cleanCode);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const downloadCode = () => {
    const fileExtensions: Record<string, string> = {
      python: "py",
      javascript: "js",
      typescript: "ts",
      html: "html",
      css: "css",
      json: "json",
      sql: "sql",
      bash: "sh",
      php: "php",
      java: "java",
      cpp: "cpp",
    };

    const extension = fileExtensions[detectedLang] || "txt";
    const defaultFilename = filename || `code.${extension}`;

    const blob = new Blob([cleanCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = defaultFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Language display names
  const languageNames: Record<string, string> = {
    python: "Python",
    javascript: "JavaScript",
    typescript: "TypeScript",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    sql: "SQL",
    bash: "Bash",
    php: "PHP",
    java: "Java",
    cpp: "C++",
    text: "Text",
  };

  if (!mounted) {
    return (
      <div className="mb-6 bg-gray-900 rounded-lg">
        <div className="h-12 bg-gray-800 rounded-t-lg animate-pulse" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  // Remove background from syntax styles
  const customStyle =
    theme === "dark"
      ? {
          ...oneDark,
          'pre[class*="language-"]': { background: "transparent" },
          'code[class*="language-"]': { background: "transparent" },
        }
      : {
          ...oneLight,
          'pre[class*="language-"]': { background: "transparent" },
          'code[class*="language-"]': { background: "transparent" },
        };

  return (
    <div className="relative group mb-6 rounded-lg overflow-hidden border border-border/50 hover:border-border transition-colors bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-muted/50 border-b border-border/50 px-3 py-2.5 md:px-4 md:py-3">
        <div className="flex items-center gap-2 min-w-0 flex-1 md:gap-3">
          <div className="hidden sm:flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
          </div>

          <div className="flex items-center gap-1.5 min-w-0 flex-1 md:gap-2">
            <span className="text-xs font-medium text-foreground/80 capitalize md:text-sm">
              {languageNames[detectedLang]}
            </span>
            {filename && (
              <>
                <span className="hidden text-foreground/40 sm:inline">•</span>
                <span className="hidden truncate text-sm text-foreground/60 font-mono sm:inline">
                  {filename}
                </span>
              </>
            )}
            {lineCount > 1 && (
              <>
                <span className="hidden text-foreground/40 md:inline">•</span>
                <span className="hidden text-xs text-foreground/50 md:inline">
                  {lineCount} lines
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions - Always visible on mobile */}
        <div className="flex items-center gap-1.5 md:gap-2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity">
          {isExecutable && detectedLang === "python" && (
            <button
              className="hidden items-center gap-1.5 px-2.5 py-1.5 bg-foreground hover:bg-foreground/90 text-background text-xs rounded-md transition-colors sm:flex"
              title="Run code"
            >
              <Play className="h-3 w-3" />
              <span className="hidden md:inline">Run</span>
            </button>
          )}

          {allowDownload && (
            <button
              onClick={downloadCode}
              className="hidden items-center gap-1.5 px-2.5 py-1.5 bg-foreground hover:bg-foreground/90 text-background text-xs rounded-md transition-colors sm:flex"
              title="Download code"
            >
              <Download className="h-3 w-3" />
              <span className="hidden md:inline">Download</span>
            </button>
          )}

          {allowCopy && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs rounded-md transition-colors md:gap-1.5"
              title="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-foreground" />
                  <span className="hidden text-foreground sm:inline">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={detectedLang}
          style={customStyle}
          customStyle={{
            margin: 0,
            padding: "1rem",
            paddingRight: "1rem",
            fontSize: "13px",
            lineHeight: "1.6",
            background: "transparent",
            fontFamily:
              '"Consolas", "Monaco", "Courier New", "Courier", monospace',
          }}
          codeTagProps={{
            style: {
              background: "transparent",
              fontFamily:
                '"Consolas", "Monaco", "Courier New", "Courier", monospace',
            },
          }}
          PreTag="div"
          showLineNumbers={showLineNumbers && lineCount > 3}
          lineNumberStyle={{
            color: theme === "dark" ? "#6b7280" : "#9ca3af",
            fontSize: "11px",
            marginRight: "0.75rem",
            minWidth: "2em",
            paddingRight: "0.5rem",
            textAlign: "right",
            userSelect: "none",
          }}
          wrapLines={false}
          wrapLongLines={false}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlightLines.includes(lineNumber)
                ? theme === "dark"
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(59, 130, 246, 0.05)"
                : "transparent",
              display: "block",
            },
          })}
        >
          {cleanCode}
        </SyntaxHighlighter>

        {/* Highlight indicator for highlighted lines */}
        {highlightLines.length > 0 && (
          <div className="absolute right-3 top-3 md:right-4 md:top-4">
            <div className="px-2 py-1 bg-muted border border-border rounded text-xs text-muted-foreground">
              {highlightLines.length} line{highlightLines.length > 1 ? "s" : ""}{" "}
              highlighted
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
