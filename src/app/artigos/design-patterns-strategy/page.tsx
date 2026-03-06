import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import CodeBlock from "@/components/posts/CodeBlock";
import PostImage from "@/components/posts/PostImage";

const meta: StaticPostMeta = {
  id: 1,
  title: "Design Patterns: Strategy",
  slug: "design-patterns-strategy",
  description:
    "Cadeias de if/else crescem, ficam frágeis e viram pesadelo de manutenção. O padrão Strategy resolve isso encapsulando cada algoritmo em sua própria classe e tornando-os intercambiáveis em tempo de execução — sem tocar no código que os consome.",
  labels: ["Design Patterns", "Arquitetura"],
  image: "/images/strategy.webp",
  url: "https://www.linkedin.com/pulse/aumente-funcionalidade-do-seu-sistema-sem-se-com-padrão-s-pereira/",
  readingTime: 8,
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

export default function DesignPatternsStrategyPage() {
  return (
    <StaticPostLayout meta={meta}>
      {/* ─── Introdução ─── */}
      <h2>O problema: if/else infinito</h2>
      <p>
        Imagine uma calculadora que faz soma, subtração, multiplicação e
        divisão. Dentro do raciocínio orientado a objetos é muito comum
        desenvolvermos uma classe <code>DefaultCalculator</code> com métodos
        privados para cada operação e uma função pública que decide qual
        operação invocar com um
        <code>switch</code> ou cadeia de <code>if/else</code>.
      </p>

      <CodeBlock><code className="language-typescript">
        {`class DefaultCalculator {
  public calculate(parameters: BinaryOperationParameters): Result {
    const { operator, firstOperand, secondOperand } = parameters;
    
    switch (operator) {
      case '*':
        return firstOperand * secondOperand;
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case '**':
        return firstOperand ** secondOperand;
      case '%':
        return firstOperand % secondOperand;
      default:
        throw new Error('Operator not found!');
    }
  }
}`}
      </code></CodeBlock>

      <p>
        E até aí tudo bem… Mas e quando a calculadora precisar suportar
        <strong>todas as operações binárias entre inteiros</strong>? Percentual,
        exponenciação, módulo, shift de bits. A cada funcionalidade inserida
        teríamos de modificar a implementação original — o que na maioria dos
        casos significa <strong>aumentar o acoplamento</strong>, aumentar a
        complexidade e diminuir a manutenibilidade.
      </p>

      <PostImage
        src="/posts/images/grafica/01-strategy-cover.jpg"
        alt="Capa do artigo sobre o padrão Strategy"
        caption="O padrão Strategy — quando o contexto define a implementação"
      />

      {/* ─── O que é o Strategy ─── */}
      <h2>O que é o padrão Strategy?</h2>
      <p>
        O conceito é simples:{" "}
        <strong>
          nossa funcionalidade é descrita através de um contrato (interface)
        </strong>
        , e esse contrato é implementado de acordo com a melhor opção para o
        contexto atual. A interface define <em>&quot;O QUE&quot;</em> será
        feito; as implementações concretas definem <em>&quot;COMO&quot;</em>.
      </p>
      <p>As vantagens são diretas:</p>
      <ul>
        <li>
          <strong>Baixo acoplamento</strong> — o código consumidor depende
          apenas da abstração
        </li>
        <li>
          <strong>Fácil manutenção</strong> — cada estratégia é isolada em sua
          própria classe
        </li>
        <li>
          <strong>Rápida escalabilidade</strong> — adicionar comportamentos
          novos não exige alterar código existente (Open/Closed Principle)
        </li>
      </ul>

      {/* ─── O contrato ─── */}
      <h2>Definindo o contrato</h2>
      <p>
        O primeiro passo é criar uma interface que represente o contrato da
        estratégia. No contexto da calculadora, queremos algo que receba dois
        números e retorne o resultado:
      </p>

      <CodeBlock><code className="language-typescript">
        {`interface BinaryOperationParameters {
  firstOperand: number;
  secondOperand: number;
  operator: string;
}

type Result = number;

interface BinaryOperationStrategy {
  calculate(parameters: Pick<BinaryOperationParameters, 'firstOperand' | 'secondOperand'>): Result;
}`}
      </code></CodeBlock>

      <h2>Implementando estratégias concretas</h2>
      <p>
        Cada operação matemática vira uma classe que implementa{" "}
        <code>BinaryOperationStrategy</code>. Repare que cada implementação é{" "}
        <strong>especializada</strong> — ela sabe exatamente como realizar uma
        única operação. Veja como ficam as implementações da{" "}
        <strong>Soma</strong> e da <strong>Divisão</strong>:
      </p>

      <CodeBlock><code className="language-typescript">
        {`class Sum implements BinaryOperationStrategy {
  public calculate(parameters: Pick<BinaryOperationParameters, 'firstOperand' | 'secondOperand'>): Result {
    const { firstOperand, secondOperand } = parameters;
    return firstOperand + secondOperand;
  }
}

class Division implements BinaryOperationStrategy {
  public calculate(parameters: Pick<BinaryOperationParameters, 'firstOperand' | 'secondOperand'>): Result {
    const { firstOperand, secondOperand } = parameters;
    if (secondOperand === 0) {
      throw new Error('Division by zero is not allowed!');
    }
    return firstOperand / secondOperand;
  }
}`}
      </code></CodeBlock>

      {/* ─── O Context ─── */}
      <h2>O Context e a Factory</h2>
      <p>
        Para amarrar as estratégias de operação que criamos, precisamos de um{" "}
        <strong>Context e uma Factory (ou Analyzer)</strong>. Note que na classe{" "}
        <code>ContextAnalyzer</code> temos um método que avalia o operador
        (nosso contexto) e retorna uma instância da Strategy correta baseada no
        operador solicitado.
      </p>

      <CodeBlock><code className="language-typescript">
        {`class ContextAnalyzer {
  public getInstance(operator: string): BinaryOperationStrategy {
    switch (operator) {
      case '*':
        return new Multiplication();
      case '+':
        return new Sum();
      case '-':
        return new Subtraction();
      case '/':
        return new Division();
      case '%':
        return new Percent();
      case '**':
        return new Pow();
      default:
        throw new Error('Operator not found!');
    }
  }
}`}
      </code></CodeBlock>

      <p>
        O contexto é quem recebe a estratégia e a executa. Ele não precisa saber{" "}
        <em>qual</em> implementação concreta está usando — ele só conhece o
        contrato. A nossa antiga <code>DefaultCalculator</code>
        passa então a receber esse <code>ContextAnalyzer</code> por injeção e se
        torna muito mais enxuta!
      </p>

      <CodeBlock><code className="language-typescript">
        {`class Calculator {
  constructor(private readonly contextAnalyzer: ContextAnalyzer) {}

  /**
   * Note que a implementação do método calculate na classe Calculator não vai mudar,
   * tampouco as funcionalidades dentro de cada uma das operações.
   * A única coisa que realmente será mutável vai ser a classe ContextAnalyzer que
   * adicionará um novo case a cada operação adicionada :D
   */
  public calculate(parameters: BinaryOperationParameters): Result {
    const { operator, firstOperand, secondOperand } = parameters;
    return this.contextAnalyzer.getInstance(operator).calculate({ firstOperand, secondOperand });
  }
}`}
      </code></CodeBlock>

      {/* ─── Benefícios e próximos passos ─── */}
      <h2>Por que usar o Strategy?</h2>
      <p>
        O verdadeiro poder do Strategy aparece quando saímos do exemplo da
        calculadora e pensamos em cenários reais:{" "}
        <strong>aquele caso de uso legado</strong> com 4 ou 5 variações de
        regras de negócio, cada uma com um <code>if</code> diferente e uma regra
        gigante dentro.
      </p>
      <p>Imagine as vantagens de:</p>
      <ol>
        <li>
          Abstrair a parte genérica em um contrato — sua{" "}
          <strong>estratégia</strong>
        </li>
        <li>Isolar cada variação de regra de negócio em sua própria classe</li>
        <li>
          Criar um analisador de contexto (resolver/factory) que decide qual
          estratégia usar
        </li>
      </ol>

      <blockquote>
        <p>
          &quot;Basicamente, a cada requisição, nossa funcionalidade avalia o
          contexto da operação atual e, com isso, determina qual implementação é
          a mais apropriada para ser colocada no lugar do contrato.&quot;
        </p>
      </blockquote>

      <h2>Relação com outros padrões</h2>
      <p>O Strategy está intimamente relacionado com:</p>
      <ul>
        <li>
          <strong>Adapter</strong> — enquanto o Strategy define{" "}
          <em>variações de comportamento</em>, o Adapter isola{" "}
          <em>dependências externas</em> por trás de uma interface própria.{" "}
          <a href="/artigos/design-patterns-adapter">Leia sobre o Adapter →</a>
        </li>
        <li>
          <strong>SOLID (OCP)</strong> — o Strategy é uma das formas mais
          naturais de aplicar o Open/Closed Principle.{" "}
          <a href="/artigos/principios-solid">Leia sobre SOLID →</a>
        </li>
      </ul>
    </StaticPostLayout>
  );
}
