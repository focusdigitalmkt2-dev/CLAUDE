import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/config";

/**
 * LOGOTIPO FOCUS DIGITAL
 * Chama em amarelo neon + wordmark. Para usar o arquivo oficial, informe
 * `site.logoSrc` em src/lib/config.ts (ex.: "/images/logo.png").
 */
export function FlameMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("size-8", className)}
      fill="currentColor"
    >
      <path d="M30 2c-9 16-22 30-24 52-2 19 9 36 27 42 8 3 17 3 24 0-14-1-25-11-27-25-1-8 3-15 7-21 1 6 4 11 9 13-3-8-2-16 1-23 2-6 3-14-1-21-3 7-8 11-13 15 0-11-3-22-3-32z" />
      <path d="M57 14c-1 12 4 20 9 29 3 6 5 13 3 20-2 9-9 16-17 20 12 0 24-9 27-22 2-9-1-18-6-25-6-8-14-14-16-22z" />
      <path d="M79 40c1 9-2 17-2 25 0 8-4 15-10 20 10-2 19-10 21-21 1-9-4-18-9-24z" />
    </svg>
  );
}

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  if (site.logoSrc) {
    return (
      <Image
        src={site.logoSrc}
        alt={site.company}
        width={615}
        height={374}
        priority
        className={cn("h-12 w-auto sm:h-14", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <FlameMark className={cn("size-9 sm:size-10", dark ? "text-black" : "text-gold")} />
      <span
        className={cn(
          "flex flex-col font-display text-[13px] font-black uppercase leading-[1.05] tracking-[0.14em] sm:text-sm",
          dark ? "text-black" : "text-paper",
        )}
      >
        <span>Focus</span>
        <span>Digital</span>
      </span>
    </span>
  );
}
