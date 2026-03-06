import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";

interface PostNavigationProps {
  prev: Post | null;
  next: Post | null;
}

function NavCard({
  post,
  direction,
}: {
  post: Post;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/artigos/${post.slug}`}
      className="group flex flex-col gap-3 p-4 card
        hover:border-portfolio-accent/40
        hover:shadow-[0_0_20px_rgba(10,132,255,0.12)]
        transition-all duration-300 flex-1 min-w-0"
    >
      <div
        className={`flex items-center gap-1.5 text-xs text-portfolio-light/50
          group-hover:text-portfolio-accent transition-colors duration-200
          ${isPrev ? "" : "justify-end"}`}
      >
        {isPrev && <ArrowLeft size={12} />}
        <span>{isPrev ? "Anterior" : "Próximo"}</span>
        {!isPrev && <ArrowRight size={12} />}
      </div>

      <div
        className={`flex items-center gap-3 ${isPrev ? "" : "flex-row-reverse"}`}
      >
        <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-white/10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <p
          className={`text-sm font-semibold text-portfolio-light/90
            group-hover:text-portfolio-accent transition-colors duration-200
            line-clamp-2 ${isPrev ? "" : "text-right"}`}
        >
          {post.title}
        </p>
      </div>
    </Link>
  );
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-16 pt-10 border-t border-white/10 flex gap-4"
      aria-label="Navegação entre artigos"
    >
      {prev ? (
        <NavCard post={prev} direction="prev" />
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <NavCard post={next} direction="next" />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
