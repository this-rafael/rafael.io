"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const STACK = ["Node.js", "NestJS", "Golang", "TypeScript", "AWS"];
const BADGES = ["SENIOR ENGINEER", "AWS CERTIFIED", "7+ ANOS"];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 px-6">
      <div
        className={`space-y-8 max-w-4xl w-full text-center transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Badge row */}
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="text-xs font-semibold tracking-widest text-portfolio-accent/90 border border-portfolio-accent/30 px-3 py-1 rounded-full bg-portfolio-accent/5"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-syne font-bold tracking-tight leading-tight animate-fade-in">
          <span className="text-gradient-primary">Rafael</span>{" "}
          <span className="text-portfolio-light">da Silva Pereira</span>
        </h1>

        {/* Role tagline */}
        <p className="text-lg md:text-xl text-portfolio-light/70 font-medium tracking-wide animate-fade-in">
          Engenheiro de Software Senior · Arquiteto de Sistemas
        </p>

        {/* Subtitle / value proposition */}
        <p className="text-base md:text-lg text-portfolio-light/60 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Transformo sistemas legados em arquiteturas escaláveis.{" "}
          <span className="text-portfolio-light/80">
            7+ anos entregando performance, resiliência e código que dura.
          </span>
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-portfolio-light/80 bg-white/5 border border-white/10 px-3 py-1 rounded-md hover:border-portfolio-accent/40 hover:text-portfolio-light transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 pt-2 animate-fade-in">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-portfolio-accent to-portfolio-secondary shadow-[0_0_24px_rgba(10,132,255,0.35)] hover:shadow-[0_0_36px_rgba(10,132,255,0.55)] hover:scale-105 transition-all duration-300"
          >
            Ver Projetos
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-portfolio-accent border border-portfolio-accent/50 hover:bg-portfolio-accent/10 hover:border-portfolio-accent transition-all duration-300"
          >
            Solicitar Serviço
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <ChevronDown size={20} className="text-portfolio-light" />
      </div>
    </section>
  );
}
