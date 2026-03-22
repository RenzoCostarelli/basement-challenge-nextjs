import { formatDate } from "@/lib/date";
import { builder } from "@/lib/image-builder";
import { ArticleCardProps } from "@/types/articleCard";
import { toPlainText } from "@portabletext/react";
import Image from "next/image";
import ArticleCategoryLabels from "./ArticleCategoryLabels";
import { Button } from "./ui/Button";

export default function ArticleCard({ article, showImage }: ArticleCardProps) {
  return (
    <div className="p-4 rounded-lg shadow-[-1px_-1px_0.5px_0px_rgba(255,255,255,1),1px_1px_0.5px_0px_rgba(255,255,255,1)] bg-[#FCFCFC40] flex flex-col">
      {showImage && article.image && (
        <div className="relative w-full h-32 rounded-sm overflow-hidden">
          <Image
            src={builder.image(article.image).url()}
            width={1300}
            height={500}
            alt={`${article.title} image`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 justify-between flex flex-col items-start relative h-full space-y-14 font-sans">
        <div className="pt-6 space-y-2">
          {article.publishDate && (
            <div className="text-xs">{formatDate(article.publishDate)}</div>
          )}
          {article.title && (
            <h3 className="text-lg font-semibold text-balance leading-none">
              {toPlainText(article.title)}
            </h3>
          )}
          {article.category && (
            <ArticleCategoryLabels
              categories={article.category}
              variant="light"
            />
          )}
        </div>

        <Button
          variant="secondary"
          appearance="light"
          href={`/${article.slug.current}`}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
