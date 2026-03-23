"use client";

import { builder } from "@/lib/image-builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";

interface ArticleMainImageProps {
  image: SanityImageSource;
  title: string;
}

export default function ArticleMainImage({
  image,
  title,
}: ArticleMainImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline({ paused: true }).from(imageRef.current, {
      y: 50,
      filter: "blur(8px)",
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });
    ScrollTrigger.create({
      trigger: imageRef.current,
      start: "-=150 center",
      animation: tl,
    });

    return () => {
      tl.revert();
    };
  }, []);
  return (
    <Image
      src={builder.image(image).url()}
      width={1300}
      height={500}
      alt={`${title} image`}
      className="w-full h-full object-cover"
      ref={imageRef}
    />
  );
}
