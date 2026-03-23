"use client";
import { Category } from "@/types/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { cn } from "@/lib/utils";

function FilterButton({
  slug,
  isActive = false,
  name = "ALL POSTS",
  onClick,
}: {
  slug: { current: string };
  isActive: boolean;
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "text-basement-grey hover:text-black uppercase font-mono whitespace-nowrap",
        isActive && "text-black",
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default function CategoryFilters({
  categories,
  onSelectCategory,
  selectedCategory,
}: {
  categories: Category[];
  onSelectCategory: (slug: string | null) => void;
  selectedCategory: string | null;
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
      <FilterButton
        name="ALL POSTS"
        slug={{ current: "" }}
        isActive={selectedCategory === null}
        onClick={() => onSelectCategory(null)}
      />
      {categories.map((category: Category) => (
        <FilterButton
          key={category._id}
          slug={category.slug}
          name={category.name}
          isActive={selectedCategory === category.slug.current}
          onClick={() => onSelectCategory(category.slug.current)}
        />
      ))}
    </div>
  );
}
