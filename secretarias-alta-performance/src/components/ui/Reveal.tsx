import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Animações de revelação em CSS puro (scroll-driven animations).
 * O conteúdo é visível por padrão: nada depende de JavaScript para aparecer.
 * Navegadores sem suporte a `animation-timeline` simplesmente não animam.
 * As props `delay`, `y` e `once` são mantidas por compatibilidade e ignoradas.
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "li" | "span" | "article";
}

export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}

/** Container cujos filhos <StaggerItem> revelam em sequência. */
export function Stagger({ children, className, as: Tag = "div" }: StaggerProps) {
  return <Tag className={cn("stagger", className)}>{children}</Tag>;
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return <Tag className={cn("reveal-item", className)}>{children}</Tag>;
}
