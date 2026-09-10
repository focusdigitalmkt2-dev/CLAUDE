import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Eyebrow({ children, className, dark = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]",
        dark
          ? "border-black/15 bg-black/5 text-black"
          : "border-gold/30 bg-gold-soft text-gold",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", dark ? "bg-black" : "bg-gold")}
      />
      {children}
    </span>
  );
}

interface HeadingProps {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
  titleClassName,
  as: Tag = "h2",
}: HeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          "font-display font-black uppercase leading-[1.02] tracking-tight text-balance",
          "text-[clamp(1.9rem,5.2vw,3.4rem)]",
          dark ? "text-black" : "text-paper",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed text-pretty max-w-2xl",
            dark ? "text-black/70" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
