"use client";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";

interface NavigationLinkProps {
  text: string;
  href: string;
  direction?: "previous" | "next";
}

function NavigationLink({ text, href, direction }: NavigationLinkProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const handleScramble = () => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      scrambleText: {
        text: text,
        chars: "lowerCase",
        speed: 2,
      },
      duration: 1,
    });
  };
  const directionLabel = direction === "previous" ? "Previous" : "Next";
  return (
    <Link
      href={`/${href}`}
      onMouseEnter={handleScramble}
      onMouseLeave={handleScramble}
      className={cn(
        "flex items-center gap-4 text-f-t text-basement-white",
        direction === "next" && "md:flex-row-reverse",
      )}
    >
      <div className="bg-basement-grey rounded-sm py-1 px-2">
        {directionLabel}
      </div>
      <div ref={textRef} className="md:block hidden">
        {text}
      </div>
    </Link>
  );
}

interface ArticleNavigationProps {
  prev?: {
    shortTitle?: string;
    slug: {
      current: string;
    };
  };
  next?: {
    shortTitle?: string;
    slug: {
      current: string;
    };
  };
}

export default function ArticleNavigation({
  prev,
  next,
}: ArticleNavigationProps) {
  return (
    <div className="md:px-52 flex w-full justify-between mb-16 font-mono uppercase">
      {prev && (
        <NavigationLink
          text={prev.shortTitle || ""}
          href={`${prev.slug.current}`}
          direction="previous"
        />
      )}
      {next && (
        <NavigationLink
          text={next.shortTitle || ""}
          href={`${next.slug.current}`}
          direction="next"
        />
      )}
    </div>
  );
}
