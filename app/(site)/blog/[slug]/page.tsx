import ArticleBody from "@/components/Articles/ArticleBody";
import ArticleCard from "@/components/Articles/ArticleCard";
import ArticleHeader from "@/components/Articles/ArticleHeader";
import ArticleMainImage from "@/components/Articles/ArticleMainImage";
import ArticleNavigation from "@/components/Articles/Navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";
import { Article } from "@/types/sanity";
import { toPlainText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Metadata } from "next";
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
      <ArticleHeader post={post} />
      <article className="container mx-auto">
        <ArticleMainImage image={post.image} title={toPlainText(post.title)} />
        <ArticleBody content={post.content} />
      </article>
      <div className="container mx-auto">
        <ArticleNavigation next={next} prev={prev} />
      </div>

      {/* Related */}
      {post.relatedArticles && (
        <div className="md:pl-22 md:pr-10 px-5 py-16 flex md:flex-row flex-col gap-8">
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
