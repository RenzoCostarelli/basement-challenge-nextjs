"use client";

import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Article } from "@/types/sanity";
import FeaturedArticleCard from "./Articles/FeaturedArticleCard";
import {
  PortableText,
  PortableTextBlock,
  toPlainText,
} from "@portabletext/react";
import useIsomorphicLayoutEffect from "@/lib/useIsometricLayoutEffect";
import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

const builder = imageUrlBuilder(client);
interface HeroProps {
  title: PortableTextBlock[];
  image: {
    asset: {
      url: string;
    };
  };
  featuredArticle?: Article;
}

export default function Hero({ title, image, featuredArticle }: HeroProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const featuredContainerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const titleEl = titleRef.current?.querySelector("h1");
    if (!titleEl || !imageRef.current || !featuredContainerRef.current) return;

    const split = new SplitText(titleEl, { type: "lines", linesClass: "line" });

    const tl = gsap
      .timeline({
        paused: true,
      })
      .from(imageRef.current, {
        y: 1000,
        opacity: 0,
        duration: 1.5,
        skewZ: 10,
        ease: "power4.out",
      })
      .from(
        split.lines,
        {
          y: 100,
          opacity: 0,
          skewX: -5,
          skewY: 2,
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=0.75",
      )
      .from(
        featuredContainerRef.current,
        {
          y: 150,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1.25",
      );

    tl.play();

    return () => {
      tl.revert();
    };
  }, []);
  return (
    <div className="relative w-full min-h-svh font-sans py-32 overflow-hidden">
      <Image
        src={builder.image(image).url()}
        width={1300}
        height={500}
        alt={"Background image for hero section"}
        aria-hidden="true"
        className="w-full h-full object-cover object-top absolute inset-0 translate-y-[40svh]"
        ref={imageRef}
      />
      <div className="container mx-auto relative">
        <div
          className="text-basement-white font-semibold text-pretty text-f-h1-mobile md:text-f-h1 mb-24 md:mb-[32svh]"
          ref={titleRef}
        >
          <span className="md:block hidden">
            <PortableText value={title} />
          </span>
          <span className="block md:hidden">{toPlainText(title)}</span>
        </div>

        {featuredArticle && (
          <div ref={featuredContainerRef}>
            <FeaturedArticleCard article={featuredArticle} />
          </div>
        )}
      </div>
    </div>
  );
}
