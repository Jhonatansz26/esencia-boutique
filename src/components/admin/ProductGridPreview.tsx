"use client";

import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";

const MOCK_PRODUCTS = [
  {
    id: "preview-1",
    name: "Pulso Ébano Gold",
    price: 35000,
    image: "/images/pulso-ebano-gold.png",
    whatsappMessage: "Hola! Estoy interesado en: Pulso Ébano Gold.",
  },
  {
    id: "preview-2",
    name: "Cadena Faith Gold",
    price: 25000,
    image: "/images/cadena-faith-gold.png",
    whatsappMessage: "Hola! Estoy interesado en: Cadena Faith Gold.",
  },
  {
    id: "preview-3",
    name: "Pulso Emerald Gold",
    price: 35000,
    image: "/images/pulso-emerald.png",
    whatsappMessage: "Hola! Estoy interesado en: Pulso Emerald Gold.",
  },
];

export default function ProductGridPreview() {
  return (
    <section id="coleccion" className="py-20 px-6 md:px-16">
      <SectionTitle
        title="Colección Esencial"
        subtitle="Piezas Seleccionadas"
        alignment="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover filter contrast-[0.98] brightness-[1.01] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#FAF7F2]/15 mix-blend-multiply pointer-events-none transition-opacity duration-300" />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-medium text-[#1A1A1A] tracking-wide">
                {product.name}
              </h3>
              <p className="font-serif italic text-stone-500 tracking-wide">
                ${product.price.toLocaleString("es-CO")} COP
              </p>
              <Button
                href={`${BRAND_INFO.whatsappLink}&text=${encodeURIComponent(product.whatsappMessage)}`}
                variant="outline"
                className="w-full mt-4"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
