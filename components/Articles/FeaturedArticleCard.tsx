import { formatDate } from "@/lib/date";
import { builder } from "@/lib/image-builder";
import { ArticleCardProps } from "@/types/articleCard";
import { toPlainText } from "@portabletext/react";
import Image from "next/image";
import ArticleLabels from "./ArticleCategoryLabels";
import { Button } from "../ui/Button";

export default function FeaturedArticleCard({
  article,
  showImage = true,
}: ArticleCardProps) {
  return (
    <div>
      <div className="grid md:grid-cols-12 grid-cols-1 group font-sans bg-transparent backdrop-blur-2xl shadow-[-1px_-1px_0.5px_0px_rgba(255,255,255,0.25),1px_1px_0.5px_0px_rgba(255,255,255,0.25)] gap-4 w-full rounded-2xl overflow-hidden p-3 lg:w-[clamp(300px,58vw,900px)] mx-auto">
        {article.image && showImage && (
          <div className="w-full h-full bg-grey-200 rounded-sm col-span-7 overflow-hidden">
            {article.thumbnail && (
              <Image
                src={builder.image(article.thumbnail).url()}
                width={900}
                height={500}
                alt={`${article.title} image`}
                className="w-full h-28 md:h-full object-cover object-center group-has-[a:hover]:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        )}
        <div className="pr-4 pl-5 py-7 flex flex-col gap-2 col-span-5">
          {article.publishDate && (
            <div className="text-xs text-basement-light-grey">
              {formatDate(article.publishDate)}
            </div>
          )}
          <h3 className="text-f-h2-mobile md:text-f-h2 font-semibold text-basement-white text-balance">
            {article.title && toPlainText(article.title)}
          </h3>
          {article.category && (
            <div className="text-f-p">
              <ArticleLabels categories={article.category} />
            </div>
          )}
          {article.shortText && (
            <p className="text-basement-light-grey text-xs">
              {article.shortText}
            </p>
          )}
          <Button
            variant="secondary"
            href={`/blog/${article.slug.current}`}
            className="w-max mt-6"
            appearance="accent"
          >
            READ FULL BLOG POST
          </Button>
        </div>
      </div>
    </div>
  );
}
