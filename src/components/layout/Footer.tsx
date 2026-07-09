import Link from "next/link";
import { MapPin } from "lucide-react";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Materiales", href: "/#materiales" },
];

const INSTAGRAM_LINK =
  "https://www.instagram.com/accesoriosesenciaboutique?igsh=ZG1hc3JxeXQzbmhl";

function InstagramIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 inline-block mr-2 fill-current transition-colors duration-300" aria-hidden="true">
      <path d="M12.004 2c-5.517 0-9.996 4.478-9.996 9.995 0 1.763.457 3.49 1.326 5.013l-1.41 5.15 5.275-1.383a9.924 9.924 0 0 0 4.805 1.223h.004c5.517 0 10-4.479 10-9.995C22.008 6.478 17.521 2 12.004 2zm3.303 13.047c-.21.587-1.213 1.063-1.683 1.127-.453.062-.906.094-2.893-.715-2.557-1.033-4.19-3.591-4.317-3.763-.127-.172-1.069-1.398-1.069-2.668 0-1.27.663-1.89.938-2.16.21-.22.567-.318.84-.318.096 0 .19 0 .273.012.243.012.355.03.518.413.21.493.713 1.715.777 1.844.064.128.096.286-.017.493-.113.207-.243.334-.372.493-.13.143-.274.302-.113.572.308.493.68 1.054 1.117 1.413.567.485 1.18.793 1.763 1.08.273.127.436.11.597-.064.162-.175.713-.81.906-1.1.144-.207.307-.175.518-.095.21.08 1.343.62 1.57.73.227.112.372.176.42.27.048.096.048.557-.163 1.144z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <section
        id="contacto"
        className="scroll-mt-24 relative bg-[#1A1A1A] py-12 sm:py-16 md:py-32 px-6 md:px-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #FDFBF7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Contacto
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FDFBF7] leading-snug px-2">
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
                <WhatsAppIcon />
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
