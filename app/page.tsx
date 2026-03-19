import Hero from "@/components/Hero";
import { Button } from "@/components/ui/Button";
import { client } from "@/sanity/lib/client";
import { getPosts, getHomeData, getPostsData } from "@/sanity/lib/queries";
import { Article } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
const builder = imageUrlBuilder(client);

export default async function Home() {
  const homeData = await client.fetch(getHomeData);
  const { featured, articles } = await client.fetch(getPostsData);
  const { SEOtitle, SEOdescription, SEOimage, hero, articlesSection } =
    homeData;

  return (
    <div className="pt-32">
      <Hero title={hero.title} image={hero.image} featuredArticle={featured} />
      <div className="bg-basement-white py-16 relative text-black">
        <div className="container mx-auto">
          <h2 className="text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none font-bold">
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
            {/* ARTICLE CARD */}
            {articles.map((article: Article, index: number) => (
              <Link
                href={`/${article.slug.current}`}
                key={article._id}
                className="border p-4 rounded-lg"
              >
                {index < 3 && article.image && (
                  <div className="relative w-full h-32">
                    <Image
                      src={builder.image(article.image).url()}
                      width={1300}
                      height={500}
                      alt={`${article.title} image`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p>{article.slug.current}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center py-8">
            <Button variant="primary">Load more</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
