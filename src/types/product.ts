export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory = "manilla" | "cadena" | "set";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  material: string[];
  description: string;
  price: number;
  images: ProductImage[];
  featured: boolean;
  whatsappMessage: string;
}
