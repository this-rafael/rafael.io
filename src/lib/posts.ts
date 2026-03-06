import fs from "fs";
import path from "path";
import matter from "gray-matter";
import articlesJson from "@/data/articles.json";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  id: number;
  title: string;
  labels: string[];
  image: string;
  url: string;
  extracted: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  description: string;
  content: string;
  readingTime: number;
};

/** "01-design-patterns-strategy.md" → "design-patterns-strategy" */
function getSlugFromFilename(filename: string): string {
  return filename.replace(/^\d+-/, "").replace(/\.md$/, "");
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

function parsePost(filename: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const slug = getSlugFromFilename(filename);

  // Merge description from articles.json (single source of truth for editorialcopy)
  const article = articlesJson.find((a) => a.id === frontmatter.id);
  const description = article?.description ?? "";

  return {
    ...frontmatter,
    slug,
    description,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/** Returns all published posts sorted by id ascending. */
export function getAllPosts(): Post[] {
  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return filenames.map(parsePost).filter((post) => post.extracted !== false);
}

/** Returns a single post by slug, or null if not found. */
export function getPostBySlug(slug: string): Post | null {
  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const filename = filenames.find((f) => getSlugFromFilename(f) === slug);
  if (!filename) return null;

  return parsePost(filename);
}

/** Returns the previous and next posts relative to the given slug. */
export function getAdjacentPosts(currentSlug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === currentSlug);

  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
