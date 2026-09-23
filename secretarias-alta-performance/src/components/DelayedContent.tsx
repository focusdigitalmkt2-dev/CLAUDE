"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useVslUnlocked } from "@/lib/vslStore";

/**
 * Restante da página: só é renderizado (e só tem o código baixado) depois da
 * liberação pela VSL. Isso deixa o carregamento inicial com apenas título,
 * vídeo e rodapé. O código é pré-baixado em segundo plano após alguns segundos
 * para a liberação ser instantânea.
 */
const RestOfPage = dynamic(() => import("@/components/RestOfPage").then((m) => m.RestOfPage), {
  ssr: false,
});

export function DelayedContent() {
  const unlocked = useVslUnlocked();

  useEffect(() => {
    const id = window.setTimeout(() => {
      import("@/components/RestOfPage").catch(() => {});
    }, 6000);
    return () => window.clearTimeout(id);
  }, []);

  if (!unlocked) return null;
  return (
    <div className="enter">
      <RestOfPage />
    </div>
  );
}
