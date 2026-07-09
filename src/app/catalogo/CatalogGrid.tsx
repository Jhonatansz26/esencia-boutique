"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Product, ProductGender } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { BRAND_INFO } from "@/constants/data";
import Button from "@/components/common/Button";
import FilterBar from "@/components/catalogo/FilterBar";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadCategories() {
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
        activeCollection === "all" || product.gender === activeCollection;
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

  const handleCollectionChange = (collection: ProductGender | "all") => {
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

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <FilterBar
        activeCollection={activeCollection}
        activeCategory={activeCategory}
        categories={categories}
        resultCount={filteredProducts.length}
        onCollectionChange={handleCollectionChange}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {visibleProducts.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              isPriority={index < 4}
              onClick={() => handleOpenQuickView(product)}
            />
          );
        })}
      </div>

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
        <div className="text-center py-24">
          <p className="font-serif text-6xl text-stone-200/60 mb-4">0</p>
          <p className="text-gray-500 italic text-sm">
            No hay productos disponibles con los filtros seleccionados.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            activeImageIndex={activeImageIndex}
            onImageSelect={setActiveImageIndex}
            onClose={handleCloseQuickView}
          />
        )}
      </AnimatePresence>
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
    <div
      onClick={onClick}
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
    </div>
  );
}

interface QuickViewModalProps {
  product: Product;
  activeImageIndex: number;
  onImageSelect: (index: number) => void;
  onClose: () => void;
}

function QuickViewModal({
  product,
  activeImageIndex,
  onImageSelect,
  onClose,
}: QuickViewModalProps) {
  const activeImage = product.images?.[activeImageIndex] || product.images?.[0];
  const isPrimaryImage = activeImageIndex === 0;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 backdrop-blur-md overflow-y-auto"
      style={{ backgroundColor: "rgba(28, 20, 14, 0.6)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 relative my-auto"
        onClick={(e) => e.stopPropagation()}
        layout
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col gap-4">
          <motion.div
            layoutId={
              isPrimaryImage ? `product-image-${product.id}` : undefined
            }
            className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100"
          >
            {activeImage && (
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            )}
            <div className="absolute inset-0 bg-[#FAF7F2]/15 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onImageSelect(idx)}
                  className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex
                      ? "border-stone-800 shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col justify-center gap-4"
        >
          <p className="text-xs uppercase tracking-wider text-stone-400">
            {product.category}
          </p>
          <h2 className="font-serif text-2xl text-stone-900">{product.name}</h2>
          <p className="font-serif text-xl text-stone-600">
            ${product.price.toLocaleString("es-CO")}{" "}
            <span className="text-sm text-stone-400">COP</span>
          </p>
          <p className="text-sm text-stone-600 leading-relaxed max-h-32 overflow-y-auto">
            {product.description}
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {product.material.join(" · ")}
          </p>

          <Button
            href={`${BRAND_INFO.whatsappLink}&text=${encodeURIComponent(
              `${product.whatsappMessage} — $${product.price.toLocaleString("es-CO")} COP`
            )}`}
            variant="primary"
            className="w-full mt-2 bg-[#25D366] hover:bg-[#20BD5A] border-none"
          >
            Consultar por WhatsApp
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
