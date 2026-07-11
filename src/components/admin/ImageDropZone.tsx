"use client";

import { useState, useCallback, type DragEvent, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { compressImage } from "@/lib/image-compression";
import { supabase } from "@/lib/supabase";

interface ImageDropZoneProps {
  sectionId: string;
  onImageUpdate: (url: string) => void;
  children: ReactNode;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

export default function ImageDropZone({
  sectionId,
  onImageUpdate,
  children,
}: ImageDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const uploadToSupabase = useCallback(
    async (file: File): Promise<string | null> => {
      const timestamp = Date.now();
      const filePath = `layout/${sectionId}-${timestamp}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      return urlData?.publicUrl ?? null;
    },
    [sectionId]
  );

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      const file = files[0];

      if (!file.type.startsWith("image/")) {
        showToast({
          message: "Solo se permiten archivos de imagen (JPG, PNG, WebP, etc.)",
          type: "error",
        });
        return;
      }

      setIsUploading(true);

      try {
        const compressed = await compressImage(file, {
          maxWidth: 1600,
          maxHeight: 1600,
          quality: 0.82,
        });

        const publicUrl = await uploadToSupabase(compressed);

        if (!publicUrl) {
          showToast({
            message: "Error al subir la imagen. Intenta de nuevo.",
            type: "error",
          });
          return;
        }

        onImageUpdate(publicUrl);
        showToast({
          message: "Imagen actualizada correctamente",
          type: "success",
        });
      } catch (error) {
        console.error("Error processing image:", error);
        showToast({
          message: "Error al procesar la imagen. Intenta con otra.",
          type: "error",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpdate, uploadToSupabase, showToast]
  );

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}

      {isDragOver && (
        <div className="absolute inset-0 z-30 border-2 border-dashed border-[#D4AF37] bg-[#D4AF37]/10 pointer-events-none flex items-center justify-center">
          <p className="text-[#D4AF37] text-sm font-medium uppercase tracking-wider bg-[#1A1A1A]/80 px-4 py-2 rounded-sm">
            Suelta la imagen aquí
          </p>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 z-30 bg-black/60 flex flex-col items-center justify-center gap-3">
          <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
          <p className="text-white text-sm font-medium">
            Optimizando y subiendo...
          </p>
        </div>
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
    </div>
  );
}
