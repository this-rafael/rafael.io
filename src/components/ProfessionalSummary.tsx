"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useMemo, useState, useEffect, useCallback } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal, { type ExperienceData } from "./ExperienceModal";

/* ──────────────────────────── DATA ──────────────────────────── */

const experiences: ExperienceData[] = [
  {
    company: "EDS - Polícia Civil do RJ",
    role: "Backend Engineer (Freelance)",
    type: "Freelance · Setor Público",
    summary:
      "Sistema integrado de gestão de saúde para o corpo policial, centralizando históricos médicos e emergências.",
    context:
      "A EDS desenvolve soluções tecnológicas para a Polícia Civil do RJ. Fui chamado para construir um sistema que centralizasse dados médicos e melhorasse a resposta a emergências do corpo policial, num cenário onde a agilidade salva vidas.",
    techStack: ["NestJS", "SQL Server", "Node.js", "REST API"],
    highlights: [
      {
        text: "Desenvolvi sistema integrado de gestão de saúde centralizando históricos médicos e otimizando a gestão de emergências para o corpo policial.",
      },
      {
        metric: "+5%",
        text: "aceleração no tempo de resposta das requisições através de refatoração e patches de segurança em APIs legadas.",
      },
    ],
    softSkills: ["Autonomia", "Análise de requisitos", "Segurança"],
  },
  {
    company: "Infosistemas",
    role: "Arquiteto de Software / Senior Engineer",
    type: "CLT · Remoto",
    summary:
      "Líder em software para locadoras automotivas: Localiza, Unidas, LM (Volkswagen). Time de arquitetura de microsserviços.",
    context:
      "Empresa internacional que atende Localiza, Unidas, LM (Grupo Volkswagen) e mais 10 marcas em gestão de frotas. Atuo no time de arquitetura do produto para a LM, definindo a evolução e escala de um sistema de grande volume de dados com equipes multidisciplinares de DevOps, SRE e DBAs.",
    techStack: [
      "NestJS",
      "RabbitMQ",
      "MongoDB",
      "SQL Server",
      "Azure DevOps",
      "Docker",
    ],
    highlights: [
      {
        metric: "-98%",
        text: "falhas intermitentes: reestruturei a arquitetura de mensageria com RabbitMQ (DLQ, retry com backoff, idempotência e publisher confirms).",
      },
      {
        text: "Desenvolvi sistema de audit log com NestJS + MongoDB para rastreamento de falhas críticas no ecossistema de microsserviços.",
      },
      {
        metric: "-15% SLA",
        text: "desmobilização de veículos: liderei integração com a Ticketlog para gestão de frotas de alto volume.",
      },
      {
        text: "Colaborei na definição de estratégias de escalabilidade de banco de dados e sharding com times de SRE e DevOps.",
      },
    ],
    softSkills: [
      "Liderança técnica",
      "Colaboração multi-time",
      "Visão de produto",
    ],
  },
  {
    company: "Wisiex Azimut",
    role: "Senior Backend Engineer (Freelancer)",
    type: "Freelance · Fintech / Cripto",
    summary:
      "Motor de liquidação de criptoativos e plataforma Bank as a Service multi-tenant com segurança OAuth2/JWT.",
    context:
      "Fintech especializada em liquidação de criptoativos e Banking as a Service. O desafio era construir um motor de liquidação de alto desempenho que integrasse múltiplas exchanges e blockchains, conectando finanças tradicionais ao mundo cripto com baixa latência e segurança de nível bancário.",
    techStack: ["NestJS", "Redis", "SQL", "OAuth2", "JWT", "Blockchain APIs"],
    highlights: [
      {
        metric: "+30%",
        text: "melhoria no tempo de resposta de APIs críticas através de análise de query plans e otimização de consultas SQL complexas.",
      },
      {
        text: "Projetei e implementei motor de liquidação de criptoativos com NestJS e Redis, garantindo baixa latência para transações de alto volume.",
      },
      {
        text: "Integrações com múltiplas exchanges e blockchains, assegurando interoperabilidade entre finanças tradicionais e criptoativos.",
      },
      {
        text: "Implementei segurança OAuth2/JWT e criptografia na plataforma BaaS multi-tenant para mitigar riscos de fraude financeira.",
      },
    ],
    softSkills: ["Segurança financeira", "Design multi-tenant", "Autonomia"],
  },
  {
    company: "Atomos (VBet · Playpix)",
    role: "Senior Backend Engineer",
    type: "CLT · iGaming",
    summary:
      "Migração de monólito para microsserviços (+500% perf). Reescrita de motor em Golang: 7 min para menos de 1s.",
    context:
      "Empresa nacional de iGaming responsável pelas casas de apostas Playpix, Dupoc e VBet Brasil. Entrei com 6 meses de empresa, time de 5 devs, num projeto de geração de insights financeiros para afiliados. O sistema original levava mais de 7 minutos para carregar e usava queries cruas com risco de SQL Injection.",
    techStack: [
      "Golang",
      "NestJS",
      "Kubernetes",
      "SQL Server",
      "MongoDB",
      "Redis",
      "ETL",
    ],
    highlights: [
      {
        metric: "+500%",
        text: "performance: reestruturei monolito para microsserviços em Kubernetes, atingindo latência < 60ms.",
      },
      {
        metric: "7min para <1s",
        text: "dashboard de comissões: Golang com goroutines, réplicas de leitura, ETL assíncrono e cache MongoDB.",
      },
      {
        metric: "-45%",
        text: "latência no cálculo de comissões: reescrevi o motor de processamento de Node.js para Golang.",
      },
      {
        text: "Desenvolvi sistema de Analytics do zero para métricas financeiras (GGA) processando milhões de registros diários.",
      },
      {
        text: "Conduzi workshops sobre TDD e Clean Architecture, elevando a maturidade técnica do time.",
      },
    ],
    story:
      "O sistema original usava queries cruas diretamente no banco de dados, e para alguns afiliados a tela podia demorar mais de sete minutos para carregar. A solução envolveu remover SQL bruto, aplicar Clean Architecture, dividir o processamento em microsserviços, construir um ETL que pré-calculava os dados de forma incremental, e por fim reescrever o motor crítico em Golang. Do começo ao fim, passamos de +7 minutos para menos de 1 segundo com cache. Foi a experiência mais intensa de engenharia de performance que já tive.",
    softSkills: [
      "Liderança técnica",
      "Mentoria",
      "Programação defensiva",
      "Engenharia de performance",
    ],
  },
  {
    company: "MaxMilhas",
    role: "Full Stack Engineer",
    type: "CLT · Viagens",
    summary:
      "Automação de cancelamentos e remarcações que eliminou 34% dos chamados de suporte.",
    context:
      "Plataforma brasileira de venda de passagens aéreas com alto volume de transações e um sistema legado em PHP com mais de 10 anos. Atuei no núcleo da empresa, fornecendo suporte integral aos clientes em todas as etapas de sua jornada até o embarque.",
    techStack: [
      "Node.js",
      "NestJS",
      "Elixir",
      "PHP",
      "MySQL",
      "MongoDB",
      "TypeScript",
    ],
    highlights: [
      {
        metric: "-34%",
        text: "chamados de suporte N1/N2: automatizei cancelamentos e remarcações com microsserviços NestJS e Elixir.",
      },
      {
        text: "Implementei sistema de monitoramento de voos com push notifications proativas até o embarque.",
      },
      {
        text: "Integrei sistema legado PHP (10+ anos) com CRM de vendas, centralizando dados e melhorando produtividade comercial.",
      },
      {
        text: "Atuei na evolução da plataforma no-code, otimizando fluxos e diminuindo a complexidade cognitiva de manutenção.",
      },
    ],
    recommendation: {
      author: "Luiz Gustavo Farias",
      role: "Tech Manager na MaxMilhas",
      text: "Rafael é um dos profissionais mais competentes com quem já colaborei. Sua habilidade técnica em Node é excepcional, e ele rapidamente se familiarizou com as regras de negócio complexas da nossa empresa. Destaca-se por sua disposição em ajudar colegas e por seu notável senso pedagógico.",
    },
    softSkills: [
      "Senso pedagógico",
      "Colaboração",
      "Resolução de problemas legados",
    ],
  },
  {
    company: "South System → QUIQ → Itaú",
    role: "Backend Engineer",
    type: "CLT · Consultoria · Food Tech",
    summary:
      "Marketplace white-label multi-tenant (estilo iFood) incorporado no super app do Itaú, com ~95% de cobertura de testes.",
    context:
      "A South System me quaternizou para a QUIQ, que desenvolvia um marketplace de alimentação incorporado ao super app do Itaú, com plano de ser white-label para vender ao Safra, Inter e outros. Fui chamado para atuar na arquitetura, design de banco e refino de regra de negócio com stakeholders, produto e time de front-end.",
    techStack: ["Node.js", "NestJS", "Golang", "AWS", "MySQL", "Sonar"],
    highlights: [
      {
        text: "Arquitetei SaaS white-label multi-tenant (estilo iFood) com Arquitetura Hexagonal, permitindo personalização mínima por cliente bancário.",
      },
      {
        metric: "~95%",
        text: "cobertura de testes em fluxos críticos com implementação rigorosa e verificação estática via Sonar.",
      },
      {
        text: "Implementei microsserviços assíncronos em Golang para integrações externas, com camada de retry e DLQ para tolerância a falhas.",
      },
      {
        text: "Trabalhei próximo ao Product Owner e stakeholders no refinamento de regras de negócio, simplificando implementações.",
      },
    ],
    story:
      "Essa experiência foi marcante para meu lado de soft skills. Eu era 'o cara do capuz na sala' e essa fase me destravou para lidar com stakeholders, produto, múltiplas equipes. Acabei quaternizado: era da South System, quaternizado para a QUIQ, que fazia produto pro Itaú. Uma sopa de letrinhas, mas enriquecedora.",
    softSkills: [
      "Comunicação com stakeholders",
      "Refinamento de produto",
      "Trabalho multi-time",
    ],
  },
  {
    company: "Flapper",
    role: "Engenheiro Fullstack / Liderança Técnica",
    type: "CLT · Aviação Executiva",
    summary:
      "Migração de monólito PHP (7+ anos) para microsserviços com Kafka, gRPC e database-per-service.",
    context:
      "Primeira empresa de táxi aéreo executivo da América Latina (tipo Uber, mas para jatos particulares). Quando entrei, havia um monólito PHP Laravel antigo sem documentação, sem a equipe original, e qualquer alteração gerava efeitos colaterais em múltiplas áreas. Fui contratado para planejar a refatoração: trocar o motor com o avião voando.",
    techStack: [
      "NestJS",
      "Golang",
      "Apache Kafka",
      "gRPC",
      "PostgreSQL",
      "Flutter",
      "AWS",
      "GraphQL",
    ],
    highlights: [
      {
        metric: "-25%",
        text: "tabelas do legado: reestruturei banco de dados criando 7 bancos separados por domínio (database-per-service).",
      },
      {
        text: "Projetei migração com Strangler Pattern usando clusterização de banco para mapear domínios, sem downtime.",
      },
      {
        text: "Implementei mensageria com Apache Kafka para consistência de dados entre réplicas de entidades em microsserviços.",
      },
      {
        text: "Estabeleci comunicação gRPC bidirecional e em tempo real para serviços críticos em ambiente AWS.",
      },
      {
        text: "Reestruturei app Flutter com Atomic Design e conduzi workshops de Clean Architecture, TDD, NestJS, Kafka e gRPC para o time.",
      },
    ],
    story:
      "Esse projeto marcou minha transição para pleno, com decisões de arquitetura de alto impacto. A sacada foi usar réplicas mínimas de entidades por domínio. Por exemplo, no domínio de 'compras' manter apenas ID e nome do usuário, e garantir consistência via eventos Kafka. Desenvolvi a documentação, capacitei o time e entreguei os microsserviços de autenticação e usuários.",
    softSkills: [
      "Liderança técnica",
      "Capacitação de time",
      "Documentação",
      "Tomada de decisão arquitetural",
    ],
  },
  {
    company: "Sustentec",
    role: "Desenvolvedor Fullstack",
    type: "CLT · P&D",
    summary:
      "Sistema integrado de gestão de laboratórios de Pesquisa e Desenvolvimento com Java Spring Boot.",
    context:
      "Empresa de tecnologia focada em gestão de laboratórios de PDI. Atuei como desenvolvedor fullstack com ênfase em Java Spring, integrando o squad no avanço de funcionalidades de um Sistema Integrado de Gestão.",
    techStack: [
      "Java Spring Boot",
      "PostgreSQL",
      "JPA",
      "Hibernate",
      "Dart/Shelf",
      "Angular",
    ],
    highlights: [
      {
        text: "Desenvolvi soluções end-to-end para gestão de laboratórios de PDI com Java Spring Boot e PostgreSQL.",
      },
      {
        text: "Implementei testes de integração previamente inexistentes, elevando a segurança e qualidade do software.",
      },
      {
        text: "Desenvolvi API em Dart/Shelf para integração com base de dados de instituições de pesquisa.",
      },
      {
        text: "Atuei na coleta e análise de requisitos com cliente, auxiliando o PO na estruturação de sprints.",
      },
    ],
    softSkills: [
      "Desenvolvimento end-to-end",
      "Análise de requisitos",
      "Trabalho com PO",
    ],
  },
  {
    company: "Mobby & Airgo Tech",
    role: "Desenvolvedor Fullstack",
    type: "CLT · Freelance · Startup · Mobilidade Urbana",
    summary:
      "Sistemas de mobilidade urbana, gestão de pessoas e contratos de criptoativos; além de projetos autônomos em mobile, mensageria e ensino de programação funcional.",
    context:
      "Startup focada em mobilidade urbana e gestão de pessoas  onde iniciei minha carreira formalizada com Node.js, NestJS e Flutter, liderando o sistema principal e treinando a equipe júnior. Em paralelo, atuei de forma autônoma em projetos variados: manutenção de apps mobile em Flutter, sistemas de mensageria com Rust e Golang, QA em squads multidisciplinares e ensino de programação funcional.",
    techStack: [
      "Node.js",
      "NestJS",
      "Flutter",
      "Blockchain",
      "Binance API",
      "Clean Architecture",
      "Rust",
      "Golang",
      "Haskell",
    ],
    highlights: [
      {
        text: "Liderei a implementação e estruturação do sistema principal da empresa usando NestJS.",
      },
      {
        text: "Desenvolvi apps mobile em Flutter para mobilidade urbana e gestão interna com Clean Architecture.",
      },
      {
        text: "Construí sistema de contratos de criptoativos com integração à API da Binance.",
      },
      {
        text: "Treinei equipe júnior em Node.js e NestJS, promovendo boas práticas desde o início.",
      },
      {
        text: "Manutenção de aplicativos mobile em Flutter e atuação como QA em squads multidisciplinares.",
      },
      {
        text: "Desenvolvimento de aplicações de mensageria com Rust, Golang e Node.js.",
      },
      {
        text: "Professor de programação funcional (Haskell).",
      },
    ],
    softSkills: [
      "Mentoria de júniors",
      "Proatividade",
      "Visão de produto",
      "Versatilidade",
      "Ensino",
      "Autodidatismo",
    ],
  },
];

/* ──────────────────────── SHUFFLE UTIL ──────────────────────── */

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ──────────────────────── COMPONENT ──────────────────────── */

export default function ProfessionalSummary() {
  const shuffled = useMemo(() => shuffle(experiences), []);
  const [selected, setSelected] = useState<ExperienceData | null>(null);
  const [highlightedIdx, setHighlightedIdx] = useState(0);

  // Rotate the "click me" highlight across cards one at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIdx((prev) => (prev + 1) % shuffled.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shuffled.length]);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div id="experience" className="w-full py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Experiência Profissional
        </h2>

        {/* Profile + CV */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 card p-6">
          <div className="relative w-28 h-28 shrink-0 rounded-full overflow-hidden border-2 border-portfolio-accent/40">
            <Image
              fill
              src="/images/profile.png"
              alt="Rafael Pereira"
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-xl font-semibold">Rafael S. Pereira</h3>
            <p className="text-portfolio-light/70 text-sm">
              Senior Software Engineer · Solutions Architect · 7+ anos em
              sistemas críticos de alta escala
            </p>
            <a
              href={`https://wa.me/5583981188111?text=${encodeURIComponent("Oi Rafael! Vi seu portfólio e fiquei impressionado. Poderia me enviar o acesso? Gostaria de conversar sobre oportunidades.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary inline-flex items-center gap-2 text-sm mt-2"
            >
              <MessageCircle size={14} />
              Ver portfólio completo
            </a>
          </div>
        </div>

        {/* Cards grid — random order, no dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shuffled.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              experience={exp}
              index={i}
              isHighlighted={highlightedIdx === i}
              onClick={() => setSelected(exp)}
            />
          ))}
        </div>
      </div>

      {/* Modal popup */}
      <ExperienceModal experience={selected} onClose={handleClose} />
    </div>
  );
}
