import { getAllProducts } from "@/lib/supabase-products";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await getAllProducts();

  return <AdminDashboard initialProducts={products} />;
}
