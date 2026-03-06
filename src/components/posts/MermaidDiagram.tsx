"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  code: string;
}

let idCounter = 0;

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const id = `mermaid-${++idCounter}-${Date.now()}`;

    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#0a84ff",
          primaryTextColor: "#e8e8f0",
          primaryBorderColor: "rgba(255,255,255,0.08)",
          lineColor: "#bf5af2",
          background: "#12122a",
          mainBkg: "#12122a",
          nodeBorder: "rgba(10,132,255,0.4)",
          clusterBkg: "#0d0d1a",
          titleColor: "#e8e8f0",
          edgeLabelBackground: "#12122a",
          fontFamily: "Inter, sans-serif",
        },
      });

      mermaid
        .render(id, code)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
            setRendered(true);
          }
        })
        .catch((err) => {
          console.error("Mermaid render error:", err);
          setError("Erro ao renderizar o diagrama.");
        });
    });
  }, [code]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
        {error}
        <pre className="mt-2 text-xs opacity-70 whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      {!rendered && (
        <div className="w-full h-48 rounded-xl bg-portfolio-surface/50 animate-pulse border border-white/10" />
      )}
      <div
        ref={containerRef}
        className="max-w-full overflow-auto [&>svg]:max-w-full [&>svg]:h-auto"
        style={{ display: rendered ? "block" : "none" }}
      />
    </div>
  );
}
