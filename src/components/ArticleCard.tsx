"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  labels: string[];
  articleUrl: string;
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
}

export default function ArticleCard({
  title,
  description,
  imageUrl,
  labels,
  articleUrl,
  variant = "dark",
  size = "medium",
}: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card group relative overflow-hidden ${
        size === "small"
          ? "max-w-sm"
          : size === "large"
          ? "max-w-2xl"
          : "max-w-md"
      } h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/80 to-transparent" />
      </div>

      {/* Content */}
      <div className={`p-5 relative z-10`}>
        {/* Labels/Tags */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {labels.map((label, index) => (
            <span key={index} className="tag">
              {label}
            </span>
          ))}
        </div>

        <h3
          className={`text-lg font-semibold mb-3 group-hover:text-portfolio-accent transition-colors duration-300`}
        >
          {title}
        </h3>

        <p className={`text-sm text-portfolio-light/70 mb-4 line-clamp-3`}>
          {description}
        </p>

        <a
          href={articleUrl}
          className="inline-flex items-center text-sm font-medium text-portfolio-accent hover:underline"
        >
          Ler artigo
          <ArrowRight
            size={16}
            className={`ml-1 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
          />
        </a>
      </div>
    </div>
  );
}
