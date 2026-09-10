"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackCTA } from "@/lib/analytics";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "white";
type Size = "md" | "lg" | "xl";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Rótulo enviado aos pixels de rastreamento */
  track?: string;
  arrow?: boolean;
  pulse?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const base =
  "group inline-flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-wide rounded-xl transition-all duration-300 select-none will-change-transform active:scale-[0.98] focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-black shadow-gold hover:bg-gold-2 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(228,255,0,0.55)]",
  outline:
    "border border-gold/70 text-gold hover:bg-gold hover:text-black hover:-translate-y-0.5",
  ghost:
    "text-paper hover:text-gold underline-offset-4 hover:underline",
  white:
    "bg-black text-paper hover:bg-graphite-3 hover:-translate-y-0.5 shadow-card",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[13px] sm:text-sm",
  lg: "min-h-14 px-7 text-sm sm:text-[15px]",
  xl: "min-h-16 px-6 text-[15px] sm:px-8 sm:text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  track,
  arrow = true,
  pulse = false,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const isExternal = /^https?:\/\//.test(href);
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    pulse && "animate-pulse-soft",
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-[1.1em] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  const handleClick = () => {
    if (track) trackCTA(track);
    onClick?.();
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={handleClick} scroll>
      {content}
    </Link>
  );
}
