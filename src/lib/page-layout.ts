import { supabase } from "@/lib/supabase";
import { SectionConfig } from "@/types/layout";

export const DRAFT_SUFFIX = "_draft";

export function toDraftSlug(pageSlug: string): string {
  return `${pageSlug}${DRAFT_SUFFIX}`;
}

const DEFAULT_HOME_LAYOUT: SectionConfig[] = [
  { id: "hero", type: "hero", visible: true, order: 0 },
  { id: "materials", type: "materials", visible: true, order: 1 },
  { id: "product-grid", type: "product-grid", visible: true, order: 2 },
  { id: "values", type: "values", visible: true, order: 3 },
  { id: "reviews", type: "reviews", visible: true, order: 4 },
  { id: "philosophy", type: "philosophy", visible: true, order: 5 },
  { id: "promo-banner", type: "promo-banner", visible: false, order: 6, config: { title: "2x1 EN PRENDAS SELECCIONADAS", expiresAt: "", image: "/images/hero-bg.jpg" } }
];

export async function getPageLayout(pageSlug = "home"): Promise<SectionConfig[]> {
  try {
    const { data, error } = await supabase
      .from("page_layout")
      .select("sections")
      .eq("page_slug", pageSlug)
      .single();

    if (error) {
      if (error.code === "42501") {
        console.error("Error de autenticación en Supabase:", error);
        throw new Error("No se pudo autenticar la lectura del layout");
      }
      return DEFAULT_HOME_LAYOUT;
    }

    if (!data) return DEFAULT_HOME_LAYOUT;
    return data.sections as SectionConfig[];
  } catch (err) {
    if (err instanceof Error && err.message.includes("autenticar")) {
      throw err;
    }
    return DEFAULT_HOME_LAYOUT;
  }
}
