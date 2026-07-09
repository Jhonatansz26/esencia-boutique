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
    gender?: string;
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

export async function createProduct(product: Omit<Product, "id"> & { id: string }): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .insert({
      id: product.id,
      name: product.name,
      category: product.category,
      gender: product.gender,
      material: product.material,
      description: product.description,
      price: product.price,
      images: product.images,
      featured: product.featured,
      whatsapp_message: product.whatsappMessage,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    return null;
  }

  return mapRowToProduct(data);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }

  return true;
}

export async function uploadProductImage(file: File, productId: string): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return publicUrl;
}

export function mapRowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product["category"],
    gender: (row.gender as Product["gender"]) || "mujer",
    material: row.material as string[],
    description: row.description as string,
    price: Number(row.price),
    images: row.images as Product["images"],
    featured: row.featured as boolean,
    whatsappMessage: row.whatsapp_message as string,
  };
}
