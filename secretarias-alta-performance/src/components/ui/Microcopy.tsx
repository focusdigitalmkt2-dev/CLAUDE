import { cn } from "@/lib/cn";
import { CalendarDays, Flame } from "lucide-react";

interface MicrocopyProps {
  className?: string;
  dark?: boolean;
  items?: Array<"duration" | "limited">;
  align?: "left" | "center";
}

/** Microcopy padrão exibida abaixo dos botões de CTA. */
export function Microcopy({
  className,
  dark = false,
  items = ["duration", "limited"],
  align = "center",
}: MicrocopyProps) {
  const color = dark ? "text-black/65" : "text-muted";
  const icon = dark ? "text-black" : "text-gold";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-[13px] font-medium",
        align === "center" ? "justify-center" : "justify-start",
        color,
        className,
      )}
    >
      {items.includes("duration") && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className={cn("size-3.5", icon)} aria-hidden />
          Treinamento intensivo de 2 dias.
        </span>
      )}
      {items.includes("limited") && (
        <span className="inline-flex items-center gap-1.5">
          <Flame className={cn("size-3.5", icon)} aria-hidden />
          Vagas limitadas.
        </span>
      )}
    </div>
  );
}
