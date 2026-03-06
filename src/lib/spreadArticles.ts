import articles from "../data/articles.json";

export const randNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Deterministic split: first half full cards, second half mini cards.
// Sorting by id prevents hydration mismatch between SSR and client render.
export function spreadArticles() {
  const sorted = [...articles].sort((a, b) => a.id - b.id);
  const half = Math.ceil(sorted.length / 2);

  const fullArticles = sorted.slice(0, half);
  const miniArticles = sorted.slice(half);

  return { fullArticles, miniArticles };
}
