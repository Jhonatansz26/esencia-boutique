"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import EditableText from "@/components/admin/EditableText";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { type Product } from "@/types/product";
import { type PostgrestError } from "@supabase/supabase-js";
import { BRAND_INFO } from "@/constants/data";
import { type ProductGridConfig, PRODUCT_GRID_DEFAULTS } from "@/types/sections";

function mapRowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product["category"],
    gender: (row.gender as Product["gender"]) || "mujer",
    material: row.material as string[],
    description: row.description as string,
    price: Number(row.price),
    images: row.images as Product["images"],
    featured: row.featured as boolean,
    whatsappMessage: row.whatsapp_message as string,
  };
}

interface ProductGridClientProps {
  /** Config from the public page (passed when not in editable mode). */
  config?: ProductGridConfig;
  /**
   * Live-editing config from the canvas editor.
   * When present, this takes precedence over `config`.
   */
  editableConfig?: ProductGridConfig;
  /** When true, section titles render as editable inline fields. */
  editable?: boolean;
  /** Callback to persist a config key change back to the editor state. */
  onUpdateConfig?: (key: string, value: unknown) => void;
}

export default function ProductGridClient({
  config,
  editableConfig,
  editable = false,
  onUpdateConfig,
}: ProductGridClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabaseBrowserClient();

    supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("id")
      .then(({ data, error }: { data: Record<string, unknown>[] | null; error: PostgrestError | null }) => {
        if (!cancelled) {
          if (error) {
            console.error("Error fetching featured products:", error);
            setProducts([]);
          } else if (data) {
            setProducts(data.map(mapRowToProduct));
          }
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Editable config takes precedence over the static config in canvas mode.
  const activeConfig = editable ? (editableConfig ?? config) : config;

  const sectionTitle    = activeConfig?.sectionTitle    || PRODUCT_GRID_DEFAULTS.sectionTitle;
  const sectionSubtitle = activeConfig?.sectionSubtitle || PRODUCT_GRID_DEFAULTS.sectionSubtitle;
  const ctaText         = activeConfig?.ctaText         || PRODUCT_GRID_DEFAULTS.ctaText;

  const editRingClass =
    "cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] " +
    "hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 " +
    "focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1";

  return (
    <section id="coleccion" className="py-20 px-6 md:px-16">
      {/* ── Section Header ─────────────────────────────────────── */}
      {editable && onUpdateConfig ? (
        <div className="relative text-center">
          {/* Editable subtitle (eyebrow) */}
          <EditableText
            as="p"
            value={sectionSubtitle}
            onCommit={(v) => onUpdateConfig("sectionSubtitle", v)}
            className={`text-sm uppercase tracking-widest text-gray-500 mb-2 ${editRingClass}`}
          />
          {/* Editable title (h2) */}
          <EditableText
            as="h2"
            value={sectionTitle}
            onCommit={(v) => onUpdateConfig("sectionTitle", v)}
            enableAI
            className={`font-serif text-4xl text-[#1A1A1A] tracking-wide ${editRingClass}`}
          />
        </div>
      ) : (
        <SectionTitle
          title={sectionTitle}
          subtitle={sectionSubtitle}
          alignment="center"
        />
      )}

      {/* ── Product grid (skeleton while loading) ─────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="relative w-full aspect-[4/5] bg-stone-200" />
              <div className="mt-4 flex flex-col gap-2">
                <div className="h-5 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-100 rounded w-1/3" />
                <div className="h-10 bg-stone-200 rounded w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4">
          {products.map((product) => (
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
                  {ctaText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
