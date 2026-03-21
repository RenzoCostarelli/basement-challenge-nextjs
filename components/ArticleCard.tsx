import { builder } from "@/lib/image-builder";
import { ArticleCardProps } from "@/types/articleCard";
import Image from "next/image";
import Link from "next/link";
import ArticleCategoryLabels from "./ArticleCategoryLabels";
import { formatDate } from "@/lib/date";
import { Button } from "./ui/Button";
import { toPlainText } from "@portabletext/react";

export default function ArticleCard({ article, showImage }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.slug.current}`}
      key={article._id}
      className="border p-4 rounded-lg border-white bg-[#FCFCFC40] flex flex-col"
    >
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

        <Button variant="secondary" appearance="light">
          Read more
        </Button>
      </div>
    </Link>
  );
}
