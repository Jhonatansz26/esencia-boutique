"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const STORAGE_KEY = "esencia_tip_dismissed";

export default function DesignerTipBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#232019] border-b border-[#D4AF37]/20 px-6 py-3 flex items-center justify-between overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-[#D4AF37] shrink-0" />
            <p className="text-xs text-white/70 tracking-wide">
              <span className="font-medium text-white/90">Tip del Diseñador:</span>{" "}
              usa <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">Cmd+S</kbd> (o{" "}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">Ctrl+S</kbd>) para guardar rápido,{" "}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">Esc</kbd> para deseleccionar, y las flechas{" "}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↑↓</kbd> para navegar entre secciones.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-white/40 hover:text-white/80 transition-colors shrink-0 ml-4"
            aria-label="Cerrar tip"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
