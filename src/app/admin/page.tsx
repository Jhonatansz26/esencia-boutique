"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { X, Save, Loader2 } from "lucide-react";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    featured: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.error("Error loading products:", error);
    } else if (data) {
      setProducts(data.map(mapRowToProduct));
    }
    setLoading(false);
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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      featured: product.featured,
    });
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    setSaving(true);

    const { error } = await supabase
      .from("products")
      .update({
        name: formData.name,
        price: formData.price,
        description: formData.description,
        featured: formData.featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error("Error updating product:", error);
      alert("Error al guardar. Revisa la consola para más detalles.");
    } else {
      await loadProducts();
      setEditingProduct(null);
    }
    setSaving(false);
  };

  const handleClose = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1A1A1A]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] tracking-wide">
              Panel de Administración
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona el catálogo de Esencia Boutique
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline">Volver al Sitio</Button>
            </Link>
            <Link href="/catalogo">
              <Button variant="outline">Ver Catálogo</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A1A1A] text-[#FDFBF7]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Imagen</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Destacado</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 overflow-hidden rounded">
                        <Image
                          src={product.images[0]?.src || "/images/placeholder.png"}
                          alt={product.images[0]?.alt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{product.id}</td>
                    <td className="px-6 py-4 text-sm text-[#1A1A1A] font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-serif italic text-stone-500">
                      ${product.price.toLocaleString("es-CO")} COP
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37]/20 text-[#D4AF37]">
                          Destacado
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Conectado a Supabase:</strong> Los cambios se guardan directamente en la base de datos en tiempo real.
          </p>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md" style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}>
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 tracking-wide">
              Editar Producto
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">ID</label>
                <input
                  type="text"
                  value={editingProduct.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Nombre del Producto</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  placeholder="Ej: Collar Esencia Dorada"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Precio (COP)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 resize-none"
                  placeholder="Describe la pieza, materiales, estilo..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#1A1A1A]"
                />
                <label htmlFor="featured" className="text-sm text-gray-600">
                  Producto Destacado (aparece en la Home)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1"
                >
                  {saving ? (
                    <Loader2 className="animate-spin inline mr-2" size={18} />
                  ) : (
                    <Save size={18} className="inline mr-2" />
                  )}
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
