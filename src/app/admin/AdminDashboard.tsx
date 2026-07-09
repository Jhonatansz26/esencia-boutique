"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductCategory, ProductGender } from "@/types/product";
import {
  updateProduct,
  deleteProduct,
  createProduct,
  uploadProductImage,
  getAllProducts,
} from "@/lib/supabase-products";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { X, Save, Loader2, Plus, Trash2, Upload, Edit, Settings } from "lucide-react";
import Button from "@/components/common/Button";
import Link from "next/link";

interface AdminDashboardProps {
  initialProducts: Product[];
}

interface Category {
  slug: string;
  name: string;
}

export default function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  // Estados para modales y toasts
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Estados para configuración del sitio
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    featured: false,
    category: "manilla" as ProductCategory,
    gender: "mujer" as ProductGender,
    material: "",
  });

  // Cargar categorías y configuración desde Supabase
  useEffect(() => {
    loadCategories();
    loadSiteSettings();
  }, []);

  // Auto-ocultar toast después de 4 segundos
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Función para mostrar toasts
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Función para generar ID automático
  const generateProductId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EBH-${timestamp}-${random}`;
  };

  async function loadCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error loading categories:", error);
    } else if (data) {
      setCategories(data);
    }
  }

  async function loadProducts() {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  }

  async function loadSiteSettings() {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Error loading site settings:", error);
    } else if (data) {
      setWhatsappNumber(data.whatsapp_number || "");
      setInstagramLink(data.instagram_link || "");
    }
  }

  const handleSaveSiteSettings = async () => {
    setSavingSettings(true);
    
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          id: 1, // Asumimos que solo hay una fila de configuración
          whatsapp_number: whatsappNumber,
          instagram_link: instagramLink,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      showToast("Configuración guardada exitosamente", 'success');
      setIsSettingsModalOpen(false);
    } catch (error) {
      console.error("Error saving site settings:", error);
      showToast("Error al guardar la configuración", 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      showToast("El nombre de la categoría es obligatorio", 'error');
      return;
    }

    const slug = newCategoryName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/[^a-z0-9]+/g, "-") // Reemplazar espacios y caracteres especiales con guiones
      .replace(/^-+|-+$/g, ""); // Eliminar guiones al inicio y final

    // Verificar si ya existe
    const { data: existing } = await supabase
      .from("categories")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (existing) {
      showToast("Ya existe una categoría con ese nombre", 'error');
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert({ slug, name: newCategoryName.trim() });

    if (error) {
      console.error("Error adding category:", error);
      showToast("Error al agregar la categoría", 'error');
    } else {
      setNewCategoryName("");
      await loadCategories();
      showToast("Categoría agregada exitosamente", 'success');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormData({
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
      if (!formData.name) {
        showToast("El nombre del producto es obligatorio", 'error');
        setSaving(false);
        return;
      }

      const productId = generateProductId();
      let imageUrl = "";
      
      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, productId);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const newProduct = await createProduct({
        id: productId,
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
        whatsappMessage: `Hola! Estoy interesado en el producto: ${formData.name}.`,
      });

      if (newProduct) {
        await loadProducts();
        setIsCreating(false);
        showToast("Producto creado exitosamente", 'success');
      } else {
        showToast("Error al crear el producto", 'error');
      }
    } else if (editingProduct) {
      // Actualizar producto existente
      if (!formData.name) {
        showToast("El nombre del producto es obligatorio", 'error');
        setSaving(false);
        return;
      }

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
        showToast("Producto actualizado exitosamente", 'success');
      } else {
        showToast("Error al actualizar el producto", 'error');
      }
    }

    setSaving(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    const success = await deleteProduct(productToDelete);
    if (success) {
      await loadProducts();
      showToast("Producto eliminado exitosamente", 'success');
    } else {
      showToast("Error al eliminar el producto", 'error');
    }
    
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Forzar redirección y refrescar el estado del middleware
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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

        {/* Toast de notificación */}
        {toast && (
          <div className={`fixed top-6 right-6 z-[100] px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm font-medium ${
              toast.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {toast.message}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="mb-6 flex gap-3">
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={18} className="inline mr-2" />
            Nuevo Producto
          </Button>
          <Button variant="outline" onClick={() => setIsSettingsModalOpen(true)}>
            <Settings size={18} className="inline mr-2" />
            Configurar Contacto
          </Button>
        </div>

        {/* Sección de Gestión de Categorías */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">Gestionar Categorías</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de nueva categoría (ej: Gafas)"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-sm"
            />
            <Button variant="outline" onClick={handleAddCategory}>
              <Plus size={16} className="inline mr-1" />
              Agregar
            </Button>
          </div>
          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.slug}
                  className="inline-flex items-center px-3 py-1 rounded-sm text-xs bg-[#FAF7F2] text-[#1A1A1A] border border-gray-200"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tabla de Productos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A1A1A] text-[#FDFBF7]">
                <tr>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Imagen</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">ID</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Nombre</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Categoría</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Precio</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Destacado</th>
                  <th className="px-8 py-5 text-left text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-8 py-6">
                      <div className="relative w-16 h-16 overflow-hidden rounded">
                        <Image
                          src={product.images[0]?.src || "/images/placeholder.png"}
                          alt={product.images[0]?.alt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-mono text-gray-600">{product.id}</td>
                    <td className="px-8 py-6 text-sm text-[#1A1A1A] font-medium">{product.name}</td>
                    <td className="px-8 py-6 text-sm text-gray-600 capitalize">{product.category}</td>
                    <td className="px-8 py-6 text-sm font-serif italic text-stone-500">
                      ${product.price.toLocaleString("es-CO")} COP
                    </td>
                    <td className="px-8 py-6">
                      {product.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37]/20 text-[#D4AF37]">
                          Destacado
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-[#1A1A1A] hover:text-[#D4AF37] hover:bg-[#FAF7F2] rounded transition-all"
                          title="Editar producto"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                          title="Eliminar producto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
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

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4 tracking-wide">
              Confirmar Eliminación
            </h2>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-3">
              <Button 
                variant="primary" 
                onClick={confirmDelete}
                className="flex-1 bg-stone-900 hover:bg-red-800 text-white transition-colors duration-300"
              >
                <Trash2 size={18} className="inline mr-2" />
                Eliminar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-300"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración del Sitio */}
      {isSettingsModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 tracking-wide">
              Configurar Contacto
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Número de WhatsApp</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Ej: 573001234567"
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Enlace de Instagram</label>
                <input
                  type="text"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  placeholder="Ej: https://www.instagram.com/esenciaboutique"
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="primary" 
                  onClick={handleSaveSiteSettings}
                  className="flex-1"
                >
                  {savingSettings ? (
                    <Loader2 className="animate-spin inline mr-2" size={16} />
                  ) : (
                    <Save size={16} className="inline mr-2" />
                  )}
                  {savingSettings ? "Guardando..." : "Guardar Configuración"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSettingsModalOpen(false)}
                >
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
