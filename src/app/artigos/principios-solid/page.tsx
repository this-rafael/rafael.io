import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import CodeBlock from "@/components/posts/CodeBlock";

const meta: StaticPostMeta = {
  id: 5,
  title: "Os princípios SOLID explicados com código",
  slug: "principios-solid",
  description:
    "SRP, OCP, LSP, ISP e DIP — cinco princípios que todo dev conhece de nome, mas poucos aplicam de verdade. Neste artigo apresento violações reais de cada princípio e as refatorações correspondentes em TypeScript, mostrando como eles tornam sistemas extensíveis sem quebrar o que já funciona.",
  labels: ["Boas Práticas", "Arquitetura"],
  image: "/images/SOLID.webp",
  url: "https://www.linkedin.com/posts/activity-6933898254942134272-eFRm?utm_source=share&utm_medium=member_desktop",
  readingTime: 12,
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

export default function PrincipiosSOLIDPage() {
  return (
    <StaticPostLayout meta={meta}>
      {/* ─── Intro ─── */}
      <p>
        Já ouviu falar em SOLID? São cinco princípios da programação orientada a
        objetos que facilitam o desenvolvimento de software, tornando-o fácil de
        manter e estender. Mas conhecer a sigla é diferente de <em>aplicar de
        verdade</em> — então vamos ao código.
      </p>

      {/* ─── SRP ─── */}
      <h2>S — Single Responsibility Principle (SRP)</h2>
      <blockquote>
        <p>
          &quot;Uma classe deve ter um, e somente um, motivo para mudar.&quot;
          — Robert C. Martin
        </p>
      </blockquote>
      <p>
        O SRP diz que cada classe deve ser responsável por apenas <strong>uma
        coisa</strong>. Quando uma classe acumula responsabilidades, qualquer
        mudança em uma delas pode quebrar as outras.
      </p>

      <h3>Violação</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ❌ Faz demais: persiste, envia e-mail E valida
class UserService {
  async save(user: User): Promise<void> {
    await db.query('INSERT INTO users VALUES (?)', [user]);
  }

  sendWelcomeEmail(user: User): void {
    mailer.send({ to: user.email, subject: 'Bem-vindo!' });
  }

  validate(user: User): boolean {
    return user.age >= 18 && user.email.includes('@');
  }
}`}
        </code>
      </CodeBlock>

      <h3>Refatorado</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ✅ Cada classe faz uma coisa
class UserRepository {
  async save(user: User): Promise<void> {
    await db.query('INSERT INTO users VALUES (?)', [user]);
  }
}

class UserMailer {
  sendWelcomeEmail(user: User): void {
    mailer.send({ to: user.email, subject: 'Bem-vindo!' });
  }
}

class UserValidator {
  validate(user: User): boolean {
    return user.age >= 18 && user.email.includes('@');
  }
}`}
        </code>
      </CodeBlock>

      {/* ─── OCP ─── */}
      <h2>O — Open/Closed Principle (OCP)</h2>
      <blockquote>
        <p>
          &quot;Entidades de software devem estar abertas para extensão, mas
          fechadas para modificação.&quot;
        </p>
      </blockquote>
      <p>
        Sempre que você adicionar um novo tipo ou variação de comportamento e
        precisar editar uma classe existente, está violando o OCP. A solução é
        criar abstrações que permitem <em>estender</em> o comportamento sem
        tocar no código original.
      </p>

      <h3>Violação</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ❌ Cada novo tipo de desconto exige editar esta classe
class DiscountCalculator {
  calculate(type: string, amount: number): number {
    if (type === 'vip') return amount * 0.8;
    if (type === 'student') return amount * 0.9;
    if (type === 'employee') return amount * 0.7; // nova linha adicionada
    return amount;
  }
}`}
        </code>
      </CodeBlock>

      <h3>Refatorado</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ✅ Aberto para extensão (novas classes), fechado para modificação
interface DiscountStrategy {
  apply(amount: number): number;
}

class VipDiscount implements DiscountStrategy {
  apply(amount: number): number { return amount * 0.8; }
}

class StudentDiscount implements DiscountStrategy {
  apply(amount: number): number { return amount * 0.9; }
}

// Adicionar um novo desconto = criar nova classe, sem tocar nas existentes
class EmployeeDiscount implements DiscountStrategy {
  apply(amount: number): number { return amount * 0.7; }
}

class DiscountCalculator {
  calculate(strategy: DiscountStrategy, amount: number): number {
    return strategy.apply(amount);
  }
}`}
        </code>
      </CodeBlock>

      <p>
        Note que esse padrão é exatamente o{" "}
        <strong>Strategy</strong> aplicado com OCP.{" "}
        <a href="/artigos/design-patterns-strategy">
          Leia o artigo completo sobre o Strategy →
        </a>
      </p>

      {/* ─── LSP ─── */}
      <h2>L — Liskov Substitution Principle (LSP)</h2>
      <blockquote>
        <p>
          &quot;Objetos de uma subclasse devem poder substituir objetos da
          superclasse sem alterar a corretude do programa.&quot;
        </p>
      </blockquote>
      <p>
        Se uma subclasse lança exceções ou se comporta de forma diferente do
        contrato da classe base, o LSP está sendo quebrado — e qualquer código
        que depende da abstração pode falhar de forma inesperada.
      </p>

      <h3>Violação</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`class Bird {
  fly(): void {
    console.log('voando...');
  }
}

// ❌ Pinguins não voam — mas herdar de Bird os força a implementar fly()
class Penguin extends Bird {
  fly(): void {
    throw new Error('Pinguins não voam!'); // quebra o contrato
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly(); // explode com Penguin
}`}
        </code>
      </CodeBlock>

      <h3>Refatorado</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ✅ Hierarquia que respeita os contratos
interface FlyingBird {
  fly(): void;
}

interface SwimmingBird {
  swim(): void;
}

class Eagle implements FlyingBird {
  fly(): void { console.log('voando...'); }
}

class Penguin implements SwimmingBird {
  swim(): void { console.log('nadando...'); }
}

function makeBirdFly(bird: FlyingBird) {
  bird.fly(); // seguro — só aceita aves que voam
}`}
        </code>
      </CodeBlock>

      {/* ─── ISP ─── */}
      <h2>I — Interface Segregation Principle (ISP)</h2>
      <blockquote>
        <p>
          &quot;Nenhuma classe deve ser forçada a implementar métodos que não
          utiliza.&quot;
        </p>
      </blockquote>
      <p>
        Interfaces grandes demais (chamadas de <em>fat interfaces</em>) obrigam
        quem as implementa a fornecer métodos que não fazem sentido para aquela
        classe. O ISP pede que as interfaces sejam <strong>específicas e
        coesas</strong>.
      </p>

      <h3>Violação</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ❌ Interface "gorda" — força Robot a implementar eat() e sleep()
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work(): void { console.log('trabalhando...'); }
  eat(): void { throw new Error('robôs não comem'); }   // sem sentido
  sleep(): void { throw new Error('robôs não dormem'); } // sem sentido
}`}
        </code>
      </CodeBlock>

      <h3>Refatorado</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ✅ Interfaces pequenas e específicas
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work(): void { console.log('trabalhando...'); }
  eat(): void { console.log('comendo...'); }
  sleep(): void { console.log('dormindo...'); }
}

class Robot implements Workable {
  work(): void { console.log('processando...'); }
}`}
        </code>
      </CodeBlock>

      {/* ─── DIP ─── */}
      <h2>D — Dependency Inversion Principle (DIP)</h2>
      <blockquote>
        <p>
          &quot;Módulos de alto nível não devem depender de módulos de baixo
          nível. Ambos devem depender de abstrações.&quot;
        </p>
      </blockquote>
      <p>
        Quando o código de negócio cria diretamente instâncias de
        implementações concretas (banco de dados, serviços externos), ele se
        torna <strong>rígido e difícil de testar</strong>. O DIP inverte essa
        relação: o módulo de alto nível define o contrato (interface), e a
        implementação concreta é injetada de fora.
      </p>

      <h3>Violação</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ❌ OrderService está acoplado diretamente ao MySQL
class MySqlDatabase {
  insert(data: unknown): void { /* sql INSERT ... */ }
}

class OrderService {
  // depende de uma implementação concreta — impossível trocar ou testar
  private db = new MySqlDatabase();

  save(order: Order): void {
    this.db.insert(order);
  }
}`}
        </code>
      </CodeBlock>

      <h3>Refatorado</h3>
      <CodeBlock>
        <code className="language-typescript">
          {`// ✅ OrderService depende da abstração, não da implementação
interface Database {
  insert(data: unknown): void;
}

class MySqlDatabase implements Database {
  insert(data: unknown): void { /* sql INSERT ... */ }
}

class InMemoryDatabase implements Database {
  private store: unknown[] = [];
  insert(data: unknown): void { this.store.push(data); }
}

class OrderService {
  constructor(private readonly db: Database) {}

  save(order: Order): void {
    this.db.insert(order); // não sabe qual banco está por baixo
  }
}

// Injeção de dependência — fácil de trocar para testes
const service = new OrderService(new MySqlDatabase());
const testService = new OrderService(new InMemoryDatabase());`}
        </code>
      </CodeBlock>

      <p>
        Esse é exatamente o fundamento do padrão{" "}
        <strong>Adapter</strong>: criar um contrato entre o domínio e a
        dependência externa.{" "}
        <a href="/artigos/design-patterns-adapter">
          Leia o artigo completo sobre o Adapter →
        </a>
      </p>

      {/* ─── Resumo ─── */}
      <h2>Resumo rápido</h2>
      <p>
        Os cinco princípios se complementam e se reforçam mutuamente:
      </p>
      <ul>
        <li>
          <strong>SRP</strong> — cada classe tem uma razão de existir
        </li>
        <li>
          <strong>OCP</strong> — estender comportamento sem modificar código
          existente
        </li>
        <li>
          <strong>LSP</strong> — subclasses devem honrar o contrato da base
        </li>
        <li>
          <strong>ISP</strong> — interfaces pequenas e específicas, sem métodos
          inúteis
        </li>
        <li>
          <strong>DIP</strong> — depender de abstrações, não de implementações
          concretas
        </li>
      </ul>
      <p>
        Aplicar SOLID não é sobre seguir regras cegamente — é sobre{" "}
        <strong>reduzir o custo de mudança</strong>. Código que segue esses
        princípios é mais fácil de testar, mais fácil de entender e mais fácil
        de evoluir sem quebrar o que já funciona.
      </p>
    </StaticPostLayout>
  );
}
