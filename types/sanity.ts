import { PortableTextBlock } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Category {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
}

export interface Article {
  _id: string;
  _type: "article";
  title?: PortableTextBlock[];
  author?: string;
  shortText?: string;
  slug: {
    _type: "slug";
    current: string;
  };
  category?: Category[];
  subheading?: PortableTextBlock[];
  publishDate?: string;
  thumbnail?: SanityImageSource;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
  featured?: boolean;
  relatedArticles?: {
    _type: "reference";
    _ref: string;
  }[];
}

export interface NavigationItem {
  label: string;
  href?: string;
  external?: boolean;
}

export interface NavBar {
  logo?: SanityImageSource;
  navigationItems?: NavigationItem[];
  cta?: {
    label?: string;
  };
}

export interface PageConfig {
  navbar?: NavBar;
}
