import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/supabase-products";
import ProductFullPage from "@/components/producto/ProductFullPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado | Esencia Boutique" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Esencia Boutique`,
      description: product.description,
      images: product.images?.[0]
        ? [
            {
              url: product.images[0].src,
              width: product.images[0].width,
              height: product.images[0].height,
              alt: product.images[0].alt || product.name,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Esencia Boutique`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, product.gender, product.category);

  return <ProductFullPage product={product} relatedProducts={related} />;
}
