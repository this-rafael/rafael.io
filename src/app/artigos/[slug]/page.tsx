import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import PostHeader from "@/components/posts/PostHeader";
import PostBody from "@/components/posts/PostBody";
import PostNavigation from "@/components/posts/PostNavigation";
import FooterSection from "@/components/FooterSection";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/** Required for next output: "export" — pre-renders all post pages at build time. */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artigo não encontrado" };
  }

  const title = `${post.title} — Rafael Pereira`;
  const description = post.description;
  const imageUrl = `https://rafael.io${post.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://rafael.io/artigos/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main className="min-h-screen flex flex-col">
      <article className="flex-grow">
        {/* Hero header with blurred cover + title + tags */}
        <PostHeader post={post} />

        {/* Markdown body */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Description lead */}
          {post.description && (
            <p className="text-lg text-portfolio-light/70 leading-relaxed mb-10 italic border-l-2 border-portfolio-accent pl-4">
              {post.description}
            </p>
          )}

          <PostBody content={post.content} />

          {/* Prev / Next navigation */}
          <PostNavigation prev={prev} next={next} />
        </div>
      </article>

      <FooterSection />
    </main>
  );
}
