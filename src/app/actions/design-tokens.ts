"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";

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

export interface DesignTokens {
  color: {
    primary: string;
    surface: string;
    text: string;
  };
  font: {
    heading: string;
    body: string;
  };
  radius: {
    base: string;
  };
}

const DEFAULT_TOKENS: DesignTokens = {
  color: {
    primary: "#D4AF37",
    surface: "#FDFBF7",
    text: "#1A1A1A",
  },
  font: {
    heading: "Playfair Display",
    body: "Inter",
  },
  radius: {
    base: "2px",
  },
};

export async function getDesignTokens(): Promise<DesignTokens> {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from("design_tokens")
    .select("name, category, value");

  if (error || !data || data.length === 0) {
    return DEFAULT_TOKENS;
  }

  const tokens: DesignTokens = { ...DEFAULT_TOKENS };

  for (const row of data) {
    const category = row.category as keyof DesignTokens;
    const name = row.name as string;
    const value = row.value as Record<string, string>;

    if (category === "color" && tokens.color) {
      (tokens.color as Record<string, string>)[name] = value.primary ?? value[name] ?? "";
    } else if (category === "font" && tokens.font) {
      (tokens.font as Record<string, string>)[name] = value.primary ?? value[name] ?? "";
    } else if (category === "radius" && tokens.radius) {
      (tokens.radius as Record<string, string>)[name] = value.primary ?? value[name] ?? "";
    }
  }

  return tokens;
}

export async function updateDesignTokens(
  category: "color" | "font" | "radius",
  value: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  const supabase = await getServerSupabase();

  const entries = Object.entries(value);

  for (const [name, val] of entries) {
    const { error } = await supabase
      .from("design_tokens")
      .upsert(
        {
          name,
          category,
          value: { primary: val },
          is_default: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "name,category" }
      );

    if (error) {
      console.error("Error updating design token:", error);
      return { success: false, message: "Error al actualizar el token de diseño." };
    }
  }

  revalidatePath("/");
  return { success: true, message: "Identidad de marca actualizada con éxito." };
}
