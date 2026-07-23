"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook reutilizable para gestionar banderas booleanas en localStorage.
 *
 * Anti-hydration-mismatch: el estado siempre se inicializa en `false` (valor
 * neutral idéntico en el servidor y el cliente). El chequeo real de
 * localStorage ocurre exclusivamente dentro de `useEffect`, que solo se
 * ejecuta en el cliente, después de que React haya completado la hidratación.
 *
 * @param key - Clave de localStorage a leer/escribir.
 * @returns `flagSet` indica si la bandera está activa; `setFlag` la activa.
 */
export function useLocalStorageFlag(key: string) {
  // ✅ Siempre `false` en SSR y en la primera renderización del cliente.
  //    Esto garantiza que el HTML del servidor coincide exactamente con lo que
  //    React renderiza en el cliente durante la hidratación.
  const [flagSet, setFlagSet] = useState<boolean>(false);

  useEffect(() => {
    // Solo se ejecuta en el cliente, post-hydration.
    try {
      setFlagSet(!!localStorage.getItem(key));
    } catch {
      // localStorage puede lanzar en contextos restringidos (ej. modo incógnito
      // con almacenamiento bloqueado). Silenciamos para no romper la UI.
    }
  }, [key]);

  const setFlag = useCallback(() => {
    try {
      localStorage.setItem(key, "1");
      setFlagSet(true);
    } catch {
      // Silenciar fallos de escritura en localStorage.
    }
  }, [key]);

  const clearFlag = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setFlagSet(false);
    } catch {
      // Silenciar fallos de escritura en localStorage.
    }
  }, [key]);

  return { flagSet, setFlag, clearFlag };
}
