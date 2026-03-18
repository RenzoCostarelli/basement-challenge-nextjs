import Hero from "@/components/Hero";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const homeData = await client.fetch(HOME_QUERY)
  // console.log(homeData)
  const { SEOtitle, SEOdescription, SEOimage, hero, articlesSection } = homeData
  console.log(hero.image)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero title={hero.title} image={hero.image} />
    </div>
  );
}
