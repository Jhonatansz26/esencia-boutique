import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Materiales", href: "/#materiales" },
    { label: "Instagram", href: "https://www.instagram.com/accesoriosesenciaboutique?igsh=ZG1hc3JxeXQzbmhl" },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl tracking-widest mb-2">
              ESENCIA
            </h3>
            <p className="text-sm tracking-wide opacity-70">
              Joyería minimalista
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide hover:opacity-60 transition-opacity duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#FDFBF7]/20 pt-8">
          <p className="text-center text-sm tracking-wide opacity-60">
            © 2026 Esencia Boutique. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
