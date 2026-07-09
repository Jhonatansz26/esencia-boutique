import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";

function InstagramIcon({ size = 15, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Materiales", href: "/#materiales" },
];

const INSTAGRAM_LINK =
  "https://www.instagram.com/accesoriosesenciaboutique?igsh=ZG1hc3JxeXQzbmhl";

export default function Footer() {
  return (
    <>
      <section
        id="contacto"
        className="scroll-mt-24 relative bg-[#1A1A1A] py-24 md:py-32 px-6 md:px-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #FDFBF7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Contacto
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#FDFBF7] leading-snug">
            Escríbenos, hagamos historia juntos
          </h2>
          <Button
            href={BRAND_INFO.whatsappLink}
            variant="invert"
            className="px-10 py-4 text-sm tracking-widest uppercase"
          >
            Hablemos por WhatsApp
          </Button>
        </div>
      </section>

      <footer className="bg-[#141210] text-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 md:gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-3xl tracking-[0.15em]">
                ESENCIA
              </h3>
              <p className="text-sm tracking-wide text-[#FDFBF7]/60 max-w-xs leading-relaxed">
                Joyería minimalista que resalta tu esencia. Piezas atemporales
                elaboradas con materiales de la más alta calidad.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/40 mb-2">
                Navegación
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FDFBF7]/40 mb-2">
                Atención
              </p>
              <a
                href={BRAND_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm tracking-wide text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-colors duration-300 w-fit"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm tracking-wide text-[#FDFBF7]/80 hover:text-[#D4AF37] transition-colors duration-300 w-fit"
              >
                <InstagramIcon />
                Instagram
              </a>
              <div className="flex items-center gap-2 text-sm tracking-wide text-[#FDFBF7]/50 mt-1">
                <MapPin size={15} strokeWidth={1.5} />
                Barranquilla, Colombia — Oficina virtual
              </div>
            </div>
          </div>

          <div className="border-t border-[#FDFBF7]/10 mt-16 pt-8">
            <p className="text-center text-xs tracking-wide text-[#FDFBF7]/40">
              © 2026 Esencia Boutique. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
