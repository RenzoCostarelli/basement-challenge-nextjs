"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonAppearance = "dark" | "light" | "muted" | "accent";

interface BaseProps {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "relative whitespace-nowrap overflow-hidden inline-flex items-center justify-center transition-all font-mono duration-200 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "py-2 px-8 text-sm leading-[140%] rounded-lg",
  secondary: "py-1 px-2 text-sm font-medium rounded-sm",
};

const appearanceStyles: Record<ButtonAppearance, string> = {
  dark: "bg-black text-white hover:bg-neutral-900",
  light: "bg-basement-white text-black hover:bg-neutral-200",
  muted: "bg-basement-light-gray text-black hover:bg-neutral-500",
  accent: "bg-basement-orange text-black hover:bg-orange-400",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    className,
    variant = "primary",
    appearance = "dark",
    children,
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    appearanceStyles[appearance],
    className,
  );

  const content = (
    <>
      <span className="relative uppercase">{children}</span>

      {variant === "primary" && (
        <div className="absolute w-full h-full inset-0 translate-y-11">
          <div className="bg-white rounded-full w-[50%] h-full mx-auto blur-2xl opacity-75" />
        </div>
      )}
    </>
  );

  if ("href" in props) {
    const {
      href,
      className: _className,
      ...anchorProps
    } = props as ButtonAsLink;

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      type="button"
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
