import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços de arquitetura de sistemas, performance, modernização de legados e desenvolvimento backend.",
  alternates: {
    canonical: siteUrl("/servicos"),
  },
  openGraph: {
    title: "Serviços | Rafael Pereira",
    description:
      "Arquitetura de sistemas, performance, modernização de legados e desenvolvimento backend.",
    url: siteUrl("/servicos"),
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
