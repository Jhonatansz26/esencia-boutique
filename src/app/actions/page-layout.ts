"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { SectionConfig } from "@/types/layout";

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

export async function updatePageLayoutServer(
  sections: SectionConfig[],
  pageSlug: string
): Promise<boolean> {
  const supabase = await getServerSupabase();

  const { error } = await supabase
    .from("page_layout")
    .upsert(
      {
        page_slug: pageSlug,
        sections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_slug" }
    );

  if (error) {
    console.warn("Fallo en upsert de servidor:", error.message);
    return false;
  }

  revalidatePath("/");

  return true;
}
