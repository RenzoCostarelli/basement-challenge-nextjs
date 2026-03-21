import ArticleLabels from "@/components/ArticleCategoryLabels";
import { formatDate } from "@/lib/date";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";
import { Article } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock, toPlainText } from "@portabletext/react";
const builder = imageUrlBuilder(client);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: getPost,
    params: { slug },
  });

  if (!data) {
    return {
      title: "Post not found",
      description: "This article could not be found",
    };
  }

  const description =
    data.excerpt ||
    data.subheading?.[0]?.children?.[0]?.text ||
    "Read this article";

  const imageUrl = data.image
    ? builder.image(data.image).width(1200).height(630).url()
    : null;

  const url = `/${data.slug}`;

  return {
    title: data.title,
    description,
    alternates: {
      canonical: url,
    },
    authors: data.author ? [{ name: data.author }] : [],
    openGraph: {
      title: data.title,
      description,
      url,
      type: "article",
      publishedTime: data.publishDate,
      authors: data.author ? [data.author] : [],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ]
        : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: getPost, params: { slug } });

  return (
    <main className="pt-32 font-mono">
      <header className="container mx-auto pb-6">
        <nav className="w-full text-left border-b border-basement-gray pb-3 mb-15">
          <Link href={"/"}>← GO BACK</Link>
        </nav>
        <div className="grid grid-cols-2">
          <div className="text-5xl font-semibold text-pretty">
            <PortableText value={data.title} />
          </div>
          <div>
            <PortableText value={data.subheading} />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="col-start-2 flex items-center justify-between font-semibold mt-36">
            <div className="flex items-center gap-2 ">
              <div className="col-start-2">{formatDate(data.publishDate)}</div>
              <div className="w-1 h-1 bg-basement-gray"></div>
              <div className="col-start-2">{data.author}</div>
            </div>

            {data.category && <ArticleLabels categories={data.category!} />}
          </div>
        </div>
      </header>
      <article className="container mx-auto">
        <Image
          src={builder.image(data.image).url()}
          width={1300}
          height={500}
          alt={`${data.title} image`}
          className="w-full h-full object-cover"
        />

        <div className="px-52 py-36 pb-48">
          <PortableText value={data.content} />
        </div>
      </article>

      {/* Related ARticles */}
      {data.relatedArticles && (
        <div className="container mx-auto py-16">
          <h2 className="text-[clamp(3.4rem,2.5vw,calc(99vw-1rem))] leading-none font-bold">
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
                {article.title && (
                  <h3 className="text-xl font-semibold">
                    {toPlainText(article.title)}
                  </h3>
                )}
                <p>{article.slug.current}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
