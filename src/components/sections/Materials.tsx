import Image from "next/image";

const materials = [
  {
    name: "Acero Inoxidable",
    description: "Resistencia eterna, brillo que no se rinde.",
    image: "/images/cadena-urban.png",
  },
  {
    name: "Colección Leopardo",
    description: "La fuerza del metal y la audacia del diseño salvaje en una sola pieza.",
    image: "/images/leopardo-premium.png",
  },
  {
    name: "Piedras Naturales",
    description: "La tierra habla a través de cada cuenta.",
    image: "/images/manilla-ojo-de-tigre.png",
  },
];

export default function Materials() {
  return (
    <section
      id="materiales"
      className="scroll-mt-24 py-24 md:py-36 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
          MATERIALES
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-16 max-w-xl">
          Lo que tocamos define lo que perdura
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {materials.map((material) => (
            <div
              key={material.name}
              className="group relative overflow-hidden cursor-default"
            >
              <div className="relative w-full md:h-[500px] h-[400px] overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 90vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 md:p-8 pb-8 md:pb-10 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="font-serif text-xl text-white mb-2">
                  {material.name}
                </h3>
                <p className="text-white/80 text-sm tracking-wide leading-relaxed">
                  {material.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
