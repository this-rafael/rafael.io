/**
 * Static navigation data for all published posts.
 * Used by the dedicated static post pages to compute prev/next
 * without calling getAllPosts() (which reads the filesystem).
 */

import type { Post } from "@/lib/posts";

export interface PostNavEntry {
  slug: string;
  title: string;
  image: string;
  id: number;
  labels: string[];
  url: string;
  description: string;
  extracted: boolean;
  readingTime: number;
  content: string;
}

/**
 * Ordered list of all posts (by id ascending) – mirrors getAllPosts() output.
 * Keep in sync when adding/removing posts.
 */
export const postsNav: PostNavEntry[] = [
  {
    id: 1,
    slug: "design-patterns-strategy",
    title: "Design Patterns: Strategy",
    image: "/images/strategy.webp",
    labels: ["Design Patterns", "Arquitetura"],
    url: "https://www.linkedin.com/pulse/aumente-funcionalidade-do-seu-sistema-sem-se-com-padrão-s-pereira/",
    description:
      "Cadeias de if/else crescem, ficam frágeis e viram pesadelo de manutenção. O padrão Strategy resolve isso encapsulando cada algoritmo em sua própria classe e tornando-os intercambiáveis em tempo de execução — sem tocar no código que os consome.",
    extracted: true,
    readingTime: 8,
    content: "",
  },
  {
    id: 2,
    slug: "como-evitar-code-smells",
    title: "Como evitar Code Smells",
    image: "/images/code-smells.webp",
    labels: ["Clean Code", "Boas Práticas"],
    url: "https://www.linkedin.com/posts/activity-7283471397262163969-SrSN/?utm_source=share&utm_medium=member_desktop",
    description:
      "Code smells não quebram o sistema hoje — mas garantem que ele quebre amanhã. Neste artigo mapeio os principais cheiros: God Object, Feature Envy, Long Method e Primitive Obsession, mostrando com exemplos antes/depois em TypeScript quais refatorações aplicar em cada caso.",
    extracted: true,
    readingTime: 6,
    content: "",
  },
  {
    id: 3,
    slug: "clean-architecture-na-pratica",
    title: "Clean Architecture na prática",
    image: "/images/Cleanarch.webp",
    labels: ["Arquitetura", "Clean Code"],
    url: "https://www.linkedin.com/posts/activity-7041857205213536258-xQkS?utm_source=share&utm_medium=member_desktop",
    description:
      "A Regra de Dependência da Clean Architecture determina que o código-fonte só pode apontar para dentro — nunca para fora. Isso protege as regras de negócio de mudanças em frameworks, bancos de dados e UIs.",
    extracted: true,
    readingTime: 12,
    content: "",
  },
  {
    id: 4,
    slug: "notacao-big-o",
    title: "Notação Big O: analisando complexidade de algoritmos",
    image: "/images/BigONotation.webp",
    labels: ["Algoritmos", "Complexidade"],
    url: "https://www.linkedin.com/posts/activity-7119748798486052868-WPr0?utm_source=share&utm_medium=member_desktop",
    description:
      "De O(1) a O(n²): entenda como medir o custo computacional de algoritmos de busca, ordenação e estruturas de dados. Com comparações visuais e exemplos práticos.",
    extracted: true,
    readingTime: 8,
    content: "",
  },
  {
    id: 5,
    slug: "principios-solid",
    title: "Os princípios SOLID explicados com código",
    image: "/images/SOLID.webp",
    labels: ["Boas Práticas", "Arquitetura"],
    url: "https://www.linkedin.com/posts/activity-6933898254942134272-eFRm?utm_source=share&utm_medium=member_desktop",
    description:
      "SRP, OCP, LSP, ISP e DIP — cinco princípios que todo dev conhece de nome, mas poucos aplicam de verdade.",
    extracted: true,
    readingTime: 5,
    content: "",
  },
  {
    id: 6,
    slug: "design-patterns-adapter",
    title: "Design Patterns: Adapter",
    image: "/images/adapter.webp",
    labels: ["Design Patterns", "Arquitetura"],
    url: "https://www.linkedin.com/pulse/pare-de-ser-refém-das-dependências-diga-bem-vindo-ao-design-rafael/",
    description:
      "Depender diretamente de SDKs, libs de terceiros e APIs externas é uma armadilha: quando a dependência muda, seu código inteiro sofre. O padrão Adapter cria um contrato próprio entre sua aplicação e o mundo externo.",
    extracted: true,
    readingTime: 10,
    content: "",
  },
];

/**
 * Compute prev/next for a given slug using the static array.
 * Returns the same shape that PostNavigation expects.
 */
export function getStaticAdjacentPosts(currentSlug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const idx = postsNav.findIndex((p) => p.slug === currentSlug);

  return {
    prev: idx > 0 ? (postsNav[idx - 1] as unknown as Post) : null,
    next:
      idx < postsNav.length - 1 ? (postsNav[idx + 1] as unknown as Post) : null,
  };
}
