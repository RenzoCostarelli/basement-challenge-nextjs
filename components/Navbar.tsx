"use client";

import { NavBar } from "@/types/sanity";
import { Button } from "./ui/Button";
import { builder } from "@/lib/image-builder";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { usePathname } from "next/navigation";

interface NavbarProps {
  navBarConfig: NavBar;
}

export default function Navbar({ navBarConfig }: NavbarProps) {
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const isHomePage = path === "/";

  const { navigationItems, cta, logo } = navBarConfig;

  useIsomorphicLayoutEffect(() => {
    if (!navContainerRef.current || !navWrapperRef) return;
    const tl = gsap
      .timeline({
        paused: true,
      })
      .to(navWrapperRef.current, {
        opacity: 1,
      })
      .from(navContainerRef.current, {
        y: -100,
        duration: 1,
        ease: "power4.out",
        delay: isHomePage ? 1 : 0,
      })
      .from(
        [logoRef.current, navRef.current, ctaRef.current],
        {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.75",
      );

    tl.play();

    const scrollTl = gsap
      .timeline({ paused: true })
      .to(navContainerRef.current, {
        backgroundImage: "linear-gradient(175deg,#4a4a4a80,#99999990)",
      });
    if (isHomePage) {
      ScrollTrigger.create({
        animation: scrollTl,
        start: "center center",
        end: "+=200",
        scrub: true,
      });
    }

    return () => {
      tl.revert();
      scrollTl.revert();
    };
  }, [path]);

  return (
    <div className="fixed top-2 w-full z-50 font-sans">
      <div className="container mx-auto opacity-0" ref={navWrapperRef}>
        <div
          className="flex justify-between pl-4 pr-2 py-2 items-center shadow-[-1px_-1px_0.5px_0px_rgba(255,255,255,0.25),1px_1px_0.5px_0px_rgba(255,255,255,0.25)] bg-[linear-gradient(175deg,#4a4a4a14,#99999924)] backdrop-blur-md rounded-[10px]"
          ref={navContainerRef}
        >
          {logo && (
            <Link href={"/"} className="relative w-32" ref={logoRef}>
              <Image
                src={builder.image(logo).url()}
                width={1300}
                height={500}
                alt="Basement image"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
          <nav ref={navRef}>
            <ul className="gap-6 whitespace-nowrap md:flex hidden" tabIndex={0}>
              {navigationItems?.map((item, index) => (
                <li key={index}>
                  {item.href && item.label && (
                    <Link
                      className={cn(
                        "hover:text-basement-orange",
                        item.label === "Blog" && "text-basement-orange",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div ref={ctaRef}>
            <Button variant="primary">{cta?.label}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
