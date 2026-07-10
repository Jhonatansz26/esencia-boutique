import React from 'react';

export default function Philosophy() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] text-center mb-16">
          Nuestra Esencia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-8 items-start">
          {/* Bloque 01 - Misión */}
          <div className="relative border-r-0 md:border-r border-[#1A1A1A]/10 md:pr-12 min-h-[160px]">
            <span className="absolute -top-10 -left-2 font-serif text-8xl text-stone-200/40 select-none pointer-events-none">
              01
            </span>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-sans">
                Misión
              </p>
              <p className="font-serif text-base md:text-lg text-[#1A1A1A] leading-relaxed">
                Brindar a nuestros clientes prendas de vestir y accesorios de alta calidad que reflejen estilo, elegancia y autenticidad, ofreciendo una atención personalizada que haga de cada compra una experiencia única y satisfactoria.
              </p>
            </div>
          </div>

          {/* Bloque 02 - Visión */}
          <div className="relative md:pl-12 min-h-[160px]">
            <span className="absolute -top-10 -left-2 font-serif text-8xl text-stone-200/40 select-none pointer-events-none">
              02
            </span>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-sans">
                Visión
              </p>
              <p className="font-serif text-base md:text-lg text-[#1A1A1A] leading-relaxed">
                Ser una boutique reconocida a nivel regional y nacional por su excelencia, innovación y compromiso con la moda, consolidándonos como la primera opción de nuestros clientes por la calidad de nuestros productos y el servicio que ofrecemos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
