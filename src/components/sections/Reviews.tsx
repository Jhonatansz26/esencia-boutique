"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { Review } from "@/types";

const STORAGE_KEY = "esencia-reviews";

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-premium-1",
    name: "Alejandro R.",
    rating: 5,
    comment: "Excelente calidad. La Cadena Urban Steel tiene un acabado satinado impecable y un peso ideal.",
    date: "2025-06-20",
  },
  {
    id: "rev-premium-2",
    name: "Mateo S.",
    rating: 5,
    comment: "El Pulso Ébano Gold superó mis expectativas. El sistema ajustable es muy cómodo y el diseño minimalista combina con todo.",
    date: "2025-06-15",
  },
  {
    id: "rev-premium-3",
    name: "Daniel V.",
    rating: 5,
    comment: "Atención al cliente de primera y las piezas de joyería se sienten verdaderamente exclusivas.",
    date: "2025-06-10",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading reviews from localStorage", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
    } catch (error) {
      console.error("Error saving reviews to localStorage", error);
    }

    setName("");
    setRating(5);
    setComment("");
    setIsModalOpen(false);
  };

  return (
    <section className="pb-20">
      <SectionTitle
        title="Experiencias Esencia"
        subtitle="Reseñas"
        alignment="center"
      />

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="text-center mb-12">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Compartir mi experiencia
          </Button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 italic text-sm">
            Sé el primero en compartir tu experiencia con Esencia Boutique.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#FDFBF7] rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#D4AF37] fill-[#D4AF37]"
                    />
                  ))}
                </div>

                <p className="text-neutral-600 text-sm md:text-base italic mt-3 leading-relaxed">
                  "{review.comment}"
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-[#1A1A1A] text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Calificación
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={
                          star <= (hoverRating || rating)
                            ? "text-[#D4AF37] fill-[#D4AF37]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Comentario
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 resize-none"
                  placeholder="Cuéntanos sobre tu experiencia con Esencia Boutique"
                  required
                />
              </div>

              <Button variant="primary" className="w-full">
                Dejar Reseña
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
