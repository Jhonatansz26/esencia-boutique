"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PROMO_CONFIG } from "@/constants/data";

interface PromoModalProps {
  /** Si `true`, el modal se muestra forzadamente (ignorando localStorage). */
  forceOpen?: boolean;
  onClose: () => void;
}

export default function PromoModal({ forceOpen = false, onClose }: PromoModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setShow(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    try {
      const alreadySeen = localStorage.getItem(PROMO_CONFIG.localStorageKey);
      if (!alreadySeen) {
        timer = setTimeout(() => {
          setShow(true);
        }, PROMO_CONFIG.delayMs);
      }
    } catch {
      // localStorage no disponible.
    }

    return () => clearTimeout(timer);
  }, [forceOpen]);

  const handleClose = () => {
    try {
      localStorage.setItem(PROMO_CONFIG.localStorageKey, "1");
    } catch {
      // Silenciar.
    }
    setShow(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="promo-backdrop"
            className="fixed inset-0 z-[60] bg-[#1A1A1A]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Card del modal */}
          <motion.div
            key="promo-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Promoción: 10% de descuento en tu primera compra"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="max-w-sm sm:max-w-md w-full mx-4 bg-white rounded-sm shadow-2xl border border-[#1A1A1A]/10 relative overflow-hidden flex flex-col items-center p-0">
              {/* Botón de cierre */}
              <button
                id="promo-modal-close"
                onClick={handleClose}
                aria-label="Cerrar promoción"
                className="absolute top-3 right-3 z-20 p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] rounded-full bg-white/80 backdrop-blur-sm transition-all"
              >
                <X size={16} aria-hidden="true" />
              </button>

              {/* Contenedor de imagen fluido con aspect ratio nativo */}
              <div className="w-full aspect-[3/4] relative bg-white">
                <Image
                  src="/images/img-promocion.jpeg"
                  alt="Promoción Esencia 10% OFF"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Sección inferior de acción (CTA) */}
              <div className="w-full px-6 pb-6 pt-3 flex flex-col items-center gap-3 bg-white text-center border-t border-[#1A1A1A]/5">
                <p className="text-[11px] text-[#1A1A1A]/60 font-light max-w-[260px]">
                  Usa tu beneficio exclusivo en tu primer pedido por WhatsApp
                </p>

                {/* CTA principal */}
                <a
                  id="promo-modal-cta"
                  href={PROMO_CONFIG.whatsappPromoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="w-full py-3.5 bg-[#1A1A1A] text-[#FAF7F2] text-[11px] tracking-[0.25em] uppercase text-center font-medium transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1A1A1A] active:scale-[0.98] rounded-sm shadow-md"
                >
                  Reclamar mi 10% OFF
                </a>

                {/* CTA secundario */}
                <button
                  onClick={handleClose}
                  className="text-[9px] tracking-[0.25em] text-[#1A1A1A]/35 uppercase hover:text-[#1A1A1A] transition-colors py-1"
                >
                  No, gracias
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
