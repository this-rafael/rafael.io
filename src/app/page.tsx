import type { Metadata } from "next";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import ArticleCard from "../components/ArticleCard";
import MiniArticleCard from "../components/MiniArticleCard";
import ProfessionalSummary from "../components/ProfessionalSummary";
import PersonalSummary from "../components/PersonalSummary";
import FooterSection from "../components/FooterSection";
import { spreadArticles } from "../lib/spreadArticles";

export const metadata: Metadata = {
  title: "Rafael Pereira — Engenheiro de Software Senior",
  description:
    "Portfólio de Rafael Pereira. 7+ anos em arquitetura de software, Node.js, NestJS, Golang e AWS. Modernização de legados, performance e sistemas escaláveis.",
  openGraph: {
    title: "Rafael Pereira — Engenheiro de Software Senior",
    description:
      "Portfólio de Rafael Pereira. 7+ anos em arquitetura, Node.js, NestJS, Golang e AWS.",
    type: "website",
  },
};

export default function Home() {
  const { miniArticles, fullArticles } = spreadArticles();

  const grouped2By2MiniArticles = miniArticles.reduce(
    (acc, article, index) => {
      if (index % 2 === 0) {
        acc.push([article]);
      } else {
        acc[acc.length - 1].push(article);
      }
      return acc;
    },
    [] as Array<
      {
        title: string;
        description: string;
        imageUrl: string;
        labels: string[];
        articleUrl: string;
      }[]
    >,
  );

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <main className="flex-grow">
        <HeroSection />

        <SkillsSection />

        <ProfessionalSummary />

        {/* Articles Section */}
        <section id="articles" className="w-full py-16 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Artigos Recentes
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {fullArticles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                imageUrl={article.imageUrl}
                labels={article.labels}
                articleUrl={article.articleUrl}
              />
            ))}
          </div>

          {/* Additional Articles Row */}
          <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {grouped2By2MiniArticles.map((group, index) => (
              <div key={index} className="flex flex-col gap-6">
                {group.map((article) => (
                  <MiniArticleCard
                    key={article.articleUrl}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    labels={article.labels}
                    articleUrl={article.articleUrl}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        <PersonalSummary />
      </main>

      <FooterSection />
    </div>
  );
}
