import { cn } from "@/lib/cn";

/** Linha decorativa com brilho dourado no centro. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent",
        className,
      )}
    />
  );
}
