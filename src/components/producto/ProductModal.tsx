"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";

export default function ProductModal({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product.images?.[activeImageIndex] || product.images?.[0];
  const isPrimaryImage = activeImageIndex === 0;

  const handleClose = () => {
    router.back();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 backdrop-blur-md overflow-y-auto"
      style={{ backgroundColor: "rgba(28, 20, 14, 0.6)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleClose}
    >
      <motion.div
        className="bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 relative my-auto"
        onClick={(e) => e.stopPropagation()}
        layout
      >
        <button
          onClick={handleClose}
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
                  onClick={() => setActiveImageIndex(idx)}
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
            className="w-full mt-2 bg-[#1A1A1A] text-[#FAF7F2] hover:bg-[#2D2D2D] flex items-center justify-center gap-2 border-none"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Consultar por WhatsApp
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
