import { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";

import projects from "../../data/projects.json";

const Projects: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-portfolio-dark text-portfolio-light">
      <Head>
        <title>Projetos | Rafael Pereira</title>
        <meta
          name="description"
          content="Conheça os projetos desenvolvidos por Rafael Pereira"
        />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Meus Projetos Favoritos
            </h1>

            <div className="card p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 relative h-60 w-full">
                <Image
                  src="https://octodex.github.com/images/NUX_Octodex.gif"
                  alt="GitHub Octodex"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="md:w-2/3 space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-portfolio-accent">
                  Explorando Código e Inovação
                </h2>
                <p className="text-portfolio-light/80">
                  Bem-vindo à minha coleção de projetos! Aqui você encontrará
                  uma seleção de trabalhos que demonstram minha jornada como
                  desenvolvedor. Cada projeto representa um desafio único que me
                  permitiu explorar diferentes tecnologias e soluções criativas.
                  De sistemas complexos a ferramentas práticas, cada um traz uma
                  história de aprendizado e crescimento profissional.
                </p>
                <p className="text-portfolio-light/80">
                  Sinta-se à vontade para explorar os códigos e conceitos por
                  trás de cada um desses projetos. Todos estão disponíveis no
                  GitHub e foram desenvolvidos com foco em boas práticas, clean
                  code e arquiteturas robustas.
                </p>
              </div>
            </div>

            {/* Grid de projetos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  name={project.name}
                  description={project.description}
                  link={project.link}
                  imageUrl={project.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Projects;
