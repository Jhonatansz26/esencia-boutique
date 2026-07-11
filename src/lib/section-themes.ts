export type SectionThemeId = "default" | "luxury-dark" | "minimal-light" | "gold-harmony";

export interface SectionTheme {
  id: SectionThemeId;
  label: string;
  swatchClass: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
}

export const SECTION_THEMES: Record<SectionThemeId, SectionTheme> = {
  default: {
    id: "default",
    label: "Original",
    swatchClass: "bg-[#FDFBF7] border border-stone-300",
    bgClass: "",
    textClass: "",
    accentClass: "",
  },
  "luxury-dark": {
    id: "luxury-dark",
    label: "Luxury Dark",
    swatchClass: "bg-[#1A1A1A]",
    bgClass: "bg-[#1A1A1A]",
    textClass: "text-[#FDFBF7]",
    accentClass: "text-[#D4AF37]",
  },
  "minimal-light": {
    id: "minimal-light",
    label: "Minimal Light",
    swatchClass: "bg-[#FAF7F2] border border-stone-300",
    bgClass: "bg-[#FAF7F2]",
    textClass: "text-[#1C140E]",
    accentClass: "text-[#1C140E]/60",
  },
  "gold-harmony": {
    id: "gold-harmony",
    label: "Gold Harmony",
    swatchClass: "bg-[#232019] ring-1 ring-[#D4AF37]",
    bgClass: "bg-[#232019]",
    textClass: "text-[#FDFBF7]",
    accentClass: "text-[#D4AF37]",
  },
};

export const SECTION_THEME_LIST = Object.values(SECTION_THEMES);
