"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { type ImageFilters, type ImageOverlay, DEFAULT_IMAGE_FILTERS } from "@/lib/image-filters";

interface ImageFilterPanelProps {
  currentFilters: ImageFilters;
  onChange: (filters: ImageFilters) => void;
  onClose: () => void;
}

interface SliderConfig {
  key: keyof Omit<ImageFilters, "overlay">;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const SLIDERS: SliderConfig[] = [
  { key: "brightness", label: "Brillo", min: 0, max: 200, step: 1, unit: "%" },
  { key: "contrast", label: "Contraste", min: 0, max: 200, step: 1, unit: "%" },
  { key: "saturate", label: "Saturación", min: 0, max: 200, step: 1, unit: "%" },
  { key: "blur", label: "Desenfoque", min: 0, max: 10, step: 0.5, unit: "px" },
];

const OVERLAYS: { id: ImageOverlay; label: string; preview: string }[] = [
  { id: "none", label: "Original", preview: "bg-gradient-to-r from-gray-600 to-gray-400" },
  { id: "gold", label: "Gold", preview: "bg-gradient-to-r from-[#D4AF37] to-[#c19f2f]" },
  { id: "noir", label: "Noir", preview: "bg-gradient-to-r from-gray-900 to-black" },
  { id: "sepia", label: "Sepia", preview: "bg-gradient-to-r from-amber-800 to-amber-600" },
  { id: "warm", label: "Warm", preview: "bg-gradient-to-r from-orange-700 to-amber-500" },
];

export default function ImageFilterPanel({ currentFilters, onChange, onClose }: ImageFilterPanelProps) {
  const [filters, setFilters] = useState<ImageFilters>(currentFilters);

  const updateSlider = (key: keyof Omit<ImageFilters, "overlay">, value: number) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange(updated);
  };

  const updateOverlay = (overlay: ImageOverlay) => {
    const updated = { ...filters, overlay };
    setFilters(updated);
    onChange(updated);
  };

  const handleReset = () => {
    setFilters(DEFAULT_IMAGE_FILTERS);
    onChange(DEFAULT_IMAGE_FILTERS);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full right-0 mt-2 z-[80] w-[280px] bg-[#1A1A1A] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]">
          Micro-Editor de Imagen
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        {SLIDERS.map((slider) => (
          <div key={slider.key}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] uppercase tracking-wider text-white/50">
                {slider.label}
              </label>
              <span className="text-[10px] text-[#D4AF37] tabular-nums">
                {filters[slider.key]}{slider.unit}
              </span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={filters[slider.key]}
              onChange={(e) => updateSlider(slider.key, Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer bg-white/10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#1A1A1A]
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[#D4AF37]
                [&::-webkit-slider-thumb]:shadow-sm
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#1A1A1A]
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#D4AF37]
                [&::-moz-range-thumb]:cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-moz-range-track]:rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="px-4 pb-3">
        <p className="text-[10px] uppercase tracking-wider text-white/50 mb-2">
          Overlay de Lujo
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {OVERLAYS.map((overlay) => (
            <button
              key={overlay.id}
              type="button"
              onClick={() => updateOverlay(overlay.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-sm transition-all ${
                filters.overlay === overlay.id
                  ? "ring-1 ring-[#D4AF37] bg-white/5"
                  : "hover:bg-white/5"
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${overlay.preview}`} />
              <span className="text-[8px] text-white/60 tracking-wide">{overlay.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2.5 border-t border-white/8 flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] uppercase tracking-wider text-white/40 hover:text-[#D4AF37] transition-colors"
        >
          Restablecer filtros
        </button>
      </div>
    </motion.div>
  );
}
