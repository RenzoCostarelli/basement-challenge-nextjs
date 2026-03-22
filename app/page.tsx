import ArticleCard from "@/components/ArticleCard";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/Button";
import { builder } from "@/lib/image-builder";
import { client } from "@/sanity/lib/client";
import { getHomeData, getPostsData } from "@/sanity/lib/queries";
import { Article, Category } from "@/types/sanity";
import { Metadata } from "next";
import { PortableText } from "next-sanity";

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
  const { hero, articlesSection } = homeData;
  return (
    <main>
      <Hero title={hero.title} image={hero.image} featuredArticle={featured} />
      <div className="bg-basement-white py-14 relative text-black">
        <div className="container mx-auto">
          <h2 className="text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none font-sans font-semibold mb-32">
            <PortableText value={articlesSection.title} />
          </h2>
          <div>
            {/* Filters */}
            <div className="flex gap-4 items-center mb-14 text-f-t">
              <div>ALL POSTS</div>
              {categories.map((category: Category) => (
                <Button
                  key={category._id}
                  variant="secondary"
                  appearance="light"
                  className="text-basement-gray"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article: Article, index: number) => (
              <ArticleCard
                article={article}
                key={article._id}
                showImage={index < 3}
              />
            ))}
          </div>
          <div className="flex justify-center py-8">
            <Button variant="primary">Load more</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
