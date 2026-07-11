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

export interface RegisteredPage {
  id: string;
  slug: string;
  label: string;
  is_system: boolean;
  icon: string | null;
  created_at: string;
}

export async function getRegisteredPages(): Promise<RegisteredPage[]> {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from("page_registry")
    .select("id, slug, label, is_system, icon, created_at")
    .order("is_system", { ascending: false })
    .order("label", { ascending: true });

  if (error || !data) {
    console.error("Error fetching registered pages:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    label: row.label,
    is_system: row.is_system,
    icon: row.icon,
    created_at: row.created_at,
  }));
}

export async function createNewPageAction(
  slug: string,
  label: string
): Promise<{ success: boolean; message: string }> {
  const supabase = await getServerSupabase();

  const normalizedSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

  const { data: existingPage } = await supabase
    .from("page_registry")
    .select("id")
    .eq("slug", normalizedSlug)
    .single();

  if (existingPage) {
    return { success: false, message: "Ya existe una página con ese slug." };
  }

  const { error: registryError } = await supabase
    .from("page_registry")
    .insert({
      slug: normalizedSlug,
      label,
      is_system: false,
    });

  if (registryError) {
    console.error("Error creating page registry entry:", registryError);
    return { success: false, message: "Error al registrar la página." };
  }

  const { data: homeLayout } = await supabase
    .from("page_layout")
    .select("sections")
    .eq("page_slug", "home")
    .single();

  const initialSections = homeLayout?.sections ?? [];

  await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: normalizedSlug,
        sections: initialSections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    );

  await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: `${normalizedSlug}_draft`,
        sections: initialSections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    );

  revalidatePath("/admin/modo-disenador");

  return { success: true, message: `Página "${label}" creada con éxito.` };
}
