import { formatDate } from "@/lib/date";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";
import { Article, Category } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";
import Image from "next/image";
const builder = imageUrlBuilder(client);

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: getPost, params: { slug } });

  return (
    <div className="pt-32">
      <div className="container mx-auto">
        <div>← GO BACK</div>
        <div className="grid grid-cols-2">
          <h1>{data.title}</h1>
          <div>
            <PortableText value={data.subheading} />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="col-start-2 flex items-center justify-between font-semibold">
            <div className="flex items-center gap-2 ">
              <div className="col-start-2">{formatDate(data.publishDate)}</div>
              <div className="w-1 h-1 bg-basement-gray"></div>
              <div className="col-start-2">{data.author}</div>
            </div>
            <div>
              {data.category.map((cate: Category) => (
                <span key={cate._id}>{cate.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Image
        src={builder.image(data.image).url()}
        width={1300}
        height={500}
        alt={`${data.title} image`}
        className="w-full h-full object-cover"
      />
      <div className="container mx-auto">
        <div>
          <PortableText value={data.content} />
        </div>
      </div>

      {/* Related ARticles */}

      {data.relatedArticles && (
        <div className="container mx-auto py-16">
          <h2 className="text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none font-bold">
            {" "}
            RELATED ARTICLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* /* ARTICLE CARD */}
            {data.relatedArticles.map((article: Article) => (
              <div key={article._id} className="border p-4 rounded-lg">
                {article.image && (
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
