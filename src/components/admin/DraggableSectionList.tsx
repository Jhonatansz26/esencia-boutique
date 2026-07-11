"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { SectionConfig, SectionType } from "@/types/layout";

interface DraggableSectionListProps {
  sections: SectionConfig[];
  onChange: (sections: SectionConfig[]) => void;
}

const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Encabezado Principal",
  materials: "Materiales",
  "product-grid": "Catálogo de Piezas",
  values: "Lujo sin Exceso",
  reviews: "Experiencias Esencia",
  philosophy: "Nuestra Esencia",
  "promo-banner": "Banner Promocional",
};

export default function DraggableSectionList({
  sections,
  onChange,
}: DraggableSectionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const orderedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedSections.findIndex((s) => s.id === active.id);
    const newIndex = orderedSections.findIndex((s) => s.id === over.id);

    const reordered = arrayMove(orderedSections, oldIndex, newIndex).map(
      (section, index) => ({ ...section, order: index })
    );

    onChange(reordered);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = sections.map((section) =>
      section.id === id ? { ...section, visible: !section.visible } : section
    );
    onChange(updated);
  };

  const handleConfigChange = (id: string, key: string, value: string) => {
    const updated = sections.map((section) =>
      section.id === id
        ? { ...section, config: { ...section.config, [key]: value } }
        : section
    );
    onChange(updated);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedSections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {orderedSections.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              label={SECTION_LABELS[section.type] ?? section.type}
              onToggleVisibility={handleToggleVisibility}
              onConfigChange={handleConfigChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface SortableSectionItemProps {
  section: SectionConfig;
  label: string;
  onToggleVisibility: (id: string) => void;
  onConfigChange: (id: string, key: string, value: string) => void;
}

function SortableSectionItem({
  section,
  label,
  onToggleVisibility,
  onConfigChange,
}: SortableSectionItemProps) {
  const [showConfig, setShowConfig] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col rounded-sm border px-3 py-3 transition-colors duration-200 ${
        isDragging
          ? "border-[#D4AF37]/50 bg-[#1A1A1A]/90 shadow-lg z-10"
          : "border-white/10 bg-[#232019] hover:border-white/20"
      } ${!section.visible ? "opacity-50" : "opacity-100"}`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="shrink-0 text-white/40 hover:text-[#D4AF37] cursor-grab active:cursor-grabbing transition-colors touch-none"
          aria-label={`Reordenar ${label}`}
        >
          <GripVertical size={18} />
        </button>

        <span className="flex-1 text-sm text-[#FDFBF7] tracking-wide truncate">
          {label}
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={section.visible}
          aria-label={`${section.visible ? "Ocultar" : "Mostrar"} ${label}`}
          onClick={() => onToggleVisibility(section.id)}
          className={`relative shrink-0 w-9 h-5 rounded-full transition-colors duration-300 ${
            section.visible ? "bg-[#D4AF37]" : "bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#FDFBF7] shadow-sm transition-transform duration-300 ${
              section.visible ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {section.type === "promo-banner" && section.visible && (
        <div className="w-full mt-3 pt-3 border-t border-white/5 flex flex-col gap-3 text-left">
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="text-[11px] uppercase tracking-wider text-[#D4AF37] hover:underline self-start"
          >
            {showConfig ? "▲ Ocultar Configuración" : "▼ Ajustar Detalles de Oferta"}
          </button>
          
          {showConfig && (
            <div className="flex flex-col gap-2 bg-black/20 p-3 rounded-sm border border-white/5">
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Título de la Promoción</label>
                <input
                  type="text"
                  value={(section.config?.title as string) || ""}
                  onChange={(e) => onConfigChange(section.id, "title", e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm px-2 py-1.5 text-xs text-white focus:border-[#D4AF37] outline-none"
                  placeholder="Ej: 2x1 en Manillas de Acero"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Fecha de Vencimiento (Expiración)</label>
                <input
                  type="datetime-local"
                  value={(section.config?.expiresAt as string) || ""}
                  onChange={(e) => onConfigChange(section.id, "expiresAt", e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm px-2 py-1.5 text-xs text-white focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Ruta Imagen de Fondo (URL/Path)</label>
                <input
                  type="text"
                  value={(section.config?.image as string) || ""}
                  onChange={(e) => onConfigChange(section.id, "image", e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm px-2 py-1.5 text-xs text-white focus:border-[#D4AF37] outline-none"
                  placeholder="Ej: /images/hero-bg.jpg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
