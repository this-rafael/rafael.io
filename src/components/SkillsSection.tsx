"use client";

import { useState } from "react";

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  category: "Backend" | "Frontend" | "Cloud" | "Database" | "Architecture";
}

const skills: Skill[] = [
  // Expert
  { name: "Node.js", level: "Expert", category: "Backend" },
  { name: "TypeScript", level: "Expert", category: "Backend" },
  { name: "NestJS", level: "Expert", category: "Backend" },
  { name: "PostgreSQL", level: "Expert", category: "Database" },
  { name: "Clean Architecture", level: "Expert", category: "Architecture" },
  // Advanced
  { name: "Golang", level: "Advanced", category: "Backend" },
  { name: "MongoDB", level: "Advanced", category: "Database" },
  { name: "MySQL", level: "Advanced", category: "Database" },
  { name: "AWS", level: "Advanced", category: "Cloud" },
  { name: "Docker", level: "Advanced", category: "Cloud" },
  { name: "Kafka", level: "Advanced", category: "Backend" },
  { name: "RabbitMQ", level: "Advanced", category: "Backend" },
  { name: "Domain-Driven Design", level: "Advanced", category: "Architecture" },
  {
    name: "CQRS / Event Sourcing",
    level: "Advanced",
    category: "Architecture",
  },
  // Intermediate
  { name: "React", level: "Intermediate", category: "Frontend" },
  { name: "Next.js", level: "Intermediate", category: "Frontend" },
  { name: "Flutter", level: "Intermediate", category: "Frontend" },
  { name: "Redis", level: "Intermediate", category: "Database" },
  { name: "Python", level: "Intermediate", category: "Backend" },
  { name: "Terraform", level: "Intermediate", category: "Cloud" },
  { name: "Kubernetes", level: "Intermediate", category: "Cloud" },
];

const LEVEL_STYLES: Record<Skill["level"], string> = {
  Expert:
    "text-portfolio-accent border-portfolio-accent/40 bg-portfolio-accent/8",
  Advanced:
    "text-portfolio-secondary border-portfolio-secondary/40 bg-portfolio-secondary/8",
  Intermediate: "text-portfolio-light/70 border-white/15 bg-white/5",
};

const LEVEL_DOT: Record<Skill["level"], string> = {
  Expert: "bg-portfolio-accent",
  Advanced: "bg-portfolio-secondary",
  Intermediate: "bg-portfolio-light/40",
};

type Category = "All" | Skill["category"];
const CATEGORIES: Category[] = [
  "All",
  "Backend",
  "Frontend",
  "Cloud",
  "Database",
  "Architecture",
];

export default function SkillsSection() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="w-full py-16 px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center font-syne">
        Stack Técnica
      </h2>
      <p className="text-portfolio-light/50 text-center text-sm mb-8">
        Tecnologias que uso no dia a dia, em produção
      </p>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
              active === cat
                ? "border-portfolio-accent bg-portfolio-accent/15 text-portfolio-accent"
                : "border-white/10 text-portfolio-light/50 hover:border-white/20 hover:text-portfolio-light/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(["Expert", "Advanced", "Intermediate"] as Skill["level"][]).map(
          (lvl) => (
            <div key={lvl} className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full inline-block ${LEVEL_DOT[lvl]}`}
              />
              <span className="text-xs text-portfolio-light/50">{lvl}</span>
            </div>
          ),
        )}
      </div>

      {/* Chips grid */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
        {filtered.map((skill) => (
          <span
            key={skill.name}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default ${LEVEL_STYLES[skill.level]}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${LEVEL_DOT[skill.level]}`}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}
