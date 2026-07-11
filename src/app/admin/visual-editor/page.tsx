import { redirect } from "next/navigation";

/**
 * Legacy route — kept for backwards-compatibility.
 * Permanently redirects to the canonical Modo Diseñador route.
 */
export default function VisualEditorLegacyRedirect() {
  redirect("/admin/modo-disenador");
}
