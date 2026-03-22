import { Article, Category } from "@/types/sanity";
import { PortableText, PortableTextBlock } from "next-sanity";
import { Button } from "../ui/Button";
import ArticleCard from "./ArticleCard";
import CategoryFilters from "./CategoryFilters";

interface ArticlesSectionProps {
  articles: Article[];
  categories: Category[];
  articlesSectionConfig: {
    title: PortableTextBlock[];
  };
}

export default function ArticlesSection({
  articles,
  categories,
  articlesSectionConfig,
}: ArticlesSectionProps) {
  return (
    <section className="bg-basement-white py-14 relative text-black">
      <div className="container mx-auto">
        <div className="text-f-h1-mobile md:text-f-h1 font-sans font-semibold mb-32">
          <PortableText value={articlesSectionConfig.title} />
        </div>

        <div>
          {/* Filters */}
          <CategoryFilters categories={categories} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article: Article, index: number) => (
            <ArticleCard
              article={article}
              key={article._id}
              showImage={index < 3}
            />
          ))}
        </div>
        <div className="flex justify-center py-8">
          <Button variant="primary">Load more</Button>
        </div>
      </div>
    </section>
  );
}
