import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase-products";
import ProductModal from "@/components/producto/ProductModal";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InterceptedProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductModal product={product} />;
}
