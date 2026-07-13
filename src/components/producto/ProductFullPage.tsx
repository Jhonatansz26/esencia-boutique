"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ProductFullPage({ product }: { product: Product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product.images?.[activeImageIndex] || product.images?.[0];
  const isPrimaryImage = activeImageIndex === 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 md:mb-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft size={16} />
            Volver al Catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Columna de Imágenes */}
          <div className="flex flex-col gap-6">
            <motion.div
              layoutId={
                isPrimaryImage ? `product-image-${product.id}` : undefined
              }
              className="relative w-full aspect-square rounded-sm overflow-hidden bg-gray-50"
            >
              {activeImage && (
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              )}
              <div className="absolute inset-0 bg-[#FAF7F2]/10 mix-blend-multiply pointer-events-none" />
            </motion.div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-24 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                      idx === activeImageIndex
                        ? "border-[#1A1A1A] opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna de Información */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-4">
                {product.category}
              </p>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.1] mb-6">
                {product.name}
              </h1>
              
              <p className="font-serif text-2xl md:text-3xl text-[#1A1A1A]/80 mb-8">
                ${product.price.toLocaleString("es-CO")}{" "}
                <span className="text-base text-[#1A1A1A]/40 uppercase tracking-widest">COP</span>
              </p>
              
              <div className="w-12 h-px bg-[#D4AF37] mb-8" />
              
              <p className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed mb-10 whitespace-pre-line">
                {product.description}
              </p>
              
              <div className="mb-12">
                <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40 mb-4">Materiales</p>
                <div className="flex flex-wrap gap-2">
                  {product.material.map((mat) => (
                    <span
                      key={mat}
                      className="px-4 py-2 text-xs uppercase tracking-widest border border-[#1A1A1A]/10 text-[#1A1A1A]/70 bg-white"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  href={`${BRAND_INFO.whatsappLink}&text=${encodeURIComponent(
                    `${product.whatsappMessage} — $${product.price.toLocaleString("es-CO")} COP`
                  )}`}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-3 py-4 text-sm"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Consultar Disponibilidad
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
