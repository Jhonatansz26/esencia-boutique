export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ProductCategory = "manilla" | "cadena" | "set" | "collar" | "anillo" | "aretes" | "gorras";

export type ProductGender = "hombre" | "mujer" | "unisex";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  gender: ProductGender;
  material: string[];
  description: string;
  price: number;
  images: ProductImage[];
  featured: boolean;
  whatsappMessage: string;
}
