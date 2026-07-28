import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const publicRoutes = ["/", "/artigos", "/projetos", "/contato", "/servicos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publicRoutes.map((path) => ({
    url: siteUrl(path),
  }));

  const posts = getAllPosts().map((post) => ({
    url: siteUrl(`/artigos/${post.slug}`),
  }));

  return [...pages, ...posts];
}
