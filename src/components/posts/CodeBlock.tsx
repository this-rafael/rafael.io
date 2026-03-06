"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

/** Recursively extracts plain text from React children (highlights produce nested spans). */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";

  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  return "";
}

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title="Copiar código"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-portfolio-light/60
        hover:text-portfolio-light hover:bg-white/10 transition-all duration-200"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}

export default function CodeBlock({ children }: CodeBlockProps) {
  // `children` is the <code> element rendered by remark/rehype
  const codeElement = React.Children.only(children) as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  const className = codeElement?.props?.className ?? "";
  const langMatch = className.match(/language-(\w+)/);
  const language = langMatch ? langMatch[1] : "";
  const code = extractText(codeElement?.props?.children);

  // Render mermaid diagrams as visual SVG instead of code block
  if (language === "mermaid") {
    return <MermaidDiagram code={code} />;
  }

  return (
    <div
      className="my-6 rounded-xl overflow-hidden border border-white/10
        bg-[#0d0d1a] shadow-[0_0_24px_rgba(0,0,0,0.4)]"
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5
          border-b border-white/10 bg-white/5"
      >
        {/* Fake traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>

        <div className="flex items-center gap-2">
          {language && (
            <span
              className="text-xs font-mono text-portfolio-accent/80
                uppercase tracking-widest"
            >
              {language}
            </span>
          )}
          <CopyButton code={code} />
        </div>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed font-mono">
        {children}
      </pre>
    </div>
  );
}
