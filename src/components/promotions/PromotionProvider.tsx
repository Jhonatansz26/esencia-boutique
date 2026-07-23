"use client";

import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import PromoModal from "./PromoModal";

/**
 * PromotionProvider
 *
 * Client Component que actúa como puente de estado entre la AnnouncementBar
 * y el PromoModal. Al mantener ambos en este componente:
 *  - layout.tsx permanece Server Component (sin contaminación de "use client").
 *  - El estado `modalForceOpen` se comparte limpiamente entre los hijos.
 *
 * Lógica de apertura del modal:
 *  - Auto: PromoModal la gestiona internamente (3 s + localStorage check).
 *  - Explícita: clic en AnnouncementBar → `modalForceOpen = true`, omite
 *    el bloqueo de localStorage para que el usuario pueda revisar la promo
 *    cuando quiera.
 */
export default function PromotionProvider() {
  /**
   * `false` por defecto: no forzamos el modal.
   * Se vuelve `true` cuando el usuario hace clic en la AnnouncementBar.
   * Se resetea a `false` cuando el modal se cierra, para que el próximo
   * clic en la barra vuelva a funcionar.
   */
  const [modalForceOpen, setModalForceOpen] = useState(false);

  const handleOpenModal = () => setModalForceOpen(true);
  const handleCloseModal = () => setModalForceOpen(false);

  return (
    <>
      <AnnouncementBar onOpenModal={handleOpenModal} />
      <PromoModal forceOpen={modalForceOpen} onClose={handleCloseModal} />
    </>
  );
}
