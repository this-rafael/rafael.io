import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos de Rafael Pereira sobre arquitetura de software, backend, padrões de projeto e boas práticas.",
  alternates: {
    canonical: siteUrl("/artigos"),
  },
  openGraph: {
    title: "Artigos | Rafael Pereira",
    description:
      "Artigos sobre arquitetura de software, backend, padrões de projeto e boas práticas.",
    url: siteUrl("/artigos"),
    type: "website",
  },
};

export default function ArticlesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
