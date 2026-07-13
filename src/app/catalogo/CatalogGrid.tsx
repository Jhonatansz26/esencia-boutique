"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, ProductGender } from "@/types/product";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import FilterBar from "@/components/catalogo/FilterBar";
import Link from "next/link";

interface CatalogGridProps {
  initialProducts: Product[];
}

interface Category {
  slug: string;
  name: string;
}

const ITEMS_PER_PAGE = 12;

export default function CatalogGrid({ initialProducts }: CatalogGridProps) {
  const [activeCollection, setActiveCollection] = useState<ProductGender | "all">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("categories")
        .select("slug, name")
        .order("name");

      if (!error && data) {
        setCategories(data);
      }
    }
    loadCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const collectionMatch =
        activeCollection === "all" || product.gender === activeCollection || product.gender === "unisex";
      const categoryMatch =
        activeCategory === "all" || product.category === activeCategory;
      return collectionMatch && categoryMatch;
    });
  }, [initialProducts, activeCollection, activeCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const progressPercent =
    filteredProducts.length === 0
      ? 0
      : Math.min(100, (visibleProducts.length / filteredProducts.length) * 100);

  const availableCategories = useMemo(() => {
    return categories.map((cat) => {
      const count = initialProducts.filter((p) => {
        const genderMatch = activeCollection === "all" || p.gender === activeCollection || p.gender === "unisex";
        return genderMatch && p.category === cat.slug;
      }).length;

      return { ...cat, count, available: count > 0 };
    });
  }, [categories, initialProducts, activeCollection]);

  const handleCollectionChange = (collection: ProductGender | "all") => {
    setActiveCollection(collection);
    setVisibleCount(ITEMS_PER_PAGE);

    const hasProductsInNewCollection = initialProducts.some(
      (p) =>
        (collection === "all" || p.gender === collection || p.gender === "unisex") &&
        p.category === activeCategory
    );
    if (!hasProductsInNewCollection && activeCategory !== "all") {
      setActiveCategory("all");
    }
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
      <FilterBar
        activeCollection={activeCollection}
        activeCategory={activeCategory}
        categories={availableCategories}
        resultCount={filteredProducts.length}
        onCollectionChange={handleCollectionChange}
        onCategoryChange={handleCategoryChange}
      />

      <motion.div 
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {visibleProducts.map((product, index) => {
          return (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
            >
              <ProductCard
                product={product}
                isPriority={index < 4}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {filteredProducts.length > 0 && (
        <div className="mt-16 max-w-md mx-auto flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 font-serif italic normal-case text-sm">
            Mostrando {visibleProducts.length} de {filteredProducts.length} piezas
          </p>

          <div className="w-full h-px bg-stone-200 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-px bg-[#D4AF37] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors duration-300 mt-1"
            >
              Ver más piezas
            </button>
          )}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 flex flex-col items-center gap-6">
          <div className="w-px h-16 bg-[#D4AF37]/40" />
          <p className="font-serif text-lg italic text-[#1A1A1A]/40">
            Esta colección está en preparación.
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30">
            Explora otros géneros
          </p>
          <div className="w-px h-16 bg-[#D4AF37]/40" />
        </div>
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
    <Link
      href={`/producto/${product.slug}`}
      scroll={false}
      className="flex flex-col group cursor-pointer"
    >
      <motion.div
        layoutId={`product-image-${product.id}`}
        className="relative w-full aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.images?.[0]?.src || "/images/placeholder.png"}
          alt={product.images?.[0]?.alt || product.name}
          fill
          className="object-cover filter contrast-[0.98] brightness-[1.01] group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-[#FAF7F2]/15 mix-blend-multiply pointer-events-none transition-opacity duration-300" />

        {product.featured && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] text-white bg-[#1A1A1A]/70 backdrop-blur-sm px-2.5 py-1">
            Pieza destacada
          </span>
        )}
      </motion.div>

      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="text-sm md:text-base font-medium text-[#1A1A1A] tracking-wide line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider line-clamp-1">
          {product.material.join(" · ")}
        </p>
        <p className="font-serif italic text-stone-500 tracking-wide text-sm">
          ${product.price.toLocaleString("es-CO")} COP
        </p>
      </div>
    </Link>
  );
}
