"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCatalogo() {
  revalidatePath("/catalogo");
}
