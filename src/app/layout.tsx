import "../globals.css";

import { Inter, Syne } from "next/font/google";
import FloatingNavbar from "@/components/FloatingNavbar";
import CosmicBackground from "@/components/CosmicBackground";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Rafael Pereira — Engenheiro de Software Senior",
    template: "%s | Rafael Pereira",
  },
  description:
    "Portfólio de Rafael Pereira. Arquitetura de software, backend e sistemas escaláveis.",
  robots: {
    index: true,
    follow: true,
  },
};

// Configuração correta da fonte
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${inter.className} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CosmicBackground />
        <FloatingNavbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
