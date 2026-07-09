import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-0 items-center">
          <div className="relative z-10 md:-mr-16 lg:-mr-24">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
              FILOSOFÍA DE MARCA
            </p>
            <h2 className="font-serif italic text-5xl md:text-7xl text-stone-900 leading-tight mb-8">
              Cada pieza, un manifiesto de tu esencia
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed tracking-wide max-w-lg">
              Creamos joyería minimalista que empodera. Diseños atemporales
              forjados en materiales nobles, donde la simplicidad se convierte
              en la forma más profunda de elegancia.
            </p>
          </div>

          <div className="relative md:pl-8">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src="/images/EBM-001.jpeg"
                alt="Pieza artesanal Esencia Boutique"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-8 w-px h-32 bg-stone-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
