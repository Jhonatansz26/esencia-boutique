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
| Componentes Atómicos (Botón/Título) | `src/components/common` | ✅ Completado | Botones tipo píldora y títulos Serif |
| Navbar & Footer | `src/components/layout` | ✅ Completado | Estructura de navegación global |
| Hero Section | `src/components/sections` | ✅ Completado | Portada con eslogan principal |
| Misión y Visión | `src/components/sections` | ✅ Completado | Sección de identidad de marca |
| Catálogo Destacado | `src/components/sections` | ✅ Completado | Cuadrícula con enlaces directos a WhatsApp |
| Valores | `src/components/sections` | ✅ Completado | 4 pilares con iconos limpios |
| Reseñas (Testimonios) | `src/components/sections` | ✅ Completado | Carrusel/Cuadrícula de opiniones de clientes |

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

## 🚀 4. Estado de Producción

### ✅ Proyecto Listo para Deploy

**Fecha de certificación:** Julio 2026

**Build de producción:** Exitoso sin errores ni advertencias de TypeScript.

**Rutas generadas:**
- `/` - Landing page principal
- `/catalogo` - Catálogo completo interactivo con filtros cruzados
- `/admin` - Panel de administración protegido (requiere autenticación)
- `/admin/login` - Pantalla de acceso privada

**Características implementadas:**
- ✅ Base de datos PostgreSQL en Supabase con 27 productos (15 masculinos + 12 femeninos)
- ✅ Sistema de autenticación con sesiones seguras (@supabase/ssr)
- ✅ Panel de administración completo con operaciones CRUD
- ✅ Carga de imágenes en tiempo real a Supabase Storage
- ✅ Filtro cruzado doble: Colección (Hombre/Mujer) + Categoría (Manillas/Cadenas/Sets/etc.)
- ✅ Columna `gender` formal para filtrado robusto (reemplaza lógica frágil de prefijos)
- ✅ Invalidación de caché ISR con Server Actions (`revalidatePath`) tras operaciones CRUD
- ✅ 3 productos destacados en la Home
- ✅ Sistema de reseñas interactivo con localStorage
- ✅ Botón flotante de WhatsApp (número: 57 320 677 1346)
- ✅ Paginación "Ver más" con 12 productos por página
- ✅ Diseño responsive mobile-first
- ✅ Optimización de imágenes con Next.js Image (priority, lazy loading)
- ✅ SEO optimizado con metadatos dinámicos
- ✅ Tipografía serif (Playfair Display) + sans-serif (Geist)
- ✅ Paleta de colores crema/antracita consistente
- ✅ Animaciones sutiles y transiciones suaves
- ✅ Modal de reseñas con overlay cálido
- ✅ Tratamiento visual unificado con mix-blend-multiply
- ✅ Middleware de protección de rutas administrativas
- ✅ Políticas RLS en Supabase para seguridad a nivel de fila

**Stack tecnológico:**
- Next.js 16.2.10 (App Router + Turbopack)
- TypeScript (tipado estricto)
- Tailwind CSS v4
- Lucide React (iconos)
- Supabase (PostgreSQL + Storage + Auth)
- @supabase/ssr (gestión de sesiones)
- Vercel (plataforma de deploy recomendada)

**Estructura de archivos:**
```
 src/
├── app/
│   ├── actions/
│   │   └── revalidate.ts (Server Action - invalidación de caché ISR)
│   ├── admin/
│   │   ├── page.tsx (Server Component - carga inicial)
│   │   ├── AdminDashboard.tsx (Client Component - CRUD)
│   │   └── login/page.tsx (Pantalla de autenticación)
│   ├── catalogo/
│   │   ├── page.tsx (Server Component, revalidate: 10s)
│   │   └── CatalogGrid.tsx (Client Component con filtros)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── common/ (Button, SectionTitle, WhatsAppFloating)
│   ├── layout/ (Navbar, Footer)
│   └── sections/ (Hero, MissionVision, ProductGrid, Values, Reviews)
├── constants/
│   └── data.ts (BRAND_INFO, BRAND_VALUES, CUSTOMER_REVIEWS)
├── lib/
│   ├── supabase.ts (Cliente Supabase)
│   └── supabase-products.ts (Funciones CRUD)
├── types/
│   ├── index.ts (Review)
│   └── product.ts (Product, ProductCategory, ProductGender, ProductImage)
└── middleware.ts (Protección de rutas /admin)
```

**Variables de entorno requeridas (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=https://nlsehgaihqdyixbfluur.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu_anon_key_aqui>
```

**Próximamente:**
- Integración con pasarela de pagos
- Panel administrativo avanzado con estadísticas
- Sistema de pedidos y seguimiento
- Notificaciones por email para nuevos pedidos

---

**Desarrollado con dedicación para Esencia Boutique.**
