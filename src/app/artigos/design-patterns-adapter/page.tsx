import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import PostImage from "@/components/posts/PostImage";
import MermaidDiagram from "@/components/posts/MermaidDiagram";
import CodeBlock from "@/components/posts/CodeBlock";

const meta: StaticPostMeta = {
  id: 6,
  title: "Design Patterns: Adapter",
  slug: "design-patterns-adapter",
  description:
    "Depender diretamente de SDKs, libs de terceiros e APIs externas é uma armadilha: quando a dependência muda, seu código inteiro sofre. O padrão Adapter cria um contrato próprio entre sua aplicação e o mundo externo, tornando a troca de qualquer dependência uma operação cirúrgica e segura.",
  labels: ["Design Patterns", "Arquitetura"],
  image: "/images/adapter.webp",
  url: "https://www.linkedin.com/pulse/pare-de-ser-refém-das-dependências-diga-bem-vindo-ao-design-rafael/",
  readingTime: 10,
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

const adapterFlowBefore = `graph LR
  CTRL["Controller"] --> SVC["Service"]
  SVC --> DB["MySQL Driver"]

  style CTRL fill:#1a1a3e,stroke:#0a84ff,color:#e8e8f0
  style SVC fill:#1a1a3e,stroke:#0a84ff,color:#e8e8f0
  style DB fill:#0d0d1a,stroke:#ff453a,color:#ff453a`;

const adapterFlowAfter = `graph LR
  CTRL["Controller"] --> SVC["Service"]
  SVC --> PROTO["Protocol<br/>(Interface)"]
  PROTO --> MYSQL["MySQL Adapter"]
  PROTO --> PG["PostgreSQL Adapter"]
  PROTO --> MONGO["MongoDB Adapter"]
  PROTO --> MOCK["Mock Adapter"]

  style CTRL fill:#1a1a3e,stroke:#0a84ff,color:#e8e8f0
  style SVC fill:#1a1a3e,stroke:#0a84ff,color:#e8e8f0
  style PROTO fill:#0a84ff,stroke:#0a84ff,color:#fff
  style MYSQL fill:#12122a,stroke:#30d158,color:#30d158
  style PG fill:#12122a,stroke:#30d158,color:#30d158
  style MONGO fill:#12122a,stroke:#30d158,color:#30d158
  style MOCK fill:#12122a,stroke:#bf5af2,color:#bf5af2`;

export default function DesignPatternsAdapterPage() {
  return (
    <StaticPostLayout meta={meta}>
      {/* ─── Introdução ─── */}
      <h2>Pare de ser refém das dependências</h2>

      <PostImage
        src="/posts/images/grafica/06-adapter-cover.jpg"
        alt="Capa do artigo sobre o padrão Adapter"
        caption="Design Pattern Adapter — diga adeus ao acoplamento com dependências externas"
      />

      <p>
        O cenário é comum: temos um backend que executa operações CRUD de
        usuário — criar, editar, recuperar, deletar — via endpoints REST. Os
        dados são armazenados no MySQL e a estrutura segue o fluxo clássico:{" "}
        <strong>Controller → Service → Database</strong>.
      </p>
      <p>
        Todos os programadores estão felizes... até que a equipe decide:{" "}
        <em>
          &quot;A partir da semana que vem, vamos migrar de MySQL para
          PostgreSQL.&quot;
        </em>
      </p>
      <p>
        A partir daí a &quot;casa cai&quot;: além de reestruturar o banco, é
        preciso alterar
        <strong> todas as referências</strong> ao driver MySQL — conexão,
        queries, tipos de retorno. É nesse cenário que atrasamos entregas,
        entregamos qualidade abaixo do desejado, não implementamos testes e
        criamos bugs.
      </p>

      {/* ─── O problema visual ─── */}
      <h2>O problema: acoplamento direto</h2>

      <CodeBlock>
        <code className="language-typescript">
          {`class CustomerService {
  constructor(
    private readonly mysqlConnection: MySqlConnection
  ) {}

  getCustomerById(id: number): Customer {
    return this.mysqlConnection.findByPrimaryKey('customer', id);
  }

  getAllCustomers(): Customer[] {
    return this.mysqlConnection.getAll('customer');
  }

  insertCustomer(customer: { name: string, email: string, birthDate: Date }): Customer {
    const id = this.mysqlConnection.query(\`INSERT INTO customer (name, email, birth_date) VALUES ('\${customer.name}', '\${customer.email}', '\${customer.birthDate}')\`);
    return this.mysqlConnection.findByPrimaryKey('customer', id);
  }

  updateCustomerName(customer: { id: number, name: string }): Customer {
    const id = this.mysqlConnection.query(\`UPDATE customer SET name = '\${customer.name}' WHERE id = \${customer.id}\`);
    return this.mysqlConnection.findByPrimaryKey('customer', customer.id);
  }
}`}
        </code>
      </CodeBlock>

      <p>O fluxo acoplado pode ser representado assim:</p>

      <MermaidDiagram code={adapterFlowBefore} />

      <p>
        O <code>Service</code> depende diretamente do driver MySQL. Se mudarmos
        o banco, mudamos o service. Se mudarmos a versão do driver, mudamos o
        service. Qualquer alteração na dependência{" "}
        <strong>propaga para o código de negócio</strong>.
      </p>

      {/* ─── A solução ─── */}
      <h2>A solução: o padrão Adapter</h2>
      <p>
        O Adapter funciona assim: primeiro definimos uma{" "}
        <strong>interface (protocolo)</strong>
        que determina o contrato do que queremos fazer. Depois implementamos
        essa interface com classes que <strong>adaptam</strong> o código de
        terceiros para o formato que nosso domínio espera.
      </p>

      <MermaidDiagram code={adapterFlowAfter} />

      <p>
        Note a mudança: o Service não tem mais conhecimento de como as operações
        de CRUD chegam ao banco. Ele é composto por{" "}
        <strong>protocolos (interfaces)</strong>, e a implementação concreta é
        fornecida em tempo de execução via{" "}
        <strong>injeção de dependência</strong>.
      </p>

      {/* ─── Implementação ─── */}
      <h2>Implementação passo a passo</h2>

      <h3>1. Definir o Protocol (Interface)</h3>
      <p>
        Criamos uma interface que expõe apenas os métodos que fazem sentido para
        o contexto. Por sermos respeitadores do SOLID (ISP), a interface não
        deve expor operações que o consumidor não precisa:
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`interface CustomerInputEntity {
  name: string;
  email: string;
  birthDate: Date;
}

interface SuccessfulEntityCreation {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly birthDate: Date;
}

interface CreateDatabaseCustomerProtocol {
  create(customer: CustomerInputEntity): SuccessfulEntityCreation;
}`}
        </code>
      </CodeBlock>

      <h3>2. Implementar os Adapters</h3>
      <p>
        Cada adapter implementa o mesmo protocolo, mas traduz a chamada para a
        tecnologia específica. É aqui que o código de terceiros vive —{" "}
        <strong>isolado</strong>:
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`class PostgreSqlAdapter implements CreateDatabaseCustomerProtocol {
  create(customer: CustomerInputEntity): SuccessfulEntityCreation {
    // Implementação específica para PostgreSQL usando client nativo pg
    console.log("Inserindo no PostgreSQL...");
    return { id: 1, ...customer }; 
  }
}

class MySqlAdapter implements CreateDatabaseCustomerProtocol {
  create(customer: CustomerInputEntity): SuccessfulEntityCreation {
    // Implementação específica para MySQL usando driver mysql2
    console.log("Inserindo no MySQL...");
    return { id: 2, ...customer }; 
  }
}`}
        </code>
      </CodeBlock>

      <h3>3. Compor o Service via injeção</h3>
      <p>
        O service recebe o protocolo por injeção de dependência. Ele não sabe (e
        não precisa saber) se o adapter real é PostgreSQL, MySQL, MongoDB ou um
        mock:
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`class CustomerServiceWithAdapter {
  constructor(
    private readonly createCustomerProtocol: CreateDatabaseCustomerProtocol,
    private readonly updateCustomerProtocol: UpdateCustomerOnDatabaseProtocol,
    private readonly getCustomerByIdProtocol: GetCustomerByIdProtocol,
    private readonly getAllCustomersProtocol: GetAllCustomersProtocol
  ) {}

  getCustomerById(id: number): Customer {
    return this.getCustomerByIdProtocol.getCustomerById(id);
  }

  getAllCustomers(): Customer[] {
    return this.getAllCustomersProtocol.getAllCustomers();
  }

  insertCustomer(customer: { name: string, email: string, birthDate: Date }): Customer {
    return this.createCustomerProtocol.createCustomerOnDatabase(customer);
  }

  updateCustomerName(customer: { id: number, name: string, email: string, birthDate: Date }): Customer {
    return this.updateCustomerProtocol.updateCustomerOnDatabase(customer);
  }
}`}
        </code>
      </CodeBlock>

      {/* ─── Vantagens ─── */}
      <h2>As vantagens</h2>
      <ul>
        <li>
          <strong>Facilita a manutenção:</strong> qualquer plugin pode ser
          substituído sem alterar o código de negócio. MySQL → PostgreSQL? Troca
          o adapter.
        </li>
        <li>
          <strong>Simplifica testes:</strong> se precisamos testar a regra de
          negócio puramente, substituímos o adapter real por um{" "}
          <code>MockedAdapter</code> que implementa o mesmo protocolo. Sem
          banco, sem rede, sem I/O.
        </li>
        <li>
          <strong>Limpa o código:</strong> dividimos responsabilidades — a
          visualização da regra de negócio não é poluída com código específico
          de um plugin.
        </li>
        <li>
          <strong>Formato de dados:</strong> tanto faz se o banco retorna JSON,
          XML, HTML, texto puro ou Protocol Buffer — o adapter{" "}
          <strong>faz a tradução</strong> para o formato que o domínio espera.
        </li>
      </ul>

      {/* ─── Próximos passos ─── */}
      <h2>Próximos passos</h2>
      <p>
        Imagine &quot;aquele&quot; frontend JavaScript com umas 100 bibliotecas
        usadas para os mais diversos fins. Tente identificar quais
        funcionalidades você <em>realmente usa</em> — eu aposto que não são 100%
        das features de cada lib.
      </p>
      <p>Quando identificar, tente:</p>
      <ol>
        <li>
          Implementar um <strong>protocolo</strong> para uma funcionalidade
          específica (ex: converter real em dólar)
        </li>
        <li>
          Descrever o <strong>contrato</strong> — tratar tanto os objetos de
          entrada quanto os de saída
        </li>
        <li>
          Implementar o <strong>adapter</strong> com a biblioteca atual como
          dependência interna
        </li>
        <li>
          Se a biblioteca mudar, trocar <strong>apenas o adapter</strong> — zero
          impacto no restante do código
        </li>
      </ol>

      {/* ─── Relação com outros padrões ─── */}
      <h2>Relação com outros padrões</h2>
      <blockquote>
        <p>
          O Adapter isola <em>dependências externas</em> por trás de uma
          interface própria. O{" "}
          <a href="/artigos/design-patterns-strategy">Strategy</a> encapsula{" "}
          <em>variações de comportamento</em> por trás de uma interface comum.
          Juntos, eles formam a base de uma arquitetura flexível e testável.
        </p>
      </blockquote>
      <p>
        Se você ainda não leu, confira também os artigos sobre{" "}
        <a href="/artigos/clean-architecture-na-pratica">Clean Architecture</a>{" "}
        e <a href="/artigos/principios-solid">SOLID</a> — os três conceitos se
        complementam perfeitamente.
      </p>
    </StaticPostLayout>
  );
}
