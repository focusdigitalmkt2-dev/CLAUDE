import { cn } from "@/lib/cn";

/**
 * LOGO
 * Substitua o bloco abaixo por <Image src="/images/logo.svg" .../>
 * quando a logo oficial estiver disponível.
 */
export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "flex size-8 items-center justify-center rounded-md font-display text-sm font-black",
          dark ? "bg-black text-gold" : "bg-gold text-black",
        )}
      >
        F
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[13px] font-black uppercase tracking-[0.22em]",
            dark ? "text-black" : "text-paper",
          )}
        >
          Focus
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.16em]",
            dark ? "text-black/60" : "text-gold",
          )}
        >
          Alta Performance
        </span>
      </span>
    </span>
  );
}
