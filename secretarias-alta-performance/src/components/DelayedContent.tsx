"use client";

import type { ReactNode } from "react";
import { useVslUnlocked } from "@/lib/vslStore";

/**
 * Conteúdo liberado só depois do tempo de VSL configurado.
 * Fica no HTML (bom para SEO), mas oculto até a liberação.
 */
export function DelayedContent({ children }: { children: ReactNode }) {
  const unlocked = useVslUnlocked();
  return (
    <div hidden={!unlocked} className={unlocked ? "enter" : undefined} aria-live="polite">
      {children}
    </div>
  );
}
