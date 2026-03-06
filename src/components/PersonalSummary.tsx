import { Target, Wrench, Users, LayoutGrid } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Impacto Mensurável",
    description:
      "Toda decisão técnica tem que ter justificativa de negócio. Métricas primeiro; elegância, depois.",
  },
  {
    icon: Wrench,
    title: "Pragmatismo Técnico",
    description:
      "A solução correta é a mais simples que resolve o problema. Complexidade só quando inevitável.",
  },
  {
    icon: Users,
    title: "Elevar o Time",
    description:
      "Meu trabalho não termina no meu PR. Revisão de código, documentação e mentoria multiplicam resultado.",
  },
  {
    icon: LayoutGrid,
    title: "Qualidade Sustentável",
    description:
      "Código sem testes e sem docs é dívida técnica com juros compostos. Qualidade é hábito, não fase.",
  },
];

export default function PersonalSummary() {
  return (
    <section id="about" className="w-full py-16 px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center font-syne">
        Sobre mim
      </h2>
      <p className="text-portfolio-light/50 text-center text-sm mb-10">
        O que me move além do código
      </p>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main bio */}
        <div className="card p-6 md:p-8">
          <p className="text-portfolio-light/85 leading-relaxed text-base md:text-lg">
            Sou um engenheiro pragmático, guiado por métricas e por
            manutenibilidade. Mais do que entregar features, me importo em
            entender <span className="text-portfolio-accent">por que</span>{" "}
            aquele sistema existe e{" "}
            <span className="text-portfolio-accent">quem</span> ele impacta.
            Essa visão me ajuda a priorizar os problemas certos e a construir
            soluções que duram.
          </p>
          <p className="text-portfolio-light/70 leading-relaxed text-sm md:text-base mt-4">
            Trabalhei em times distribuídos, startups em escala e contratos com
            empresas internacionais. Cada contexto me ensinou que o maior
            desafio não é técnico — é de comunicação, alinhamento e confiança.
            Continuidade importa mais que brilhantismo pontual.
          </p>
        </div>

        {/* Value cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card p-5 flex gap-4 hover:border-portfolio-accent/30 transition-colors duration-300"
            >
              <span className="shrink-0 mt-0.5">
                <Icon size={20} className="text-portfolio-accent" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-portfolio-light mb-1">
                  {title}
                </h3>
                <p className="text-xs text-portfolio-light/60 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
