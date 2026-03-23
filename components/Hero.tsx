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
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const featuredContainerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const titleEl = titleRef.current?.querySelector("h1");
    if (
      !heroRef ||
      !titleEl ||
      !imageRef.current ||
      !featuredContainerRef.current
    )
      return;

    const split = new SplitText(titleEl, { type: "lines", linesClass: "line" });

    const tl = gsap
      .timeline({
        paused: true,
      })
      .fromTo(
        imageRef.current,
        {
          y: 1000,
          opacity: 0,
          skewZ: 10,
        },
        {
          y: "40svh",
          opacity: 1,
          skewZ: 0,
          duration: 1.5,
          ease: "power4.out",
        },
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          duration: 0.5,
        },
        "<",
      )
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
      .fromTo(
        featuredContainerRef.current,
        {
          y: 150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
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
    <div
      className="relative w-full min-h-svh font-sans py-32 overflow-hidden"
      ref={heroRef}
    >
      {/* Backgorund image */}
      <Image
        src={builder.image(image).url()}
        width={1300}
        height={500}
        alt={"Background image for hero section"}
        aria-hidden="true"
        className="w-full h-full object-cover object-top absolute inset-0 translate-y-[40svh] opacity-0"
        ref={imageRef}
      />
      <div className="container mx-auto relative">
        <div
          className="text-basement-white font-semibold text-pretty text-f-h1-mobile md:text-f-h1 mb-24 md:mb-[32svh] opacity-0"
          ref={titleRef}
        >
          <span className="md:block hidden">
            <PortableText value={title} />
          </span>
          <span className="block md:hidden">{toPlainText(title)}</span>
        </div>

        {featuredArticle && (
          <div ref={featuredContainerRef} className="opacity-0">
            <FeaturedArticleCard article={featuredArticle} />
          </div>
        )}
      </div>
    </div>
  );
}
