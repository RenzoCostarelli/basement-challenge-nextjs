"use client";
import { formatDate } from "@/lib/date";
import { Article } from "@/types/sanity";
import GoBackButton from "../GoBackButton";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "../ui/PortableTextComponents";
import ArticleLabels from "./ArticleCategoryLabels";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";

export default function ArticleHeader({ post }: { post: Article }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLHRElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!titleRef.current || !hrRef || !backRef || !subheadingRef || !infoRef)
      return;
    const tl = gsap
      .timeline({ paused: true })
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        skewY: 2,
        duration: 1.5,
        filter: "blur(8px)",
        ease: "power4.out",
      })
      .from(
        hrRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.5,
          ease: "power4.out",
        },
        "<",
      )
      .from(
        backRef.current,
        {
          y: 10,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.5,
          ease: "power4.out",
        },
        "<",
      )
      .from(
        subheadingRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 1.5,
          filter: "blur(8px)",
          ease: "power4.out",
        },
        "-=1.25",
      )
      .from(
        [infoRef.current?.querySelectorAll("[data-info]")],
        { y: 20, opacity: 0, duration: 1.5, stagger: 0.05, ease: "power4.out" },
        "-=1.25",
      );

    tl.play();

    return () => {
      tl.revert();
    };
  }, []);
  return (
    <header className="container mx-auto pb-6">
      <nav className="w-full text-left pb-3 mb-15">
        <span className="inline-block" ref={backRef}>
          <GoBackButton />
        </span>
        <hr className="border-b border-basement-grey mt-3" ref={hrRef} />
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-0">
        {post.title && (
          <div
            className="text-f-h1-mobile md:text-f-h2 font-semibold text-pretty"
            ref={titleRef}
          >
            <PortableText value={post.title} />
          </div>
        )}

        {post.subheading && (
          <div ref={subheadingRef}>
            <PortableText
              value={post.subheading}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2">
        <div
          className="md:col-start-2 flex items-center font-sans justify-between text-basement-white text-f-p mt-12 md:mt-36"
          ref={infoRef}
        >
          <div className="flex items-center gap-2">
            {post.publishDate && (
              <div className="md:col-start-2 whitespace-nowrap" data-info>
                {formatDate(post.publishDate)}
              </div>
            )}
            <div className="w-1 h-1 bg-basement-grey" data-info></div>
            <div className="md:col-start-2 whitespace-nowrap" data-info>
              {post.author}
            </div>
          </div>
          <div className="md:block hidden" data-info>
            {post.category && <ArticleLabels categories={post.category} />}
          </div>
        </div>
      </div>
    </header>
  );
}
