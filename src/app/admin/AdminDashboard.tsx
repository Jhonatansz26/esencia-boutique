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
import { compressImage } from "@/lib/image-compression";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { revalidateCatalogo } from "@/app/actions/revalidate";
import { X, Save, Loader2, Plus, Trash2, Upload, Edit, Settings } from "lucide-react";
import Button from "@/components/common/Button";
import Link from "next/link";

interface AdminDashboardProps {
  initialProducts: Product[];
}

interface Category {
  slug: string;
  name: string;
  productCount: number;
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
  const [isCompressing, setIsCompressing] = useState(false);
  
  // Estados para modales y toasts
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState(false);
  const [categoryToDeleteData, setCategoryToDeleteData] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Estados para configuración del sitio
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  
  // Estados para búsqueda y filtrado
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminCategoryFilter, setAdminCategoryFilter] = useState("all");
  
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

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(adminSearchQuery.toLowerCase());
    const matchesCategory = adminCategoryFilter === "all" || product.category === adminCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  async function loadCategories() {
    const { data: categoriesData, error: catError } = await supabase
      .from("categories")
      .select("slug, name")
      .order("name");

    if (catError) {
      console.error("Error loading categories:", catError);
      return;
    }

    if (!categoriesData) return;

    const { data: productsData } = await supabase
      .from("products")
      .select("category");

    const countMap: Record<string, number> = {};
    if (productsData) {
      productsData.forEach((p: { category: string }) => {
        countMap[p.category] = (countMap[p.category] || 0) + 1;
      });
    }

    const enriched: Category[] = categoriesData.map((c: { slug: string; name: string }) => ({
      slug: c.slug,
      name: c.name,
      productCount: countMap[c.slug] || 0,
    }));

    setCategories(enriched);
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

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDeleteData(category);
    setIsCategoryDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDeleteData) return;

    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("slug", categoryToDeleteData.slug);

      if (error) throw error;

      await loadCategories();
      await loadProducts();
      showToast("Categoría eliminada exitosamente", "success");
    } catch {
      showToast("No se puede eliminar una categoría que contiene productos", "error");
    } finally {
      setIsCategoryDeleteModalOpen(false);
      setCategoryToDeleteData(null);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.82,
      });
      setSelectedFile(compressed);
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(compressed);
    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      showToast("Error al procesar la imagen. Intenta con otra.", "error");
      setSelectedFile(null);
      setFilePreview(null);
    } finally {
      setIsCompressing(false);
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

      if (formData.price <= 0) {
        showToast("El precio debe ser mayor a 0", 'error');
        setSaving(false);
        return;
      }

      const productId = generateProductId();
      let imageUrl = "";
      
      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, productId);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          showToast("Error al subir la imagen", 'error');
          setSaving(false);
          return;
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
        await revalidateCatalogo();
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

      if (formData.price <= 0) {
        showToast("El precio debe ser mayor a 0", 'error');
        setSaving(false);
        return;
      }

      let newImages = editingProduct.images;

      if (selectedFile) {
        const uploadedUrl = await uploadProductImage(selectedFile, editingProduct.id);
        if (uploadedUrl) {
          newImages = [{ src: uploadedUrl, alt: formData.name, width: 800, height: 800 }];
        } else {
          showToast("Error al subir la imagen", 'error');
          setSaving(false);
          return;
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
        await revalidateCatalogo();
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
      await revalidateCatalogo();
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
          <div
            className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-sm shadow-lg border backdrop-blur-sm transition-all duration-300 ${
              toast.type === "success"
                ? "bg-[#1A1A1A] border-[#D4AF37]/40 text-[#FDFBF7]"
                : "bg-[#1A1A1A] border-red-900/50 text-[#FDFBF7]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                toast.type === "success" ? "bg-[#D4AF37]" : "bg-red-500"
              }`}
            />
            <p className="text-sm tracking-wide">{toast.message}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="mb-6 flex gap-3">
          <Button variant="primary" onClick={handleCreate}>
            <Plus size={18} className="inline mr-2" />
            Nuevo Producto
          </Button>
          <Button variant="outline" onClick={() => setIsCategoryModalOpen(true)}>
            <span className="inline mr-1.5">🏷️</span>
            Categorías
          </Button>
          <Button variant="outline" onClick={() => setIsSettingsModalOpen(true)}>
            <Settings size={18} className="inline mr-2" />
            Configurar Contacto
          </Button>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                placeholder="🔍 Buscar producto por nombre o ID..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <select
              value={adminCategoryFilter}
              onChange={(e) => setAdminCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 text-sm bg-white"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {adminSearchQuery || adminCategoryFilter !== "all" ? (
            <p className="text-xs text-gray-500 mt-2">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
          ) : null}
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
                {filteredProducts.map((product) => (
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
            {filteredProducts.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 text-sm">
                  {adminSearchQuery || adminCategoryFilter !== "all"
                    ? "No se encontraron productos que coincidan con los filtros."
                    : "No hay productos registrados."}
                </p>
              </div>
            )}
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
                <label className="block text-sm text-gray-600 mb-2">Precio (COP) *</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      price: value === '' ? 0 : Math.max(0, Number(value))
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
                  min="0"
                  step="1000"
                  placeholder="Ej: 50000"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Ingresa el precio en pesos colombianos</p>
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
                  <label className={`inline-flex items-center gap-2 text-sm ${isCompressing ? 'text-gray-400 cursor-wait' : 'text-gray-600 hover:text-[#1A1A1A] cursor-pointer'}`}>
                    {isCompressing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Comprimiendo imagen...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        <span>{filePreview ? "Cambiar imagen" : "Subir imagen"}</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isCompressing}
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

      {/* Modal de Gestión de Categorías */}
      {isCategoryModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-xl w-full p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-5 tracking-wide">
              Gestionar Categorías
            </h2>

            {/* Bloque de creación */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                placeholder="Nombre de nueva categoría (ej: Gafas)"
                className="flex-1 px-4 py-2.5 bg-white border border-stone-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 focus:border-stone-300 text-sm transition-all"
              />
              <Button variant="outline" onClick={handleAddCategory}>
                <Plus size={16} className="inline mr-1" />
                Agregar
              </Button>
            </div>

            {/* Separador */}
            {categories.length > 0 && (
              <div className="border-b border-stone-200 my-5" />
            )}

            {/* Listado de categorías */}
            <div>
              {categories.length > 0 ? (
                <div className="bg-white/50 border border-stone-200/60 rounded-xl p-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.slug}
                      className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-white/80 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-stone-800 tracking-wide">
                          {cat.name}
                        </span>
                        <span className="inline-block bg-stone-200/60 text-stone-700 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full">
                          {cat.productCount === 1
                            ? "1 producto"
                            : `${cat.productCount} productos`}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        title="Eliminar categoría"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-stone-400 text-sm py-6">
                  No hay categorías registradas. Agrega la primera arriba.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación de Categoría */}
      {isCategoryDeleteModalOpen && categoryToDeleteData && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 20, 14, 0.55)" }}
        >
          <div className="bg-[#FAF7F2] rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setIsCategoryDeleteModalOpen(false);
                setCategoryToDeleteData(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-4 tracking-wide">
              Eliminar Categoría
            </h2>

            <p className="text-gray-600 mb-2">
              ¿Estás seguro de que deseas eliminar la categoría{" "}
              <span className="font-semibold text-[#1A1A1A]">"{categoryToDeleteData.name}"</span>?
            </p>
            <p className="text-sm text-stone-500 mb-6">
              {categoryToDeleteData.productCount > 0
                ? `Esta categoría tiene ${categoryToDeleteData.productCount} ${categoryToDeleteData.productCount === 1 ? "producto asociado" : "productos asociados"}. Los productos quedarán sin categoría asignada.`
                : "Esta categoría no tiene productos asociados."}
            </p>

            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={confirmDeleteCategory}
                className="flex-1 bg-stone-900 hover:bg-red-800 text-white transition-colors duration-300"
              >
                <Trash2 size={18} className="inline mr-2" />
                Eliminar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCategoryDeleteModalOpen(false);
                  setCategoryToDeleteData(null);
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
