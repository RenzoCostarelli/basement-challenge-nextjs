import { formatDate } from "@/lib/date";
import { builder } from "@/lib/image-builder";
import { ArticleCardProps } from "@/types/articleCard";
import Image from "next/image";
import Link from "next/link";
import ArticleLabels from "./ArticleCategoryLabels";
import { Button } from "./ui/Button";

export default function FeaturedArticleCard({
  article,
  showImage = true,
}: ArticleCardProps) {
  return (
    <Link href={`/${article.slug.current}`}>
      <div className="grid md:grid-cols-2 grid-cols-1 bg-transparent backdrop-blur-2xl border border-basement-gray gap-4 w-full rounded-2xl overflow-hidden p-3 lg:w-[clamp(710px,17vw,800px)] mx-auto">
        {article.image && showImage && (
          <div className="w-full h-full bg-gray-200 rounded-md">
            <Image
              src={builder.image(article.image).url()}
              width={1300}
              height={500}
              alt={`${article.title} image`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-8">
          {article.publishDate && (
            <div className="text-basement-light-gray">
              {formatDate(article.publishDate)}
            </div>
          )}
          <h3 className="text-2xl font-semibold text-basement-white">
            {article.title}
          </h3>
          {article.category && <ArticleLabels categories={article.category} />}
          {article.shortText && (
            <p className="text-basement-light-gray text-xs">
              {article.shortText}
            </p>
          )}
          <Button variant="secondary" size="sm">
            READ FULL BLOG POST
          </Button>
        </div>
      </div>
    </Link>
  );
}
