// src/components/blog/code-block.tsx
'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'
import { Copy, Check, Play, Download } from 'lucide-react'
import { useTheme } from 'next-themes'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  allowCopy?: boolean
  allowDownload?: boolean
  isExecutable?: boolean
}

export function CodeBlock({ 
  children, 
  language = 'text',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  allowCopy = true,
  allowDownload = false,
  isExecutable = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Clean up code (remove extra whitespace, normalize line endings)
  const cleanCode = children.trim()
  const lineCount = cleanCode.split('\n').length

  // Auto-detect language if not provided
  const detectLanguage = (code: string): string => {
    if (language !== 'text') return language
    if (code.includes('import ') && code.includes('from ')) return 'python'
    if (code.includes('def ') || code.includes('numpy') || code.includes('pandas')) return 'python'
    if (code.includes('const ') || code.includes('let ') || code.includes('function ')) return 'javascript'
    if (code.includes('interface ') || code.includes('type ')) return 'typescript'
    if (code.includes('<!DOCTYPE') || code.includes('<html')) return 'html'
    if (code.includes('SELECT ') || code.includes('FROM ')) return 'sql'
    if (code.includes('<?php')) return 'php'
    if (code.includes('public class') || code.includes('import java')) return 'java'
    if (code.includes('#include') || code.includes('int main')) return 'cpp'
    if (code.includes('#!/bin/bash') || code.includes('mkdir') || code.includes('curl')) return 'bash'
    
    const trimmed = code.trim()
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      return 'json'
    }
    
    return 'text'
  }

  const detectedLang = language !== 'text' ? language : detectLanguage(cleanCode)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const downloadCode = () => {
    const fileExtensions: Record<string, string> = {
      python: 'py',
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      json: 'json',
      sql: 'sql',
      bash: 'sh',
      php: 'php',
      java: 'java',
      cpp: 'cpp',
    }

    const extension = fileExtensions[detectedLang] || 'txt'
    const defaultFilename = filename || `code.${extension}`
    
    const blob = new Blob([cleanCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = defaultFilename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }


  // Language display names
  const languageNames: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    sql: 'SQL',
    bash: 'Bash',
    php: 'PHP',
    java: 'Java',
    cpp: 'C++',
    text: 'Text'
  }

  if (!mounted) {
    return (
      <div className="mb-6 bg-gray-900 rounded-lg">
        <div className="h-12 bg-gray-800 rounded-t-lg animate-pulse" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
      </div>
    )
  }

  const syntaxStyle = theme === 'dark' ? oneDark : oneLight

  return (
    <div className="relative group mb-6 rounded-lg overflow-hidden border border-border/50 hover:border-border transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/50 border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/80 capitalize">
              {languageNames[detectedLang]}
            </span>
            {filename && (
              <>
                <span className="text-foreground/40">•</span>
                <span className="text-sm text-foreground/60 font-mono">
                  {filename}
                </span>
              </>
            )}
            {lineCount > 1 && (
              <>
                <span className="text-foreground/40">•</span>
                <span className="text-xs text-foreground/50">
                  {lineCount} lines
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {isExecutable && detectedLang === 'python' && (
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors"
            >
              <Play className="h-3 w-3" />
              Run
            </button>
          )}
          
          {allowDownload && (
            <button
              onClick={downloadCode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
            >
              <Download className="h-3 w-3" />
              Download
            </button>
          )}
          
          {allowCopy && (
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={detectedLang}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '14px',
            lineHeight: '1.6',
            background: 'transparent',
          }}
          showLineNumbers={showLineNumbers && lineCount > 3}
          lineNumberStyle={{
            color: theme === 'dark' ? '#6b7280' : '#9ca3af',
            fontSize: '12px',
            marginRight: '1rem',
            userSelect: 'none'
          }}
          wrapLines={true}
          wrapLongLines={true}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlightLines.includes(lineNumber) 
                ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                : 'transparent'
            }
          })}
        >
          {cleanCode}
        </SyntaxHighlighter>
        
        {/* Highlight indicator for highlighted lines */}
        {highlightLines.length > 0 && (
          <div className="absolute right-4 top-4">
            <div className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">
              {highlightLines.length} line{highlightLines.length > 1 ? 's' : ''} highlighted
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
