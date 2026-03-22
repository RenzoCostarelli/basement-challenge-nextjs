import ArticleNavigation from "@/components/Articles/Navigation";
import ArticleCard from "@/components/Articles/ArticleCard";
import ArticleLabels from "@/components/Articles/ArticleCategoryLabels";
import GoBackButton from "@/components/GoBackButton";
import { formatDate } from "@/lib/date";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";
import { Article } from "@/types/sanity";
import { toPlainText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
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

  const { post } = data;

  const description =
    post.excerpt ||
    post.subheading?.[0]?.children?.[0]?.text ||
    "Read this article";

  const imageUrl = post.image
    ? builder.image(post.image).width(1200).height(630).url()
    : null;

  const url = `/${post.slug}`;

  return {
    title: toPlainText(post.title),
    description,
    alternates: {
      canonical: url,
    },
    authors: post.author ? [{ name: post.author }] : [],
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.publishDate,
      authors: post.author ? [post.author] : [],
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
  const { post, next, prev } = data;
  return (
    <main className="pt-32 font-sans">
      <header className="container mx-auto pb-6">
        <nav className="w-full text-left border-b border-basement-grey pb-3 mb-15">
          <GoBackButton />
        </nav>
        <div className="grid grid-cols-2">
          <div className="text-5xl font-semibold text-pretty">
            <PortableText value={post.title} />
          </div>
          <div>
            <PortableText value={post.subheading} />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="col-start-2 flex items-center font-sans justify-between text-basement-white text-f-p mt-36">
            <div className="flex items-center gap-2 ">
              <div className="col-start-2">{formatDate(post.publishDate)}</div>
              <div className="w-1 h-1 bg-basement-grey"></div>
              <div className="col-start-2">{post.author}</div>
            </div>

            {post.category && <ArticleLabels categories={post.category!} />}
          </div>
        </div>
      </header>
      <article className="container mx-auto">
        <Image
          src={builder.image(post.image).url()}
          width={1300}
          height={500}
          alt={`${post.title} image`}
          className="w-full h-full object-cover"
        />

        <div className="px-52 py-36 pb-48">
          <PortableText value={post.content} />
        </div>
      </article>
      <div className="container mx-auto">
        <ArticleNavigation next={next} prev={prev} />
      </div>

      {/* Related */}
      {post.relatedArticles && (
        <div className="pl-22 pr-10 py-16 flex gap-8">
          <h2 className="text-f-h2 font-sans">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.relatedArticles.map((article: Article) => (
              <ArticleCard
                key={article._id}
                article={article}
                variant="dark"
                showImage
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
