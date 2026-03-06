"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  tech?: string[];
}

export default function ProjectCard({
  name,
  description,
  link,
  imageUrl,
  tech = [],
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white/5 backdrop-blur border rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
          isHovered
            ? "border-portfolio-accent/50 shadow-[0_0_30px_rgba(10,132,255,0.2)] -translate-y-1"
            : "border-white/10"
        }`}
      >
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/90 to-transparent" />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-base font-semibold mb-2 text-portfolio-light group-hover:text-portfolio-accent transition-colors duration-300">
            {name}
          </h3>

          <p className="text-portfolio-light/65 text-sm line-clamp-3 flex-grow">
            {description}
          </p>

          {tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center text-portfolio-accent text-sm font-medium">
            <span>Ver projeto</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
