import ArticlesSection from "@/components/Articles/ArticlesSection";
import Hero from "@/components/Hero";
import { builder } from "@/lib/image-builder";
import { client } from "@/sanity/lib/client";
import { getHomeData, getPostsData } from "@/sanity/lib/queries";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await client.fetch(getHomeData);

  if (!homeData) {
    return {
      title: "Home Page",
      description: "No metadata",
    };
  }

  const { SEOtitle, SEOdescription, SEOimage } = homeData;

  const imageUrl = SEOimage
    ? builder.image(SEOimage).width(1200).height(630).url()
    : null;

  const url = "https://yourdomain.com";

  return {
    title: SEOtitle || "Home",
    description: SEOdescription || "Welcome to our site",

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: SEOtitle,
      description: SEOdescription,
      url,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: SEOtitle,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: SEOtitle,
      description: SEOdescription,
      images: imageUrl ? [imageUrl] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  const homeData = await client.fetch(getHomeData);
  const { featured, articles, categories } = await client.fetch(getPostsData);
  const { hero, articlesSectionConfig } = homeData;

  return (
    <main>
      <Hero title={hero.title} image={hero.image} featuredArticle={featured} />

      <ArticlesSection
        articles={articles}
        categories={categories}
        articlesSectionConfig={articlesSectionConfig}
      />
    </main>
  );
}
