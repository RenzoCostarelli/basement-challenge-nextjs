import { Article } from "./sanity";

export type CardVariant = "light" | "dark";

export interface ArticleCardProps {
  article: Article;
  showImage?: boolean;
  variant?: CardVariant;
}
