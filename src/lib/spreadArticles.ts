import articles from "../data/articles.json";

export const randNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function spreadArticles() {
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  const half = Math.floor(shuffled.length / 2);

  const fullArticles = shuffled.slice(0, half);
  const miniArticles = shuffled.slice(half);

  return { fullArticles, miniArticles };
}
