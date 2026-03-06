"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import type { ComponentPropsWithoutRef } from "react";
import CodeBlock from "./CodeBlock";
import PostImage from "./PostImage";

interface PostBodyProps {
  content: string;
}

const components: Components = {
  // Fenced code blocks → CodeBlock (syntax highlight + mermaid + copy button)
  pre(props: ComponentPropsWithoutRef<"pre">) {
    return <CodeBlock {...props} />;
  },
  // Inline images → responsive PostImage wrapper
  img(props: ComponentPropsWithoutRef<"img">) {
    return <PostImage src={props.src} alt={props.alt ?? ""} />;
  },
};

export default function PostBody({ content }: PostBodyProps) {
  return (
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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight as never]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
