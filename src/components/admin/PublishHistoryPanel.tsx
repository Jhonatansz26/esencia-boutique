"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, History, RotateCcw, Loader2 } from "lucide-react";
import { getPublishHistory, rollbackToVersion, HistoryEntry } from "@/app/actions/publish-layout";

interface PublishHistoryPanelProps {
  pageSlug?: string;
  onRollbackSuccess: () => void;
  onToast: (message: string, type: "success" | "error") => void;
}

export default function PublishHistoryPanel({
  pageSlug = "home",
  onRollbackSuccess,
  onToast,
}: PublishHistoryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPublishHistory(pageSlug, 10);
      setHistory(data);
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => {
    if (isExpanded && history.length === 0) {
      loadHistory();
    }
  }, [isExpanded, history.length, loadHistory]);

  const handleRestore = async (entry: HistoryEntry) => {
    const confirmed = window.confirm(
      "¿Restaurar esta versión en tu borrador actual? Perderás los cambios que no hayas guardado."
    );
    if (!confirmed) return;

    setRestoringId(entry.id);
    try {
      const result = await rollbackToVersion(entry.id, pageSlug);
      onToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onRollbackSuccess();
      }
    } finally {
      setRestoringId(null);
    }
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formatter.format(date);
  };

  return (
    <div className="border-t border-white/10 pt-4 mt-2">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60 group-hover:text-white/90 transition-colors">
          <History size={14} />
          Historial de Cambios
        </span>
        <ChevronDown
          size={14}
          className={`text-white/40 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-3 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="animate-spin text-[#D4AF37]" size={16} />
            </div>
          ) : history.length === 0 ? (
            <p className="text-xs text-white/30 py-4 text-center">
              Aún no hay publicaciones registradas.
            </p>
          ) : (
            history.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-sm bg-[#232019] border border-white/5"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-[#FDFBF7] truncate">
                    {formatDate(entry.publishedAt)}
                  </span>
                  {index === 0 && (
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wide">
                      Versión actual
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRestore(entry)}
                  disabled={restoringId === entry.id || index === 0}
                  title={index === 0 ? "Esta ya es la versión publicada" : "Restaurar esta versión"}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] uppercase tracking-wide text-white/50 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {restoringId === entry.id ? (
                    <Loader2 className="animate-spin" size={11} />
                  ) : (
                    <RotateCcw size={11} />
                  )}
                  Restaurar
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
