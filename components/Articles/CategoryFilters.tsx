"use client";
import { Category } from "@/types/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";

function FilterButton({
  slug,
  name = "ALL POSTS",
}: {
  slug: { current: string };
  name: string;
}) {
  return (
    <button className="text-basement-grey hover:text-black uppercase font-mono whitespace-nowrap">
      {name}
    </button>
  );
}

export default function CategoryFilters({
  categories,
}: {
  categories: Category[];
}) {
  const filtersRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!filtersRef.current) return;
    const tl = gsap.timeline({ paused: true }).from(filtersRef.current, {
      opacity: 0,
      y: 20,
      ease: "power4.out",
      duration: 0.5,
    });

    ScrollTrigger.create({
      trigger: filtersRef.current,
      start: "top 80%",
      animation: tl,
    });
  }, []);
  return (
    <div
      className="flex gap-10 items-center mb-14 text-f-t overflow-y-scroll md:overflow-hidden"
      ref={filtersRef}
    >
      <FilterButton name="ALL POSTS" slug={{ current: "" }} />
      {categories.map((category: Category) => (
        <FilterButton
          key={category._id}
          slug={category.slug}
          name={category.name}
        />
      ))}
    </div>
  );
}
