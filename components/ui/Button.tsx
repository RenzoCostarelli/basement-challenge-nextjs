"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "subtle";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "relative overflow-hidden inline-flex items-center justify-center rounded-lg transition-all font-mono duration-200 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-black text-white",
  secondary: "bg-basement-orange text-black font-semibold px-2 py-1",
  ghost: "bg-transparent text-white hover:bg-white/10",
  outline: "border border-white/20 text-white hover:bg-white/10",

  subtle: "bg-white/10 text-white hover:bg-white/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 text-sm",
  md: "py-3 px-8 text-base",
  lg: "h-12 px-8 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative uppercase leading-none">{children}</span>
        {variant === "primary" && (
          <div className="absolute w-full h-full inset-0 translate-y-11">
            <div className="bg-white rounded-full w-[50%] h-full mx-auto blur-2xl opacity-75"></div>
          </div>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
