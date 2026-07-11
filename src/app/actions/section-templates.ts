"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SectionType } from "@/types/layout";

export interface SectionTemplate {
  id: string;
  name: string;
  sectionType: SectionType;
  config: Record<string, unknown>;
  isSystem: boolean;
}

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

export async function getSectionTemplates(): Promise<SectionTemplate[]> {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from("section_templates")
    .select("id, name, section_type, config, is_system")
    .order("is_system", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    sectionType: row.section_type as SectionType,
    config: row.config,
    isSystem: row.is_system,
  }));
}

export async function saveAsTemplate(
  name: string,
  sectionType: SectionType,
  config: Record<string, unknown>
): Promise<{ success: boolean; message: string }> {
  const supabase = await getServerSupabase();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("section_templates").insert({
    name,
    section_type: sectionType,
    config,
    is_system: false,
    created_by: userData?.user?.id ?? null,
  });

  if (error) return { success: false, message: "Error al guardar la plantilla." };
  return { success: true, message: `Plantilla "${name}" guardada con éxito.` };
}

export async function deleteTemplate(templateId: string): Promise<{ success: boolean; message: string }> {
  const supabase = await getServerSupabase();
  const { error } = await supabase
    .from("section_templates")
    .delete()
    .eq("id", templateId)
    .eq("is_system", false);

  if (error) return { success: false, message: "Error al eliminar la plantilla." };
  return { success: true, message: "Plantilla eliminada correctamente." };
}
