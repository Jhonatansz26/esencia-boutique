import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map(mapRowToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("id");

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data.map(mapRowToProduct);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === "all") {
    return getAllProducts();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data.map(mapRowToProduct);
}

export async function updateProduct(
  id: string,
  updates: {
    name?: string;
    price?: number;
    description?: string;
    featured?: boolean;
    category?: string;
    material?: string[];
  }
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }

  return mapRowToProduct(data);
}

function mapRowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product["category"],
    material: row.material as string[],
    description: row.description as string,
    price: Number(row.price),
    images: row.images as Product["images"],
    featured: row.featured as boolean,
    whatsappMessage: row.whatsapp_message as string,
  };
}
