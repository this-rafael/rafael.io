
import { ArrowRight } from "lucide-react";

interface MiniArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  labels: string[];
  articleUrl: string;
  variant?: "light" | "dark";
}

export default function MiniArticleCard({
  title,
  description,
  imageUrl,
  labels,
  articleUrl,
  variant = "light"
}: MiniArticleCardProps) {
  return (
    <div className="card group flex overflow-hidden h-40">
      {/* Image */}
      <div className="relative w-1/3 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-portfolio-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold mb-1 line-clamp-1 group-hover:text-portfolio-accent transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-portfolio-light/70 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-2">
          <div className="flex gap-1 mb-1 flex-wrap">
            {labels.map((label, index) => (
              <span key={index} className="tag text-xs px-1.5 py-0.5">
                {label}
              </span>
            ))}
          </div>
          
          <a
            href={articleUrl}
            className="inline-flex items-center text-xs font-medium text-portfolio-accent hover:underline mt-1"
          >
            Ler artigo
            <ArrowRight size={12} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
