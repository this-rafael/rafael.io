"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-12 px-6">
      <div
        className={`space-y-6 max-w-4xl text-center ${
          visible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
          Rafael da Silva Pereira
        </h1>

        <h2 className="text-xl md:text-2xl text-portfolio-light/80 font-medium max-w-3xl mx-auto animate-fade-in animate-delay-200">
          Senior Software Engineer | Cloud Computing Especialist | AWS Certified
          Solutions Architect
        </h2>

        <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in animate-delay-400">
          <a href="#skills" className="button-primary">
            Minhas Habilidades
          </a>
          <a
            href="#articles"
            className="bg-transparent border border-portfolio-accent text-portfolio-accent px-4 py-2 rounded-md hover:bg-portfolio-accent/10 transition-all duration-300"
          >
            Últimos Artigos
          </a>
        </div>
      </div>
    </section>
  );
}
