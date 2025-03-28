import type { Metadata } from "next";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SkillsCarousel from "../components/SkillsCarousel";
import ArticleCard from "../components/ArticleCard";
import MiniArticleCard from "../components/MiniArticleCard";
import ProfessionalSummary from "../components/ProfessionalSummary";
import PersonalSummary from "../components/PersonalSummary";
import FooterSection from "../components/FooterSection";
import { buildHardSkill } from "@/lib/skillsHelper";
import { spreadArticles } from "../lib/spreadArticles";

export const metadata: Metadata = {
  title: "Rafael - Desenvolvedor Fullstack",
  description: "Portfolio e blog de Rafael - Desenvolvedor Fullstack",
};

export default function Home() {
  const hardSkills = [
    // buildHardSkill(6, "PostgreSQL", "/images/pg.png", "#336791", "Database"),
    buildHardSkill(7, "MongoDB", "/images/mongodb.png", "#4FFF48", "Database"),
    buildHardSkill(8, "MySQL", "/images/mysql.png", "#4479A1", "Database"),
    buildHardSkill(
      9,
      "Sql Server",
      "/images/sqlserver.png",
      "#CC2927",
      "Database"
    ),
    buildHardSkill(
      10,
      "Clean Architecture",
      "/images/cleanarch.png",
      "#4D4D4D",
      "Architecture"
    ),
    buildHardSkill(5, "Typescript", "/images/ts.png", "#3178C6", "Fullstack"),
    buildHardSkill(1, "NodeJS", "/images/nodejs.png", "#68A063", "Backend"),
    buildHardSkill(2, "NestJS", "/images/nestjs.png", "#E0234E", "Backend"),
    buildHardSkill(3, "Go", "/images/golang.png", "#00ADD8", "Backend"),
    buildHardSkill(4, "React", "/images/react.png", "#61DAFB", "Frontend"),
  ];

  const { miniArticles, fullArticles } = spreadArticles();

  const grouped2By2MiniArticles = miniArticles.reduce((acc, article, index) => {
    if (index % 2 === 0) {
      acc.push([article]);
    } else {
      acc[acc.length - 1].push(article);
    }
    return acc;
  }, [] as Array<{ title: string; description: string; imageUrl: string; labels: string[]; articleUrl: string }[]>);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header />

      <main className="flex-grow">
        <HeroSection />

        <SkillsCarousel skills={hardSkills} />

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
