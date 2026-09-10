import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { links, site, whatsappUrl } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-black py-12 text-sm text-muted sm:py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-4 max-w-sm leading-relaxed text-muted-2">
              Treinamento intensivo de 2 dias para clínicas e profissionais da saúde.
            </p>
            <p className="mt-4 text-xs text-muted-2">
              {site.companyLegalName}
              <br />
              CNPJ {site.cnpj}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Links legais">
            <p className="font-display text-xs font-black uppercase tracking-[0.2em] text-paper">Legal</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={links.privacy} className="hover:text-gold">Política de Privacidade</Link></li>
              <li><Link href={links.terms} className="hover:text-gold">Termos de Uso</Link></li>
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p className="font-display text-xs font-black uppercase tracking-[0.2em] text-paper">Contato</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                  <MessageCircle className="size-4 text-gold" aria-hidden />WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2 hover:text-gold">
                  <Mail className="size-4 text-gold" aria-hidden />{links.email}
                </a>
              </li>
              <li>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                  <Instagram className="size-4 text-gold" aria-hidden />Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.company}. Todos os direitos reservados.</p>
          <p className="max-w-xl leading-relaxed">
            Os resultados podem variar conforme volume de oportunidades, oferta, localização,
            operação comercial e execução do método.
          </p>
        </div>
      </div>
    </footer>
  );
}
