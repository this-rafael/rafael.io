"use client";

import { useState } from "react";

interface ProjectCardProps {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
}

export default function ProjectCard({
  name,
  description,
  link,
  imageUrl,
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
      <div className="bg-portfolio-dark border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-portfolio-accent/20 hover:-translate-y-1 h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/80 to-transparent" />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-portfolio-light group-hover:text-portfolio-accent transition-colors duration-300">
            {name}
          </h3>

          <p className="text-portfolio-light/70 text-sm line-clamp-3">
            {description}
          </p>

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
