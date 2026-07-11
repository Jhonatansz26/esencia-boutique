"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { SectionConfig } from "@/types/layout";

interface PublishResult {
  success: boolean;
  message: string;
}

export interface HistoryEntry {
  id: string;
  pageSlug: string;
  sections: SectionConfig[];
  publishedAt: string;
  publishedBy: string | null;
}

async function getServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {
          // No-op
        },
      },
    }
  );
}

export async function publishLayout(pageSlug: string = "home"): Promise<PublishResult> {
  const supabase = await getServerSupabase();
  const draftSlug = `${pageSlug}_draft`;

  const { data: draftRow, error: draftError } = await supabase
    .from("page_layout")
    .select("sections")
    .eq("page_slug", draftSlug)
    .single();

  if (draftError || !draftRow) {
    return { success: false, message: "No se encontró un borrador para publicar." };
  }

  const now = new Date().toISOString();

  const { error: publishError } = await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: pageSlug,
        sections: draftRow.sections,
        updated_at: now,
        published_at: now,
      },
      { onConflict: "page_slug" }
    );

  if (publishError) {
    console.error("Error publishing layout:", publishError);
    return { success: false, message: "Error al publicar los cambios." };
  }

  const { data: userData } = await supabase.auth.getUser();

  const { error: historyError } = await supabase.from("page_layout_history").insert({
    page_slug: pageSlug,
    sections: draftRow.sections,
    published_by: userData?.user?.id ?? null,
  });

  if (historyError) {
    console.error("Error saving history snapshot:", historyError);
  }

  revalidatePath("/");

  return { success: true, message: "Cambios publicados con éxito." };
}

export async function discardDraft(pageSlug: string = "home"): Promise<PublishResult> {
  const supabase = await getServerSupabase();
  const draftSlug = `${pageSlug}_draft`;

  const { data: publishedRow, error: fetchError } = await supabase
    .from("page_layout")
    .select("sections")
    .eq("page_slug", pageSlug)
    .single();

  if (fetchError || !publishedRow) {
    return { success: false, message: "No se encontró la versión publicada." };
  }

  const { error: resetError } = await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: draftSlug,
        sections: publishedRow.sections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    );

  if (resetError) {
    return { success: false, message: "Error al descartar el borrador." };
  }

  revalidatePath("/");

  return { success: true, message: "Borrador restablecido a la versión publicada." };
}

export async function getPublishHistory(
  pageSlug: string = "home",
  limit: number = 10
): Promise<HistoryEntry[]> {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from("page_layout_history")
    .select("id, page_slug, sections, published_at, published_by")
    .eq("page_slug", pageSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error("Error fetching publish history:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    pageSlug: row.page_slug,
    sections: row.sections as SectionConfig[],
    publishedAt: row.published_at,
    publishedBy: row.published_by,
  }));
}

export async function rollbackToVersion(
  historyId: string,
  pageSlug: string = "home"
): Promise<PublishResult> {
  const supabase = await getServerSupabase();
  const draftSlug = `${pageSlug}_draft`;

  const { data: historyRow, error: historyFetchError } = await supabase
    .from("page_layout_history")
    .select("sections")
    .eq("id", historyId)
    .single();

  if (historyFetchError || !historyRow) {
    return { success: false, message: "No se encontró la versión histórica solicitada." };
  }

  const { error: draftUpdateError } = await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: draftSlug,
        sections: historyRow.sections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    );

  if (draftUpdateError) {
    return { success: false, message: "Error al restaurar la versión en el borrador." };
  }

  revalidatePath("/");

  return { success: true, message: "Versión restaurada en tu borrador." };
}
