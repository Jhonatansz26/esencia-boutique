"use client";

import { useState } from "react";
import { Star, X, Edit2, Trash2, Plus } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import EditableText from "@/components/admin/EditableText";
import { SECTION_THEMES, SectionThemeId } from "@/lib/section-themes";
import { type ReviewsConfig, type ReviewItem, REVIEWS_DEFAULTS, REVIEWS_INITIAL_ITEMS } from "@/types/sections";

interface ReviewsProps {
  config?: ReviewsConfig;
  editableConfig?: ReviewsConfig;
  editable?: boolean;
  onUpdateConfig?: (key: string, value: unknown) => void;
}

export default function Reviews({
  config,
  editableConfig,
  editable = false,
  onUpdateConfig,
}: ReviewsProps) {
  const activeConfig = editable ? (editableConfig ?? config) : config;

  const themeId = (activeConfig?.theme as SectionThemeId) ?? "default";
  const theme = SECTION_THEMES[themeId];

  const sectionTitle = activeConfig?.sectionTitle || REVIEWS_DEFAULTS.sectionTitle;
  const sectionSubtitle = activeConfig?.sectionSubtitle || REVIEWS_DEFAULTS.sectionSubtitle;
  const items = activeConfig?.items ?? REVIEWS_INITIAL_ITEMS;

  // -- Visitor State (Public Modal) --
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorRating, setVisitorRating] = useState(5);
  const [visitorHoverRating, setVisitorHoverRating] = useState(0);
  const [visitorComment, setVisitorComment] = useState("");

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorComment.trim()) return;
    setIsModalOpen(false);
    setVisitorName("");
    setVisitorRating(5);
    setVisitorComment("");
    // Note: No real persistence in Sprint 3 for visitor reviews. Wait for the database schema.
  };

  // -- Admin State (Inline Moderation) --
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("");
  const [adminRating, setAdminRating] = useState(5);
  const [adminHoverRating, setAdminHoverRating] = useState(0);
  const [adminComment, setAdminComment] = useState("");
  const [adminDate, setAdminDate] = useState("");

  const startEdit = (review?: ReviewItem) => {
    if (review) {
      setEditingReviewId(review.id);
      setAdminName(review.name);
      setAdminRating(review.rating);
      setAdminComment(review.comment);
      setAdminDate(review.date);
    } else {
      setEditingReviewId("new");
      setAdminName("");
      setAdminRating(5);
      setAdminComment("");
      setAdminDate(new Date().toISOString().split("T")[0]);
    }
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
  };

  const deleteReview = (id: string) => {
    if (!onUpdateConfig) return;
    const updated = items.filter((r) => r.id !== id);
    onUpdateConfig("items", updated);
  };

  const upsertReview = () => {
    if (!onUpdateConfig || !adminName.trim() || !adminComment.trim()) return;
    const reviewId = editingReviewId === "new" ? `rev-${Date.now()}` : editingReviewId!;
    const review: ReviewItem = {
      id: reviewId,
      name: adminName.trim(),
      rating: adminRating,
      comment: adminComment.trim(),
      date: adminDate || new Date().toISOString().split("T")[0],
    };

    const exists = items.some((r) => r.id === review.id);
    const updated = exists ? items.map((r) => (r.id === review.id ? review : r)) : [...items, review];
    onUpdateConfig("items", updated);
    setEditingReviewId(null);
  };

  const editRingClass =
    "cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] " +
    "hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 " +
    "focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1 inline-block";

  return (
    <section className={`pb-20 ${theme.bgClass} ${theme.textClass}`}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="pt-20">
        {editable && onUpdateConfig ? (
          <div className="text-center">
            <EditableText
              as="p"
              value={sectionSubtitle}
              onCommit={(v) => onUpdateConfig("sectionSubtitle", v)}
              className={`text-sm uppercase tracking-widest text-gray-500 mb-2 ${editRingClass}`}
            />
            <div>
              <EditableText
                as="h2"
                value={sectionTitle}
                onCommit={(v) => onUpdateConfig("sectionTitle", v)}
                enableAI
                className={`font-serif text-4xl text-[#1A1A1A] tracking-wide ${editRingClass}`}
              />
            </div>
          </div>
        ) : (
          <SectionTitle
            title={sectionTitle}
            subtitle={sectionSubtitle}
            alignment="center"
          />
        )}
      </div>

      {/* ── Content Area ───────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        
        {editable && onUpdateConfig ? (
          /* ADMIN MODERATION PANEL */
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-black/5 p-4 rounded-md border border-black/10">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-[#1A1A1A]">
                Gestión de Testimonios
              </h3>
              <Button onClick={() => startEdit()} variant="invert" className="py-2 text-xs">
                <Plus size={14} className="inline mr-1" />
                Agregar Nuevo
              </Button>
            </div>

            {editingReviewId && (
              <div className="bg-[#FAF7F2] p-6 rounded-md border border-[#D4AF37]/40 shadow-sm animate-in fade-in slide-in-from-top-4">
                <h4 className="font-medium text-[#1A1A1A] mb-4">
                  {editingReviewId === "new" ? "Nuevo Testimonio" : "Editar Testimonio"}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Fecha</label>
                    <input
                      type="date"
                      value={adminDate}
                      onChange={(e) => setAdminDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Calificación</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setAdminRating(star)}
                          onMouseEnter={() => setAdminHoverRating(star)}
                          onMouseLeave={() => setAdminHoverRating(0)}
                        >
                          <Star
                            size={20}
                            className={star <= (adminHoverRating || adminRating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Comentario</label>
                    <textarea
                      value={adminComment}
                      onChange={(e) => setAdminComment(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button onClick={cancelEdit} variant="outline" className="py-2 text-xs">
                    Cancelar
                  </Button>
                  <Button onClick={upsertReview} variant="primary" className="py-2 text-xs">
                    Guardar Testimonio
                  </Button>
                </div>
              </div>
            )}
            
            {items.length === 0 ? (
              <p className="text-center text-gray-500 italic text-sm py-8 border border-dashed border-gray-300 rounded-lg">
                No hay testimonios configurados. Haz clic en "Agregar Nuevo".
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 relative group"
                  >
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(review)}
                        className="p-1.5 text-gray-400 hover:text-[#1A1A1A] bg-gray-50 rounded border border-gray-200 shadow-sm"
                        title="Editar testimonio"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded border border-gray-200 shadow-sm"
                        title="Eliminar testimonio"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-neutral-600 text-sm italic mt-3 leading-relaxed">
                      "{review.comment}"
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-semibold text-[#1A1A1A] text-sm">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* PUBLIC VISITOR LAYOUT */
          <>
            <div className="text-center mb-12">
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Compartir mi experiencia
              </Button>
            </div>

            {items.length === 0 ? (
              <p className="text-center text-gray-500 italic text-sm">
                Sé el primero en compartir tu experiencia con Esencia Boutique.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#FDFBF7] rounded-lg shadow-sm p-6 border border-gray-100"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                      ))}
                    </div>

                    <p className="text-neutral-600 text-sm md:text-base italic mt-3 leading-relaxed">
                      "{review.comment}"
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-semibold text-[#1A1A1A] text-sm">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Public Visitor Modal ───────────────────────────────── */}
      {!editable && isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h3 className="text-lg font-medium text-[#1A1A1A] mb-4 tracking-wide">
              Comparte tu experiencia
            </h3>

            <form onSubmit={handleVisitorSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Nombre</label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Calificación</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setVisitorRating(star)}
                      onMouseEnter={() => setVisitorHoverRating(star)}
                      onMouseLeave={() => setVisitorHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={star <= (visitorHoverRating || visitorRating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Comentario</label>
                <textarea
                  value={visitorComment}
                  onChange={(e) => setVisitorComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 resize-none"
                  placeholder="Cuéntanos sobre tu experiencia con Esencia Boutique"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Dejar Reseña
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
