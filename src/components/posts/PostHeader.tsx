import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { Post } from "@/lib/posts";

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Blurred background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover blur-2xl scale-110 opacity-30"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-portfolio-dark/60 via-portfolio-dark/80 to-portfolio-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-12">
        {/* Back link */}
        <Link
          href="/artigos"
          className="inline-flex items-center gap-2 text-sm text-portfolio-light/60
            hover:text-portfolio-accent transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={16} />
          Todos os artigos
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.labels.map((label) => (
            <span key={label} className="tag">
              {label}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold leading-tight
            text-portfolio-light mb-6 max-w-3xl"
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-portfolio-light/50">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime} min de leitura
          </span>

          <span className="w-1 h-1 rounded-full bg-portfolio-light/30" />

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-portfolio-accent transition-colors duration-200"
          >
            Ver original no LinkedIn ↗
          </a>
        </div>

        {/* Cover image */}
        <div
          className="relative mt-10 w-full overflow-hidden rounded-2xl border border-white/10
            shadow-[0_0_48px_rgba(10,132,255,0.12)]"
          style={{ aspectRatio: "2/1" }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/40 to-transparent" />
        </div>
      </div>
    </header>
  );
}
