"use client";

import { ProductGender } from "@/types/product";

interface Category {
  slug: string;
  name: string;
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
                      : "text-[#1A1A1A]/35 group-hover:text-[#1A1A1A]/70"
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

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <button
          onClick={() => onCategoryChange("all")}
          className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
            activeCategory === "all"
              ? "text-[#1A1A1A] font-medium"
              : "text-[#1A1A1A]/45 hover:text-[#1A1A1A]/75"
          }`}
        >
          Todo
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.slug)}
            className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
              activeCategory === category.slug
                ? "text-[#1A1A1A] font-medium"
                : "text-[#1A1A1A]/45 hover:text-[#1A1A1A]/75"
            }`}
          >
            {category.name}
          </button>
        ))}

        <span className="text-xs tracking-[0.1em] text-[#1A1A1A]/40 font-serif italic ml-2">
          [{resultCount}]
        </span>
      </div>
    </div>
  );
}
