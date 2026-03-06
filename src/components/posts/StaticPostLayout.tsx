import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import PostNavigation from "@/components/posts/PostNavigation";
import { getStaticAdjacentPosts } from "@/data/posts-nav";

export interface StaticPostMeta {
  id: number;
  title: string;
  slug: string;
  description: string;
  labels: string[];
  image: string;
  url: string;
  readingTime: number;
}

interface StaticPostLayoutProps {
  meta: StaticPostMeta;
  children: React.ReactNode;
}

export default function StaticPostLayout({
  meta,
  children,
}: StaticPostLayoutProps) {
  const { prev, next } = getStaticAdjacentPosts(meta.slug);

  return (
    <main className="min-h-screen flex flex-col">
      <article className="flex-grow">
        {/* ─── Hero header ─── */}
        <header className="relative w-full overflow-hidden">
          {/* Blurred background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={meta.image}
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
              {meta.labels.map((label) => (
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
              {meta.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-portfolio-light/50">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {meta.readingTime} min de leitura
              </span>

              <span className="w-1 h-1 rounded-full bg-portfolio-light/30" />

              <a
                href={meta.url}
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
                src={meta.image}
                alt={meta.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/40 to-transparent" />
            </div>
          </div>
        </header>

        {/* ─── Body ─── */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Description lead */}
          {meta.description && (
            <p className="text-lg text-portfolio-light/70 leading-relaxed mb-10 italic border-l-2 border-portfolio-accent pl-4">
              {meta.description}
            </p>
          )}

          {/* Static post content (JSX) */}
          <div
            className="
              prose prose-invert max-w-none
              prose-headings:font-syne prose-headings:text-portfolio-light
              prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-portfolio-light/90
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2 prose-h3:text-portfolio-light/80
              prose-p:text-portfolio-light/80 prose-p:leading-relaxed prose-p:text-base
              prose-a:text-portfolio-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-portfolio-light prose-strong:font-semibold
              prose-em:text-portfolio-light/90
              prose-ul:text-portfolio-light/80 prose-ol:text-portfolio-light/80
              prose-li:my-1
              prose-blockquote:border-l-portfolio-accent prose-blockquote:bg-white/5
              prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
              prose-blockquote:text-portfolio-light/70 prose-blockquote:not-italic
              prose-hr:border-white/10
              prose-table:text-sm
              prose-th:text-portfolio-light prose-th:bg-white/10
              prose-td:text-portfolio-light/80 prose-td:border-white/10
              prose-code:text-portfolio-accent prose-code:bg-white/10
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-code:before:content-none prose-code:after:content-none
              [&>pre]:p-0 [&>pre]:bg-transparent [&>pre]:border-0
            "
          >
            {children}
          </div>

          {/* Prev / Next navigation */}
          <PostNavigation prev={prev} next={next} />
        </div>
      </article>

      <FooterSection />
    </main>
  );
}
