import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { event } from "@/lib/config";

/**
 * Selo de localização com pino animado. Abre o Google Maps em nova aba.
 * Endereço em src/lib/config.ts (event.address / event.addressHint / event.mapsUrl).
 */
export function LocationBadge({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <a
      href={event.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${event.address}, ${event.addressHint}. Abrir no Google Maps`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors",
        dark
          ? "border-black/15 bg-black/5 hover:bg-black/10"
          : "border-gold/40 bg-gold-soft hover:border-gold",
        className,
      )}
    >
      <span
        className={cn(
          "ring-pulse relative flex size-9 shrink-0 items-center justify-center rounded-full",
          dark ? "bg-black text-gold" : "bg-gold text-black",
        )}
      >
        <MapPin className="pin-bounce size-4" aria-hidden />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn("font-display text-[13px] font-extrabold uppercase tracking-wide sm:text-sm", dark ? "text-black" : "text-paper")}>
          {event.address}
        </span>
        <span className={cn("text-[11px] font-semibold sm:text-xs", dark ? "text-black/65" : "text-gold")}>
          {event.addressHint} · {event.city}/{event.state}
        </span>
      </span>
    </a>
  );
}
