import { sanityFetch } from "@/sanity/lib/live";
import { getPost } from "@/sanity/lib/queries";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: getPost, params: { slug } });

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
