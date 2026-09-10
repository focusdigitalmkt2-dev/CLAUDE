import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-dvh flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-black text-gold">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase">Página não encontrada</h1>
      <p className="mt-2 text-muted">O endereço que você acessou não existe.</p>
      <div className="mt-8"><Button href="/">Voltar ao início</Button></div>
      <Link href="/" className="sr-only">Início</Link>
    </main>
  );
}
