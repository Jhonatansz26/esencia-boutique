"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { refineCopyAction, type RefineVariant } from "@/app/actions/ai-refine";

interface AIRefinePopoverProps {
  currentText: string;
  onSelectVariant: (text: string) => void;
}

export default function AIRefinePopover({ currentText, onSelectVariant }: AIRefinePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [variants, setVariants] = useState<RefineVariant[]>([]);

  const handleOpen = async () => {
    if (isOpen) {
      setIsOpen(false);
      setVariants([]);
      return;
    }
    setIsOpen(true);
    setIsLoading(true);
    setVariants([]);

    try {
      const result = await refineCopyAction(currentText, "premium");
      if (result.success) {
        setVariants(result.variants);
      }
    } catch {
      setVariants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (variant: RefineVariant) => {
    onSelectVariant(variant.text);
    setIsOpen(false);
    setVariants([]);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleOpen();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#232019] transition-colors shadow-md"
        title="AI Refine"
      >
        <Sparkles size={10} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-7 left-1/2 -translate-x-1/2 z-[80] w-[260px] bg-[#1A1A1A] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-white/8 flex items-center gap-2">
              <Sparkles size={11} className="text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">
                AI Copy Refine
              </span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-6 gap-2">
                <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
                <span className="text-xs text-white/50">Refinando tono...</span>
              </div>
            ) : variants.length === 0 ? (
              <div className="py-4 px-3">
                <p className="text-xs text-white/40 text-center">No se pudieron generar variantes.</p>
              </div>
            ) : (
              <div className="py-1">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(variant)}
                    className="w-full text-left px-3 py-2.5 hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4AF37] block mb-1">
                      {variant.tone}
                    </span>
                    <span className="text-xs text-white/80 leading-relaxed group-hover:text-white transition-colors">
                      {variant.text}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
