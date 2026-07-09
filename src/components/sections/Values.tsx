import { BRAND_VALUES } from "@/constants/data";
import Image from "next/image";

interface MosaicBlock {
  title: string;
  description: string;
  number: string;
  spanClass: string;
  heightClass: string;
  large?: boolean;
  bgImage?: string;
}

const MOSAIC_LAYOUT: Omit<MosaicBlock, "title" | "description">[] = [
  {
    number: "01",
    spanClass: "lg:col-span-2 lg:row-span-2",
    heightClass: "h-[320px] sm:h-[360px] lg:h-auto",
    large: true,
    bgImage: "/images/valores-calidad.png",
  },
  {
    number: "02",
    spanClass: "lg:col-span-2 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
  {
    number: "03",
    spanClass: "lg:col-span-1 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
  {
    number: "04",
    spanClass: "lg:col-span-1 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
];

const mosaicValues: MosaicBlock[] = BRAND_VALUES.map((value, index) => ({
  ...value,
  ...MOSAIC_LAYOUT[index],
}));

export default function Values() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-16">
      <div className="max-w-6xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">
          Diferencial
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] tracking-wide">
          Lujo sin exceso
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-6 lg:auto-rows-[180px]">
        {mosaicValues.map((value) => (
          <div
            key={value.title}
            className={`relative overflow-hidden border border-[#1A1A1A]/10 ${value.spanClass} ${value.heightClass} ${
              value.bgImage ? "bg-transparent" : value.large ? "bg-[#FAF7F2]" : "bg-[#FDFBF7]"
            }`}
          >
            {value.bgImage ? (
              <div className="absolute inset-0 z-0">
                <Image
                  src={value.bgImage}
                  alt={value.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
            ) : (
              value.large && (
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, #1A1A1A 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
              )
            )}

            <span
              className={`absolute -top-3 -right-1 sm:-top-4 sm:-right-2 font-serif select-none pointer-events-none leading-none z-0 ${
                value.bgImage
                  ? "text-white/10"
                  : "text-stone-200/40"
              } ${
                value.large
                  ? "text-9xl sm:text-[10rem] md:text-9xl"
                  : "text-7xl sm:text-8xl"
              }`}
              aria-hidden="true"
            >
              {value.number}
            </span>

            <div
              className={`relative h-full flex flex-col z-10 ${
                value.large ? "justify-between p-7 sm:p-9 md:p-8" : "justify-end p-6 md:p-8"
              }`}
            >
              {value.large ? (
                <>
                  <div className={`h-px w-10 mt-2 ${value.bgImage ? "bg-white/40" : "bg-[#1A1A1A]/30"}`} />
                  <div className="mt-auto">
                    <h3 className={`text-sm md:text-base font-medium uppercase tracking-[0.15em] mb-3 ${
                      value.bgImage ? "text-white" : "text-[#1A1A1A]"
                    }`}>
                      {value.title}
                    </h3>
                    <p className={`text-sm leading-relaxed max-w-xs ${
                      value.bgImage ? "text-stone-200" : "text-gray-600"
                    }`}>
                      {value.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-px w-10 bg-[#1A1A1A]/30 mb-4" />
                  <h3 className="text-sm md:text-base font-medium text-[#1A1A1A] uppercase tracking-[0.15em] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
