import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SkillsCarousel from "../components/SkillsCarousel";
import ArticleCard from "../components/ArticleCard";
import MiniArticleCard from "../components/MiniArticleCard";
import ProfessionalSummary from "../components/ProfessionalSummary";
import PersonalSummary from "../components/PersonalSummary";
import FooterSection from "../components/FooterSection";

function buildHardSkill(
  id: number,
  title: string,
  imageUrl: string,
  themeAccentColor: string,
  label: string
) {
  return { id, title, imageUrl, themeAccentColor, label };
}

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const hardSkills = [
    buildHardSkill(1, "NodeJS", "/images/nodejs.png", "#68A063", "Backend"),
    buildHardSkill(2, "NestJS", "/images/nestjs.png", "#E0234E", "Backend"),
    buildHardSkill(3, "Go", "/images/golang.png", "#00ADD8", "Backend"),
    buildHardSkill(4, "React", "/images/react.png", "#61DAFB", "Frontend"),
    buildHardSkill(5, "Typescript", "/images/ts.png", "#3178C6", "Fullstack"),
    buildHardSkill(6, "PostgreSQL", "/images/pg.png", "#336791", "Database"),
    buildHardSkill(7, "MongoDB", "/images/mongodb.png", "#47A248", "Database"),
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
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <Header />

      <main className="flex-grow">
        <HeroSection />

        <SkillsCarousel skills={hardSkills} />

        {/* Articles Section */}
        <section id="articles" className="w-full py-16 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Artigos Recentes
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArticleCard
              title="Design Partners: Strategy"
              description="O padrão Strategy permite definir uma família de algoritmos, encapsulá-los em classes separadas e torná-los intercambiáveis em tempo de execução."
              imageUrl="/images/strategy.webp"
              labels={["Algoritmos", "Complexidade"]}
              articleUrl="/artigos/design-partners-strategy"
              variant="dark"
            />

            <ArticleCard
              title="Como evitar code smells"
              description="Code smells são indicadores de problemas no código que, embora não quebrem sua funcionalidade, sugerem fragilidade, complexidade ou má estrutura que pode levar a dificuldades futuras..."
              imageUrl="/images/code-smells.webp"
              labels={["Algoritmos", "Complexidade"]}
              articleUrl="/artigos/como-evitar-code-smells"
              variant="light"
            />

            <ArticleCard
              title="Clean Architecture"
              description="O objetivo é garantir que as regras de negócios estejam no centro do sistema, protegidos de mudanças nas camadas externas ..."
              imageUrl="/images/Cleanarch.webp"
              labels={["Algoritmos", "Complexidade"]}
              articleUrl="/artigos/clean-architecture"
              variant="dark"
            />
          </div>

          {/* Additional Articles Row */}
          <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-6">
              <MiniArticleCard
                title="Notação BIG O - O que é isso?"
                description="A notação Big O é uma forma de medir a complexidade de algoritmos, permitindo comparar a eficiência de diferentes soluções."
                imageUrl="/images/BigONotation.webp"
                labels={["Algoritmos", "Complexidade"]}
                articleUrl="/artigos/notacao-big-o"
                variant="light"
              />

              <MiniArticleCard
                title="O que são os principios SOLID"
                description="SOLID é um acrônimo para cinco princípios de design de software que tornam o código mais compreensível, flexível e sustentável."
                imageUrl="/images/SOLID.webp"
                labels={["Algoritmos", "Complexidade"]}
                articleUrl="/artigos/principios-solid"
                variant="light"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <MiniArticleCard
                title="Design Partners: Adapter"
                description="O padrão Adapter conecta interfaces incompatíveis, permitindo que classes com diferentes formatos trabalhem juntas..."
                imageUrl="/images/adapter.webp"
                labels={["Algoritmos", "Complexidade"]}
                articleUrl="/artigos/design-partners-adapter"
                variant="light"
              />

              <MiniArticleCard
                title="Dicas de logica de programação"
                description="A gente sabe: programar não é brincadeira, mas não é um bicho-papão, não. Se tu esta entrando na area agora, você dev..."
                imageUrl="/images/logica-de-programacao.webp"
                labels={["Algoritmos", "Complexidade"]}
                articleUrl="/artigos/dicas-logica-programacao"
                variant="dark"
              />
            </div>
          </div>
        </section>

        <ProfessionalSummary />

        <PersonalSummary />
      </main>

      <FooterSection />
    </div>
  );
}
