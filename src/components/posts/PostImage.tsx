import Image from "next/image";

interface PostImageProps {
  src?: string;
  alt?: string;
  /** Optional caption shown below the image */
  caption?: string;
}

/**
 * Renders post inline images with responsive sizing and an optional caption.
 *
 * Filename conventions (for author reference):
 *   code-xxx.png   → replace with a fenced code block
 *   diagram-xxx.png → replace with a ```mermaid fenced block
 *   chart-xxx.png  → rendered as-is (this component)
 *   img-xxx.png    → rendered as-is (this component)
 */
export default function PostImage({ src, alt = "", caption }: PostImageProps) {
  if (!src) return null;

  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10
          shadow-[0_0_32px_rgba(0,0,0,0.5)]"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized
        />
      </div>

      {(caption || alt) && (
        <figcaption className="mt-2 text-center text-xs text-portfolio-light/50 italic">
          {caption ?? alt}
        </figcaption>
      )}
    </figure>
  );
}
