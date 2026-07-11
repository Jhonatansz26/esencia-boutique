import { SectionThemeId } from "@/lib/section-themes";

export type SectionType = "hero" | "materials" | "product-grid" | "values" | "reviews" | "philosophy" | "promo-banner";

export interface SectionConfig {
  id: string;
  type: SectionType;
  visible: boolean;
  order: number;
  layoutColumns?: number;
  config?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    expiresAt?: string;
    theme?: SectionThemeId;
    [key: string]: unknown;
  };
}

export interface PageLayout {
  pageSlug: string;
  sections: SectionConfig[];
  updatedAt: string;
}
