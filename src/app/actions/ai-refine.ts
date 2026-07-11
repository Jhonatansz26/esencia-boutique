"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
}

export interface RefineVariant {
  tone: string;
  text: string;
}

export async function refineCopyAction(
  text: string,
  _tone: string = "premium"
): Promise<{ success: boolean; variants: RefineVariant[]; message: string }> {
  if (!text.trim()) {
    return { success: false, variants: [], message: "El texto está vacío." };
  }

  const supabase = await getServerSupabase();
  const { data: userData } = await supabase.auth.getUser();

  await supabase.from("ai_refinement_log").insert({
    section_type: "unknown",
    original_text: text,
    chosen_variant: null,
    variant_index: null,
    user_id: userData?.user?.id ?? null,
  }).then(() => {});

  const cleaned = text.trim();
  const lower = cleaned.toLowerCase();

  const isTitle = cleaned.length < 60 && !cleaned.includes(".");
  const isSlogan = lower.includes("esencia") || lower.includes("detalle") || lower.includes("brillo");

  const variants: RefineVariant[] = [];

  if (isTitle) {
    variants.push({
      tone: "Elevado",
      text: generateElevatedTitle(cleaned, isSlogan),
    });
    variants.push({
      tone: "Sensorial",
      text: generateSensoryTitle(cleaned, isSlogan),
    });
    variants.push({
      tone: "Minimalista",
      text: generateMinimalTitle(cleaned, isSlogan),
    });
  } else {
    variants.push({
      tone: "Elevado",
      text: generateElevatedCopy(cleaned),
    });
    variants.push({
      tone: "Sensorial",
      text: generateSensoryCopy(cleaned),
    });
    variants.push({
      tone: "Minimalista",
      text: generateMinimalCopy(cleaned),
    });
  }

  return { success: true, variants, message: "Variantes generadas con éxito." };
}

function generateElevatedTitle(original: string, isSlogan: boolean): string {
  const elevated: Record<string, string> = {
    "esencia en cada detalle": "La Esencia que Define Cada Detalle",
    "joyería minimalista": "Joyería de Autor — Minimalismo Sublime",
    "hecho a mano": "Forjado a Mano, Elevado por Diseño",
  };
  if (isSlogan) {
    const key = original.toLowerCase();
    if (elevated[key]) return elevated[key];
  }
  return `${capitalizeFirst(original)} — Herencia de Excelencia`;
}

function generateSensoryTitle(original: string, isSlogan: boolean): string {
  if (isSlogan) {
    const lower = original.toLowerCase();
    if (lower.includes("esencia")) return "Donde la Piel Encuentra su Esencia";
    if (lower.includes("detalle")) return "Cada Detalle, una Caricia de Luz";
  }
  return `Toca la Luz — ${capitalizeFirst(original)}`;
}

function generateMinimalTitle(original: string, isSlogan: boolean): string {
  if (isSlogan) {
    const lower = original.toLowerCase();
    if (lower.includes("esencia")) return "Esencia. Pura.";
    if (lower.includes("detalle")) return "Cada Detalle. Cuenta.";
  }
  const words = original.split(" ").filter(Boolean);
  if (words.length <= 3) return original.toUpperCase();
  return words.slice(0, 3).join(" ").toUpperCase();
}

function generateElevatedCopy(original: string): string {
  const sentences = original.split(/[.!]/).filter((s) => s.trim());
  if (sentences.length === 0) return original;

  const elevated = sentences.map((s) => {
    const trimmed = s.trim();
    const lower = trimmed.toLowerCase();
    if (lower.includes("resistencia")) return trimmed.replace(/resistencia/gi, "Permanencia");
    if (lower.includes("brillo")) return trimmed.replace(/brillo/gi, "Luminosidad");
    if (lower.includes("diseño")) return trimmed.replace(/diseño/gi, "Arte");
    if (lower.includes("fuerza")) return trimmed.replace(/fuerza/gi, "Prestigio");
    if (lower.includes("tierra")) return trimmed.replace(/tierra/gi, "Naturaleza");
    return `La distinción de ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
  });

  return elevated.join(". ") + ".";
}

function generateSensoryCopy(original: string): string {
  const sentences = original.split(/[.!]/).filter((s) => s.trim());
  if (sentences.length === 0) return original;

  const sensory = sentences.map((s) => {
    const trimmed = s.trim();
    const lower = trimmed.toLowerCase();
    if (lower.includes("resistencia")) return "Siente la permanencia en cada pieza, un brillo que no se rinde al tacto";
    if (lower.includes("brillo")) return "La luz danza sobre el metal, capturada para siempre entre tus dedos";
    if (lower.includes("diseño")) return "Cada curva revela una intención: que la belleza se sienta antes de verse";
    if (lower.includes("fuerza")) return "El peso del metal en tu piel cuenta una historia de audacia contenida";
    if (lower.includes("tierra")) return "Cada cuenta susurra la voz antigua de la tierra, cálida bajo la luz";
    return `Siente la textura de ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
  });

  return sensory.join(". ") + ".";
}

function generateMinimalCopy(original: string): string {
  const sentences = original.split(/[.!]/).filter((s) => s.trim());
  if (sentences.length === 0) return original;

  const minimal = sentences.map((s) => {
    const trimmed = s.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length <= 4) return trimmed.toUpperCase() + ".";
    const core = words.slice(0, Math.min(5, words.length)).join(" ");
    return `${capitalizeFirst(core)}.`;
  });

  return minimal.join(" ");
}

function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
