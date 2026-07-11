import { SectionThemeId } from "@/lib/section-themes";
import { type ImageFilters } from "@/lib/image-filters";

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  /** Eyebrow label above the main heading (e.g. "JOYERÍA MINIMALISTA") */
  eyebrow?: string;
  /** Main h1 heading */
  title?: string;
  /** Body copy below the heading */
  subtitle?: string;
  /** Hero image URL */
  image?: string;
  /** Text shown on the call-to-action button */
  ctaText?: string;
  /** Destination URL for the call-to-action button */
  ctaHref?: string;
  /** Image CSS filter overrides */
  imageFilters?: ImageFilters;
  theme?: SectionThemeId;
  [key: string]: unknown;
}

export const HERO_DEFAULTS = {
  eyebrow: "JOYERÍA MINIMALISTA",
  title: "Esencia en cada detalle",
  ctaText: "VER COLECCIÓN",
  ctaHref: "/catalogo",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ProductGrid
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductGridConfig {
  /** Main section heading (e.g. "Colección Esencial") */
  sectionTitle?: string;
  /** Eyebrow / subtitle above the heading (e.g. "Piezas Seleccionadas") */
  sectionSubtitle?: string;
  /** WhatsApp button label shown on each product card */
  ctaText?: string;
  theme?: SectionThemeId;
  [key: string]: unknown;
}

/**
 * Canonical fallback values for ProductGrid.
 * Both the Server Component (ProductGrid) and the Client Component
 * (ProductGridClient) import from this single source of truth — making
 * it physically impossible for them to show different default text.
 */
export const PRODUCT_GRID_DEFAULTS = {
  sectionTitle: "Colección Esencial",
  sectionSubtitle: "Piezas Seleccionadas",
  ctaText: "Consultar por WhatsApp",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Values
// ─────────────────────────────────────────────────────────────────────────────

export interface ValuesItem {
  title: string;
  description: string;
}

export interface ValuesConfig {
  eyebrow?: string;
  sectionTitle?: string;
  items?: ValuesItem[];
  theme?: SectionThemeId;
  [key: string]: unknown;
}

export const VALUES_DEFAULTS = {
  eyebrow: "Diferencial",
  sectionTitle: "Lujo sin exceso",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Reviews
// ─────────────────────────────────────────────────────────────────────────────

export interface ReviewItem {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO format
}

export interface ReviewsConfig {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items?: ReviewItem[];
  theme?: SectionThemeId;
  [key: string]: unknown;
}

export const REVIEWS_DEFAULTS = {
  sectionTitle: "Experiencias Esencia",
  sectionSubtitle: "Reseñas",
} as const;

export const REVIEWS_INITIAL_ITEMS: ReviewItem[] = [
  {
    id: "rev-curated-1",
    name: "Alejandro R.",
    rating: 5,
    comment: "Excelente calidad. La Cadena Urban Steel tiene un acabado satinado impecable y un peso ideal.",
    date: "2025-06-20",
  },
  {
    id: "rev-curated-2",
    name: "Mateo S.",
    rating: 5,
    comment: "El Pulso Ébano Gold superó mis expectativas. El sistema ajustable es muy cómodo y el diseño minimalista combina con todo.",
    date: "2025-06-15",
  },
  {
    id: "rev-curated-3",
    name: "Daniel V.",
    rating: 5,
    comment: "Atención al cliente de primera y las piezas de joyería se sienten verdaderamente exclusivas.",
    date: "2025-06-10",
  },
];

