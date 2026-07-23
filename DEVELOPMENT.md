# 💎 Bitácora de Desarrollo - Esencia Boutique

## 🚀 1. Stack Tecnológico & Arquitectura
* **Framework:** Next.js (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Iconos:** Lucide React

## 🗺️ 2. Mapa de Ruta de Componentes (Roadmap)
| Componente / Sección | Ubicación | Estado | Descripción |
| :--- | :--- | :--- | :--- |
| Configuración de Carpetas | `src/` | ✅ Completado | Estructura base del proyecto |
| Tipos y Datos Estáticos | `src/types`, `src/constants` | ✅ Completado | Modelos e información de la marca |
| Componentes Atómicos (Botón/Título) | `src/components/common` | ✅ Completado | Botones (primary/outline/invert) y títulos Serif con número fantasma |
| Navbar & Footer | `src/components/layout` | ✅ Completado | Footer editorial en 2 actos (banner contacto + 3 columnas) |
| Hero Section | `src/components/sections` | ✅ Completado | Portada con eslogan principal, editable inline en visual-editor |
| Filosofía de Marca (Philosophy) | `src/components/sections/Philosophy.tsx` | ✅ Completado | Misión/Visión con edición inline en visual-editor |
| Sección Materiales | `src/components/sections/Materials.tsx` | ✅ Completado | 3 tarjetas uniformes con degradado, nombres editables inline |
| Catálogo Destacado (Home) | `src/components/sections/ProductGrid.tsx` | ✅ Completado | Cuadrícula con enlaces directos a WhatsApp (async SSR) |
| Catálogo Completo | `src/app/catalogo/CatalogGrid` | ✅ Completado | Filtros editoriales + QuickView modal + Framer Motion |
| Valores (Mosaico) | `src/components/sections/Values.tsx` | ✅ Completado | Mosaico asimétrico con marcas de agua y soporte imagen |
| Reseñas (Testimonios) | `src/components/sections/Reviews.tsx` | ✅ Completado | Carrusel/Cuadrícula de opiniones de clientes |
| Banner Promocional | `src/components/sections/PromoBanner.tsx` | ✅ Completado | Countdown timer con auto-ocultamiento por expiración |
| Página 404 | `src/app/not-found` | ✅ Completado | Página editorial con CTAs duales |
| PWA Manifest | `src/app/manifest` | ✅ Completado | Configuración tipada para móvil |
| ScrollReveal | `src/components/common/ScrollReveal` | ✅ Completado | Wrapper de animaciones `whileInView` |
| SectionDivider | `src/components/common/SectionDivider` | ✅ Completado | Separador editorial de 1px |
| FilterBar | `src/components/catalogo/FilterBar` | ✅ Completado | Filtros editoriales con underline dorado animado |
| ProductSkeleton | `src/components/catalogo/ProductSkeleton` | ✅ Completado | Skeleton con `animate-pulse` premium |
| Compresión WebP | `src/lib/image-compression` | ✅ Completado | Canvas → WebP quality 0.82 en cliente |
| DraggableSectionList | `src/components/admin/DraggableSectionList` | ✅ Completado | DnD con @dnd-kit + subformulario promo-banner |
| EditModePanel | `src/components/admin/EditModePanel` | ✅ Completado | Panel lateral modo Diseñador/Canva |
| ProductGridPreview | `src/components/admin/ProductGridPreview` | ✅ Completado | Preview síncrono con mock data para visual-editor |
| ProductGridClient | `src/components/sections/ProductGridClient.tsx` | ✅ Completado | Preview cliente conectado a Supabase para visual-editor sin async Server Component |
| Visual Editor | `src/app/admin/visual-editor` | ✅ Completado | Lienzo interactivo con edición inline tipo Canva |
| Page Layout System | `src/lib/page-layout.ts` | ✅ Completado | Sistema dinámico de layout con Supabase |
| Page Layout Server Action | `src/app/actions/page-layout.ts` | ✅ Completado | Guardado SSR de layouts con cookies Supabase y revalidación de Home |
| EmptySectionState | `src/components/admin/EmptySectionState` | ✅ Completado | Placeholder para secciones vacías en modo editor |
| DesignerTipBanner | `src/components/admin/DesignerTipBanner` | ✅ Completado | Banner onboarding dismissible con localStorage |
| CanvasMetrics | `src/components/admin/CanvasMetrics` | ✅ Completado | Panel de métricas con badge de estado |
| SectionCanvasWrapper | `src/components/admin/SectionCanvasWrapper` | ✅ Completado | Wrapper con toolbar flotante y selección controlada |

## 📝 3. Historial de Cambios (Changelog)
### [Fase 1: Infraestructura Base]
- **Inicialización:** Creación del árbol de carpetas limpio, configuración de `globals.css` para Tailwind y limpieza del boilerplate por defecto de Next.js.

### [Fase 2: Capa de Datos]
- **Tipos:** Definición de interfaces `Product` y `Review` en `src/types/index.ts`.
- **Constantes:** Creación de `BRAND_INFO`, `BRAND_VALUES`, `FEATURED_PRODUCTS` y `CUSTOMER_REVIEWS` en `src/constants/data.ts` con datos reales de la marca.
- **Estilos base:** Configuración del color de fondo crema (`#FDFBF7`) y texto antracita (`#1A1A1A`) en `globals.css`.

### [Fase 3: Componentes Atómicos]
- **Button:** Componente reutilizable con soporte para `Link` (next/link) y `button`, variantes `primary` y `outline`, estilo píldora y transiciones suaves.
- **SectionTitle:** Componente de título de sección con tipografía serif, subtítulo opcional en mayúsculas con tracking amplio, y alineación configurable.

### [Fase 4: Layout Global]
- **Navbar:** Menú de navegación sticky con fondo semi-transparente y blur. Logo "ESENCIA" en serif con tracking amplio. Enlaces de navegación con hover suave. Menú hamburguesa responsive para móvil usando iconos de Lucide React.
- **Footer:** Sección de alto contraste con fondo antracita. Enlaces rápidos y copyright. Diseño premium inspirado en Framer.
- **Layout:** Integración de Navbar y Footer en `layout.tsx` con estructura flexbox para mantener el footer siempre abajo. Configuración de fuente serif (Playfair Display) para toda la aplicación.

### [Fase 5: Secciones de Introducción]
- **Hero:** Sección principal con grid de dos columnas. Identificador de categoría "JOYERÍA MINIMALISTA", título "Esencia en cada detalle" en serif, eslogan de la marca y botón CTA "VER COLECCIÓN". Imagen placeholder de Unsplash con aspect-ratio 4/5.
- **MissionVision:** Bloque de identidad corporativa con dos columnas. Uso de componente SectionTitle para "Misión" y "Visión", con párrafos que consumen datos de BRAND_INFO. Espaciado amplio y tipografía elegante.

### [Fase 6: Catálogo, Valores y WhatsApp]
- **ProductGrid:** Cuadrícula de productos con id="coleccion". Mapeo dinámico de FEATURED_PRODUCTS con imágenes de Unsplash, precios formateados en COP y botones de WhatsApp con mensajes personalizados por producto.
- **Values:** Sección de valores de marca con diseño minimalista. Grid de 4 columnas con iconos de Lucide React (Gem, Sparkles, Shield, Heart) para cada valor: Calidad, Elegancia, Autenticidad, Innovación.
- **WhatsAppFloating:** Botón flotante fijo en esquina inferior derecha con icono MessageCircle de Lucide. Color oficial de WhatsApp (#25D366), efecto hover scale-110 y enlace global a BRAND_INFO.whatsappLink.
- **Layout:** Integración de WhatsAppFloating en layout.tsx para acompañar al usuario en toda la navegación.

### [Fase 7: Reseñas y Banner de Estilo de Vida]
- **Reviews:** Sección final con dos bloques. Bloque A: Banner horizontal con imagen cinematográfica de estilo de vida y texto "Textura, luz y presencia." Bloque B: Cuadrícula de reseñas con SectionTitle, mapeo de CUSTOMER_REVIEWS, iconos Star dorados (5 estrellas), comentarios itálicos y firma con nombre y fecha. Diseño minimalista con tarjetas blancas y sombras sutiles.
- **Completado:** Landing page completa con todos los componentes de interfaz implementados y funcionando.

### [Fase 8: Imágenes Reales del Cliente]
- **Banner Reviews:** Reemplazado placeholder de Unsplash por imagen local `/images/medalla-dorada.png` (medalla dorada real del cliente).
- **Estado Final:** Landing page 100% finalizada con imágenes reales del cliente.

### [Hotfix: Configuración de Imágenes Remotas]
- **Problema:** Error de runtime al cargar imágenes desde Unsplash con el componente `<Image>` de Next.js.
- **Solución:** Se habilitó el dominio `images.unsplash.com` en `next.config.ts` mediante `remotePatterns` para permitir la optimización de imágenes externas durante el desarrollo.

### [Hotfix: Rediseño de Reseñas y Módulo Interactivo]
- **Problema:** El banner de la medalla dorada rompía el flujo visual de la página. Las reseñas eran estáticas y no permitían interacción del usuario.
- **Solución:** 
  - Eliminado el bloque del banner completo para mayor minimalismo.
  - Implementado sistema de reseñas interactivo con `useState` y persistencia en `localStorage`.
  - Formulario elegante con selector de estrellas interactivo (hover + click), input de nombre, textarea de comentario y botón de envío.
  - Protección SSR: carga de datos desde `localStorage` solo en cliente mediante `useEffect`.
  - Nuevas reseñas se añaden dinámicamente al estado y persisten entre recargas.

### [Hotfix: Refinamiento UX de Reseñas]
- **Problema:** Formulario fijo ocupaba demasiado espacio visual. Datos de prueba falsos en CUSTOMER_REVIEWS.
- **Solución:**
  - Vacío el arreglo `CUSTOMER_REVIEWS` para empezar con datos reales de clientes.
  - Formulario movido a modal con overlay (`bg-black/50 backdrop-blur-md`).
  - Botón "Compartir mi experiencia" centrado debajo del título.
  - Mensaje sutil cuando no hay reseñas: "Sé el primero en compartir tu experiencia con Esencia Boutique."
  - Modal se cierra automáticamente al enviar reseña o con botón X (icono Lucide).

### [Fase: Optimización Estética Pixel Perfect y Unificación de Tipos]
- **Arquitectura de Datos:**
  - Creación de `src/types/product.ts` con interfaces unificadas: `ProductImage`, `ProductCategory` ("manilla" | "cadena" | "set"), e `Product` completo.
  - Centralización de datos en `src/data/products.ts` con 15 productos reales (EBH-001 a EBH-015) y funciones auxiliares `getFeaturedProducts()` y `getProductsByCategory()`.
- **Design Tokens en Tailwind v4:**
  - Implementación del token `--radius-button: 0.125rem` en `globals.css` bajo `@theme`.
  - Migración de todos los botones de `rounded-full` a `rounded-sm` para estética más refinada.
- **Jerarquía Tipográfica:**
  - Hero: `text-5xl md:text-6xl lg:text-7xl leading-[1.05]` para peso editorial.
  - Misión/Visión: Títulos reducidos a `text-2xl md:text-3xl` (size="sm") para no competir con el Hero.
  - Paddings verticales ajustados a `py-24 md:py-36` para variar ritmo del scroll.
  - Componente `SectionTitle` extendido con prop `size` ("sm" | "md" | "lg").
- **Interactividad en Modal de Reseñas:**
  - Overlay cálido con `rgba(28, 20, 14, 0.55)` y `backdrop-blur-md`.
  - Fondo de tarjeta cambiado a crema suave `#FAF7F2`.
  - Implementación de estados `hoverRating` y `setHoverRating` para previsualización dorada en estrellas de Lucide antes del clic.
- **ProductGrid (Home):**
  - Conectado a `getFeaturedProducts()` de `@/data/products` con nuevo tipo `Product`.
  - Precio con tratamiento sofisticado: `font-serif italic text-stone-500 tracking-wide`.

### [Fase: Módulo de Catálogo Completo e Interactivo]
- **Estructura de Ruta:**
  - Creación de `src/app/catalogo/page.tsx` (Server Component) con metadatos SEO optimizados.
  - Creación de `src/app/catalogo/CatalogGrid.tsx` (Client Component) con lógica interactiva.
- **Filtros por Categoría:**
  - Barra de filtros con botones: Todo, Manillas, Cadenas, Sets.
  - Estado `activeCategory` para filtrado dinámico sin recarga de página.
  - Reset de paginación al cambiar de categoría.
- **Paginación "Ver más":**
  - Límite inicial de 12 productos por página (`ITEMS_PER_PAGE = 12`).
  - Botón "Ver más" que incrementa el conteo visible en bloques de 12.
  - Protección de Core Web Vitals (LCP) al evitar renderizado masivo.
- **Optimización de Imágenes y CLS:**
  - `ProductCard` con aspecto cuadrado fijo (`aspect-square`) para mitigar CLS.
  - Primeras 4 cards con `priority` y `loading="eager"` para LCP óptimo.
  - Resto de imágenes con `loading="lazy"` para performance.
  - Grid responsivo: 1 columna (móvil), 2 (tablet), 3 (laptop), 4 (desktop).
- **Detalles de UI:**
  - Hover en cards con `group-hover:scale-105` y transición suave.
  - Materiales mostrados con separador " · " y tracking amplio.
  - Precio con estilo serif itálico consistente con el resto del sitio.
   - Botón "Consultar" con variante outline y tamaño reducido.

### [Fase: Migración a Base de Datos (Supabase)]
- **Transición de Datos Estáticos a Dinámicos:**
  - Migración completa de `src/data/products.ts` (archivo estático local) a base de datos PostgreSQL en Supabase.
  - Creación de tabla `products` con esquema completo: `id` (TEXT PK), `name`, `category`, `material` (TEXT[]), `description`, `price` (NUMERIC), `images` (JSONB), `featured` (BOOLEAN), `whatsapp_message`, timestamps.
  - Configuración de políticas RLS (Row Level Security) para permitir lectura pública y escritura restringida.
  - Seed inicial de 27 productos: 15 masculinos reales (EBH-001 a EBH-015) + 12 placeholders femeninos (EBM-001 a EBM-012).
- **Integración con Supabase:**
  - Instalación de `@supabase/supabase-js` y `@supabase/ssr`.
  - Creación de cliente Supabase en `src/lib/supabase.ts` con variables de entorno.
  - Funciones CRUD en `src/lib/supabase-products.ts`: `getAllProducts()`, `getFeaturedProducts()`, `getProductsByCategory()`, `updateProduct()`, `createProduct()`, `deleteProduct()`, `uploadProductImage()`.
  - Refactorización de componentes para consumir datos dinámicos desde Supabase.

### [Fase: Filtro Cruzado Doble en el Catálogo]
- **Sistema de Filtrado Independiente y Combinable:**
  - Implementación de dos filas de filtros en `src/app/catalogo/CatalogGrid.tsx`: Colección (Todos/Hombre/Mujer) y Categoría (Todo/Manillas/Cadenas/Sets/Collares/Anillos/Aretes).
  - Lógica de filtrado cruzado: ambos filtros son independientes y se combinan con AND lógico.
  - Estados separados: `activeCollection` y `activeCategory` con reset automático de paginación al cambiar filtros.
  - Mensaje dinámico cuando no hay productos: "No hay productos disponibles con los filtros seleccionados."
  - Tipografía minimalista: etiquetas descriptivas "Colección" y "Categoría" arriba de cada fila de botones.

### [Fase: Sistema de Autenticación y Seguridad Avanzada]
- **Gestión de Sesiones con @supabase/ssr:**
  - Instalación de `@supabase/ssr` para manejo seguro de cookies de autenticación en Next.js App Router.
  - Configuración de cliente Supabase con cookies en `src/middleware.ts` usando `createServerClient`.
- **Middleware de Protección de Rutas:**
  - Creación de `src/middleware.ts` para interceptar rutas `/admin`.
  - Redirección automática a `/admin/login` si no hay sesión activa.
  - Normalización de trailing slashes para evitar bucles infinitos (`ERR_TOO_MANY_REDIRECTS`).
  - Redirección inversa: usuarios autenticados que intentan acceder a `/admin/login` son enviados a `/admin`.
- **Pantalla de Login Privada:**
  - Creación de `src/app/admin/login/page.tsx` con formulario minimalista.
  - Uso de `supabase.auth.signInWithPassword` para autenticación.
  - Manejo de errores con mensajes amigables ("Credenciales inválidas").
  - Redirección automática a `/admin` después del login exitoso.
  - Diseño elegante con paleta crema/antracita consistente con la marca.

### [Fase: Almacenamiento en la Nube (Supabase Storage)]
- **Configuración del Bucket 'product-images':**
  - Creación de bucket público en Supabase Storage para imágenes de productos.
  - Configuración de políticas RLS: lectura pública, inserción/borrado restringido a usuarios autenticados.
  - Actualización de `next.config.ts` con `remotePatterns` para permitir imágenes de Supabase Storage (`nlsehgaihqdyixbfluur.supabase.co/storage/v1/object/public/**`).
- **Carga de Imágenes en Tiempo Real:**
  - Función `uploadProductImage()` en `src/lib/supabase-products.ts` para subir archivos al bucket.
  - Generación automática de nombres de archivo únicos con timestamp: `${productId}/${Date.now()}.${ext}`.
  - Obtención de URLs públicas mediante `supabase.storage.from().getPublicUrl()`.
  - Almacenamiento de URLs en formato JSONB dentro de la columna `images` de la base de datos.
  - Input tipo archivo en el panel admin con preview de imagen antes de subir.
  - Soporte para reemplazo de imágenes existentes con confirmación visual.

### [Fase: Operaciones CRUD Completas en Panel Admin]
- **Refactorización de Arquitectura:**
  - Separación de responsabilidades: `src/app/admin/page.tsx` (Server Component) para carga inicial de datos + `src/app/admin/AdminDashboard.tsx` (Client Component) para gestión de estados.
  - Server Component ejecuta `await getAllProducts()` en el servidor y pasa `initialProducts` como prop.
  - Client Component maneja estados locales: `products`, `editingProduct`, `isCreating`, `formData`, `selectedFile`, `filePreview`.
- **Funcionalidades CRUD:**
  - **Crear:** Modal con formulario completo (ID, nombre, precio, categoría, género, materiales, descripción, imagen, destacado). Validación de campos obligatorios. Generación automática de `whatsappMessage`.
  - **Editar:** Pre-carga de datos existentes en el formulario. Actualización selectiva de campos. Soporte para cambio de imagen con preview.
  - **Eliminar:** Confirmación de seguridad con `confirm()` nativo. Eliminación permanente de registros. Recarga automática de la tabla.
  - **Subir Imágenes:** Input tipo archivo con preview. Upload a Supabase Storage. Actualización de URL en la base de datos.
- **UI/UX del Panel:**
  - Tabla responsive con columnas: Imagen (thumbnail), ID, Nombre, Categoría, Precio, Destacado, Acciones.
  - Botón "Nuevo Producto" destacado en la parte superior.
  - Botón "Cerrar Sesión" para logout manual.
  - Modal con scroll interno para pantallas pequeñas (`max-h-[90vh] overflow-y-auto`).
  - Estados de carga con spinner de Lucide (`Loader2`).
  - Mensaje de confirmación: "Conectado a Supabase: Los cambios se guardan directamente en la base de datos en tiempo real."

### [Fase: Evolución del Esquema y Refactorización Senior]
- **Migración de Lógica Frágil a Columna Formal:**
  - **Problema:** Filtrado por género dependía de prefijos de ID (`EBH` para hombre, `EBM` para mujer), lo cual era frágil y no escalable.
  - **Solución:** Agregada columna obligatoria `gender` (TEXT) con valores: `'hombre' | 'mujer' | 'unisex'` en la tabla `products`.
  - Actualización de tipo `Product` en `src/types/product.ts` con `gender: ProductGender`.
  - Refactorización de `mapRowToProduct()` para mapear la nueva columna.
  - Actualización de `createProduct()` y `updateProduct()` para incluir `gender`.
  - Refactorización de `CatalogGrid.tsx`: filtro ahora usa `product.gender === "hombre"` en lugar de `product.id.startsWith("EBH")`.
  - Agregado campo "Género / Colección" en el formulario del panel admin con opciones: Hombre, Mujer, Unisex.
- **Limpieza Profunda de Código Muerto:**
  - Eliminación de interfaz `Product` duplicada en `src/types/index.ts` (ahora solo contiene `Review`).
  - Eliminación de constante `FEATURED_PRODUCTS` obsoleta en `src/constants/data.ts`.
  - Eliminación de archivo `src/data/products.ts` (reemplazado por Supabase).
  - Corrección de imports en `src/constants/data.ts` para usar `Product` desde `@/types/product`.
  - Actualización de `Button.tsx` para aceptar prop `type` (button/submit/reset) requerida por formularios.
- **Integridad de Datos Garantizada:**
  - TypeScript: tipos estrictos en todo el código (`ProductGender`, `ProductCategory`, `ProductImage`).
  - PostgreSQL: columna `gender` con constraint NOT NULL y valores válidos.
   - Supabase Storage: políticas RLS para prevenir uploads no autorizados.
   - Middleware: protección de rutas administrativas sin afectar rutas públicas.

### [Julio 2026: Sistema de Búsqueda y Filtrado en Panel Admin]

#### **Optimización de Navegación Interna**
- **Estados de Filtrado y Búsqueda:**
  - `adminSearchQuery`: Búsqueda en tiempo real por nombre o ID de producto.
  - `adminCategoryFilter`: Filtrado por categoría con opción "Todas las categorías" (valor "all").
  - Array `filteredProducts` calculado dinámicamente combinando ambos criterios.

- **Barra de Controles de Búsqueda:**
  - Input de búsqueda con icono SVG de lupa y placeholder "🔍 Buscar producto por nombre o ID...".
  - Select dinámico que carga categorías desde Supabase (tabla `categories`).
  - Contador de resultados: "Mostrando X de Y productos" cuando hay filtros activos.
  - Diseño responsive: columna única en móvil, fila horizontal en desktop.

- **Lógica de Filtrado en Tiempo Real:**
  - Búsqueda case-insensitive usando `.toLowerCase()` en nombre e ID.
  - Filtrado por categoría con operador OR cuando `adminCategoryFilter === "all"`.
  - Mensaje de estado vacío: "No se encontraron productos que coincidan con los filtros."
  - Renderizado condicional de tabla vs mensaje de vacío.

#### **Correcciones de Bugs Críticos**
- **Validación de Precio Obligatorio:**
  - Validación `formData.price <= 0` antes de crear/actualizar producto.
  - Toast de error: "El precio debe ser mayor a 0".
  - Input mejorado con `step="1000"` y placeholder "Ej: 50000".
  - Manejo de input vacío: `value === '' ? 0 : Math.max(0, Number(value))`.

- **Validación de Subida de Imagen:**
  - Verificación de `uploadedUrl` antes de continuar con creación de producto.
  - Toast de error: "Error al subir la imagen" si falla el upload.
  - Cancelación de operación si la imagen no se sube correctamente.

- **Manejo Robusto de URLs Públicas:**
  - Función `uploadProductImage()` con try-catch para capturar errores inesperados.
  - Validación explícita de `urlData.publicUrl` antes de retornar.
  - Logs de depuración para rastrear flujo de subida y mapeo de productos.

#### **Logs de Depuración Implementados**
- **`createProduct()`:** Log de datos antes de insertar (id, name, price, images, category, gender).
- **`mapRowToProduct()`:** Log de cada producto mapeado con imágenes (id, name, price, imagesLength, firstImageSrc).
- **`uploadProductImage()`:** Log de URL pública obtenida tras subida exitosa.
- **Propósito:** Diagnosticar problemas de imágenes rotas y precios incorrectos en catálogo público.

### [Julio 2026: Refactorización Avanzada y Optimización UX/UI]

#### **Base de Datos Dinámica y Gestión de Categorías**
- **Creación de Tabla `categories`:**
  - Implementación de tabla dinámica en Supabase con columnas `slug` (TEXT PK) y `name` (TEXT).
  - Políticas RLS configuradas para permitir lectura pública y escritura restringida a usuarios autenticados.
  - Función `loadCategories()` en `AdminDashboard.tsx` para cargar categorías en tiempo real.
  - Función `handleAddCategory()` con generación automática de slugs (normalización de acentos, espacios y caracteres especiales).
  - Validación de duplicados antes de inserción mediante consulta `SELECT` previa.
  - Interfaz de gestión de categorías en el panel admin con input y botón "Agregar".

- **Creación de Tabla `site_settings`:**
  - Tabla de configuración global con columnas: `id` (INTEGER PK), `whatsapp_number` (TEXT), `instagram_link` (TEXT), `updated_at` (TIMESTAMPTZ).
  - Función `loadSiteSettings()` para cargar configuración al montar el componente.
  - Función `handleSaveSiteSettings()` con operación `upsert` para insertar o actualizar.
  - Modal compacto accionado por botón "⚙️ Configurar Contacto" (reemplaza tarjeta estática grande).
  - Cierre automático del modal tras guardado exitoso con toast de confirmación.

#### **Panel de Administración: Refactorización Completa**
- **Automatización de IDs:**
  - Eliminación del campo "ID" manual del formulario de crear/editar producto.
  - Implementación de función `generateProductId()` que genera IDs únicos con formato `EBH-{timestamp}-{random}`.
  - Validación simplificada: solo el nombre del producto es obligatorio.

- **Rediseño Estético de la Tabla de Productos:**
  - Padding ampliado: `px-8 py-6` (antes `px-6 py-4`) para mayor espaciado visual.
  - Columna "Acciones" rediseñada con iconos de Lucide React:
    - Botón "Editar": icono `Edit` con hover dorado (`hover:text-[#D4AF37] hover:bg-[#FAF7F2]`).
    - Botón "Eliminar": icono `Trash2` con hover rojo (`hover:text-red-700 hover:bg-red-50`).
  - Tooltips agregados con atributo `title` para mejor accesibilidad.
  - Transiciones suaves (`transition-all`) en todos los elementos interactivos.

- **Sistema de Notificaciones Moderno:**
  - **Eliminación total de `alert()` y `confirm()` nativos del navegador.**
  - **Sistema de Toasts asíncronos:**
    - Estado `toast` con estructura `{ message: string; type: 'success' | 'error' }`.
    - Función `showToast()` para mostrar notificaciones.
    - Auto-ocultación después de 4 segundos mediante `useEffect` con `setTimeout`.
    - Posicionamiento fijo en esquina superior derecha (`fixed top-6 right-6 z-[100]`).
    - Estilos diferenciados: verde para éxito (`bg-green-50 border-green-200`), rojo para error (`bg-red-50 border-red-200`).
  - **Modal de Confirmación de Eliminación:**
    - Overlay oscuro con desenfoque (`backdrop-blur-md`, `rgba(28, 20, 14, 0.55)`).
    - Estados `isDeleteModalOpen` y `productToDelete` para control de visibilidad.
    - Botón "Eliminar" con estilo sofisticado: `bg-stone-900 hover:bg-red-800 text-white transition-colors duration-300`.
    - Botón "Cancelar" con contraste corregido: `border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900`.
    - Cierre automático tras eliminación exitosa.

#### **Catálogo Público: Programación Defensiva y Filtros Dinámicos**
- **Filtros Dinámicos desde Supabase:**
  - Eliminación del objeto estático `CATEGORY_LABELS` en `CatalogGrid.tsx`.
  - Implementación de `useEffect` para cargar categorías desde tabla `categories` de Supabase.
  - Estado `categories` para almacenar categorías dinámicas.
  - Renderizado dinámico de botones de filtro mediante `categories.map()`.
  - Botón "Todo" agregado manualmente como primera opción.
  - Actualización automática de la barra de filtros cuando se agregan nuevas categorías en el panel admin.

- **Programación Defensiva con Optional Chaining:**
  - **Problema:** Crash de renderizado (`Cannot read properties of undefined (reading 'src')`) cuando un producto tenía array `images` vacío o malformado.
  - **Solución:** Implementación de optional chaining en `CatalogGrid.tsx`:
    ```typescript
    src={product.images?.[0]?.src || '/images/placeholder.png'}
    alt={product.images?.[0]?.alt || product.name}
    ```
  - Verificación de array válido antes de renderizar imagen.
  - Imagen placeholder por defecto (`/images/placeholder.png`) como fallback.
  - Texto alternativo usa nombre del producto como fallback.

#### **Correcciones de Bugs y Refinamientos Visuales**
- **Bug de Contraste en Botón "Cancelar":**
  - **Problema:** Texto se volvía blanco al hacer hover sobre fondo gris claro, causando invisibilidad.
  - **Solución:** Agregada clase `hover:text-stone-900` para forzar texto oscuro en estado hover.
  - Transición suave de 300ms aplicada tanto para fondo como para texto (`transition-colors duration-300`).

- **Refinamiento Estético de Botones Destructivos:**
  - Cambio de rojo brillante agresivo (`bg-red-600 hover:bg-red-700`) a tono borgoña sofisticado.
  - Nuevo estilo: `bg-stone-900 hover:bg-red-800 text-white transition-colors duration-300`.
  - Transición de gris oscuro a rojo borgoña profundo para mantener estética minimalista y lujosa.

#### **Estado del Build y Calidad de Código**
- **Compilación Exitosa:** `npm run build` sin errores de TypeScript ni advertencias.
- **Tipado Estricto:** Todas las nuevas interfaces y tipos correctamente definidos en `src/types/product.ts`.
- **Integridad de Datos:** Validaciones en frontend y backend (RLS en Supabase).
- **UX/UI Consistente:** Paleta de colores, tipografía y espaciado alineados con la identidad de Esencia Boutique.

### [Julio 2026: Hotfix — Invalidación de Caché ISR en Catálogo]

- **Problema Detectado:**
  - Al editar el género de un producto (ej: "hombre" → "mujer") en el panel admin, el cambio se reflejaba momentáneamente en la UI pero al recargar o volver a entrar al catálogo público, los datos viejos persistían.
  - Causa raíz: la página `/catalogo` usaba ISR con `revalidate = 60`, lo que significaba que los datos se servían desde caché estática hasta 60 segundos después de una edición.

- **Diagnóstico del Payload:**
  - Verificado que `AdminDashboard.tsx` ya incluía correctamente `gender: formData.gender` en el objeto de actualización (línea 382). El payload no era el problema.
  - El problema era exclusivamente de revalidación de caché del lado del servidor.

- **Solución Implementada:**
  - **Server Action de Revalidación:** Creación de `src/app/actions/revalidate.ts` con función `revalidateCatalogo()` que ejecuta `revalidatePath("/catalogo")` para invalidar caché inmediatamente tras operaciones CRUD.
  - **Integración en AdminDashboard:** Llamada a `await revalidateCatalogo()` después de cada operación exitosa: crear producto, actualizar producto y eliminar producto.
  - **Reducción de ISR Fallback:** `revalidate` en `catalogo/page.tsx` reducido de `60` a `10` segundos como capa de seguridad adicional.
  - **Log de Depuración:** Agregado `console.log("Género enviado a Supabase:", updates.gender)` en `supabase-products.ts` justo antes del `.update()` para rastrear el valor que viaja a la base de datos.

- **Archivos Modificados:**
  - `src/app/actions/revalidate.ts` — Nuevo (Server Action con `revalidatePath`).
  - `src/app/admin/AdminDashboard.tsx` — Import y llamada a `revalidateCatalogo()` en 3 puntos: crear, actualizar, eliminar.
  - `src/app/catalogo/page.tsx` — `revalidate` cambiado de `60` a `10`.
  - `src/lib/supabase-products.ts` — Console.log de género antes del update.

- **Build:** `npm run build` completado exitosamente sin errores de TypeScript ni advertencias.

### [Julio 2026: Rediseño Completo de Gestión de Categorías en Panel Admin]

#### **Evolución Iterativa de la UI de Categorías**
- **Iteración 1 — Badges con doble clic:**
  - Botón "×" (lucide `X`) integrado en cada badge.
  - Confirmación en dos clics: primer clic tiñe el badge de rojo, segundo clic ejecuta la eliminación.
  - `handleDeleteCategory(slug)` con consulta Supabase `.delete().eq('slug', slug)` y try-catch para FK constraints.
  - Toast verde de éxito / rojo de error ("No se puede eliminar una categoría que contiene productos").

- **Iteración 2 — Micro-tarjetas en grid:**
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` con tarjetas `bg-stone-50 border-stone-200 rounded-md`.
  - Icono `Trash2` en botón circular con hover rojo.
  - Descartado: ocupaba demasiado espacio vertical.

- **Iteración 3 — Pills compactos:**
  - `flex flex-wrap gap-2.5` con píldoras `bg-stone-100 border-stone-200/60 rounded-full`.
  - Icono `X` con `opacity-40` → `hover:opacity-100 hover:text-red-600 hover:scale-110`.
  - Descartado: se sentía tosco y el estado rojo parecía error de sistema.

- **Iteración 4 — Lista vertical premium (definitiva):**
  - **Interface `Category`** extendida con `productCount: number`.
  - **`loadCategories()`** reescrita: dos consultas eficientes (categorías + productos) con mapa de conteos en memoria.
  - **Estados:** `categoryToDelete` reemplazado por `isCategoryDeleteModalOpen` + `categoryToDeleteData: Category | null`.
  - **`handleDeleteCategory(category)`** abre modal; `confirmDeleteCategory()` ejecuta eliminación real.
  - **UI:** Título `font-serif`, input con soporte Enter, separador `border-b border-stone-200`, filas `py-3.5` con nombre + contador + icono `Trash2` tenue con hover rojo.
  - **Modal de confirmación:** Mensaje dinámico ("Esta categoría tiene X productos asociados..."), siempre se muestra independientemente del conteo.
  - **Estado vacío:** Mensaje centrado `text-stone-400 text-sm`.

- **Iteración 5 — Modal flotante:**
  - Sección fija eliminada del dashboard.
  - Botón "🏷️ Categorías" en barra de acciones junto a "Nuevo Producto" y "Configurar Contacto".
  - Modal con `backdrop-blur-md`, `bg-[#FAF7F2]`, `max-w-xl`, `max-h-[85vh] overflow-y-auto`.
  - Mismo estilo que modales existentes (overlay `rgba(28, 20, 14, 0.55)`).

- **Iteración 6 — Micro-contrastes visuales (final):**
  - Input de creación: `bg-white shadow-sm` para destacar sobre fondo crema.
  - Contenedor del listado: `bg-white/50 border border-stone-200/60 rounded-xl p-4`.
  - Contadores como mini-badges: `bg-stone-200/60 text-[10px] font-semibold uppercase tracking-wider rounded-full`.
  - Filas interactivas: `hover:bg-white/80 px-2 rounded-lg transition-colors duration-200`.

#### **Archivos Modificados:**
- `src/app/admin/AdminDashboard.tsx` — Rediseño completo de gestión de categorías.

### [Julio 2026: Modal de Vista Rápida (Quick View) en Catálogo Público]

#### **Implementación en `CatalogGrid.tsx`:**
- **Estados nuevos:**
  - `selectedProduct: Product | null` — controla visibilidad del modal.
  - `activeImageIndex: number` — imagen activa en la galería.

- **Tarjetas clickeables:**
  - `ProductCard` ahora acepta prop `onClick`.
  - `cursor-pointer` en contenedor, al hacer clic asigna producto y resetea índice a 0.

- **Modal Quick View (`z-[70]`):**
  - Overlay `backdrop-blur-md` con `rgba(28, 20, 14, 0.6)`.
  - Tarjeta `bg-[#FAF7F2] rounded-2xl shadow-2xl max-w-4xl`.
  - Botón de cierre `X` (lucide) circular con `bg-white/80` en esquina superior derecha.
  - Cierre al hacer clic en overlay o botón X.

- **Columna 1 — Galería interactiva:**
  - Imagen principal `aspect-square rounded-xl` con `transition-opacity duration-300`.
  - Thumbnails 64x64 (`w-16 h-16`) solo si hay más de 1 imagen.
  - Thumbnail activa: `border-stone-800 shadow-sm`, inactivas: `border-transparent opacity-60 hover:opacity-100`.
  - Scroll horizontal para múltiples thumbnails.

- **Columna 2 — Información comercial:**
  - Categoría en `text-xs tracking-wider uppercase text-stone-400`.
  - Nombre `font-serif text-2xl text-stone-900`.
  - Precio `font-serif text-xl text-stone-600` con "COP" en gris claro.
  - Descripción con `max-h-32 overflow-y-auto` para scroll interno.
  - Materiales con separador " · ".
  - Botón WhatsApp verde (`bg-[#25D366] hover:bg-[#20BD5A]`) con ícono SVG y mensaje personalizado que incluye nombre y precio.

#### **Archivos Modificados:**
- `src/app/catalogo/CatalogGrid.tsx` — Import de `X` de lucide-react, nuevos estados, ProductCard con onClick, modal Quick View completo.

---

## 🎨 FASE DE REDISEÑO EDITORIAL (Sesión Julio 2026)

### [Fase E1: Refactorización Home — Layout Asimétrico Editorial]

#### **MissionVision (BrandStory) — Layout 60/40 Asimétrico:**
- Estructura anterior simétrica 50/50 reemplazada por grid `[3fr_2fr]`.
- Eliminados encabezados "Misión" y "Visión".
- Etiqueta discreta superior: "FILOSOFÍA DE MARCA" (`text-xs uppercase tracking-widest text-stone-400`).
- Título gigante poético: `font-serif italic text-5xl md:text-7xl text-stone-900 leading-tight`.
- Efecto layering: texto flota sobre borde de imagen con `md:-mr-16 lg:-mr-24` (posteriormente eliminado en hotfix responsive).
- Imagen con `aspect-[3/4]`, ruta agnóstica `/images/filosofia-marca.jpeg`.

#### **Nueva Sección Materials:**
- Creación de `src/components/sections/Materials.tsx` con `id="materiales"` y `scroll-mt-24`.
- 3 tarjetas desiguales con stagger `mt-0`, `mt-12`, `mt-6` para romper monotonía.
- Materiales: "Acero Inoxidable", "Oro Laminado", "Piedras Naturales".
- Imágenes de fondo con `bg-gradient-to-t from-black/70 to-transparent`.
- Hover: `scale-105` con `duration-700 ease-out` + texto `-translate-y-1`.
- **Hotfix aplicado:** stagger eliminado, altura fija `h-[400px]` mobile / `md:h-[500px]` desktop, `pb-8 md:pb-10` para evitar texto cortado, overlay `bg-gradient-to-t from-black/80 via-black/40 to-transparent` reforzado.

#### **SectionDivider:**
- Creación de `src/components/common/SectionDivider.tsx`.
- Línea horizontal de 1px con `bg-[#1A1A1A]/10` dentro de contenedor `max-w-7xl`.

#### **Home page.tsx reordenado:**
- Import alias: `import BrandStory from "@/components/sections/MissionVision"`.
- Estructura intercalada: `<Hero />`, `<SectionDivider />`, `<BrandStory />`, etc.

### [Fase E2: Footer en 2 Actos + Valores Mosaico]

#### **Footer reescrito en 2 actos:**
- **Acto 1 (Banner de contacto):** `id="contacto"`, fondo `#1A1A1A`, etiqueta "Contacto" en dorado, título poético, CTA WhatsApp.
- **Acto 2 (Footer editorial):** Fondo `#141210`, grid `md:grid-cols-[1.3fr_1fr_1fr]` con 3 columnas: Marca, Navegación, Atención.
- Columna "Atención" con enlaces a WhatsApp, Instagram y dirección.
- Textura de puntos sutil `radial-gradient` en ambos actos.

#### **Values — Mosaico Asimétrico:**
- Reemplazados 4 iconos vectoriales (Gem, Sparkles, Shield, Heart) por mosaico.
- Bloque "01" grande `lg:col-span-2 lg:row-span-2`, resto `lg:col-span-2` o `lg:col-span-1`.
- Marcas de agua numéricas gigantes (`text-9xl sm:text-[10rem]`) en `text-stone-200/40`.
- Soporte para `bgImage` opcional con overlay y `text-stone-200/40` por defecto.
- **Hotfix responsive:** `heightClass` estrictas (`h-[320px]`, `h-[200px]`, `lg:h-auto`), padding proporcional por breakpoint, marcas de agua escalonadas (`text-9xl sm:text-[10rem] md:text-9xl`).

#### **Button — Nueva Variante `invert`:**
- Agregada tercera variante nativa en `src/components/common/Button.tsx`.
- `invert`: `bg-[#FDFBF7] text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#1A1A1A]`.
- Elimina necesidad de overrides `!bg-` en Tailwind.

### [Fase E3: Catálogo — Filtros Editoriales + Quick View + Animaciones]

#### **FilterBar Editorial:**
- Creación de `src/components/catalogo/FilterBar.tsx`.
- 2 niveles jerárquicos: Colección (tabs Serif grandes con subrayado dorado animado) y Categoría (botones pequeños con tracking amplio).
- Subrayado animado `bg-[#D4AF37]` con `transition-all duration-300 ease-out`.
- Contador editorial `[N]` en `font-serif italic`.
- Carga dinámica de categorías desde Supabase via `useEffect`.

#### **CatalogGrid — Layout Asimétrico (Fase 3):**
- Reescrito completo con `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- `FEATURE_EVERY = 7`: cada 7° producto recibe `sm:col-span-2 lg:col-span-2 lg:row-span-2` para romper ritmo.
- `motion.div` con `layoutId` para transición de imagen compartida al Quick View.
- **Refactor de Fase 6 (catálogo simétrico):** Eliminado `FEATURE_EVERY` e `isFeatured`. Todas las tarjetas uniformes con `aspect-square`. Grilla `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`. Etiqueta "Pieza destacada" ahora controlada por `product.featured` de la BD.

#### **QuickView Modal con Framer Motion:**
- Instalado `framer-motion` como dependencia.
- `motion.div` con `initial/animate/exit` para fade-in/out.
- `layoutId` compartido entre `ProductCard` y modal para transición de imagen compartida.
- Galería de thumbnails con scroll horizontal.
- `AnimatePresence` envolviendo el modal completo.

#### **Skeleton de Carga:**
- Creación de `src/components/catalogo/ProductSkeleton.tsx` con pulsación `animate-pulse` de 2.2s.
- Skeleton respeta la lógica de featured (anteriormente) y luego fue simplificado a tarjetas uniformes.
- `src/app/catalogo/loading.tsx` como fallback automático de Next.js con skeleton de filtros + grilla.

#### **ScrollReveal Wrapper:**
- Creación de `src/components/common/ScrollReveal.tsx`.
- `motion.div` con `whileInView` + `viewport.once` + `margin: "-100px"`.
- Duración 0.6s, ease "easeOut", delay opcional.
- Aplicado a todas las secciones de la Home excepto Hero (evita parpadeo inicial).

### [Fase E4: Páginas Institucionales + Metadatos Open Graph]

#### **Sección 404 Editorial:**
- Creación de `src/app/not-found.tsx`.
- Tipografía gigante `font-serif text-8xl md:text-9xl text-stone-200/50`.
- Título: "Esta pieza no se encuentra en nuestra colección".
- CTAs duales: "Volver al Inicio" (primary) y "Ver Catálogo" (outline).

#### **Login Admin Reestilizado:**
- Reescrito `src/app/admin/login/page.tsx` con estética premium.
- Etiqueta "Acceso privado" en `text-xs uppercase tracking-[0.25em] text-stone-400`.
- Inputs con `border-[#1A1A1A]/15` y `focus:border-[#D4AF37]`.
- Alerta de error refinada con `border-red-900/20 bg-red-900/5`.

#### **SectionTitle con Número Fantasma:**
- Extendido `src/components/common/SectionTitle.tsx` con prop opcional `number?: string`.
- Renderiza `<span>` absoluto con `font-serif text-8xl md:text-9xl text-stone-200/40` y `-z-0`.

#### **Metadata Open Graph Global:**
- Reescrito `src/app/layout.tsx` con `metadataBase`, `title.template`, Open Graph completo (es_CO, og-cover.jpg 1200x630), Twitter Cards.
- Palabras clave: "joyería minimalista", "joyería Colombia", "accesorios de autor", etc.

#### **PWA Manifest:**
- Creación de `src/app/manifest.ts` tipado con `MetadataRoute.Manifest`.
- `name`, `short_name`, `start_url: "/"`, `display: "standalone"`, colores brand.
- Iconos 512x512 y 180x180 (apple-icon).

#### **Compresión de Imágenes WebP:**
- Creación de `src/lib/image-compression.ts` con función asíncrona Canvas-based.
- Convierte a WebP con `quality: 0.82` y max 1600x1600.
- Integrada en `AdminDashboard.tsx`: estado `isCompressing`, spinner de Loader2 durante proceso, input deshabilitado.

#### **Toasts Boutique Dark:**
- Refactor del toast en `AdminDashboard.tsx`: fondo `#1A1A1A`, borde dorado `#D4AF37/40` para éxito y rojo sutil para error.
- Indicador circular pequeño (`w-1.5 h-1.5`) en el color correspondiente.

### [Fase E5: Hotfix Responsive y Refinamiento Final]

#### **Corrección de Desbordamiento en MissionVision:**
- **Problema:** Título "Cada pieza, un manifiesto..." desbordaba hacia la imagen.
- **Solución:** Añadido `max-w-xl` al `<h2>`, padding `pr-4 md:pr-8` a la columna de texto.
- **Ajuste final:** Grid `gap-8 md:gap-12 lg:gap-16`, eliminados márgenes negativos conflictivos.
- Imagen cambiada a ruta agnóstica `/images/filosofia-marca.jpeg` con `object-cover object-center` y `md:items-center`.

#### **Corrección de Texto Cortado en Materials:**
- **Problema:** Descripción de "Acero Inoxidable" se cortaba en la base.
- **Iteración 1:** Altura fija `h-[450px]` + stagger eliminado, `flex-col justify-end`.
- **Iteración 2 (definitiva):** `h-[400px]` mobile / `md:h-[500px]` desktop, padding `pb-8 md:pb-10`, `z-10`, degradado `from-black/80 via-black/40 to-transparent` para asegurar legibilidad.

#### **Contraste Condicional en Values:**
- **Problema:** Texto oscuro sobre imagen oscura en tarjeta "01 CALIDAD".
- **Solución:** Cuando `value.bgImage` existe, texto cambia a `text-white`/`text-stone-200`, divisor a `bg-white/40`, número a `text-white/10`, y overlay cambia a `bg-gradient-to-t from-black/80 via-black/40 to-transparent`.
- Ruta de imagen: `/images/valores-calidad.png`.

#### **Grilla Uniforme del Catálogo:**
- **Problema:** Producto "destacado" duplicaba tamaño rompiendo simetría.
- **Solución:** Eliminado `FEATURE_EVERY` e `isFeatured`. Todas las tarjetas usan `aspect-square` uniforme. La etiqueta "PIEZA DESTACADA" se renderiza condicionalmente por `product.featured` sin alterar tamaño.

#### **Iconos WhatsApp Monocromáticos:**
- **Problema:** Colores corporativos verde/rosa rompían paleta boutique.
- **Iteración 1:** SVG oficial con `viewBox="0 0 24 24"`, `circle #25D366` + `path #FFF`.
- **Iteración 2 (definitiva):** SVG monocromático con `fill="currentColor"` que se adapta al contexto.
- **Footer:** `className="w-5 h-5 fill-current transition-colors duration-300"` — hereda `hover:text-[#D4AF37]`.
- **WhatsAppFloating:** Contenedor circular boutique `bg-[#1A1A1A] text-[#FAF7F2] p-3 rounded-full border border-[#FAF7F2]/10 hover:bg-[#FAF7F2] hover:text-[#1A1A1A] hover:scale-105`. SVG interno `w-6 h-6 fill-current`.
- Reemplazado `Instagram` (que no existe en lucide-react@1.23.0) por componente SVG inline con el logo oficial.

#### **Revalidación de Home:**
- `src/app/actions/revalidate.ts` extendido con `revalidatePath("/")` para que los productos destacados en la Home se actualicen al hacer cambios en el admin.

#### **Scroll Behavior Smooth:**
- `src/app/globals.css` con `html { scroll-behavior: smooth; }` para ancla perfecta del Navbar a `/#materiales`.

### [Fase E6: Estructura de Archivos Actualizada]

```
src/
├── app/
│   ├── actions/
│   │   ├── page-layout.ts (Server Action - guardado SSR de layouts)
│   │   └── revalidate.ts (Server Action - revalidación / y /catalogo)
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── AdminDashboard.tsx (compresión WebP, toasts boutique, botón Editor Visual)
│   │   ├── login/page.tsx (estética premium con focus dorado)
│   │   └── visual-editor/page.tsx (lienzo interactivo modo Canva)
│   ├── catalogo/
│   │   ├── page.tsx
│   │   ├── CatalogGrid.tsx (grilla simétrica + Framer Motion + QuickView)
│   │   └── loading.tsx (ProductSkeleton fallback)
│   ├── layout.tsx (metadatos OpenGraph + Twitter Cards)
│   ├── page.tsx (Home dinámica con SECTION_REGISTRY)
│   ├── not-found.tsx (página 404 editorial)
│   ├── manifest.ts (PWA manifest tipado)
│   └── globals.css (scroll-behavior smooth)
├── components/
│   ├── admin/
│   │   ├── CanvasMetrics.tsx (panel de métricas: secciones totales, ocultas, badge de estado)
│   │   ├── DesignerTipBanner.tsx (banner onboarding dismissible con localStorage)
│   │   ├── DraggableSectionList.tsx (DnD con @dnd-kit + subformulario promo-banner)
│   │   ├── EditableText.tsx (contentEditable seguro sin salto de cursor)
│   │   ├── EditModePanel.tsx (panel lateral modo Diseñador/Canva)
│   │   ├── EmptySectionState.tsx (placeholder para secciones vacías en editor)
│   │   ├── ImageDropZone.tsx (drag & drop de imágenes con compresión WebP)
│   │   ├── ProductGridPreview.tsx (preview síncrono con mock data para visual-editor)
│   │   ├── PublishHistoryPanel.tsx (historial de versiones con rollback)
│   │   ├── SectionCanvasWrapper.tsx (wrapper con toolbar flotante y selección controlada)
│   │   ├── TemplateLibrary.tsx (biblioteca de plantillas insertables)
│   │   └── ThemeSelector.tsx (selector de temas de acento)
│   ├── catalogo/
│   │   ├── FilterBar.tsx (filtros editoriales con underline animado)
│   │   └── ProductSkeleton.tsx (skeleton con animate-pulse 2.2s)
│   ├── common/
│   │   ├── Button.tsx (variantes: primary, outline, invert)
│   │   ├── ScrollReveal.tsx (wrapper de Framer Motion)
│   │   ├── SectionDivider.tsx (línea 1px separadora)
│   │   ├── SectionTitle.tsx (con número fantasma opcional)
│   │   └── WhatsAppFloating.tsx (botón boutique monocromático)
│   ├── layout/
│   │   ├── Footer.tsx (2 actos: banner contacto + footer editorial)
│   │   └── Navbar.tsx
│   └── sections/
│       ├── Hero.tsx (editable inline con contentEditable)
│       ├── Materials.tsx (editable inline nombres de materiales)
│       ├── Philosophy.tsx (editable inline Misión/Visión)
│       ├── ProductGridClient.tsx (preview cliente para visual-editor)
│       ├── ProductGrid.tsx (3 destacados async conectados a Supabase)
│       ├── PromoBanner.tsx (countdown timer con auto-ocultamiento)
│       ├── Values.tsx (mosaico asimétrico con texto condicional)
│       └── Reviews.tsx
├── lib/
│   ├── image-compression.ts (Canvas → WebP quality 0.82)
│   ├── page-layout.ts (getPageLayout, DEFAULT_HOME_LAYOUT, toDraftSlug)
│   ├── supabase-browser.ts (singleton cliente Supabase para componentes cliente)
│   ├── supabase.ts
│   └── supabase-products.ts
├── types/
│   ├── index.ts (Review)
│   ├── layout.ts (SectionType, SectionConfig, PageLayout)
│   └── product.ts (Product, ProductCategory, ProductGender)
└── middleware.ts
```

### [Julio 2026: Fase 2 — Sistema Dinámico de Layout con Drag & Drop]

#### **Infraestructura de Base de Datos:**
- **Tabla `page_layout` en Supabase:**
  - Columnas: `page_slug` (TEXT PK), `sections` (JSONB), `updated_at` (TIMESTAMPTZ).
  - Almacena el orden, visibilidad y configuración de cada sección de la Home.
- **Tipos en `src/types/layout.ts`:**
  - `SectionType`: union de tipos de sección ("hero" | "materials" | "product-grid" | "values" | "reviews" | "philosophy" | "promo-banner").
  - `SectionConfig`: interfaz con `id`, `type`, `visible`, `order`, `config?`.
  - `PageLayout`: interfaz con `pageSlug`, `sections`, `updatedAt`.
- **Funciones en `src/lib/page-layout.ts`:**
  - `getPageLayout(pageSlug)`: obtiene layout desde Supabase o retorna `DEFAULT_HOME_LAYOUT`.
  - `updatePageLayout(sections, pageSlug)`: upsert de layout con `onConflict: "page_slug"`.

#### **Componentes de Administración:**
- **`src/components/admin/DraggableSectionList.tsx`:**
  - Instalación de `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
  - Lista vertical arrastrable con sensores `PointerSensor` (distance: 6) y `KeyboardSensor`.
  - `SortableSectionItem` con handle `GripVertical` de Lucide.
  - Switch de visibilidad por sección con animación de translate.
  - Subformulario colapsable exclusivo para `promo-banner` (título, fecha expiración, imagen).
  - Callback `onConfigChange(id, key, value)` inmutable para evitar bugs de React 18 batching.
- **`src/components/admin/EditModePanel.tsx`:**
  - Panel lateral deslizante desde la izquierda (`w-[360px]`).
  - Estados: `isOpen`, `sections`, `originalSections`, `loading`, `saving`, `toast`.
  - Botones "Guardar Cambios" y "Descartar" con detección de cambios no guardados.
  - Toast de confirmación con estilos boutique dark.
  - Dos modos: `standalone` (panel flotante) y `canvas` (panel fijo para visual-editor).
- **Inyección en `AdminDashboard.tsx`:**
  - Import de `EditModePanel` con `pageSlug="home"`.
  - Botón flotante "Modo Diseñador" visible solo en `/admin`.

#### **Home Dinámica (`src/app/page.tsx`):**
- `SECTION_REGISTRY`: mapa de tipos a componentes.
- `getPageLayout("home")` en servidor para obtener secciones.
- Filtrado de secciones visibles y ordenamiento por `order`.
- Renderizado con `ScrollReveal` y `SectionDivider` entre secciones.
- Prop `config` pasada a cada componente para configuración dinámica.

---

### [Julio 2026: Fase 3 — Banner Promocional 2x1 con Countdown]

#### **Componente `src/components/sections/PromoBanner.tsx`:**
- Componente cliente con countdown timer inteligente.
- Props: `config?: { title?, image?, expiresAt? }`.
- `calculateTimeLeft()` con `useCallback` para optimización.
- Auto-ocultamiento si `expiresAt` ya pasó (retorna `null`).
- Diseño premium con overlay oscuro sobre imagen de fondo.
- Contador regresivo con días, horas, minutos, segundos.
- Fallbacks seguros: título por defecto "2x1 EN PIEZAS SELECCIONADAS", imagen `/images/hero-bg.jpg`.

#### **Integración en Sistema Dinámico:**
- Registro en `SECTION_REGISTRY` de `page.tsx`: `"promo-banner": PromoBanner`.
- Entrada en `DEFAULT_HOME_LAYOUT`: `{ id: "promo-banner", type: "promo-banner", visible: false, order: 6, config: {...} }`.
- Subformulario en `DraggableSectionList.tsx` para configuración inline:
  - Input de título de promoción.
  - Input `datetime-local` para fecha de expiración.
  - Input de ruta de imagen de fondo.

#### **Refactorización Inmutable:**
- **Problema:** El hack original usaba doble `onToggleVisibility()` para forzar re-render, lo cual causaba toggling involuntario por React 18 batching.
- **Solución:** Nuevo callback `onConfigChange(id, key, value)` que actualiza `section.config` de forma inmutable.
- `SortableSectionItem` ahora recibe `onConfigChange` como prop adicional.

---

### [Julio 2026: Fase 4 — Modo Canva (Editor Visual en Vivo)]

#### **Ruta `src/app/admin/visual-editor/page.tsx`:**
- Client Component con layout de dos columnas: panel lateral + lienzo.
- Estado local `sections` sincronizado con `EditModePanel` en modo `canvas`.
- `createConfigUpdater(sectionType)` para generar callbacks de actualización por sección.
- Pasa props `editable`, `editableConfig`, `onUpdateConfig` a componentes editables.
- Barra superior con enlace "Volver al Panel".

#### **Adaptación de `EditModePanel.tsx`:**
- Discriminated union de props: `EditModePanelStandaloneProps` | `EditModePanelCanvasProps`.
- Modo `canvas`: panel siempre visible, controlado externamente, sin botón de apertura.
- Modo `standalone`: comportamiento original con botón flotante.
- `originalRef` para tracking de cambios en modo canvas.

#### **Hero Editable (`src/components/sections/Hero.tsx`):**
- Props opcionales: `editable?`, `editableConfig?`, `onUpdateConfig?`.
- `contentEditable={true}` en título y subtítulo cuando `editable` es true.
- `suppressContentEditableWarning` para evitar warnings de React.
- `onBlur` dispara `handleBlur(key, ref)` que actualiza config via callback.
- `onKeyDown` para Enter → blur.
- Indicador visual: `hover:ring-2 hover:ring-[#D4AF37]/30 focus:ring-2 focus:ring-[#D4AF37]/50`.
- Fallbacks: título "Esencia en cada detalle", subtítulo desde `BRAND_INFO.slogan`.

#### **Acceso desde AdminDashboard:**
- Botón "Editor Visual" con icono `Paintbrush` de Lucide.
- Enlace a `/admin/visual-editor`.

---

### [Julio 2026: Fase 5 — Inline Editing para Materials y Philosophy]

#### **Materials Editable (`src/components/sections/Materials.tsx`):**
- Props opcionales: `editable?`, `editableConfig?`, `onUpdateConfig?`.
- `materialRefs` como array de refs para cada nombre de material.
- `handleMaterialBlur(index, field)` actualiza nombre del material en config.
- `editableConfig.materials` mapea sobre `DEFAULT_MATERIALS` con fallbacks.
- Indicador visual de edición solo en nombres de materiales.

#### **Philosophy Editable (`src/components/sections/Philosophy.tsx`):**
- Props opcionales: `editable?`, `editableConfig?`, `onUpdateConfig?`.
- Refs separadas para título y descripción de Misión y Visión.
- `handleBlur(block, field, ref)` actualiza `config.mission` o `config.vision`.
- `editableConfig.mission` y `editableConfig.vision` con fallbacks a `DEFAULT_MISSION` y `DEFAULT_VISION`.
- Indicador visual con `ring-offset-[#FAF7F2]` (fondo crema de la sección).

#### **Visual Editor Actualizado:**
- `createConfigUpdater` genérico reutilizado para todas las secciones editables.
- Detección de secciones editables: `section.type === "materials" || section.type === "philosophy"`.
- Spread de props condicionales: `{...(isEditable && { editable: true, editableConfig, onUpdateConfig })}`.

---

### [Julio 2026: Fase 13 — Empty States y Onboarding]

#### **Componente `src/components/admin/EmptySectionState.tsx`:**
- Client Component que muestra placeholder cuando una sección está vacía en modo editor.
- Props: `sectionType: SectionType`, `onStartEditing?: () => void`.
- Diseño: contenedor con `border-2 border-dashed border-[#D4AF37]/30`, `rounded-sm`, padding generoso (`py-16 px-8`), fondo `bg-[#1A1A1A]/[0.02]`.
- Ícono contextual por tipo de sección usando diccionario interno:
  - `hero` → `ImagePlus` con mensaje "Haz clic en el título para personalizar tu encabezado"
  - `materials` → `ImagePlus` con mensaje "Añade tus materiales haciendo clic en cada nombre"
  - `philosophy` → `PenLine` con mensaje "Escribe tu misión y visión directamente aquí"
  - `promo-banner` → `TicketPercent` con mensaje "Configura el título, imagen y fecha de expiración desde el panel lateral"
- Texto en `text-xs text-[#1A1A1A]/50 tracking-wide font-serif italic`.

#### **Detección de Estado Vacío en Secciones:**
- **Materials.tsx:**
  - Lógica: `isEmpty = editable && (!editableConfig?.materials || editableConfig.materials.length === 0)`
  - Si `isEmpty` es true, renderiza `<EmptySectionState sectionType="materials" />` en lugar del contenido normal.
  - **CRÍTICO:** Solo se activa cuando `editable === true` (modo canvas admin). En el sitio público (`/`), los componentes usan `DEFAULT_MATERIALS` como fallback, así que nunca muestran el empty state.
- **Philosophy.tsx:**
  - Lógica: `isEmpty = editable && (!editableConfig?.mission?.title || editableConfig.mission.title.trim() === "") && (!editableConfig?.vision?.title || editableConfig.vision.title.trim() === "")`
  - Mismo patrón: solo se activa en modo editor, no afecta el sitio público.

#### **Componente `src/components/admin/DesignerTipBanner.tsx`:**
- Banner horizontal fijo en la parte superior del área de lienzo (no del panel lateral).
- Estado local `isVisible` inicializado en `false`, `useEffect` lee `localStorage.getItem("esencia_tip_dismissed")` al montar.
- Si no existe la key, `setIsVisible(true)`.
- Diseño: fondo `bg-[#232019]`, borde inferior `border-b border-[#D4AF37]/20`, padding `px-6 py-3`.
- Contenido: ícono `Sparkles` de lucide-react en `text-[#D4AF37]`, texto `text-xs text-white/70` con atajos de teclado en `<kbd>`:
  - "Tip del Diseñador: usa Cmd+S (o Ctrl+S) para guardar rápido, Esc para deseleccionar, y las flechas ↑↓ para navegar entre secciones."
- Botón `X` de lucide-react a la derecha, onClick hace `localStorage.setItem("esencia_tip_dismissed", "true")` y `setIsVisible(false)`.
- Animación con framer-motion: `<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>` envuelto en `<AnimatePresence>` para colapso suave.

#### **Integración en `visual-editor/page.tsx`:**
- Renderiza `<DesignerTipBanner />` como primer elemento dentro del área de lienzo, antes del loop de secciones.

---

### [Julio 2026: Fase 14 — Navegación por Teclado]

#### **Cambio Arquitectónico — Elevación de Estado de Selección:**
- **Problema:** `SectionCanvasWrapper.tsx` manejaba `isSelected` como estado local (`useState` interno), lo que impedía navegación por teclado entre secciones.
- **Solución:** Estado elevado a `src/app/admin/visual-editor/page.tsx` como `selectedSectionId: string | null` compartido entre todas las secciones.
- `SectionCanvasWrapper.tsx` ahora recibe `isSelected: boolean` y `onSelect: () => void` como props en lugar de manejar su propio estado.

#### **Modificaciones en `SectionCanvasWrapper.tsx`:**
- **ELIMINADO:** `const [isSelected, setIsSelected] = useState(false);`
- **AGREGADO:** Props `isSelected: boolean` y `onSelect: () => void`.
- Reemplazado `onClick` interno (que hacía `setIsSelected(true)`) por `onSelect()`.
- Reemplazadas todas las referencias internas a `isSelected` para que lean la prop en vez del estado local.
- **ELIMINADO:** `onMouseLeave` que deseleccionaba en hover-out (ya no tiene sentido con selección controlada por clic + teclado).

#### **Navegación por Teclado en `visual-editor/page.tsx`:**
- **Estado nuevo:** `const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);`
- **Refs para scroll:** `const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());`
- **Listener de keydown extendido** (mismo useEffect del Cmd+S/Ctrl+S):
  - **Tecla "Escape":** Si `selectedSectionId` no es null, `setSelectedSectionId(null)` y `e.preventDefault()`.
  - **Tecla "ArrowUp":** Si `selectedSectionId` no es null, encuentra el índice de la sección actual en `orderedVisibleSections`, y si existe un índice anterior, `setSelectedSectionId(orderedVisibleSections[index - 1].id)`. Ejecuta `scrollIntoView({ behavior: "smooth", block: "center" })` sobre el elemento de la sección recién seleccionada usando `sectionRefs.current.get(newId)`.
  - **Tecla "ArrowDown":** Mismo patrón pero hacia el índice siguiente.
  - **IMPORTANTE:** Las flechas y Escape SOLO se interceptan cuando el foco activo del documento NO está dentro de un elemento `contentEditable` ni de un `<input>`/`<textarea>` (verifica `document.activeElement?.getAttribute("contenteditable") !== "true"` y que el `tagName` no sea INPUT/TEXTAREA) — de lo contrario rompería la navegación normal del cursor mientras el admin escribe texto.

#### **Callback Refs por Sección:**
- En el `.map()` de renderizado de secciones, cada `<motion.div>` recibe un callback ref:
  ```typescript
  ref={(el) => {
    if (el) {
      sectionRefs.current.set(section.id, el);
    }
  }}
  ```
- Permite acceder al elemento DOM para `scrollIntoView` cuando se navega con flechas.

#### **Props Pasadas a SectionCanvasWrapper:**
- `isSelected={selectedSectionId === section.id}`
- `onSelect={() => setSelectedSectionId(section.id)}`
- Agregado `onClick` en `<main>` que llama `setSelectedSectionId(null)` al hacer clic en espacio vacío del lienzo.

---

### [Julio 2026: Fase 15 — Panel de Métricas]

#### **Componente `src/components/admin/CanvasMetrics.tsx`:**
- Props: `sections: SectionConfig[]`, `hasUnsavedChanges: boolean`, `isPublished: boolean`.
- Diseño: bloque compacto en la parte SUPERIOR del EditModePanel, fondo `bg-white/[0.03]`, `rounded-sm`, padding `p-4`, grid `grid-cols-2 gap-3`.
- **Métrica 1:** "Secciones totales" con `sections.length` en `font-serif text-2xl text-[#FDFBF7]`.
- **Métrica 2:** "Ocultas" con `sections.filter(s => !s.visible).length` en el mismo estilo, color `text-white/50` si es 0, color `text-[#D4AF37]` si es mayor a 0.
- **Badge de estado** (ancho completo debajo del grid):
  - Si `hasUnsavedChanges` es true → badge con `bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]`, texto "● Cambios sin publicar".
  - Si es false y ya hay una publicación previa (`isPublished === true`) → `bg-emerald-500/10 border border-emerald-500/30 text-emerald-400`, texto "● Borrador al día con producción".
  - Usa un punto Unicode "●" como indicador visual simple, no un ícono, para mantenerlo minimalista.

#### **Integración en `EditModePanel.tsx`:**
- Renderiza `<CanvasMetrics>` como primer elemento dentro del panel, antes de `DraggableSectionList`.
- Props pasadas: `sections={sections}`, `hasUnsavedChanges={hasUnsavedChanges}` (ya calculado en este componente desde Fases anteriores), `isPublished={props.lastPublishedAt !== null}`.

#### **Lógica de `isPublished`:**
- Proxy simple: `!hasUnsavedChanges && lastPublishedAt !== null`.
- Si el borrador actual coincide exactamente con lo publicado (no hay cambios sin guardar) Y ya existe una publicación previa, se considera "al día con producción".

---

### [Julio 2026: Hotfix — Error de Async Client Component]

#### **Problema:**
- Error: `<ProductGrid> is an async Client Component. Only Server Components can be async...`.
- Causa: `visual-editor/page.tsx` es Client Component y no puede evaluar componentes async directamente.

#### **Solución — Desacople de Entornos:**
- **`src/components/admin/ProductGridPreview.tsx`:**
  - Client Component síncrono con `"use client"`.
  - Mock data con 3 productos estáticos: Pulso Ébano Gold, Cadena Faith Gold, Pulso Emerald Gold.
  - Réplica visual del `ProductGrid` original (grid, tarjetas, precios, botones WhatsApp).
  - Sin conexión a Supabase, sin async/await.
- **Modificación en `visual-editor/page.tsx`:**
  - Import de `ProductGridPreview` en lugar de `ProductGrid`.
  - `SECTION_REGISTRY` actualizado: `"product-grid": ProductGridPreview`.
- **Sitio público (`/`) preservado:**
  - `page.tsx` público sigue usando `ProductGrid` async con SSR.
  - Sin cambios en la ruta pública.

#### **Build:**
- `npm run build` completado exitosamente sin errores de TypeScript.
- Todas las rutas funcionan correctamente: `/`, `/admin`, `/admin/visual-editor`, `/catalogo`.

---

### [Julio 2026: Estabilización del Editor Visual y Persistencia de Layout]

#### **Guardado SSR de `page_layout`:**
- **Problema:** El guardado de layouts desde componentes cliente dependía de un cliente Supabase de navegador y podía fallar en flujos protegidos por cookies/RLS.
- **Solución:** Creación de `src/app/actions/page-layout.ts` como Server Action con `createServerClient`, `cookies()` y `revalidatePath("/")`.
- **Upsert robusto:** `updatePageLayoutServer(sections, pageSlug)` ejecuta `.upsert({ page_slug, sections, updated_at }, { onConflict: "page_slug" })`.
- **Draft/producción:** `visual-editor/page.tsx` guarda sobre `toDraftSlug(activeSlug)` para mantener separado el borrador (`home_draft`) de la página publicada (`home`).
- **Lectura pública:** `src/lib/page-layout.ts` quedó enfocado en lectura SSR (`getPageLayout`, `DEFAULT_HOME_LAYOUT`, `toDraftSlug`) y dejó de exponer escritura cliente.

#### **Cliente Supabase de Navegador Singleton:**
- **Nuevo helper:** `src/lib/supabase-browser.ts` con `getSupabaseBrowserClient()` para evitar múltiples instancias del cliente en componentes cliente.
- **Componentes migrados:** `AdminDashboard.tsx`, `login/page.tsx`, `CatalogGrid.tsx` e `ImageDropZone.tsx` usan el singleton.
- **Compatibilidad SSR:** `src/lib/supabase.ts` se mantiene como cliente legacy `createClient` para lectura pública/prerender.

#### **Paridad Visual Editor/Home:**
- **ProductGrid:** Se agregó `src/components/sections/ProductGridClient.tsx` como Client Component para el editor visual, conectado a Supabase con skeleton de carga.
- **Registro del editor:** `visual-editor/page.tsx` usa `"product-grid": ProductGridClient`, mientras la Home pública conserva `ProductGrid.tsx` async SSR.
- **Home dinámica:** `src/app/page.tsx` normaliza `section.type.toLowerCase()`, usa grid de 12 columnas y pasa `config={section.config}` a las secciones dinámicas.
- **Design tokens:** La Home inyecta tokens SSR con `getDesignTokens()` junto con `getPageLayout("home")`.

#### **Hotfix de `Philosophy.tsx` para Misión/Visión:**
- **Problema:** La edición inline de `mission`/`vision` podía construir el bloque actualizado desde `editableConfig` directo y tenía guardas que bloqueaban strings vacíos.
- **Solución estructural:** `commitBlock()` ahora lee `effectiveConfig?.[block] || {}` para respetar los mismos fallbacks visuales usados en render.
- **Limpieza de campos:** La guarda cambió a `value === null || value === undefined`, permitiendo guardar texto vacío intencionalmente.
- **Seguridad runtime:** `isEmpty` reemplazó non-null assertions por optional chaining seguro para evitar crashes si faltan propiedades en `config`.

#### **Validación:**
- `npm run build` completado exitosamente con Next.js 16.2.10/Turbopack.
- Warning conocido no bloqueante: Next.js recomienda migrar la convención `middleware` a `proxy`.
- Durante prerender siguen apareciendo logs de mapeo de productos; no bloquean compilación ni TypeScript.

---

### [Julio 2026: Rebranding a Modo Diseñador y Evolución de Canvas]

#### **Sprint 1: Limpieza y Rebranding**
- **Rebranding Completo:** Se migró de "Editor Visual" a "Modo Diseñador", actualizando rutas (`/admin/modo-disenador`), títulos y sidebars para reflejar una identidad de producto premium.
- **Redirección SSR:** Se configuró un redirect (`redirect("/admin/modo-disenador")`) en la ruta antigua `/admin/visual-editor` para asegurar compatibilidad.
- **Limpieza de Código Muerto:** Eliminación segura de `src/components/sections/MissionVision.tsx` (ghost component redundante) para optimizar el bundle.

#### **Sprint 2: Hero y ProductGrid Dinámicos**
- **Contratos de Datos:** Se establecieron `HeroConfig` y `ProductGridConfig` en `src/types/sections.ts` con fallbacks de producción (`HERO_DEFAULTS`, `PRODUCT_GRID_DEFAULTS`).
- **Edición Inline Segura:** Se inyectó `EditableText` en componentes complejos del Hero (botón CTA y "eyebrow") respetando el tipado y asegurando 0 errores de TypeScript al compilar.
- **Lógica de Paridad Visual:** Transición exitosa a un flujo de datos centralizado en Supabase JSONB, eliminando zonas "hardcodeadas" muertas en el lienzo.

#### **Sprint 3: Mosaico de Valores y Reseñas Bidireccionales**
- **Valores (`Values.tsx`):** Se migró la constante estática `BRAND_VALUES` al sistema dinámico. Ahora el administrador puede editar el título de la sección, los iconos y textos de cada valor mediante `EditableText`.
- **Reseñas (`Reviews.tsx`):** Eliminación de dependencias locales (`localStorage`). Implementación de un **panel de moderación inline** en el canvas para que el administrador pueda ver, editar, reordenar y eliminar curaduría de testimonios públicos que se guarden permanentemente en la base de datos de layout.

#### **Sprint 4: Interactividad Avanzada (DnD Canvas y UX de Secciones Ocultas)**
- **Drag-and-Drop Directo en el Lienzo:** Envoltorio completo del grid del canvas de la página en un contexto de `@dnd-kit` nativo (`DndContext`, `SortableContext` con `rectSortingStrategy`).
- **Sensor Inteligente:** Uso de `PointerSensor` con `activationConstraint: { distance: 5 }` para impedir interferencia con clicks en textos editables.
- **Drag Handle Elegante:** Badge lateral flotante convertido en una agarradera (grip) intuitiva que se muestra en `hover`.
- **Modo Colapsado para Secciones Ocultas:** Eliminado el filtro ciego de secciones. Ahora las secciones `!section.visible` renderizan un "placeholder" minimalista punteado en vez del componente hijo. Esto evita pérdida de contexto espacial y permite al administrador reordenar las secciones, sin que colisionen visualmente.

---

## 🚀 4. Estado de Producción

### ✅ Proyecto Listo para Deploy

**Fecha de certificación:** Julio 2026

**Build de producción:** Exitoso sin errores ni advertencias de TypeScript.

**Rutas generadas:**
- `/` - Landing page principal (Home dinámica con layout configurable)
- `/catalogo` - Catálogo completo interactivo con filtros cruzados
- `/admin` - Panel de administración protegido (requiere autenticación)
- `/admin/login` - Pantalla de acceso privada
- `/admin/visual-editor` - Editor visual en vivo (Modo Canva)

**Características implementadas:**
- ✅ Base de datos PostgreSQL en Supabase con 27 productos (15 masculinos + 12 femeninos)
- ✅ Sistema de autenticación con sesiones seguras (@supabase/ssr)
- ✅ Panel de administración completo con operaciones CRUD
- ✅ Carga de imágenes en tiempo real a Supabase Storage con **compresión WebP automática** (Canvas API, quality 0.82, max 1600x1600)
- ✅ Filtro cruzado doble: Colección (Hombre/Mujer) + Categoría (Manillas/Cadenas/Sets/etc.)
- ✅ Columna `gender` formal para filtrado robusto (reemplaza lógica frágil de prefijos)
- ✅ Invalidación de caché ISR con Server Actions (`revalidatePath`) tras operaciones CRUD — incluye `/` y `/catalogo`
- ✅ 3 productos destacados en la Home
- ✅ Sistema de reseñas interactivo con localStorage
- ✅ Botón flotante de WhatsApp boutique monocromático (número: 57 320 677 1346)
- ✅ Paginación "Ver más" con 12 productos por página
- ✅ **Filtros editoriales con FilterBar** (tabs Serif + underline dorado animado + categorías dinámicas)
- ✅ **Quick View modal con Framer Motion** (transición de imagen compartida via `layoutId`)
- ✅ **ProductSkeleton** con `animate-pulse` 2.2s + `loading.tsx` automático de Next.js
- ✅ **ScrollReveal** wrapper con `whileInView` para animaciones de entrada
- ✅ **Metadatos Open Graph + Twitter Cards** para previsualizaciones premium en redes sociales
- ✅ **PWA Manifest** tipado (`MetadataRoute.Manifest`)
- ✅ **Página 404 editorial** con CTAs duales
- ✅ **Login admin reestilizado** con focus dorado
- ✅ **Toasts boutique oscuros** (fondo `#1A1A1A` + borde dorado `#D4AF37/40`)
- ✅ **Layout Home editorial** con separadores `SectionDivider` y ScrollReveal en cada sección
- ✅ **MissionVision asimétrico 60/40** con layering y control de ancho de título
- ✅ **Materials con tarjetas uniformes** y contraste reforzado en degradado
- ✅ **Values mosaico asimétrico** con texto condicional sobre imágenes
- ✅ **Footer en 2 actos** (banner contacto + footer editorial con 3 columnas)
- ✅ Diseño responsive mobile-first con hotfixes iterativos
- ✅ Optimización de imágenes con Next.js Image (priority, lazy loading)
- ✅ SEO optimizado con metadatos dinámicos y Open Graph
- ✅ Tipografía serif (Playfair Display) + sans-serif (Geist)
- ✅ Paleta de colores crema/antracita/dorado consistente (sin colores corporativos externos)
- ✅ Animaciones sutiles y transiciones suaves (Framer Motion)
- ✅ Modal de reseñas con overlay cálido
- ✅ Tratamiento visual unificado con mix-blend-multiply
- ✅ Middleware de protección de rutas administrativas
- ✅ Políticas RLS en Supabase para seguridad a nivel de fila
- ✅ `scroll-behavior: smooth` global para ancla perfecta del Navbar
- ✅ **Sistema dinámico de layout** con tabla `page_layout` en Supabase (JSONB para secciones)
- ✅ **Drag & Drop con @dnd-kit** para reordenamiento de secciones en panel admin
- ✅ **Switches de visibilidad** por sección con animación premium
- ✅ **EditModePanel** con dos modos: standalone (flotante) y canvas (fijo)
- ✅ **Banner Promocional 2x1** con countdown timer y auto-ocultamiento por expiración
- ✅ **Subformulario colapsable** para configuración de promo-banner en panel DnD
- ✅ **Editor Visual en Vivo** (`/admin/visual-editor`) con lienzo interactivo tipo Canva/Webflow
- ✅ **Edición inline con contentEditable** en Hero (título/subtítulo), Materials (nombres) y Philosophy (Misión/Visión)
- ✅ **Indicadores visuales de edición** con anillo dorado al hover/focus
- ✅ **Desacople de entornos** para resolver async Client Component: ProductGrid (SSR) vs ProductGridClient/ProductGridPreview en editor
- ✅ **ProductGridClient** para preview real en editor visual sin romper el contrato de Server Components async
- ✅ **Guardado SSR de layouts** con `updatePageLayoutServer`, cookies Supabase y `revalidatePath("/")`
- ✅ **Hotfix Philosophy**: `commitBlock` usa `effectiveConfig`, permite strings vacíos y evita non-null assertions frágiles
- ✅ **Refactorización inmutable** con `onConfigChange` para evitar bugs de React 18 batching
- ✅ **Tipado estricto** en `src/types/layout.ts` con SectionType, SectionConfig, PageLayout
- ✅ **Empty States** con borde dorado punteado para secciones vacías en modo editor
- ✅ **Designer Tip Banner** dismissible con persistencia en localStorage y animación de colapso
- ✅ **Navegación por teclado** (Esc, ↑↓) con scroll suave y detección de campos editables
- ✅ **Panel de Métricas** con contador de secciones, ocultas y badge de estado (dorado/verde)
- ✅ **Selección de secciones elevada** a estado compartido en visual-editor/page.tsx
- ✅ **Empty States** con borde dorado punteado para secciones vacías en modo editor
- ✅ **Designer Tip Banner** dismissible con persistencia en localStorage y animación de colapso
- ✅ **Navegación por teclado** (Esc, ↑↓) con scroll suave y detección de campos editables
- ✅ **Panel de Métricas** con contador de secciones, ocultas y badge de estado (dorado/verde)
- ✅ **Selección de secciones elevada** a estado compartido en visual-editor/page.tsx

**Stack tecnológico:**
- Next.js 16.2.10 (App Router + Turbopack)
- TypeScript (tipado estricto)
- Tailwind CSS v4
- Lucide React (iconos) + SVGs inline para iconos no disponibles
- Framer Motion (animaciones cinematográficas)
- @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (Drag & Drop)
- Supabase (PostgreSQL + Storage + Auth)
- @supabase/ssr (gestión de sesiones)
- Vercel (plataforma de deploy recomendada)

**Estructura de archivos:**
```
 src/
├── app/
│   ├── actions/
│   │   ├── page-layout.ts (Server Action - guardado SSR de layouts)
│   │   └── revalidate.ts (Server Action - revalidación / y /catalogo)
│   ├── admin/
│   │   ├── page.tsx (Server Component - carga inicial)
│   │   ├── AdminDashboard.tsx (Client Component - CRUD + compresión WebP + botón Editor Visual)
│   │   ├── login/page.tsx (Login premium con focus dorado)
│   │   └── visual-editor/page.tsx (Client Component - lienzo interactivo modo Canva)
│   ├── catalogo/
│   │   ├── page.tsx (Server Component, revalidate: 10s)
│   │   ├── CatalogGrid.tsx (Client Component con Framer Motion + QuickView)
│   │   └── loading.tsx (ProductSkeleton fallback automático)
│   ├── layout.tsx (metadatos OpenGraph + Twitter Cards)
│   ├── page.tsx (Home dinámica con SECTION_REGISTRY + ScrollReveal)
│   ├── not-found.tsx (página 404 editorial)
│   ├── manifest.ts (PWA manifest tipado)
│   └── globals.css (scroll-behavior smooth)
├── components/
│   ├── admin/
│   │   ├── CanvasMetrics.tsx (panel de métricas: secciones totales, ocultas, badge de estado)
│   │   ├── DesignerTipBanner.tsx (banner onboarding dismissible con localStorage)
│   │   ├── DraggableSectionList.tsx (DnD con @dnd-kit + subformulario promo-banner)
│   │   ├── EditableText.tsx (contentEditable seguro sin salto de cursor)
│   │   ├── EditModePanel.tsx (panel lateral modo Diseñador/Canva)
│   │   ├── EmptySectionState.tsx (placeholder para secciones vacías en editor)
│   │   ├── ImageDropZone.tsx (drag & drop de imágenes con compresión WebP)
│   │   ├── ProductGridPreview.tsx (preview síncrono con mock data)
│   │   ├── PublishHistoryPanel.tsx (historial de versiones con rollback)
│   │   ├── SectionCanvasWrapper.tsx (wrapper con toolbar flotante y selección controlada)
│   │   ├── TemplateLibrary.tsx (biblioteca de plantillas insertables)
│   │   └── ThemeSelector.tsx (selector de temas de acento)
│   ├── catalogo/
│   │   ├── FilterBar.tsx (filtros editoriales con underline animado)
│   │   └── ProductSkeleton.tsx (skeleton con animate-pulse 2.2s)
│   ├── common/
│   │   ├── Button.tsx (variantes: primary, outline, invert)
│   │   ├── ScrollReveal.tsx (wrapper de Framer Motion)
│   │   ├── SectionDivider.tsx (línea 1px separadora)
│   │   ├── SectionTitle.tsx (con número fantasma opcional)
│   │   └── WhatsAppFloating.tsx (botón boutique monocromático)
│   ├── layout/
│   │   ├── Footer.tsx (2 actos: banner contacto + footer editorial)
│   │   └── Navbar.tsx
│   └── sections/
│       ├── Hero.tsx (editable inline con contentEditable)
│       ├── Materials.tsx (editable inline nombres de materiales)
│       ├── Philosophy.tsx (editable inline Misión/Visión)
│       ├── ProductGridClient.tsx (preview cliente para visual-editor)
│       ├── ProductGrid.tsx (3 destacados async conectados a Supabase)
│       ├── PromoBanner.tsx (countdown timer con auto-ocultamiento)
│       ├── Values.tsx (mosaico asimétrico con texto condicional)
│       └── Reviews.tsx
├── lib/
│   ├── image-compression.ts (Canvas → WebP quality 0.82)
│   ├── page-layout.ts (getPageLayout, DEFAULT_HOME_LAYOUT, toDraftSlug)
│   ├── supabase-browser.ts (singleton cliente Supabase para componentes cliente)
│   ├── supabase.ts (Cliente Supabase legacy para SSR/prerender)
│   └── supabase-products.ts (Funciones CRUD)
├── types/
│   ├── index.ts (Review)
│   ├── layout.ts (SectionType, SectionConfig, PageLayout)
│   └── product.ts (Product, ProductCategory, ProductGender, ProductImage)
└── middleware.ts (Protección de rutas /admin)
```

**Variables de entorno requeridas (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=https://nlsehgaihqdyixbfluur.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu_anon_key_aqui>
```

## Sprint 5: Intercepting Routes y Migración de Slugs (13-07-2026)

**Objetivos Alcanzados:**
- **Refactorización UI/UX del Catálogo:** Mejoras visuales en los filtros y transiciones fluidas de los productos (Framer Motion).
- **Migración a Slugs SEO:** Se agregó la columna `slug` en Supabase a la tabla `products` para habilitar URLs amigables (`/producto/[slug]`).
- **Next.js Parallel & Intercepting Routes:** Se estructuró el App Router para permitir un doble comportamiento del detalle de producto:
  - Navegación rápida (soft nav) desde el catálogo abre el producto en un Modal envolvente usando la ruta interceptada (`@modal/(..)producto/[slug]`), manteniendo el contexto y el scroll.
  - Navegación directa (hard nav, o links directos) renderiza la página completa y cinemática en `producto/[slug]/page.tsx`.
- **Generación dinámica de Metadatos (SEO):** La página de producto ahora genera etiquetas dinámicas de Open Graph de manera que al compartirse por redes (WhatsApp, Instagram), se visualice correctamente el cover y los datos.
- **Limpieza de Estados:** Se eliminó la dependencia de `useState` para el modal de productos en el monolito del catálogo, ahora todo es controlado por las rutas nativas de Next.js.

### Parche de Usabilidad: Infiltración de Productos Unisex
Se solucionó el aislamiento de la **Colección Esencia Golf**, ajustando la lógica cruzada en el catálogo. Ahora, los productos etiquetados como `unisex` tienen visibilidad y soporte activo cruzado en las pestañas exclusivas de "Hombre" y "Mujer", resolviendo el bug visual donde sus categorías aparecían deshabilitadas (contador en 0).

## Sprint 6: Experiencia Cinematográfica y Canvas Multimedia (13-07-2026)

**Objetivos Alcanzados:**
- **Rediseño Cinematográfico de Producto:** Se migró a un *split layout* asimétrico en `ProductFullPage.tsx`. En desktop, la galería de imágenes es `sticky`, bloqueando el scroll de la foto principal mientras el usuario lee las especificaciones y precios en la columna derecha.
- **Sistema de Recomendaciones:** Se añadió el sistema `getRelatedProducts` en Supabase para obtener 4 piezas recomendadas dinámicamente con una lógica de fallback de dos pasos (priorizando mismo género + categoría, y luego mismo género general). 
- **Integración DropZone en Mosaico de Valores:** Se habilitó el soporte multimedia en el componente `Values.tsx`. El schema `ValuesConfig` fue extendido de forma retrocompatible permitiendo propiedades `bgImage`. 
- **Persistencia en Storage:** Ahora el administrador puede arrastrar y soltar imágenes (Drag & Drop) sobre las tarjetas del mosaico de valores. Estas se optimizan a WebP, suben al Supabase Storage y actualizan el layout instantáneamente en tiempo real.

### [Hotfix: Auto-generación de Slug en Creación de Productos]

#### **Problema Detectado:**
- **Error:** HTTP 400 Bad Request al crear productos desde el panel de administración (`AdminDashboard.tsx`).
- **Mensaje de Supabase:** La tabla `products` exige la columna `slug` (NOT NULL) pero la función de inserción no la estaba incluyendo en el payload.
- **Causa raíz:** Durante el **Sprint 5 (Migración a Slugs SEO)** se agregó la columna `slug` a la tabla `products` para habilitar URLs amigables (`/producto/[slug]`), pero la función `createProduct()` en `src/lib/supabase-products.ts` no fue actualizada para incluir el campo en el objeto enviado a `.insert({...})`. El dashboard generaba el slug inline pero nunca llegaba a la base de datos.

#### **Diagnóstico Técnico:**
- **Análisis del flujo de datos:**
  1. `AdminDashboard.tsx` línea 343-357: `handleSave()` generaba el slug manualmente concatenando `formData.name` normalizado + `productId.toLowerCase()`.
  2. El objeto `newProduct` incluía la propiedad `slug`.
  3. `createProduct()` recibía el objeto completo pero en el `.insert({...})` (líneas 86-97 originales) **omitía explícitamente el campo `slug`**.
  4. Supabase rechazaba la inserción porque la columna `slug` tiene constraint `NOT NULL` sin valor por defecto.
- **Verificación de edición:** La función `updateProduct()` no incluye `slug` en el payload de actualización, lo cual es correcto: el valor existente se preserva en la fila (no hay violación de NOT NULL en updates, y las URLs permanecen estables si se renombra el producto).

#### **Solución Implementada:**
- **Helper centralizado de generación de slug:**
  - Nueva función exportada `generateProductSlug(name: string): string` en `src/lib/supabase-products.ts`.
  - **Limpieza del nombre:**
    - `toLowerCase()` para normalizar a minúsculas.
    - `normalize("NFD")` + `.replace(/[\u0300-\u036f]/g, "")` para eliminar tildes y acentos (descomposición Unicode + eliminación de caracteres de combinación).
    - `.replace(/[^a-z0-9]+/g, "-")` para reemplazar espacios, símbolos y caracteres especiales por guiones.
    - `.replace(/^-+|-+$/g, "")` para eliminar guiones sobrantes al inicio y final.
  - **Sufijo único anti-colisión:**
    - Combinación de timestamp + aleatorio: `${Date.now().toString().slice(-4)}${Math.random().toString(36).slice(2, 6)}`.
    - Los últimos 4 dígitos del timestamp (milisegundos) + 4 caracteres alfanuméricos aleatorios (base36) garantizan que el slug nunca colisione con el índice de unicidad de la base de datos, incluso si se crean dos productos con el mismo nombre en la misma sesión.
  - **Fallback defensivo:** Si el nombre queda vacío tras la limpieza (ej: solo contenía símbolos), usa `"producto"` como base.
  
- **Refactorización de `createProduct()`:**
  - Firma actualizada: `Omit<Product, "id" | "slug"> & { id: string; slug?: string }` — el slug es ahora opcional para el llamador.
  - Generación dinámica antes de insertar: `const slug = product.slug?.trim() || generateProductSlug(product.name)`.
  - Inclusión explícita del campo en el payload: `.insert({ id, slug, name, category, gender, material, description, price, images, featured, whatsapp_message })`.
  - **Ventaja:** Single source of truth para la lógica de slugificación. Si en el futuro se cambia la estrategia (ej: usar UUIDs o timestamps más largos), solo se modifica el helper.

- **Simplificación del dashboard:**
  - Eliminada la generación inline duplicada en `AdminDashboard.tsx` línea 345 (que concatenaba `productId.toLowerCase()` como sufijo).
  - Ahora `handleSave()` delega completamente la generación del slug a `createProduct()`, eliminando código muerto y manteniendo consistencia.

#### **Archivos Modificados:**
- `src/lib/supabase-products.ts` — Agregado helper `generateProductSlug()`, refactor de `createProduct()` para incluir slug en insert.
- `src/app/admin/AdminDashboard.tsx` — Eliminada generación inline de slug en `handleSave()` (delegada al helper centralizado).

#### **Verificación:**
- **TypeScript:** `npx tsc --noEmit` ejecutado exitosamente — 0 errores de tipos.
- **Integridad de datos:** La columna `slug` ahora siempre recibe un valor válido y único durante la creación.
- **Compatibilidad retroactiva:** Productos existentes mantienen sus slugs (no se ven afectados por updates).
- **Rutas públicas:** `/producto/[slug]` funciona correctamente para productos recién creados.

### [Julio 2026: Sistema de Promoción "10% OFF Primera Compra"]

#### **Arquitectura del Sistema:**
- **Nuevo directorio:** `src/components/promotions/` con 3 componentes orquestados.
- **Nuevo hook:** `src/hooks/useLocalStorageFlag.ts` — hook reutilizable para gestionar banderas booleanas en localStorage con protección anti-hydration-mismatch (SSR-safe).
- **Nueva constante:** `PROMO_CONFIG` en `src/constants/data.ts` con claves de localStorage/sessionStorage, delay de auto-apertura (3s), ruta de imagen y URL de WhatsApp promocional.
- **Integración global:** `<PromotionProvider />` inyectado en `src/app/layout.tsx` dentro del `<body>`, manteniendo el layout como Server Component puro.

#### **Componente `AnnouncementBar.tsx`:**
- Barra superior fija (`z-40`) con fondo `bg-[#1A1A1A]` y animación Framer Motion (slide-down con `y: -40`).
- Texto "10% OFF en tu primera compra — Haz clic para reclamar" con iconos `Sparkles` dorados.
- Persistencia en `sessionStorage`: una vez cerrada, no reaparece durante la sesión.
- Al hacer clic en la barra (excepto el botón X), dispara `onOpenModal()` para forzar apertura del modal.
- Botón de cierre discreto con `X` de Lucide, posición absoluta a la derecha.

#### **Componente `PromoModal.tsx`:**
- Modal flotante con backdrop `bg-[#1A1A1A]/60 backdrop-blur-sm` y animación Framer Motion (scale + fade).
- Auto-apertura tras 3 segundos si el usuario no ha visto la promo antes (controlado por `localStorage`).
- **Solución de maquetación definitiva:** contenedor de imagen con `aspect-[3/4]` + `object-contain` para preservar proporciones nativas de la gráfica sin recortes ni márgenes blancos.
- Imagen oficial del cliente: `/images/img-promocion.jpeg` (etiquetas físicas blancas con cordones negros + texto "ESENCIA® 10% OFF" tipográfico).
- Fondo de tarjeta `bg-white` para fusión seamless con la imagen (mismo fondo blanco).
- Sección inferior CTA con separador sutil `border-t border-[#1A1A1A]/5`, leyenda de apoyo, botón principal "RECLAMAR MI 10% OFF" (negro → dorado en hover) y enlace secundario "NO, GRACIAS".
- Botón de cierre `X` con `bg-white/80 backdrop-blur-sm` en esquina superior derecha.

#### **Componente `PromotionProvider.tsx`:**
- Client Component que actúa como puente de estado entre `AnnouncementBar` y `PromoModal`.
- Mantiene `layout.tsx` como Server Component puro (sin contaminación de `"use client"`).
- Estado `modalForceOpen` compartido: `false` por defecto, `true` al hacer clic en la barra, reseteado al cerrar el modal.
- Doble vía de apertura: auto (PromoModal gestiona internamente con localStorage) + explícita (clic en AnnouncementBar omite el bloqueo de localStorage).

#### **Hook `useLocalStorageFlag.ts`:**
- Hook genérico reutilizable para gestionar banderas booleanas en localStorage.
- SSR-safe: estado inicial siempre `false` (idéntico en servidor y cliente), chequeo real en `useEffect`.
- Expone `flagSet`, `setFlag()` y `clearFlag()` con try-catch defensivo para entornos con almacenamiento bloqueado.

#### **Archivos Modificados/Creados:**
- `src/components/promotions/AnnouncementBar.tsx` — **Nuevo**
- `src/components/promotions/PromoModal.tsx` — **Nuevo**
- `src/components/promotions/PromotionProvider.tsx` — **Nuevo**
- `src/hooks/useLocalStorageFlag.ts` — **Nuevo**
- `src/constants/data.ts` — Agregado `PROMO_CONFIG`
- `src/app/layout.tsx` — Agregado `<PromotionProvider />` en el body
- `public/images/img-promocion.jpeg` — **Nuevo** (imagen oficial de la campaña)

#### **Iteraciones de Diseño del PromoModal:**
1. **v1 — Imagen estática con CSS:** `object-contain` dentro de contenedor con padding. Problema: márgenes blancos gigantes.
2. **v2 — Enfoque híbrido 50/50:** Mitad imagen (etiquetas físicas) + mitad texto HTML vectorial. Problema: duplicación de texto "10% OFF".
3. **v3 — 100% tipográfico:** Sin imagen, todo en HTML. Descartado: el cliente envió gráfica oficial.
4. **v4 — Imagen del modelo:** `object-cover object-top` con zoom. Problema: texto "ESENCIA®" en camiseta duplicaba la marca.
5. **v5 (definitiva) — `aspect-[3/4]` + `object-contain`:** Contenedor fluido sin altura fija que respeta el aspect ratio nativo de la imagen. La gráfica del cliente (etiquetas + texto) se muestra 100% completa, sin recortes ni márgenes. Fondo `bg-white` para fusión seamless.

#### **Certificación:**
- `npx tsc --noEmit` — 0 errores de TypeScript.
- Build de producción exitoso.

**Próximamente:**
- Integración con pasarela de pagos
- Estadísticas de ventas y analytics en panel admin
- Sistema de pedidos y seguimiento
- Notificaciones por email para nuevos pedidos

---

**Desarrollado con dedicación para Esencia Boutique.**
