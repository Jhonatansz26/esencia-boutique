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
  // Log removed for production

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

/**
 * Genera un slug URL-friendly a partir del nombre del producto:
 * minúsculas, sin tildes/caracteres especiales, espacios reemplazados por guiones.
 * Añade un sufijo único corto (timestamp + aleatorio) para garantizar que nunca
 * colisione con el índice de unicidad de la base de datos.
 */
export function generateProductSlug(name: string): string {
  const slugifiedName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes/acentos
    .replace(/[^a-z0-9]+/g, "-") // Reemplazar espacios y caracteres especiales por guiones
    .replace(/^-+|-+$/g, ""); // Eliminar guiones al inicio y al final

  const uniqueSuffix = `${Date.now().toString().slice(-4)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  return `${slugifiedName || "producto"}-${uniqueSuffix}`;
}

export async function createProduct(
  product: Omit<Product, "id" | "slug"> & { id: string; slug?: string }
): Promise<Product | null> {
  // Log removed for production

  // La columna slug es NOT NULL: se genera dinámicamente antes de insertar
  const slug = product.slug?.trim() || generateProductSlug(product.name);

  const { data, error } = await supabase
    .from("products")
    .insert({
      id: product.id,
      slug,
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

  // Log removed for production
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
  try {
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

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) {
      console.error("Error getting public URL: URL data is null or undefined");
      return null;
    }

    // Log removed for production
    return urlData.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
}

export function mapRowToProduct(row: Record<string, unknown>): Product {
  const product = {
    id: row.id as string,
    slug: row.slug as string,
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

  // Log removed for production

  return product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug || typeof slug !== "string") return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return mapRowToProduct(data);
}

export async function getRelatedProducts(
  currentProductId: string,
  gender: Product["gender"] | null,
  category: string,
  limit = 4
): Promise<Product[]> {
  // Prioridad 1: mismo género Y misma categoría
  const { data: sameBoth } = await supabase
    .from("products")
    .select("*")
    .neq("id", currentProductId)
    .or(`gender.eq.${gender},gender.eq.unisex`)
    .eq("category", category)
    .limit(limit);

  let results = sameBoth ? sameBoth.map(mapRowToProduct) : [];

  if (results.length >= limit) {
    return results.slice(0, limit);
  }

  // Prioridad 2: mismo género, cualquier categoría
  const needed = limit - results.length;
  const existingIds = results.map(p => p.id);
  const excludeStr = existingIds.length > 0 ? `(${existingIds.join(",")})` : "";

  let query = supabase
    .from("products")
    .select("*")
    .neq("id", currentProductId)
    .or(`gender.eq.${gender},gender.eq.unisex`)
    .limit(needed);

  if (excludeStr) {
    query = query.not("id", "in", excludeStr);
  }

  const { data: sameGender } = await query;

  if (sameGender) {
    results = [...results, ...sameGender.map(mapRowToProduct)];
  }

  return results;
}
