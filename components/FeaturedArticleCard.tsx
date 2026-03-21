import { formatDate } from "@/lib/date";
import { builder } from "@/lib/image-builder";
import { ArticleCardProps } from "@/types/articleCard";
import Image from "next/image";
import Link from "next/link";
import ArticleLabels from "./ArticleCategoryLabels";
import { Button } from "./ui/Button";
import { toPlainText } from "@portabletext/react";

export default function FeaturedArticleCard({
  article,
  showImage = true,
}: ArticleCardProps) {
  return (
    <div>
      <div className="grid font-sans md:grid-cols-12 grid-cols-1 bg-transparent backdrop-blur-2xl border border-basement-gray gap-4 w-full rounded-2xl overflow-hidden p-3 lg:w-[clamp(300px,48vw,900px)] mx-auto">
        {article.image && showImage && (
          <div className="w-full h-full bg-gray-200 rounded-sm col-span-7 overflow-hidden">
            {article.thumbnail && (
              <Image
                src={builder.image(article.thumbnail).url()}
                width={1300}
                height={500}
                alt={`${article.title} image`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        <div className="pr-4 pl-5 py-7 flex flex-col gap-2 col-span-5">
          {article.publishDate && (
            <div className="text-xs text-basement-light-gray">
              {formatDate(article.publishDate)}
            </div>
          )}
          <h3 className="text-2xl font-semibold text-basement-white text-balance leading-none">
            {article.title && toPlainText(article.title)}
          </h3>
          {article.category && (
            <div className="text-xs">
              <ArticleLabels categories={article.category} />
            </div>
          )}
          {article.shortText && (
            <p className="text-basement-light-gray text-xs">
              {article.shortText}
            </p>
          )}
          <Button variant="secondary" className="w-max mt-6" size="sm">
            READ FULL BLOG POST
          </Button>
        </div>
      </div>
    </div>
  );
}
