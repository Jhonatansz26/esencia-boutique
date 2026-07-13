"use client";

import { ProductGender } from "@/types/product";

interface Category {
  slug: string;
  name: string;
  count: number;
  available: boolean;
}

interface FilterBarProps {
  activeCollection: ProductGender | "all";
  activeCategory: string;
  categories: Category[];
  resultCount: number;
  onCollectionChange: (collection: ProductGender | "all") => void;
  onCategoryChange: (category: string) => void;
}

const COLLECTIONS: { value: ProductGender | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "hombre", label: "Hombre" },
  { value: "mujer", label: "Mujer" },
  { value: "unisex", label: "Unisex" },
];

export default function FilterBar({
  activeCollection,
  activeCategory,
  categories,
  resultCount,
  onCollectionChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="mb-14 md:mb-16">
      <div className="flex justify-center border-b border-[#1A1A1A]/10 mb-8">
        <div className="flex gap-8 md:gap-12">
          {COLLECTIONS.map((collection) => {
            const isActive = activeCollection === collection.value;
            return (
              <button
                key={collection.value}
                onClick={() => onCollectionChange(collection.value)}
                className="relative pb-4 group"
              >
                <span
                  className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-[#1A1A1A]"
                      : "text-[#1A1A1A]/55 group-hover:text-[#1A1A1A]/85"
                  }`}
                >
                  {collection.label}
                </span>
                <span
                  className={`absolute left-0 -bottom-px h-[1.5px] bg-[#D4AF37] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
            activeCategory === "all"
              ? "font-semibold bg-[#1A1A1A] text-[#FAF7F2] border border-[#1A1A1A]"
              : "font-medium bg-transparent text-[#1A1A1A]/65 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50 hover:text-[#1A1A1A]/90 hover:bg-[#1A1A1A]/[0.03] cursor-pointer"
          }`}
        >
          Todo
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => category.available && onCategoryChange(category.slug)}
            disabled={!category.available}
            aria-disabled={!category.available}
            className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1 ${
              activeCategory === category.slug
                ? "font-semibold bg-[#1A1A1A] text-[#FAF7F2] border border-[#1A1A1A]"
                : category.available
                ? "font-medium bg-transparent text-[#1A1A1A]/65 border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50 hover:text-[#1A1A1A]/90 hover:bg-[#1A1A1A]/[0.03] cursor-pointer"
                : "font-medium bg-transparent text-[#1A1A1A]/25 border border-[#1A1A1A]/10 cursor-not-allowed select-none"
            }`}
          >
            {category.name}
            {!category.available && (
              <span className="text-[#1A1A1A]/30 font-mono text-[8px]">(0)</span>
            )}
          </button>
        ))}

        <span className="text-xs tracking-[0.1em] text-[#1A1A1A]/40 font-serif italic ml-2 hidden md:inline-block">
          [{resultCount}]
        </span>
      </div>
    </div>
  );
}
