"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { PROMO_CONFIG } from "@/constants/data";

interface AnnouncementBarProps {
  onOpenModal: () => void;
}

export default function AnnouncementBar({ onOpenModal }: AnnouncementBarProps) {
  // ✅ SSR-safe: siempre `true` como estado inicial — la barra empieza visible.
  // El chequeo de sessionStorage ocurre en useEffect (solo cliente).
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PROMO_CONFIG.sessionStorageKey)) {
        setVisible(false);
      }
    } catch {
      // sessionStorage puede no estar disponible en entornos restringidos.
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    // Evita propagar el clic al contenedor (que abriría el modal).
    e.stopPropagation();
    try {
      sessionStorage.setItem(PROMO_CONFIG.sessionStorageKey, "1");
    } catch {
      // Silenciar.
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="announcement-bar"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="banner"
          aria-label="Promoción: 10% de descuento en tu primera compra"
          className="relative z-40 w-full bg-[#1A1A1A] py-2 cursor-pointer group"
          onClick={onOpenModal}
        >
          {/* Contenido centrado */}
          <div className="flex items-center justify-center gap-2 px-10">
            <Sparkles
              size={12}
              className="text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors duration-300 font-light select-none">
              10% OFF en tu primera compra&nbsp;—&nbsp;
              <span className="underline underline-offset-2 decoration-[#D4AF37]/60 font-normal">
                Haz clic para reclamar
              </span>
            </p>
            <Sparkles
              size={12}
              className="text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Botón de cierre discreto */}
          <button
            id="announcement-bar-close"
            onClick={handleClose}
            aria-label="Cerrar barra de anuncio"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#FAF7F2]/40 hover:text-[#FAF7F2] transition-colors duration-200"
          >
            <X size={12} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
