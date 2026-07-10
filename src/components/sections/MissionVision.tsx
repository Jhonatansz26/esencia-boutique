export default function MissionVision() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-16 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-4">
            Nuestra Esencia
          </p>
          <h2 className="font-serif italic text-4xl md:text-6xl text-[#1A1A1A] leading-tight">
            Lo que nos define
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-28">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-6xl md:text-7xl text-stone-300/50 leading-none select-none">
                M
              </span>
              <div className="h-px flex-1 bg-stone-300/60" />
            </div>
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-stone-500 mb-6">
              Misión
            </h3>
            <p className="text-stone-700 text-base md:text-lg leading-[1.85] tracking-wide">
              Brindar a nuestros clientes prendas de vestir y accesorios de alta
              calidad que reflejen estilo, elegancia y autenticidad, ofreciendo
              una atención personalizada que haga de cada compra una experiencia
              única y satisfactoria.
            </p>
          </div>

          <div className="flex flex-col md:mt-12 lg:mt-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-6xl md:text-7xl text-stone-300/50 leading-none select-none">
                V
              </span>
              <div className="h-px flex-1 bg-stone-300/60" />
            </div>
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-stone-500 mb-6">
              Visión
            </h3>
            <p className="text-stone-700 text-base md:text-lg leading-[1.85] tracking-wide">
              Ser una boutique reconocida a nivel regional y nacional por su
              excelencia, innovación y compromiso con la moda, consolidándonos
              como la primera opción de nuestros clientes por la calidad de
              nuestros productos y el servicio que ofrecemos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
