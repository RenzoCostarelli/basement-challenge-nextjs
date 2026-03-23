"use client";
import { PortableText, PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "../ui/PortableTextComponents";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ArticleBody({
  content,
}: {
  content: PortableTextBlock[];
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!bodyRef.current) return;

    const tl = gsap.timeline({ paused: true }).from(bodyRef.current, {
      y: 50,
      filter: "blur(8px)",
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });
    ScrollTrigger.create({
      trigger: bodyRef.current,
      start: "-=150 center",
      animation: tl,
    });

    return () => {
      tl.revert();
    };
  }, []);
  return (
    <div className="md:px-52 py-36 pb-48" ref={bodyRef}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
