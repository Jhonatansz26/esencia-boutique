"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductCategory } from "@/types/product";
import { BRAND_INFO } from "@/constants/data";
import { createBrowserClient } from "@supabase/ssr";
import Button from "@/components/common/Button";

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
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isPriority: boolean;
}

function ProductCard({ product, isPriority }: ProductCardProps) {
  return (
    <div className="flex flex-col group">
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
