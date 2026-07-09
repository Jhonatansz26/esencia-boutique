"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductCategory } from "@/types/product";
import { BRAND_INFO } from "@/constants/data";
import { createBrowserClient } from "@supabase/ssr";
import Button from "@/components/common/Button";
import { X } from "lucide-react";

interface CatalogGridProps {
  initialProducts: Product[];
}

interface Category {
  slug: string;
  name: string;
}

const ITEMS_PER_PAGE = 12;

type CollectionFilter = "all" | "him" | "her";

const COLLECTION_LABELS: Record<CollectionFilter, string> = {
  all: "Todos",
  him: "Hombre",
  her: "Mujer",
};

export default function CatalogGrid({ initialProducts }: CatalogGridProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCollection, setActiveCollection] = useState<CollectionFilter>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Cargar categorías desde Supabase
  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error loading categories:", error);
      } else if (data) {
        setCategories(data);
      }
    }
    loadCategories();
  }, []);

  // Filtrado cruzado: primero por colección (género), luego por categoría
  const filteredProducts = initialProducts.filter((product) => {
    // Filtro de colección por campo gender
    const collectionMatch =
      activeCollection === "all" ||
      (activeCollection === "him" && product.gender === "hombre") ||
      (activeCollection === "her" && product.gender === "mujer");

    // Filtro de categoría
    const categoryMatch =
      activeCategory === "all" || product.category === activeCategory;

    return collectionMatch && categoryMatch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleCollectionChange = (collection: CollectionFilter) => {
    setActiveCollection(collection);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div>
      {/* Filtros por colección (género) */}
      <div className="mb-6">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-3">
          Colección
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.keys(COLLECTION_LABELS) as CollectionFilter[]).map(
            (collection) => (
              <button
                key={collection}
                onClick={() => handleCollectionChange(collection)}
                className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm ${
                  activeCollection === collection
                    ? "bg-[#1A1A1A] text-[#FDFBF7]"
                    : "bg-transparent border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]"
                }`}
              >
                {COLLECTION_LABELS[collection]}
              </button>
            )
          )}
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-12">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-3">
          Categoría
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm ${
              activeCategory === "all"
                ? "bg-[#1A1A1A] text-[#FDFBF7]"
                : "bg-transparent border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]"
            }`}
          >
            Todo
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-5 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm ${
                activeCategory === category.slug
                  ? "bg-[#1A1A1A] text-[#FDFBF7]"
                  : "bg-transparent border border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isPriority={index < 4}
            onClick={() => {
              setSelectedProduct(product);
              setActiveImageIndex(0);
            }}
          />
        ))}
      </div>

      {/* Botón Ver más */}
      {hasMore && (
        <div className="text-center mt-12">
          <Button variant="outline" onClick={handleLoadMore}>
            Ver más
          </Button>
        </div>
      )}

      {/* Mensaje si no hay productos */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 italic mt-12">
          No hay productos disponibles con los filtros seleccionados.
        </p>
      )}

      {/* Modal de Vista Rápida */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.6)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 text-stone-500 hover:text-stone-800 hover:bg-white transition-all duration-200 shadow-sm"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Columna 1: Galería */}
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={selectedProduct.images[activeImageIndex]?.src || "/images/placeholder.png"}
                    alt={selectedProduct.images[activeImageIndex]?.alt || selectedProduct.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                  />
                </div>

                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === activeImageIndex
                            ? "border-stone-800 shadow-sm"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt || `${selectedProduct.name} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Columna 2: Información */}
              <div className="flex flex-col">
                <p className="text-xs tracking-wider uppercase text-stone-400 font-medium">
                  {categories.find((c) => c.slug === selectedProduct.category)?.name || selectedProduct.category}
                </p>

                <h2 className="font-serif text-2xl text-stone-900 mt-1 tracking-wide leading-tight">
                  {selectedProduct.name}
                </h2>

                <p className="font-serif text-xl text-stone-600 mt-3">
                  ${selectedProduct.price.toLocaleString("es-CO")}{" "}
                  <span className="text-sm text-stone-400">COP</span>
                </p>

                {selectedProduct.description && (
                  <p className="text-sm text-stone-600 leading-relaxed mt-5 max-h-32 overflow-y-auto pr-2">
                    {selectedProduct.description}
                  </p>
                )}

                {selectedProduct.material.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-2">Materiales</p>
                    <p className="text-sm text-stone-700">
                      {selectedProduct.material.join(" · ")}
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <a
                    href={`${BRAND_INFO.whatsappLink}&text=${encodeURIComponent(
                      `Hola! Estoy interesado/a en: ${selectedProduct.name} ($${selectedProduct.price.toLocaleString("es-CO")} COP). ¿Está disponible?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isPriority: boolean;
  onClick: () => void;
}

function ProductCard({ product, isPriority, onClick }: ProductCardProps) {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={onClick}>
      {/* Imagen con aspect-square para evitar CLS */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images?.[0]?.src || '/images/placeholder.png'}
          alt={product.images?.[0]?.alt || product.name}
          fill
          className="object-cover filter contrast-[0.98] brightness-[1.01] group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-[#FAF7F2]/15 mix-blend-multiply pointer-events-none transition-opacity duration-300" />
      </div>

      {/* Información del producto */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-base font-medium text-[#1A1A1A] tracking-wide">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {product.material.join(" · ")}
        </p>
        <p className="font-serif italic text-stone-500 tracking-wide text-sm mt-1">
          ${product.price.toLocaleString("es-CO")} COP
        </p>
        <Button
          href={`${BRAND_INFO.whatsappLink}&text=${encodeURIComponent(product.whatsappMessage)}`}
          variant="outline"
          className="w-full mt-3 text-sm"
        >
          Consultar
        </Button>
      </div>
    </div>
  );
}
