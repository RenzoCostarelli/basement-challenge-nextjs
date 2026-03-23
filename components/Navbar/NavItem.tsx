"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}
export default function NavItem({ label, href }: NavItemProps) {
  return (
    <Link
      className={cn(
        "hover:text-basement-orange group relative overflow-hidden",
        label === "Blog" && "text-basement-orange",
      )}
      href={href}
    >
      <span className="inline-block relative group-hover:-translate-y-20 transition-transform duration-500">
        {label}
      </span>
      <span className="absolute translate-y-20 group-hover:translate-y-0 left-0 transition-transform duration-500">
        {label}
      </span>
    </Link>
  );
}
