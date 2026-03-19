import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Article } from "@/types/sanity";
import FeaturedArticleCard from "./FeaturedArticleCard";

const builder = imageUrlBuilder(client);
interface HeroProps {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
  featuredArticle?: Article;
}

export default function Hero({ title, image, featuredArticle }: HeroProps) {
  return (
    <div className="relative w-full min-h-svh font-sans py-32">
      <Image
        src={builder.image(image).url()}
        width={1300}
        height={500}
        alt={title}
        className="w-full h-full object-cover object-top absolute inset-0 translate-y-1/3"
      />
      <div className="container mx-auto relative">
        <h1 className="text-basement-white font-semibold w-[78%] text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none mb-[32svh]">
          {title}
        </h1>

        {/* Featured article card */}
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}
      </div>
    </div>
  );
}
