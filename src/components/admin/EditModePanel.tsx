"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Save, LayoutPanelTop, X, Globe, Trash2 } from "lucide-react";
import { SectionConfig } from "@/types/layout";
import { getPageLayout, updatePageLayout } from "@/lib/page-layout";
import DraggableSectionList from "@/components/admin/DraggableSectionList";
import PublishHistoryPanel from "@/components/admin/PublishHistoryPanel";
import TemplateLibrary from "@/components/admin/TemplateLibrary";
import CanvasMetrics from "@/components/admin/CanvasMetrics";
import BrandIdentityPanel from "@/components/admin/BrandIdentityPanel";

interface Toast {
  message: string;
  type: "success" | "error";
}

interface EditModePanelBaseProps {
  pageSlug?: string;
}

interface EditModePanelStandaloneProps extends EditModePanelBaseProps {
  mode?: "standalone";
}

interface EditModePanelCanvasProps extends EditModePanelBaseProps {
  mode: "canvas";
  sections: SectionConfig[];
  originalSections: SectionConfig[];
  onSectionsChange: (sections: SectionConfig[]) => void;
  onSave: (sections: SectionConfig[]) => Promise<boolean>;
  onPublish: () => Promise<{ success: boolean; message: string }>;
  onDiscardDraft: () => Promise<{ success: boolean; message: string }>;
  onInsertSection: (section: SectionConfig) => void;
  isPublishing: boolean;
  lastPublishedAt: string | null;
  onDraftDiscarded: () => void;
}

type EditModePanelProps = EditModePanelStandaloneProps | EditModePanelCanvasProps;

function isCanvasMode(props: EditModePanelProps): props is EditModePanelCanvasProps {
  return props.mode === "canvas";
}

export default function EditModePanel(props: EditModePanelProps) {
  const canvas = isCanvasMode(props);
  const pageSlug = props.pageSlug ?? "home";

  const [internalSections, setInternalSections] = useState<SectionConfig[]>([]);
  const [originalSections, setOriginalSections] = useState<SectionConfig[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const sections = canvas ? props.sections : internalSections;
  const setSections = canvas ? props.onSectionsChange : setInternalSections;

  const showToast = useCallback((toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadLayout = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPageLayout(pageSlug);
      setSections(data);
      setOriginalSections(data);
    } catch (error) {
      console.error("Error loading page layout:", error);
      showToast({ message: "No se pudo cargar el layout actual.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [pageSlug, showToast, setSections]);

  useEffect(() => {
    if (!canvas && isOpen) {
      loadLayout();
    }
  }, [isOpen, loadLayout, canvas]);

  const hasUnsavedChanges = canvas
    ? JSON.stringify(sections) !== JSON.stringify(props.originalSections)
    : JSON.stringify(sections) !== JSON.stringify(originalSections);

  const handleSave = async () => {
    setSaving(true);
    try {
      let success: boolean;
      if (canvas) {
        success = await props.onSave(sections);
      } else {
        success = await updatePageLayout(sections, pageSlug);
      }

      if (success) {
        setOriginalSections(sections);
        showToast({ message: "Layout actualizado con éxito.", type: "success" });
      } else {
        showToast({ message: "Error al guardar los cambios.", type: "error" });
      }
    } catch (error) {
      console.error("Error saving page layout:", error);
      showToast({ message: "Error inesperado al guardar.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    const original = canvas ? props.originalSections : originalSections;
    setSections(original);
  };

  const handlePublish = async () => {
    if (!canvas) return;
    const result = await props.onPublish();
    showToast({
      message: result.message,
      type: result.success ? "success" : "error",
    });
  };

  const handleDiscardDraft = async () => {
    if (!canvas) return;
    const confirmed = window.confirm(
      "¿Descartar todos los cambios del borrador y volver a la versión publicada? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    const result = await props.onDiscardDraft();
    showToast({
      message: result.message,
      type: result.success ? "success" : "error",
    });
    if (result.success) {
      props.onDraftDiscarded();
    }
  };

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "hace un momento";
    if (diffMin < 60) return `hace ${diffMin} min`;
    if (diffHour < 24) return `hace ${diffHour}h`;
    if (diffDay < 7) return `hace ${diffDay}d`;
    return date.toLocaleDateString("es-CO");
  };

  if (canvas) {
    return (
      <div className="fixed top-0 left-0 h-full w-[360px] z-[90] bg-[#1A1A1A] shadow-2xl flex flex-col" title="Arrastra para reordenar, haz clic en cualquier texto para editarlo, Cmd+S para guardar rápido">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
              Modo Canva
            </p>
            <h2 className="font-serif text-lg text-[#FDFBF7] tracking-wide">
              Editor Visual
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-xs text-white/40 leading-relaxed mb-6">
            Arrastra las secciones para reordenarlas, usa el interruptor
            para mostrarlas u ocultarlas. Haz clic en los textos del lienzo para editarlos en vivo.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#D4AF37]" size={22} />
            </div>
          ) : (
            <>
              <CanvasMetrics
                sections={sections}
                hasUnsavedChanges={hasUnsavedChanges}
                isPublished={props.lastPublishedAt !== null}
              />
              <DraggableSectionList sections={sections} onChange={setSections} />
            </>
          )}

          <PublishHistoryPanel
            pageSlug={pageSlug}
            onRollbackSuccess={props.onDraftDiscarded}
            onToast={(message, type) => showToast({ message, type })}
          />

          <TemplateLibrary
            onInsertSection={props.onInsertSection}
            onToast={(message, type) => showToast({ message, type })}
          />

          <BrandIdentityPanel
            onTokenChange={() => {}}
            onToast={(message, type) => showToast({ message, type })}
          />
        </div>

        <div className="px-6 py-5 border-t border-white/10 flex flex-col gap-3">
          {hasUnsavedChanges && (
            <p className="text-[11px] text-[#D4AF37] tracking-wide text-center">
              Tienes cambios sin guardar
            </p>
          )}

          <button
            type="button"
            onClick={handlePublish}
            disabled={props.isPublishing || hasUnsavedChanges}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#D4AF37] text-[#1A1A1A] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#c19f2f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {props.isPublishing ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Globe size={14} />
            )}
            {props.isPublishing ? "Publicando..." : "Publicar Cambios"}
          </button>

          {props.lastPublishedAt && (
            <p className="text-[10px] text-white/40 tracking-wide text-center">
              Última publicación: {formatRelativeTime(props.lastPublishedAt)}
            </p>
          )}

          <div className="flex gap-2">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="flex-1 px-4 py-3 text-xs uppercase tracking-wider text-white/60 hover:text-white border border-white/15 rounded-sm transition-colors disabled:opacity-40"
              >
                Descartar
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading || !hasUnsavedChanges}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Guardando..." : "Guardar Borrador"}
            </button>
          </div>

          <button
            type="button"
            onClick={handleDiscardDraft}
            disabled={props.isPublishing}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-wider text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-40"
          >
            <Trash2 size={12} />
            Descartar borrador completo
          </button>
        </div>

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

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[80] flex items-center gap-2 px-5 py-3 rounded-sm bg-[#1A1A1A] text-[#FDFBF7] text-sm tracking-wide shadow-lg hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <LayoutPanelTop size={16} />
        Modo Diseñador
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[360px] z-[90] bg-[#1A1A1A] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
              Modo Diseñador
            </p>
            <h2 className="font-serif text-lg text-[#FDFBF7] tracking-wide">
              Estructura de Home
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Cerrar panel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-xs text-white/40 leading-relaxed mb-6">
            Arrastra las secciones para reordenarlas y usa el interruptor
            para mostrarlas u ocultarlas en la página principal.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#D4AF37]" size={22} />
            </div>
          ) : (
            <DraggableSectionList sections={sections} onChange={setSections} />
          )}
        </div>

        <div className="px-6 py-5 border-t border-white/10 flex flex-col gap-3">
          {hasUnsavedChanges && (
            <p className="text-[11px] text-[#D4AF37] tracking-wide text-center">
              Tienes cambios sin guardar
            </p>
          )}

          <div className="flex gap-2">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="flex-1 px-4 py-3 text-xs uppercase tracking-wider text-white/60 hover:text-white border border-white/15 rounded-sm transition-colors disabled:opacity-40"
              >
                Descartar
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading || !hasUnsavedChanges}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#D4AF37] text-[#1A1A1A] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#c19f2f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Save size={14} />
              )}
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-[2px] sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

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
    </>
  );
}
