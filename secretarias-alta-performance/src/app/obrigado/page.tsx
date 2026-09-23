import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Obrigado! Recebemos sua inscrição",
  robots: { index: false, follow: false },
};

/** Página de obrigado: confirmação + botão de WhatsApp. Chegamos aqui após o formulário. */
export default function ThankYouPage() {
  return <ThankYou />;
}
