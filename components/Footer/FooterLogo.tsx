"use client";
import { builder } from "@/lib/image-builder";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface FooterLogoProps {
  logo: SanityImageSource;
}

export default function FooterLogo({ logo }: FooterLogoProps) {
  const footerLogo = useRef<HTMLImageElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!footerLogo.current) return;
    const tl = gsap.timeline({ paused: true }).from(footerLogo.current, {
      y: 50,
      opacity: 0,
      duration: 0.75,
      ease: "power4.out",
    });

    ScrollTrigger.create({
      trigger: footerLogo.current,
      start: "top 80%",
      animation: tl,
    });
  }, []);
  return (
    <div className="md:container mx-auto overflow-hidden">
      {logo && (
        <Image
          src={builder.image(logo).url()}
          width={1399}
          height={214}
          alt={"Basement logo"}
          aria-hidden="true"
          className="w-full h-auto"
          ref={footerLogo}
        />
      )}
    </div>
  );
}
