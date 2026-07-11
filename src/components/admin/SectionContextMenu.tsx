"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BookmarkPlus, Trash2, Columns2, Maximize2 } from "lucide-react";

interface SectionContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onSaveTemplate: () => void;
  onSetHalfWidth?: () => void;
  onSetFullWidth?: () => void;
}

export default function SectionContextMenu({
  x,
  y,
  onClose,
  onDelete,
  onSaveTemplate,
  onSetHalfWidth,
  onSetFullWidth,
}: SectionContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[100] bg-[#1A1A1A] border border-white/10 rounded-sm py-1.5 shadow-2xl min-w-[200px]"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <button
        type="button"
        onClick={() => {
          onSaveTemplate();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] text-white/80 hover:bg-white/5 hover:text-[#D4AF37] transition-colors tracking-wide"
      >
        <BookmarkPlus size={13} />
        Guardar como plantilla
      </button>
      <div className="h-px bg-white/8 mx-2 my-1" />
      {onSetHalfWidth && (
        <button
          type="button"
          onClick={() => {
            onSetHalfWidth();
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] text-white/80 hover:bg-white/5 hover:text-[#D4AF37] transition-colors tracking-wide"
        >
          <Columns2 size={13} />
          Ancho: Mitad (6/12)
        </button>
      )}
      {onSetFullWidth && (
        <button
          type="button"
          onClick={() => {
            onSetFullWidth();
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] text-white/80 hover:bg-white/5 hover:text-[#D4AF37] transition-colors tracking-wide"
        >
          <Maximize2 size={13} />
          Ancho completo (12/12)
        </button>
      )}
      <div className="h-px bg-white/8 mx-2 my-1" />
      <button
        type="button"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors tracking-wide"
      >
        <Trash2 size={13} />
        Eliminar sección
      </button>
    </motion.div>
  );
}
