import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/config";
import type { ReactNode } from "react";

interface ImagePlaceholderProps {
  /**
   * Caminho da imagem real (ex.: "/images/speakers/palestrante-1.jpg").
   * Enquanto for `undefined`, o placeholder elegante é exibido.
   */
  src?: string;
  alt: string;
  /** Texto exibido no placeholder para identificar o que deve ir ali */
  label: string;
  hint?: string;
  className?: string;
  /** Proporção CSS, ex.: "4/5", "16/9" */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
  icon?: ReactNode;
  overlay?: boolean;
  /** "cover" (padrão) preenche o quadro; "contain" mostra a imagem inteira */
  fit?: "cover" | "contain";
}

/**
 * Componente de imagem com placeholder premium.
 * Para substituir: coloque o arquivo em /public/images/... e informe `src`.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  hint,
  className,
  aspect = "4/5",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  rounded = "rounded-2xl",
  icon,
  overlay = true,
  fit = "cover",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-clip border border-line bg-graphite-2",
        rounded,
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <>
          <Image
            src={asset(src)}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={fit === "contain" ? "object-contain p-2" : "object-cover"}
          />
          {overlay && (
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
          )}
        </>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stripes p-6 text-center"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(255,196,0,0.16),transparent_70%)]"
          />
          <span className="relative flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold-soft text-gold">
            {icon ?? <ImageIcon className="size-6" aria-hidden />}
          </span>
          <span className="relative font-display text-sm font-extrabold uppercase tracking-[0.18em] text-paper/90">
            {label}
          </span>
          {hint && (
            <span className="relative max-w-[26ch] text-xs leading-relaxed text-muted-2">
              {hint}
            </span>
          )}
          <span
            aria-hidden
            className="absolute inset-3 rounded-xl border border-dashed border-line-strong"
          />
        </div>
      )}
    </div>
  );
}
