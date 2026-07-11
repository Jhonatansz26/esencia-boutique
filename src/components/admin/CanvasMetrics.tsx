"use client";

import { SectionConfig } from "@/types/layout";

interface CanvasMetricsProps {
  sections: SectionConfig[];
  hasUnsavedChanges: boolean;
  isPublished: boolean;
}

export default function CanvasMetrics({ sections, hasUnsavedChanges, isPublished }: CanvasMetricsProps) {
  const hiddenCount = sections.filter((s) => !s.visible).length;

  return (
    <div className="bg-white/[0.03] rounded-sm p-4 mb-4">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Secciones totales</p>
          <p className="font-serif text-2xl text-[#FDFBF7]">{sections.length}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Ocultas</p>
          <p className={`font-serif text-2xl ${hiddenCount > 0 ? "text-[#D4AF37]" : "text-white/50"}`}>
            {hiddenCount}
          </p>
        </div>
      </div>

      {hasUnsavedChanges ? (
        <div className="w-full px-3 py-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-sm">
          <p className="text-xs text-[#D4AF37] tracking-wide">
            <span className="mr-1.5">●</span>
            Cambios sin publicar
          </p>
        </div>
      ) : isPublished ? (
        <div className="w-full px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-sm">
          <p className="text-xs text-emerald-400 tracking-wide">
            <span className="mr-1.5">●</span>
            Borrador al día con producción
          </p>
        </div>
      ) : null}
    </div>
  );
}
