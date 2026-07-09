"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductCategory, ProductGender } from "@/types/product";
import {
  updateProduct,
  deleteProduct,
  createProduct,
  uploadProductImage,
  getAllProducts,
} from "@/lib/supabase-products";
import { supabase } from "@/lib/supabase";
import { X, Save, Loader2, Plus, Trash2, Upload } from "lucide-react";
import Button from "@/components/common/Button";
import Link from "next/link";

interface AdminDashboardProps {
  initialProducts: Product[];
}

export default function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    featured: false,
    category: "manilla" as ProductCategory,
    gender: "mujer" as ProductGender,
    material: "",
  });

  async function loadProducts() {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      featured: product.featured,
      category: product.category,
      gender: product.gender,
      material: product.material.join(", "),
    });
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormData({
      id: "",
      name: "",
      price: 0,
      description: "",
      featured: false,
      category: "manilla",
      gender: "mujer",
      material: "",
    });
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    if (isCreating) {
      // Crear nuevo producto
      if (!formData.id || !formData.name) {
        alert("El ID y el nombre son obligatorios");
        setSaving(false);
        return;
      }

      let imageUrl = "";
      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, formData.id);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const newProduct = await createProduct({
        id: formData.id,
        name: formData.name,
        category: formData.category,
        gender: formData.gender,
        material: formData.material.split(",").map((m) => m.trim()),
        description: formData.description,
        price: formData.price,
        images: imageUrl
          ? [{ src: imageUrl, alt: formData.name, width: 800, height: 800 }]
          : [],
        featured: formData.featured,
        whatsappMessage: `Hola! Estoy interesado en la referencia ${formData.id}: ${formData.name}.`,
      });

      if (newProduct) {
        await loadProducts();
        setIsCreating(false);
      } else {
        alert("Error al crear el producto");
      }
    } else if (editingProduct) {
      // Actualizar producto existente
      let newImages = editingProduct.images;

      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, editingProduct.id);
        if (uploadedUrl) {
          newImages = [{ src: uploadedUrl, alt: formData.name, width: 800, height: 800 }];
        }
      }

      const updated = await updateProduct(editingProduct.id, {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        featured: formData.featured,
        category: formData.category,
        gender: formData.gender,
        material: formData.material.split(",").map((m) => m.trim()),
      });

      if (updated && newImages !== editingProduct.images) {
        // Actualizar imágenes si cambiaron
        const { error } = await supabase
          .from("products")
          .update({ images: newImages })
          .eq("id", editingProduct.id);

        if (error) console.error("Error updating images:", error);
      }

      if (updated) {
        await loadProducts();
        setEditingProduct(null);
      } else {
        alert("Error al actualizar el producto");
      }
    }

    setSaving(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    const success = await deleteProduct(id);
    if (success) {
      await loadProducts();
    } else {
      alert("Error al eliminar el producto");
    }
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
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
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={18} className="inline mr-2" />
            Nuevo Producto
          </Button>
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
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-sm text-[#1A1A1A] hover:text-[#D4AF37] transition-colors font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
                      >
                        <Trash2 size={16} />
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

      {/* Modal de Edición/Creación */}
      {(editingProduct || isCreating) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 tracking-wide">
              {isCreating ? "Crear Producto" : "Editar Producto"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">ID</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!isCreating}
                  className={`w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 ${
                    !isCreating ? "bg-gray-50 text-gray-500" : ""
                  }`}
                  placeholder="Ej: EBH-016"
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
                <label className="block text-sm text-gray-600 mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                >
                  <option value="manilla">Manilla</option>
                  <option value="cadena">Cadena</option>
                  <option value="set">Set</option>
                  <option value="collar">Collar</option>
                  <option value="anillo">Anillo</option>
                  <option value="aretes">Aretes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Género / Colección</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as ProductGender })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                >
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Materiales (separados por coma)</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  placeholder="Ej: oro, dije cruz"
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

              <div>
                <label className="block text-sm text-gray-600 mb-2">Imagen del Producto</label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center">
                  {filePreview ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={filePreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : editingProduct?.images[0]?.src ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={editingProduct.images[0].src}
                        alt={editingProduct.images[0].alt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1A1A1A]">
                    <Upload size={18} />
                    <span>{filePreview ? "Cambiar imagen" : "Subir imagen"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
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
                <Button variant="primary" onClick={handleSave} className="flex-1">
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
