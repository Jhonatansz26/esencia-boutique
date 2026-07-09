import Image from "next/image";

const materials = [
  {
    name: "Acero Inoxidable",
    description: "Resistencia eterna, brillo que no se rinde.",
    image: "/images/cadena-urban.png",
  },
  {
    name: "Oro Laminado",
    description: "La calidez del oro, la fuerza de lo auténtico.",
    image: "/images/cadena-faith-gold.png",
  },
  {
    name: "Piedras Naturales",
    description: "La tierra habla a través de cada cuenta.",
    image: "/images/manilla-ojo-de-tigre.png",
  },
];

const stagger = ["mt-0", "mt-12", "mt-6"];

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
          {materials.map((material, index) => (
            <div
              key={material.name}
              className={`group relative overflow-hidden cursor-default ${stagger[index]}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 90vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <h3 className="font-serif text-xl text-white mb-2">
                  {material.name}
                </h3>
                <p className="text-white/70 text-sm tracking-wide leading-relaxed">
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
