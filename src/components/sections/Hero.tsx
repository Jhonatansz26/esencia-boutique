import Image from "next/image";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center gap-8 px-6 md:px-16 py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-[#1A1A1A]/40"></div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            JOYERÍA MINIMALISTA
          </p>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] leading-[1.05]">
          Esencia en cada detalle
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed max-w-md">
          {BRAND_INFO.slogan}
        </p>

        <div className="mt-4">
          <Button href="/catalogo" variant="primary">
            VER COLECCIÓN
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[500px] max-h-[500px] overflow-hidden">
        <Image
          src="/images/hero-principal.png"
          alt="Joyería minimalista elegante"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
