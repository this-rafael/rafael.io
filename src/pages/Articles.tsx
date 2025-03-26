import { useState, useEffect } from "react";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import FooterSection from "../components/FooterSection";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import articles from "../data/articles.json";
const getAllTags = () => {
  const tagsSet = new Set<string>();
  articles.forEach((article) => {
    article.labels.forEach((label) => tagsSet.add(label));
  });
  return Array.from(tagsSet).sort();
};

export default function Artigos() {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("all"); // Changed to "all" instead of ""
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [isLoaded, setIsLoaded] = useState(false);
  const allTags = getAllTags();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        searchText === "" ||
        article.title.toLowerCase().includes(searchText.toLowerCase());

      const matchesTag =
        selectedTag === "all" || article.labels.includes(selectedTag); // Updated to check for "all"

      return matchesSearch && matchesTag;
    });

    setFilteredArticles(filtered);
  }, [searchText, selectedTag]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <Header />

      <main className="flex-grow">
        <section className="w-full py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Artigos
            </h1>

            {/* Search and Filter Bar */}
            <div className="card p-4 mb-10 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="w-full pl-10 pr-4 py-2 bg-portfolio-dark/50 border border-portfolio-light/20 rounded-md focus:outline-none focus:border-portfolio-accent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-2.5 text-portfolio-light/50"
                  size={20}
                />
              </div>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-64 button-primary shadow-md">
                  <SelectValue placeholder="Filtrar por tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Conditional rendering of Clear Filters button */}
              {(searchText || selectedTag !== "all") && (
                <Button
                  variant="outline"
                  className="md:w-auto"
                  onClick={() => {
                    setSearchText("");
                    setSelectedTag("all"); /* Updated to "all" */
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    labels={article.labels}
                    articleUrl={article.articleUrl}
                    variant="dark"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-portfolio-light/70">
                  Tente ajustar seus filtros para encontrar o que procura.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
