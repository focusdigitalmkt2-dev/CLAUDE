import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "black" | "graphite" | "white" | "gold";

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  /** Remove o padding vertical padrão */
  flush?: boolean;
  as?: "section" | "div" | "header" | "footer";
  ariaLabelledby?: string;
}

const tones: Record<Tone, string> = {
  black: "bg-black text-paper",
  graphite: "bg-graphite text-paper",
  white: "bg-paper text-black",
  gold: "bg-gold text-black",
};

export function Section({
  id,
  tone = "black",
  className,
  innerClassName,
  children,
  flush = false,
  as: Tag = "section",
  ariaLabelledby,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "relative scroll-mt-20",
        tones[tone],
        !flush && "py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <div className={cn("container-x relative", innerClassName)}>{children}</div>
    </Tag>
  );
}
