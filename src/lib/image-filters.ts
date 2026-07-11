export type ImageOverlay = "none" | "gold" | "noir" | "sepia" | "warm";

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturate: number;
  blur: number;
  overlay: ImageOverlay;
}

export const DEFAULT_IMAGE_FILTERS: ImageFilters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  blur: 0,
  overlay: "none",
};

const OVERLAY_FILTERS: Record<ImageOverlay, string> = {
  none: "",
  gold: "sepia(0.3) saturate(1.2) hue-rotate(10deg)",
  noir: "grayscale(1) contrast(1.2)",
  sepia: "sepia(0.7) brightness(0.95)",
  warm: "saturate(1.3) sepia(0.25)",
};

export function buildFilterString(filters: ImageFilters | undefined): string {
  if (!filters) return "";

  const base = [
    `brightness(${filters.brightness}%)`,
    `contrast(${filters.contrast}%)`,
    `saturate(${filters.saturate}%)`,
    `blur(${filters.blur}px)`,
  ].join(" ");

  const overlayFilter = OVERLAY_FILTERS[filters.overlay] ?? "";

  return overlayFilter ? `${base} ${overlayFilter}`.trim() : base;
}

export function hasActiveFilters(filters: ImageFilters | undefined): boolean {
  if (!filters) return false;
  return (
    filters.brightness !== 100 ||
    filters.contrast !== 100 ||
    filters.saturate !== 100 ||
    filters.blur !== 0 ||
    filters.overlay !== "none"
  );
}
