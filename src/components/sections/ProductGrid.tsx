import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { getFeaturedProducts } from "@/lib/supabase-products";
import { BRAND_INFO } from "@/constants/data";

export default async function ProductGrid() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section id="coleccion" className="py-20 px-6 md:px-16">
      <SectionTitle
        title="Colección Esencial"
        subtitle="Piezas Seleccionadas"
        alignment="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={product.images[0]?.src || "/images/placeholder.png"}
                alt={product.images[0]?.alt || product.name}
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
