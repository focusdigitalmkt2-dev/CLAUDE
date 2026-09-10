import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/sections/Footer";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Voltar ao início"><Logo /></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-gold">
            <ArrowLeft className="size-4" aria-hidden /> Voltar
          </Link>
        </div>
      </header>
      <main className="container-x py-14 sm:py-20">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">{title}</h1>
          <div className="mt-8 space-y-5 leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-paper">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
