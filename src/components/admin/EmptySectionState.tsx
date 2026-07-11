"use client";

import { ImagePlus, PenLine, TicketPercent } from "lucide-react";
import { SectionType } from "@/types/layout";

interface EmptySectionStateProps {
  sectionType: SectionType;
  onStartEditing?: () => void;
}

const EMPTY_STATE_CONFIG: Record<SectionType, { icon: React.ElementType; message: string }> = {
  hero: {
    icon: ImagePlus,
    message: "Haz clic en el título para personalizar tu encabezado",
  },
  materials: {
    icon: ImagePlus,
    message: "Añade tus materiales haciendo clic en cada nombre",
  },
  "product-grid": {
    icon: ImagePlus,
    message: "El catálogo se genera automáticamente desde tus productos destacados",
  },
  values: {
    icon: ImagePlus,
    message: "Los valores se cargan desde la configuración de la marca",
  },
  reviews: {
    icon: ImagePlus,
    message: "Las reseñas se gestionan desde el panel de administración",
  },
  philosophy: {
    icon: PenLine,
    message: "Escribe tu misión y visión directamente aquí",
  },
  "promo-banner": {
    icon: TicketPercent,
    message: "Configura el título, imagen y fecha de expiración desde el panel lateral",
  },
};

export default function EmptySectionState({ sectionType }: EmptySectionStateProps) {
  const config = EMPTY_STATE_CONFIG[sectionType];
  const Icon = config.icon;

  return (
    <div className="border-2 border-dashed border-[#D4AF37]/30 rounded-sm py-16 px-8 bg-[#1A1A1A]/[0.02] flex flex-col items-center justify-center text-center">
      <Icon size={32} className="text-[#D4AF37]/40 mb-4" />
      <p className="text-xs text-[#1A1A1A]/50 tracking-wide font-serif italic max-w-md">
        {config.message}
      </p>
    </div>
  );
}
