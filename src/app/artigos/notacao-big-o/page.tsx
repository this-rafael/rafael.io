import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import PostImage from "@/components/posts/PostImage";
import CodeBlock from "@/components/posts/CodeBlock";

const meta: StaticPostMeta = {
  id: 4,
  title: "Notação Big O: analisando complexidade de algoritmos",
  slug: "notacao-big-o",
  description:
    "De O(1) a O(n²): entenda como medir o custo computacional de algoritmos de busca, ordenação e estruturas de dados. Com comparações visuais e exemplos práticos que mostram por que a escolha do algoritmo certo pode ser a diferença entre um sistema escalável e um que trava em produção.",
  labels: ["Algoritmos", "Complexidade"],
  image: "/images/BigONotation.webp",
  url: "https://www.linkedin.com/posts/activity-7119748798486052868-WPr0?utm_source=share&utm_medium=member_desktop",
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

export default function NotacaoBigOPage() {
  return (
    <StaticPostLayout meta={meta}>
      {/* ─── Introdução ─── */}
      <h2>Performance importa</h2>
      <p>
        Você já se viu frustrado por uma aplicação que demora uma eternidade
        para carregar? Ou já testemunhou como a lentidão de um software afetou
        negativamente os negócios de uma empresa? No mundo atual, a{" "}
        <strong>performance do software é uma questão crítica</strong> e não
        deve ser subestimada.
      </p>
      <p>
        Muitos de nós programadores passamos por uma fase de aprendizado
        intensivo em estruturas de dados e análise de algoritmos na faculdade.
        No entanto, quando entramos no mercado de trabalho, a realidade muitas
        vezes nos faz esquecer a importância desses conhecimentos. Não é culpa
        dos desenvolvedores — raramente nos é exigido aplicar esses conceitos no
        dia a dia.
      </p>
      <p>
        Mas será que a performance realmente importa? O produto em si pode não
        se importar com a forma como a solução é implementada — mas{" "}
        <strong>o usuário se importa com cada segundo</strong>. E lentidão é
        desperdício.
      </p>

      <PostImage
        src="/posts/images/grafica/04-big-o-slide-cover.jpg"
        alt="Capa: Notação Big O — analisando complexidade"
        caption="Notação Big O — a ferramenta fundamental para medir eficiência de algoritmos"
      />

      {/* ─── O que é Big O ─── */}
      <h2>O que é a Notação Big O?</h2>
      <p>
        A notação Big O descreve o <strong>comportamento assintótico</strong> de
        um algoritmo — ou seja, como o tempo de execução (ou uso de memória)
        cresce à medida que o tamanho da entrada (<em>n</em>) aumenta. Ela nos
        dá uma linguagem universal para comparar algoritmos independente de
        hardware ou linguagem de programação.
      </p>

      <PostImage
        src="/posts/images/grafica/04-big-o-slide-01.jpg"
        alt="Gráfico comparativo das complexidades Big O"
        caption="Comparação visual: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)"
      />

      <h3>As principais complexidades</h3>
      <ul>
        <li>
          <strong>O(1) — Constante:</strong> o tempo não muda com o tamanho da
          entrada. Exemplo: acessar um elemento de um array pelo índice, ou
          buscar um valor em um HashMap.
        </li>
        <li>
          <strong>O(log n) — Logarítmica:</strong> o tempo cresce de forma
          logarítmica. Exemplo: busca binária em um array ordenado.
        </li>
        <li>
          <strong>O(n) — Linear:</strong> o tempo cresce proporcionalmente ao
          tamanho da entrada. Exemplo: percorrer um array uma vez.
        </li>
        <li>
          <strong>O(n log n) — Linearítmica:</strong> típico de algoritmos de
          ordenação eficientes como Merge Sort e Quick Sort.
        </li>
        <li>
          <strong>O(n²) — Quadrática:</strong> o tempo cresce quadraticamente.
          Exemplo: dois loops aninhados percorrendo a mesma lista. Bubble Sort.
        </li>
        <li>
          <strong>O(2ⁿ) — Exponencial:</strong> o tempo dobra a cada elemento
          adicionado. Exemplo: soluções recursivas ingênuas para Fibonacci.
        </li>
      </ul>

      {/* ─── O cenário real ─── */}
      <h2>O cenário real: cruzando dados de múltiplas fontes</h2>
      <p>
        Imagine que você precisa relacionar dados de{" "}
        <strong>três listas diferentes</strong>, ligados por algum
        identificador:
      </p>
      <ol>
        <li>Lista 1: informações do cliente e dados de contato</li>
        <li>Lista 2: dados geográficos</li>
        <li>Lista 3: perfis de redes sociais</li>
      </ol>
      <p>
        Você é solicitado a gerar um relatório consolidado. A primeira solução
        que vem à mente é iterar sobre a lista 1 e, para cada item, buscar os
        itens correspondentes nas listas 2 e 3.
      </p>

      <h3>A solução O(n²) — ingênua</h3>
      <p>
        Percorrer a lista principal e, para cada registro, fazer um loop interno
        nas outras listas buscando o item correspondente. Se cada lista tem{" "}
        <em>n</em> elementos, o custo é <strong>O(n × n) = O(n²)</strong>.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`const response = list1.map(data1 => {
  const data2 = list2.find(o => o.id === data1.id);
  const data3 = list3.find(o => o.id === data1.id);
  
  return { ...data1, ...data2, ...data3 };
});`}
        </code>
      </CodeBlock>

      <p>
        Com 1.000 registros em cada lista, são{" "}
        <strong>1.000.000 de comparações</strong>. Com 10.000 registros, são
        100.000.000. A escala mata.
      </p>

      <h3>A solução O(n) — com Map</h3>
      <p>
        A chave é criar um <strong>Map (HashMap)</strong> indexado pelo
        identificador para as listas 2 e 3. Depois, percorrer a lista 1 uma
        única vez e fazer lookups O(1) no map:
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`const map2 = new Map(list2.map(o => [o.id, o]));
const map3 = new Map(list3.map(o => [o.id, o]));

const response = list1.map(data1 => {
  const data2 = map2.get(data1.id) || {};
  const data3 = map3.get(data1.id) || {};
  
  return { ...data1, ...data2, ...data3 };
});`}
        </code>
      </CodeBlock>

      <p>
        Agora, independente do tamanho das listas, fazemos{" "}
        <strong>no máximo 3n iterações</strong> — o que é O(n). Com 10.000
        registros, são ~30.000 operações ao invés de 100.000.000.
      </p>

      {/* ─── Quando importa ─── */}
      <h2>Quando a complexidade importa?</h2>
      <p>
        Para 10 ou 100 elementos, qualquer abordagem funciona. Mas no mundo real
        lidamos com:
      </p>
      <ul>
        <li>Tabelas com milhões de registros</li>
        <li>APIs que processam milhares de requisições por segundo</li>
        <li>Pipelines de dados que agregam fontes heterogêneas</li>
        <li>Front-ends que renderizam listas virtualizadas</li>
      </ul>
      <p>
        Nesses cenários, a diferença entre O(n) e O(n²) é a diferença entre{" "}
        <strong>milissegundos e minutos</strong>.
      </p>

      {/* ─── Dicas práticas ─── */}
      <h2>Dicas práticas</h2>
      <ol>
        <li>
          <strong>Sempre se pergunte:</strong> essa é a única forma de resolver
          o problema? Existe uma forma mais eficiente?
        </li>
        <li>
          <strong>Maps e Sets são seus amigos:</strong> quando precisar buscar,
          agrupar ou de-duplicar dados, use estruturas de acesso O(1) ao invés
          de loops aninhados.
        </li>
        <li>
          <strong>Cuidado com abstrações que escondem complexidade:</strong> um{" "}
          <code>.find()</code> dentro de um <code>.map()</code> é O(n²)
          disfarçado.
        </li>
        <li>
          <strong>Meça antes de otimizar:</strong> não otimize prematuramente,
          mas quando a performance importar, meça com dados reais.
        </li>
      </ol>

      {/* ─── Conclusão ─── */}
      <h2>Conclusão</h2>
      <p>
        A otimização do software pode ter um impacto significativo na satisfação
        do cliente e na eficiência da empresa. A notação Big O nos dá a
        linguagem para discutir e comparar algoritmos de forma objetiva.
      </p>
      <p>
        A pergunta que devemos nos fazer não é &quot;funciona?&quot; — é{" "}
        <strong>&quot;funciona em escala?&quot;</strong>. E com um simples gesto
        — se perguntar &quot;existe uma forma melhor?&quot; — você já está no
        caminho certo.
      </p>

      <blockquote>
        <p>
          &quot;Cada segundo é valioso para o cliente, e a lentidão é um
          desperdício.&quot;
        </p>
      </blockquote>
    </StaticPostLayout>
  );
}
