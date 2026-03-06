import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import PostImage from "@/components/posts/PostImage";

const meta: StaticPostMeta = {
  id: 2,
  title: "Como evitar Code Smells desde o início",
  slug: "como-evitar-code-smells",
  description:
    "Code smells não são problemas apenas visuais; eles atraem os reais bugs! Veja como evitá-los antes que aconteçam.",
  labels: ["Clean Code", "Boas Práticas", "Quality"],
  image: "/images/code-smells.webp",
  url: "https://www.linkedin.com/posts/activity-7283471397262163969-SrSN/?utm_source=share&utm_medium=member_desktop",
  readingTime: 6,
};

export const metadata: Metadata = {
  title: `${meta.title} — Rafael Pereira`,
  description: meta.description,
  openGraph: {
    title: `${meta.title} — Rafael Pereira`,
    description: meta.description,
    type: "article",
    url: `https://rafael.io/artigos/${meta.slug}`,
    images: [
      {
        url: `https://rafael.io${meta.image}`,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} — Rafael Pereira`,
    description: meta.description,
    images: [`https://rafael.io${meta.image}`],
  },
};

export default function ComoEvitarCodeSmellsPage() {
  return (
    <StaticPostLayout meta={meta}>
      <PostImage
        src="/posts/images/grafica/02-code-smells-slide-01.jpg"
        alt="Capa: Como evitar Code Smells desde o início"
        portrait
      />

      <h2>O que são Code Smells?</h2>
      <p>
        Imagina que você entra na sua cozinha e sente aquele cheiro estranho
        vindo de um canto. Você descobre que deixou uma comida esquecida lá há
        dias e, enquanto o cheiro não mata ninguém, ele grita:{" "}
        <em>"Ei, algo está errado aqui!"</em>
      </p>
      <p>
        Code smells são exatamente isso, mas no mundo da programação. Não são
        bugs propriamente ditos, mas sinais de que tem algo "esquisito" no
        código que pode virar problema no futuro. Eles são como um queijo
        vencido no seu código: está lá, não vai explodir agora, mas pode atrair
        problemas (ou insetos... no caso, bugs).
      </p>

      <h2>Otimizações Prematuras</h2>
      <p>
        Mantenha isso simples, estúpido! Princípios como KISS (Keep It Simple,
        Stupid), YAGNI (You Aren't Gonna Need It) são uma boa base para escrever
        um código que não federá (pelo menos em breve).
      </p>

      <h3>Otimização prematura: KISS</h3>
      <p>
        O princípio <strong>KISS</strong> (que mais parece um xingamento)
        simplesmente nos orienta a manter nossos sistemas tão simples quanto
        possível.
      </p>

      <h3>Otimização prematura: YAGNI</h3>
      <p>
        Neste princípio aprendemos que não devemos fazer mais código do que
        realmente precisamos. Por exemplo, é errado um desenvolvedor implementar
        uma feature super mega cabulosa com 30 design patterns, se a demanda é
        para algo super simples.
      </p>

      <h2>Faça Revisões Automáticas</h2>
      <p>
        Code reviews são apenas uma forma de revisar o código. De maneira
        automatizada, a gente pode melhorar muito a qualidade do código, sem
        matar a produtividade do time.
      </p>

      <h3>Revisões automatizadas: Linter</h3>
      <p>
        Praticamente toda linguagem tem seu próprio linter, e o linter nada mais
        é que o melhor amigo de quem preza por um padrão de código. Ele serve
        para RECLAMAR e avisar quando um código foge dos padrões definidos.{" "}
        <em>Exemplo: ESLint</em>.
      </p>

      <h3>Revisões automatizadas: Hooks</h3>
      <p>
        Antes mesmo de gastar os minutos de uma pipeline, você pode configurar{" "}
        <em>git hooks</em> no teu projeto. Nesses hooks facilmente é possível
        programar scripts para checar o lint, verificar cobertura de testes,
        entre outras verificações automáticas (exemplo: Husky).
      </p>

      <h3>Revisões automatizadas: Análise estática</h3>
      <p>
        A análise estática feita por robôs de ferramentas como o{" "}
        <strong>Sonar</strong> é uma das 7 maravilhas de todo revisador de
        código. Num só lugar conseguimos encontrar todas as burradas, todos os{" "}
        <em>go-horses</em>, todas as falhas de segurança... tudo ali, pronto com
        classe e linha para você corrigir.
      </p>

      <h2>Bônus: Princípios SOLID</h2>
      <PostImage
        src="/posts/images/grafica/02-code-smells-slide-10.jpg"
        alt="Dica bônus sobre os princípios do SOLID"
        portrait
      />
      <p>
        Os conceitos do SOLID refletem práticas essenciais para o
        desenvolvimento de software escalável. Por exemplo, só de aplicar (bem)
        o princípio <strong>S</strong> (SRP), ou seja, o "Princípio da
        responsabilidade única", você se livra de FEDORES como God Classes,
        Feature Envies e Divergent Change (3 dos maiores vilões de um código
        limpo).
      </p>

      <PostImage
        src="/posts/images/grafica/02-code-smells-slide-11.jpg"
        alt="Dicas finais e call to action"
        portrait
      />
    </StaticPostLayout>
  );
}
