import ArticleBody from "@/components/Articles/ArticleBody";
import ArticleHeader from "@/components/Articles/ArticleHeader";
import ArticleMainImage from "@/components/Articles/ArticleMainImage";
import ArticleNavigation from "@/components/Articles/Navigation";
import RelatedArticles from "@/components/Articles/RelatedArticles";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";
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
        <RelatedArticles relatedArticles={post.relatedArticles} />
      )}
    </main>
  );
}
