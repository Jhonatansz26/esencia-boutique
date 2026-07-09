import { Metadata } from "next";
import { getAllProducts } from "@/lib/supabase-products";
import CatalogGrid from "./CatalogGrid";

export const metadata: Metadata = {
  title: "Catálogo Completo | Esencia Boutique",
  description:
    "Explora toda la colección de joyería minimalista de Esencia Boutique. Manillas, cadenas y sets elaborados con materiales premium.",
};

export const revalidate = 60;

export default async function CatalogoPage() {
  const products = await getAllProducts();

  return (
    <main className="py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.05] mb-4">
            Catálogo Completo
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre cada pieza de nuestra colección, elaborada con materiales
            premium y diseño minimalista.
          </p>
        </div>
        <CatalogGrid initialProducts={products} />
      </div>
    </main>
  );
}
