"use client";
import useIsomorphicLayoutEffect from "@/hooks/useIsometricLayoutEffect";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NavigationItem } from "@/types/sanity";

interface FooterGroupLinksProps {
  groups: {
    title: string;
    links: NavigationItem[];
  }[];
}

export default function FooterGroupLinks({ groups }: FooterGroupLinksProps) {
  const groupsRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (!groupsRef.current) return;
    const tl = gsap
      .timeline({ paused: true })
      .from(groupsRef.current.querySelectorAll("[data-group]"), {
        y: 5,
        opacity: 0,
        duration: 0.75,
        stagger: 0.25,
        filter: "blur(8px)",
        ease: "power4.out",
      });

    ScrollTrigger.create({
      trigger: groupsRef.current,
      start: "top 80%",
      animation: tl,
    });
  }, [groupsRef]);
  return (
    <div
      className="container mx-auto grid grid-cols-6 md:grid-cols-12 mb-4"
      ref={groupsRef}
    >
      {groups?.map((group, index) => (
        <div className="col-span-2 text-left" key={index} data-group>
          <div>
            <h4 className="text-f-t mb-4 text-basement-orange">
              {group.title}
            </h4>
            <nav>
              <ul className="space-y-2">
                {group.links
                  .filter((link) => link.href)
                  .map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="text-basement-white text-f-neutral font-sans"
                    >
                      {link.href && (
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : "_self"}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="hover:underline"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      ))}
    </div>
  );
}
