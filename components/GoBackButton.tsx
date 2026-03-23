"use client";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { useRef } from "react";

interface GoBackButtonProps {
  label?: string;
  href?: string;
}

export default function GoBackButton({
  label = "GO BACK",
  href = "/",
}: GoBackButtonProps) {
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleScramble = () => {
    if (!labelRef.current) return;
    gsap.to(labelRef.current, {
      scrambleText: {
        text: label,
        chars: "lowerCase",
        speed: 2,
      },
      duration: 1,
    });
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleScramble}
      onMouseLeave={handleScramble}
      className="group font-mono text-f-t flex items-center gap-2"
    >
      <span className="group-hover:animate-translate-x transition-transform">
        ←
      </span>
      <span ref={labelRef}>{label}</span>
    </Link>
  );
}
