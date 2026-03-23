"use client";

import { Article } from "@/types/sanity";
import ArticleCard from "./ArticleCard";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RelatedArticlesProps {
  relatedArticles: Article[];
}
export default function RelatedArticles({
  relatedArticles,
}: RelatedArticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !titleRef.current) return;
      const tl = gsap
        .timeline({ paused: true })
        .from(titleRef.current, {
          opacity: 0,
          y: 50,
          ease: "power4.out",
          filter: "blur(8px)",
          duration: 1,
        })
        .from(
          cardRef.current,
          {
            opacity: 0,
            y: 50,
            ease: "power4.out",
            filter: "blur(8px)",
            duration: 1,
            stagger: 0.2,
          },
          "<",
        );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        animation: tl,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div
      className="md:pl-22 md:pr-10 px-5 py-16 flex md:flex-row flex-col gap-8"
      ref={containerRef}
    >
      <h2 className="text-f-h2 font-sans" ref={titleRef}>
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedArticles.map((article, index) => (
          <div
            key={article._id}
            ref={(el) => {
              if (el) cardRef.current[index] = el;
            }}
            className="flex flex-1"
          >
            <ArticleCard
              article={article}
              variant="dark"
              showImage
              key={article._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
