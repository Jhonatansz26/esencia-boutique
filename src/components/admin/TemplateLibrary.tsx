"use client";

import { useState, useEffect, useCallback } from "react";
import { Library, Plus, Trash2, Loader2 } from "lucide-react";
import { SectionConfig, SectionType } from "@/types/layout";
import { getSectionTemplates, deleteTemplate, SectionTemplate } from "@/app/actions/section-templates";

const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Encabezado",
  materials: "Materiales",
  "product-grid": "Catálogo",
  values: "Valores",
  reviews: "Reseñas",
  philosophy: "Filosofía",
  "promo-banner": "Banner Promocional",
};

interface TemplateLibraryProps {
  onInsertSection: (newSection: SectionConfig) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

export default function TemplateLibrary({ onInsertSection, onToast }: TemplateLibraryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [templates, setTemplates] = useState<SectionTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSectionTemplates();
      setTemplates(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && templates.length === 0) {
      loadTemplates();
    }
  }, [isOpen, templates.length, loadTemplates]);

  const handleInsert = (template: SectionTemplate) => {
    const newSection: SectionConfig = {
      id: `${template.sectionType}-${Date.now()}`,
      type: template.sectionType,
      visible: true,
      order: 9999,
      config: { ...template.config },
    };
    onInsertSection(newSection);
    onToast(`"${template.name}" añadida al lienzo.`, "success");
    setIsOpen(false);
  };

  const handleDelete = async (e: React.MouseEvent, template: SectionTemplate) => {
    e.stopPropagation();
    const confirmed = window.confirm(`¿Eliminar la plantilla "${template.name}"?`);
    if (!confirmed) return;

    setDeletingId(template.id);
    const result = await deleteTemplate(template.id);
    onToast(result.message, result.success ? "success" : "error");

    if (result.success) {
      setTemplates((prev) => prev.filter((t) => t.id !== template.id));
    }
    setDeletingId(null);
  };

  return (
    <div className="border-t border-white/10 pt-4 mt-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 px-4 py-3 rounded-sm bg-white/5 hover:bg-white/10 text-xs uppercase tracking-[0.15em] text-[#FDFBF7] transition-colors"
      >
        <Library size={14} className="text-[#D4AF37]" />
        Añadir Sección / Biblioteca
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-1.5 max-h-72 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="animate-spin text-[#D4AF37]" size={16} />
            </div>
          ) : (
            templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => handleInsert(template)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-sm bg-[#232019] border border-white/5 hover:border-[#D4AF37]/30 transition-colors text-left group"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-[#FDFBF7] truncate">{template.name}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">
                    {SECTION_TYPE_LABELS[template.sectionType]}
                    {!template.isSystem && " · Personalizada"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!template.isSystem && (
                    <span
                      role="button"
                      onClick={(e) => handleDelete(e, template)}
                      className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {deletingId === template.id ? (
                        <Loader2 className="animate-spin" size={12} />
                      ) : (
                        <Trash2 size={12} />
                      )}
                    </span>
                  )}
                  <Plus size={14} className="text-[#D4AF37]" />
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
