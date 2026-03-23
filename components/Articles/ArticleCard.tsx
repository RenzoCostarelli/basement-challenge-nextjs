import { formatDate } from "@/lib/date";
import { builder } from "@/lib/image-builder";
import { ArticleCardProps, CardVariant } from "@/types/articleCard";
import { toPlainText } from "@portabletext/react";
import Image from "next/image";
import ArticleCategoryLabels from "./ArticleCategoryLabels";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const baseStyles = "p-4 rounded-lg flex flex-col";

const variantStyles: Record<CardVariant, string> = {
  dark: "shadow-[0px_0px_21px_0px_rgba(0,_0,_0,_1),-1px_-1px_0.5px_0px_rgba(255,255,255,0.40),1px_1px_0.5px_0px_rgba(255,255,255,0.25)] bg-[rgba(18, 18, 18, 0.05)] ",
  light:
    "shadow-[-1px_-1px_0.5px_0px_rgba(255,255,255,1),1px_1px_0.5px_0px_rgba(255,255,255,1)] bg-[#FCFCFC40] ",
};

export default function ArticleCard({
  article,
  showImage,
  variant = "light",
}: ArticleCardProps) {
  const buttonAppearance = variant === "light" ? "light" : "accent";

  return (
    <div className={cn(baseStyles, variantStyles[variant], "group")}>
      {showImage && article.image && (
        <div className="relative w-full h-32 rounded-sm overflow-hidden ">
          <Image
            src={builder.image(article.image).url()}
            width={1300}
            height={500}
            alt={`${article.title} image`}
            className="w-full h-h-27.5 md:h-34.25 object-cover transition-all duration-300 group-has-[a:hover]:scale-105"
          />
        </div>
      )}
      <div className="flex-1 justify-between flex flex-col items-start relative h-full space-y-14 font-sans">
        <div className="pt-6 space-y-2">
          {article.publishDate && (
            <div className="text-xs">{formatDate(article.publishDate)}</div>
          )}
          {article.title && (
            <h3 className="text-lg font-semibold text-balance">
              {toPlainText(article.title)}
            </h3>
          )}
          {article.category && (
            <ArticleCategoryLabels
              categories={article.category}
              variant={variant}
            />
          )}
        </div>

        <Button
          variant="secondary"
          appearance={buttonAppearance}
          href={`/blog/${article.slug.current}`}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
