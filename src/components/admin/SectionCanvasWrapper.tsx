"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Eye, EyeOff, Copy, GripVertical, BookmarkPlus, SlidersHorizontal } from "lucide-react";
import { SectionConfig } from "@/types/layout";
import { SectionThemeId } from "@/lib/section-themes";
import ThemeSelector from "@/components/admin/ThemeSelector";
import SectionContextMenu from "@/components/admin/SectionContextMenu";
import ImageFilterPanel from "@/components/admin/ImageFilterPanel";
import { type ImageFilters, DEFAULT_IMAGE_FILTERS } from "@/lib/image-filters";
import { saveAsTemplate } from "@/app/actions/section-templates";

interface SectionCanvasWrapperProps {
  section: SectionConfig;
  label: string;
  children: ReactNode;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onThemeChange: (id: string, theme: SectionThemeId) => void;
  onImageFiltersChange?: (id: string, filters: ImageFilters) => void;
  onLayoutColumnsChange?: (id: string, columns: number) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

export default function SectionCanvasWrapper({
  section,
  label,
  children,
  isFirst,
  isLast,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDuplicate,
  onDelete,
  onThemeChange,
  onImageFiltersChange,
  onLayoutColumnsChange,
  onToast,
}: SectionCanvasWrapperProps) {
  const [flashKey, setFlashKey] = useState(0);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const hasImages = !!onImageFiltersChange;
  const currentFilters = (section.config?.imageFilters as ImageFilters | undefined) ?? DEFAULT_IMAGE_FILTERS;
  const layoutColumns = section.layoutColumns ?? 12;
  const gridSpanClass = layoutColumns === 6 ? "col-span-12 md:col-span-6" : "col-span-12";

  const triggerFlash = () => {
    setFlashKey((prev) => prev + 1);
  };

  const handleMoveUp = () => {
    triggerFlash();
    onMoveUp(section.id);
  };

  const handleMoveDown = () => {
    triggerFlash();
    onMoveDown(section.id);
  };

  const handleToggleVisibility = () => {
    triggerFlash();
    onToggleVisibility(section.id);
  };

  const handleDuplicate = () => {
    triggerFlash();
    onDuplicate(section.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const openTemplateModal = () => {
    setTemplateName(label);
    setShowTemplateModal(true);
  };

  const confirmSaveTemplate = async () => {
    if (!templateName.trim()) return;
    const result = await saveAsTemplate(
      templateName.trim(),
      section.type,
      (section.config as Record<string, unknown>) ?? {}
    );
    onToast(result.message, result.success ? "success" : "error");
    setShowTemplateModal(false);
  };

  const handleFilterChange = (filters: ImageFilters) => {
    if (onImageFiltersChange) {
      onImageFiltersChange(section.id, filters);
    }
  };

  const handleSetHalfWidth = () => {
    if (onLayoutColumnsChange) {
      onLayoutColumnsChange(section.id, 6);
    }
  };

  const handleSetFullWidth = () => {
    if (onLayoutColumnsChange) {
      onLayoutColumnsChange(section.id, 12);
    }
  };

  const currentTheme = (section.config?.theme as SectionThemeId) ?? "default";

  return (
    <motion.div
      className={`relative group cursor-pointer ${gridSpanClass}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onContextMenu={handleContextMenu}
      animate={{ opacity: section.visible ? 1 : 0.4 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-20 transition-all duration-200 ${
          isSelected
            ? "outline outline-2 outline-[#D4AF37]"
            : "outline outline-1 outline-dashed outline-[#D4AF37]/20 group-hover:outline-[#D4AF37]/50"
        }`}
      />

      {isSelected && (
        <>
          <div className="absolute z-30 w-2 h-2 bg-[#D4AF37] border border-[#1A1A1A] -top-1 -left-1" />
          <div className="absolute z-30 w-2 h-2 bg-[#D4AF37] border border-[#1A1A1A] -top-1 -right-1" />
          <div className="absolute z-30 w-2 h-2 bg-[#D4AF37] border border-[#1A1A1A] -bottom-1 -left-1" />
          <div className="absolute z-30 w-2 h-2 bg-[#D4AF37] border border-[#1A1A1A] -bottom-1 -right-1" />
        </>
      )}

      {isSelected && (
        <div className="absolute -top-3 left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#1A1A1A] text-[#FDFBF7] text-[10px] uppercase tracking-widest shadow-md select-none">
          <GripVertical size={10} className="text-[#D4AF37]" />
          {label}
        </div>
      )}

      {isSelected && (
        <div className="absolute -top-3 right-4 z-30 flex items-center gap-0.5 px-1.5 py-1 rounded-sm bg-[#1A1A1A]/95 backdrop-blur-sm shadow-lg" onClick={(e) => e.stopPropagation()}>
          <button type="button" disabled={isFirst} onClick={handleMoveUp} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-[#D4AF37] disabled:opacity-20"><ArrowUp size={14} /></button>
          <button type="button" disabled={isLast} onClick={handleMoveDown} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-[#D4AF37] disabled:opacity-20"><ArrowDown size={14} /></button>
          <div className="w-px h-4 bg-white/15 mx-1" />
          <button type="button" onClick={handleToggleVisibility} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-[#D4AF37]">{section.visible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
          <div className="w-px h-4 bg-white/15 mx-1" />
          <button type="button" onClick={handleDuplicate} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-[#D4AF37]"><Copy size={14} /></button>
          <div className="w-px h-4 bg-white/15 mx-1" />
          <button type="button" onClick={openTemplateModal} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-[#D4AF37]" title="Guardar como plantilla"><BookmarkPlus size={14} /></button>
          {hasImages && (
            <>
              <div className="w-px h-4 bg-white/15 mx-1" />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilterPanel((prev) => !prev)}
                  className={`w-7 h-7 flex items-center justify-center transition-colors ${
                    showFilterPanel ? "text-[#D4AF37]" : "text-white/70 hover:text-[#D4AF37]"
                  }`}
                  title="Filtros de imagen"
                >
                  <SlidersHorizontal size={14} />
                </button>
                <AnimatePresence>
                  {showFilterPanel && (
                    <ImageFilterPanel
                      currentFilters={currentFilters}
                      onChange={handleFilterChange}
                      onClose={() => setShowFilterPanel(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
          <div className="w-px h-4 bg-white/15 mx-1" />
          <ThemeSelector
            currentTheme={currentTheme}
            onSelect={(theme) => onThemeChange(section.id, theme)}
          />
        </div>
      )}

      {children}

      <motion.div
        key={flashKey}
        className="pointer-events-none absolute inset-0 z-40 bg-[#D4AF37]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence>
        {contextMenu && (
          <SectionContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onDelete={() => onDelete(section.id)}
            onSaveTemplate={openTemplateModal}
            onSetHalfWidth={onLayoutColumnsChange ? handleSetHalfWidth : undefined}
            onSetFullWidth={onLayoutColumnsChange ? handleSetFullWidth : undefined}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTemplateModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowTemplateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-[#1A1A1A] border border-white/10 rounded-sm p-6 w-[320px] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
                Guardar como plantilla
              </p>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none mb-4"
                placeholder="Nombre de la plantilla"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmSaveTemplate();
                  if (e.key === "Escape") setShowTemplateModal(false);
                }}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmSaveTemplate}
                  className="px-3 py-1.5 text-xs bg-[#D4AF37] text-[#1A1A1A] font-medium rounded-sm hover:bg-[#c19f2f] transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
