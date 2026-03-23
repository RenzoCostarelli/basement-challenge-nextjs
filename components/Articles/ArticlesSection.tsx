"use client";
import { Article, Category } from "@/types/sanity";
import { PortableText, PortableTextBlock } from "next-sanity";
import { Button } from "../ui/Button";
import ArticleCard from "./ArticleCard";
import CategoryFilters from "./CategoryFilters";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";

interface ArticlesSectionProps {
  articles: Article[];
  categories: Category[];
  articlesSectionConfig: {
    title: PortableTextBlock[];
  };
}

export default function ArticlesSection({
  articles,
  categories,
  articlesSectionConfig,
}: ArticlesSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement[]>([]);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredArticles = selectedCategory
    ? articles.filter((article) =>
        article.category?.some((cat) => cat.slug.current === selectedCategory),
      )
    : articles;

  useIsomorphicLayoutEffect(() => {
    if (
      !sectionRef ||
      !titleRef ||
      !cardRef ||
      !cardsWrapperRef ||
      !loadMoreRef
    )
      return;

    const tl = gsap.timeline({ paused: true }).from(titleRef.current, {
      opacity: 0,
      y: 50,
      ease: "power4.out",
      duration: 1,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      animation: tl,
    });

    const tl2 = gsap
      .timeline({ paused: true })
      .from(cardRef.current, {
        opacity: 0,
        y: 50,
        ease: "power4.out",
        duration: 1,
        stagger: 0.2,
      })
      .from(
        loadMoreRef.current,
        {
          opacity: 0,
          y: 20,
          ease: "power4.out",
          duration: 0.5,
        },
        "-=0.5",
      );

    ScrollTrigger.create({
      trigger: cardsWrapperRef.current,
      start: "top center",
      animation: tl2,
    });

    return () => {
      tl.reverse();
      tl2.reverse();
      cardRef.current = [];
    };
  }, [sectionRef]);

  return (
    <section
      className="bg-basement-white pt-4 md:py-14 relative text-black"
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <div
          className="text-f-h1-mobile md:text-f-h1 font-sans font-semibold mb-32"
          ref={titleRef}
        >
          <PortableText value={articlesSectionConfig.title} />
        </div>

        <div>
          {/* Filters */}
          <CategoryFilters
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          ref={cardsWrapperRef}
        >
          {filteredArticles.map((article: Article, index: number) => (
            <div
              key={article._id}
              ref={(el) => {
                if (el) cardRef.current[index] = el;
              }}
              className="flex"
            >
              <ArticleCard article={article} showImage={index < 3} />
            </div>
          ))}
        </div>
        <div className="flex justify-center py-10 md:py-24 " ref={loadMoreRef}>
          <Button variant="primary">Load more</Button>
        </div>
      </div>
    </section>
  );
}
