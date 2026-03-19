import ArticleCard from "@/components/ArticleCard";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/Button";
import { client } from "@/sanity/lib/client";
import { getHomeData, getPostsData } from "@/sanity/lib/queries";
import { Article } from "@/types/sanity";
import { PortableText } from "next-sanity";

export default async function Home() {
  const homeData = await client.fetch(getHomeData);
  const { featured, articles } = await client.fetch(getPostsData);
  const { SEOtitle, SEOdescription, SEOimage, hero, articlesSection } =
    homeData;

  return (
    <main>
      <Hero title={hero.title} image={hero.image} featuredArticle={featured} />
      <div className="bg-basement-white py-14 relative text-black">
        <div className="container mx-auto">
          <h2 className="text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none font-bold mb-32">
            <PortableText value={articlesSection.title} />
          </h2>
          <div>
            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div>ALL POSTS</div>
              <div>ALL POSTS</div>
              <div>ALL POSTS</div>
              <div>ALL POSTS</div>
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
