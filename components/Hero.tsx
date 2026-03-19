import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Article } from "@/types/sanity";

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
    <div className="relative w-full min-h-svh font-sans">
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
        {featuredArticle && (
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 bg-transparent backdrop-blur-2xl border border-basement-gray gap-4 w-full rounded-2xl overflow-hidden p-3 lg:w-[clamp(710px,17vw,800px)] mx-auto">
              {featuredArticle.image && (
                <div className="w-full h-full bg-gray-200 rounded-md">
                  <Image
                    src={builder.image(featuredArticle.image).url()}
                    width={1300}
                    height={500}
                    alt={`${featuredArticle.title} image`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                molestiae dolore repellat necessitatibus perferendis quis cumque
                facilis amet, voluptatum incidunt sit dolorum unde. Inventore
                harum quasi, distinctio, accusantium, sed possimus quas unde
                magnam iusto vitae odit obcaecati repellat ratione laboriosam!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                molestiae dolore repellat necessitatibus perferendis quis cumque
                facilis amet, voluptatum incidunt sit dolorum unde. Inventore
                harum quasi, distinctio, accusantium, sed possimus quas unde
                magnam iusto vitae odit obcaecati repellat ratione laboriosam!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
