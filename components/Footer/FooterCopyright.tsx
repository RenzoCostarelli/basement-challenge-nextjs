"use client";
import { builder } from "@/lib/image-builder";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface FooterCopyrightProps {
  copyright: string;
  soda: string;
  sodaLogo: SanityImageSource;
}

export default function FooterCopyright({
  copyright,
  soda,
  sodaLogo,
}: FooterCopyrightProps) {
  const copyWrapperRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const sodaRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!copyRef.current || !sodaRef.current) return;

    const tl = gsap
      .timeline({ paused: true })
      .from(copyRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      })
      .from(
        sodaRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "<",
      );
    ScrollTrigger.create({
      trigger: copyWrapperRef.current,
      start: "-=350 center",
      animation: tl,
    });

    return () => {
      tl.revert();
    };
  }, []);
  return (
    <div
      className="container mx-auto flex items-center justify-between gap-18 text-[9px] md:text-f-t text-basement-grey font-mono mt-5"
      ref={copyWrapperRef}
    >
      <p ref={copyRef}>{copyright}</p>
      <div className="flex items-center gap-2" ref={sodaRef}>
        <p className="text-nowrap">{soda}</p>
        {sodaLogo && (
          <div className="w-6 h-6">
            <Image
              src={builder.image(sodaLogo).url()}
              width={21}
              height={24}
              alt={"Soda logo"}
              aria-hidden="true"
              className="w-auto h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
