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
  "relative overflow-hidden inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-black text-white",

  secondary:
    "bg-basement-orange text-black hover:bg-orange-400 active:scale-[0.98]",

  ghost: "bg-transparent text-white hover:bg-white/10",

  outline: "border border-white/20 text-white hover:bg-white/10",

  subtle: "bg-white/10 text-white hover:bg-white/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-5 text-sm",
  md: "py-2 px-8 text-base",
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
        <span className="relative">{children}</span>
        <div className="absolute w-full h-full inset-0 translate-y-2/3">
          <div className="bg-white rounded-full w-[50%] h-full mx-auto blur-2xl opacity-90"></div>
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";
