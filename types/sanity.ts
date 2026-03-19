import { PortableTextBlock } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Article {
  _id: string;
  _type: "article";
  title?: string;
  author?: string;
  slug: {
    _type: "slug";
    current: string;
  };
  category?: {
    _type: "reference";
    _ref: string;
  }[];
  subheading?: PortableTextBlock[];
  publishDate?: string;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
  featured?: boolean;
  relatedArticles?: {
    _type: "reference";
    _ref: string;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}
