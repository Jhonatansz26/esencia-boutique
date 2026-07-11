"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { arrayMove } from "@dnd-kit/sortable";
import { Undo2, Redo2, Layers, ChevronDown } from "lucide-react";
import { SectionConfig, SectionType } from "@/types/layout";
import DevicePreviewToggle, { type ViewportMode } from "@/components/admin/DevicePreviewToggle";
import { SectionThemeId } from "@/lib/section-themes";
import { type ImageFilters } from "@/lib/image-filters";
import { getPageLayout, updatePageLayout, toDraftSlug } from "@/lib/page-layout";
import { publishLayout, discardDraft } from "@/app/actions/publish-layout";
import { getDesignTokens, type DesignTokens } from "@/app/actions/design-tokens";
import { getRegisteredPages, type RegisteredPage } from "@/app/actions/page-registry";
import { useUndoStack } from "@/hooks/useUndoStack";
import Hero from "@/components/sections/Hero";
import Materials from "@/components/sections/Materials";
import ProductGridPreview from "@/components/admin/ProductGridPreview";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";
import Philosophy from "@/components/sections/Philosophy";
import PromoBanner from "@/components/sections/PromoBanner";
import SectionDivider from "@/components/common/SectionDivider";
import EditModePanel from "@/components/admin/EditModePanel";
import SectionCanvasWrapper from "@/components/admin/SectionCanvasWrapper";
import VisualEditorSkeleton from "@/components/admin/VisualEditorSkeleton";
import UnsavedChangesModal from "@/components/admin/UnsavedChangesModal";
import DesignerTipBanner from "@/components/admin/DesignerTipBanner";

const SECTION_REGISTRY: Record<string, React.ComponentType<Record<string, unknown>>> = {
  materials: Materials,
  "product-grid": ProductGridPreview,
  values: Values,
  reviews: Reviews,
  philosophy: Philosophy,
  "promo-banner": PromoBanner,
};

const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Encabezado Principal",
  materials: "Materiales",
  "product-grid": "Catálogo de Piezas",
  values: "Lujo sin Exceso",
  reviews: "Experiencias Esencia",
  philosophy: "Nuestra Esencia",
  "promo-banner": "Banner Promocional",
};

export default function VisualEditorPage() {
  const router = useRouter();
  const {
    state: sections,
    push: undoPush,
    undo: undoFn,
    redo: redoFn,
    reset: undoReset,
    canUndo,
    canRedo,
  } = useUndoStack<SectionConfig[]>([]);
  const [mutationCount, setMutationCount] = useState(0);
  const [originalSections, setOriginalSections] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [designTokens, setDesignTokens] = useState<DesignTokens | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>("home");
  const [registeredPages, setRegisteredPages] = useState<RegisteredPage[]>([]);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const VIEWPORT_DIMENSIONS: Record<ViewportMode, { width: string; isDevice: boolean }> = {
    desktop: { width: "100%", isDevice: false },
    tablet: { width: "768px", isDevice: true },
    mobile: { width: "375px", isDevice: true },
  };

  const currentViewport = VIEWPORT_DIMENSIONS[viewportMode];

  const hasUnsavedChanges = mutationCount > 0;

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const updateSections = useCallback(
    (updater: (prev: SectionConfig[]) => SectionConfig[]) => {
      undoPush(updater);
      setMutationCount((prev) => prev + 1);
    },
    [undoPush]
  );

  const handleUndo = useCallback(() => {
    undoFn();
    setMutationCount((prev) => prev + 1);
  }, [undoFn]);

  const handleRedo = useCallback(() => {
    redoFn();
    setMutationCount((prev) => prev + 1);
  }, [redoFn]);

  useEffect(() => {
    const loadLayout = async () => {
      try {
        const pages = await getRegisteredPages();
        setRegisteredPages(pages);

        const draftData = await getPageLayout(toDraftSlug(activeSlug));
        undoReset(draftData);
        setOriginalSections(draftData);

        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from("page_layout")
          .select("published_at")
          .eq("page_slug", activeSlug)
          .single();
        if (data?.published_at) {
          setLastPublishedAt(data.published_at);
        }

        const tokens = await getDesignTokens();
        setDesignTokens(tokens);
      } catch (error) {
        console.error("Error loading layout:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heroSection = sections.find((s) => s.type === "hero");

  const orderedVisibleSections = sections
    .filter((s) => s.visible && s.type !== "hero")
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = useCallback(async (updatedSections: SectionConfig[]) => {
    const success = await updatePageLayout(updatedSections, toDraftSlug(activeSlug));
    if (success) {
      setOriginalSections(updatedSections);
      setMutationCount(0);
    }
    return success;
  }, [activeSlug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSaveShortcut = (e.metaKey || e.ctrlKey) && e.key === "s";
      if (isSaveShortcut) {
        e.preventDefault();
        if (hasUnsavedChanges) handleSave(sections);
        return;
      }

      const isUndo = (e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey;
      if (isUndo) {
        e.preventDefault();
        handleUndo();
        return;
      }

      const isRedo = (e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey;
      if (isRedo) {
        e.preventDefault();
        handleRedo();
        return;
      }

      const activeElement = document.activeElement;
      const isEditableField =
        activeElement?.getAttribute("contenteditable") === "true" ||
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA";

      if (isEditableField) return;

      if (e.key === "Escape" && selectedSectionId) {
        e.preventDefault();
        setSelectedSectionId(null);
        return;
      }

      if ((e.key === "ArrowUp" || e.key === "ArrowDown") && selectedSectionId) {
        e.preventDefault();
        const allSections = [
          ...(heroSection ? [heroSection] : []),
          ...orderedVisibleSections,
        ];
        const currentIndex = allSections.findIndex((s) => s.id === selectedSectionId);

        if (e.key === "ArrowUp" && currentIndex > 0) {
          const newId = allSections[currentIndex - 1].id;
          setSelectedSectionId(newId);
          const ref = sectionRefs.current.get(newId);
          ref?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (e.key === "ArrowDown" && currentIndex < allSections.length - 1) {
          const newId = allSections[currentIndex + 1].id;
          setSelectedSectionId(newId);
          const ref = sectionRefs.current.get(newId);
          ref?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, handleSave, sections, selectedSectionId, heroSection, orderedVisibleSections, handleUndo, handleRedo]);

  const handleBackClick = useCallback(
    (e: React.MouseEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        setShowUnsavedModal(true);
      }
    },
    [hasUnsavedChanges]
  );

  const handleConfirmLeave = useCallback(() => {
    setShowUnsavedModal(false);
    router.push("/admin");
  }, [router]);

  const handleSaveAndLeave = useCallback(async () => {
    await handleSave(sections);
    setShowUnsavedModal(false);
    router.push("/admin");
  }, [sections, handleSave, router]);

  const handleCancelLeave = useCallback(() => {
    setShowUnsavedModal(false);
  }, []);

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    try {
      const result = await publishLayout(activeSlug);
      if (result.success) {
        setLastPublishedAt(new Date().toISOString());
      }
      return result;
    } finally {
      setIsPublishing(false);
    }
  }, [activeSlug]);

  const handleDiscardDraft = useCallback(async () => {
    const result = await discardDraft(activeSlug);
    return result;
  }, [activeSlug]);

  const handleDraftDiscarded = useCallback(async () => {
    const draftData = await getPageLayout(toDraftSlug(activeSlug));
    undoReset(draftData);
    setOriginalSections(draftData);
    setMutationCount(0);
  }, [activeSlug, undoReset]);

  const handleThemeChange = useCallback(
    (id: string, theme: SectionThemeId) => {
      updateSections((prev) =>
        prev.map((section) => {
          if (section.id === id) {
            return { ...section, config: { ...section.config, theme } };
          }
          return section;
        })
      );
    },
    [updateSections]
  );

  const handleImageFiltersChange = useCallback(
    (id: string, filters: ImageFilters) => {
      updateSections((prev) =>
        prev.map((section) => {
          if (section.id === id) {
            return { ...section, config: { ...section.config, imageFilters: filters } };
          }
          return section;
        })
      );
    },
    [updateSections]
  );

  const handleLayoutColumnsChange = useCallback(
    (id: string, columns: number) => {
      updateSections((prev) =>
        prev.map((section) => {
          if (section.id === id) {
            return { ...section, layoutColumns: columns };
          }
          return section;
        })
      );
    },
    [updateSections]
  );

  const handlePageChange = useCallback(
    async (newSlug: string) => {
      if (newSlug === activeSlug) return;
      setShowPageDropdown(false);
      setSelectedSectionId(null);
      setLoading(true);
      setActiveSlug(newSlug);

      try {
        const draftData = await getPageLayout(toDraftSlug(newSlug));
        undoReset(draftData);
        setOriginalSections(draftData);
        setMutationCount(0);

        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from("page_layout")
          .select("published_at")
          .eq("page_slug", newSlug)
          .single();
        if (data?.published_at) {
          setLastPublishedAt(data.published_at);
        } else {
          setLastPublishedAt(null);
        }
      } catch (error) {
        console.error("Error loading page layout:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeSlug, undoReset]
  );

  const handleInsertSection = useCallback(
    (newSection: SectionConfig) => {
      updateSections((prev) => {
        const maxOrder = prev.length > 0 ? Math.max(...prev.map((s) => s.order)) : 0;
        return [...prev, { ...newSection, order: maxOrder + 1 }];
      });
    },
    [updateSections]
  );

  const createConfigUpdater = useCallback(
    (sectionId: string) => (key: string, value: unknown) => {
      updateSections((prev) =>
        prev.map((section) => {
          if (section.id === sectionId) {
            return { ...section, config: { ...section.config, [key]: value } };
          }
          return section;
        })
      );
    },
    [updateSections]
  );

  const handleMoveUp = useCallback(
    (id: string) => {
      updateSections((prev) => {
        const ordered = [...prev].sort((a, b) => a.order - b.order);
        const index = ordered.findIndex((s) => s.id === id);
        if (index <= 0) return prev;
        return arrayMove(ordered, index, index - 1).map((s, i) => ({
          ...s,
          order: i,
        }));
      });
    },
    [updateSections]
  );

  const handleMoveDown = useCallback(
    (id: string) => {
      updateSections((prev) => {
        const ordered = [...prev].sort((a, b) => a.order - b.order);
        const index = ordered.findIndex((s) => s.id === id);
        if (index === -1 || index >= ordered.length - 1) return prev;
        return arrayMove(ordered, index, index + 1).map((s, i) => ({
          ...s,
          order: i,
        }));
      });
    },
    [updateSections]
  );

  const handleToggleVisibility = useCallback(
    (id: string) => {
      updateSections((prev) =>
        prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
      );
    },
    [updateSections]
  );

  const handleDuplicate = useCallback(
    (id: string) => {
      updateSections((prev) => {
        const source = prev.find((s) => s.id === id);
        if (!source) return prev;
        const newId = `${source.id}-copy-${Date.now()}`;
        const duplicated: SectionConfig = {
          ...source,
          id: newId,
          order: prev.length,
        };
        return [...prev, duplicated];
      });
    },
    [updateSections]
  );

  const handleDelete = useCallback(
    (id: string) => {
      updateSections((prev) => prev.filter((s) => s.id !== id));
    },
    [updateSections]
  );

  if (loading) {
    return <VisualEditorSkeleton />;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {designTokens && (
        <style>{`
          :root {
            --color-brand-primary: ${designTokens.color.primary};
            --color-brand-surface: ${designTokens.color.surface};
            --color-brand-text: ${designTokens.color.text};
            --font-brand-heading: ${designTokens.font.heading}, serif;
            --font-brand-body: ${designTokens.font.body}, sans-serif;
            --radius-brand-base: ${designTokens.radius.base};
          }
        `}</style>
      )}
      <EditModePanel
        mode="canvas"
        pageSlug={activeSlug}
        sections={sections}
        originalSections={originalSections}
        onSectionsChange={(newSections) => updateSections(() => newSections)}
        onSave={handleSave}
        onPublish={handlePublish}
        onDiscardDraft={handleDiscardDraft}
        onInsertSection={handleInsertSection}
        isPublishing={isPublishing}
        lastPublishedAt={lastPublishedAt}
        onDraftDiscarded={handleDraftDiscarded}
      />

      <div className="flex-1 ml-[360px] overflow-y-auto">
        <div className="sticky top-0 z-40 bg-[#FDFBF7] border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Vista Previa en Vivo
            </p>
            <div className="flex items-center gap-1 ml-3">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo}
                className={`w-7 h-7 flex items-center justify-center rounded-sm transition-all ${
                  canUndo
                    ? "text-[#1A1A1A] hover:bg-gray-100 hover:text-[#D4AF37]"
                    : "text-gray-300 opacity-30 cursor-not-allowed"
                }`}
                title="Deshacer (Cmd+Z)"
              >
                <Undo2 size={14} />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={!canRedo}
                className={`w-7 h-7 flex items-center justify-center rounded-sm transition-all ${
                  canRedo
                    ? "text-[#1A1A1A] hover:bg-gray-100 hover:text-[#D4AF37]"
                    : "text-gray-300 opacity-30 cursor-not-allowed"
                }`}
                title="Rehacer (Cmd+Shift+Z)"
              >
                <Redo2 size={14} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DevicePreviewToggle mode={viewportMode} onChange={setViewportMode} />
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#1A1A1A] hover:text-[#D4AF37] border border-gray-200 hover:border-[#D4AF37]/50 rounded-sm transition-colors"
              >
                <Layers size={14} />
                <span className="uppercase tracking-wider">
                  {registeredPages.find((p) => p.slug === activeSlug)?.label ?? "Home"}
                </span>
                <ChevronDown size={12} className={`transition-transform ${showPageDropdown ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showPageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full right-0 mt-1 z-50 min-w-[160px] bg-[#1A1A1A] border border-white/10 rounded-sm shadow-2xl py-1"
                  >
                    {registeredPages.map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => handlePageChange(page.slug)}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                          page.slug === activeSlug
                            ? "text-[#D4AF37] bg-white/5"
                            : "text-white/80 hover:bg-white/5 hover:text-[#D4AF37]"
                        }`}
                      >
                        {page.label}
                        {page.is_system && (
                          <span className="ml-2 text-[9px] text-white/40 uppercase">Sistema</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBackClick}
            className="text-xs text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
          >
            Volver al Panel
          </button>
        </div>

        <main onClick={() => setSelectedSectionId(null)} className="flex justify-center py-6 px-4 bg-[#F0EDE8] min-h-[calc(100vh-57px)]">
          <motion.div
            animate={{ width: currentViewport.width }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`mx-auto bg-[#FAF7F2] overflow-hidden ${
              currentViewport.isDevice
                ? "shadow-2xl border border-white/10 rounded-[2rem] ring-4 ring-[#1A1A1A]/5"
                : "shadow-lg border border-white/10"
            }`}
          >
            <div className="overflow-y-auto overflow-x-hidden">
              <DesignerTipBanner />
              <div className="grid grid-cols-12 gap-4 px-4 py-6">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="col-span-12"
                  ref={(el) => {
                    if (el && heroSection) {
                      sectionRefs.current.set(heroSection.id, el);
                    }
                  }}
                >
                  <SectionCanvasWrapper
                    section={heroSection ?? { id: "hero", type: "hero", visible: true, order: 0 }}
                    label={SECTION_LABELS.hero}
                    isFirst={true}
                    isLast={orderedVisibleSections.length === 0}
                    isSelected={selectedSectionId === (heroSection?.id ?? "hero")}
                    onSelect={() => setSelectedSectionId(heroSection?.id ?? "hero")}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onToggleVisibility={handleToggleVisibility}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    onThemeChange={handleThemeChange}
                    onImageFiltersChange={handleImageFiltersChange}
                    onLayoutColumnsChange={handleLayoutColumnsChange}
                    onToast={showToast}
                  >
                    <Hero
                      editable
                      editableConfig={heroSection?.config}
                      onUpdateConfig={createConfigUpdater(heroSection?.id ?? "hero")}
                    />
                  </SectionCanvasWrapper>
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {orderedVisibleSections.map((section, index) => {
                    const SectionComponent = SECTION_REGISTRY[section.type];
                    if (!SectionComponent) return null;

                    const isEditable = section.type === "materials" || section.type === "philosophy";
                    const sectionLabel = SECTION_LABELS[section.type] ?? section.type;

                    return (
                      <motion.div
                        key={section.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={section.layoutColumns === 6 ? "col-span-12 md:col-span-6" : "col-span-12"}
                        ref={(el) => {
                          if (el) {
                            sectionRefs.current.set(section.id, el);
                          }
                        }}
                      >
                        <SectionCanvasWrapper
                          section={section}
                          label={sectionLabel}
                          isFirst={index === 0}
                          isLast={index === orderedVisibleSections.length - 1}
                          isSelected={selectedSectionId === section.id}
                          onSelect={() => setSelectedSectionId(section.id)}
                          onMoveUp={handleMoveUp}
                          onMoveDown={handleMoveDown}
                          onToggleVisibility={handleToggleVisibility}
                          onDuplicate={handleDuplicate}
                          onDelete={handleDelete}
                          onThemeChange={handleThemeChange}
                          onImageFiltersChange={
                            section.type === "materials" || section.type === "promo-banner"
                              ? handleImageFiltersChange
                              : undefined
                          }
                          onLayoutColumnsChange={handleLayoutColumnsChange}
                          onToast={showToast}
                        >
                          <SectionComponent
                            config={section.config}
                            editableConfig={section.config}
                            {...(isEditable && {
                              editable: true,
                              onUpdateConfig: createConfigUpdater(section.id),
                            })}
                          />
                        </SectionCanvasWrapper>
                        {index < orderedVisibleSections.length - 1 && section.layoutColumns !== 6 && <SectionDivider />}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        onConfirmLeave={handleConfirmLeave}
        onCancel={handleCancelLeave}
        onSaveAndLeave={handleSaveAndLeave}
      />

      {toast && (
        <div
          className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-sm shadow-lg border backdrop-blur-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-[#1A1A1A] border-[#D4AF37]/40 text-[#FDFBF7]"
              : "bg-[#1A1A1A] border-red-900/50 text-[#FDFBF7]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              toast.type === "success" ? "bg-[#D4AF37]" : "bg-red-500"
            }`}
          />
          <p className="text-sm tracking-wide">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
