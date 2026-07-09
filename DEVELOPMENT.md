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

## 🚀 4. Estado de Producción

### ✅ Proyecto Listo para Deploy

**Fecha de certificación:** Julio 2026

**Build de producción:** Exitoso sin errores ni advertencias de TypeScript.

**Rutas generadas:**
- `/` - Landing page principal
- `/catalogo` - Catálogo completo interactivo

**Características implementadas:**
- ✅ 15 productos reales del catálogo EBH con imágenes locales
- ✅ 3 productos destacados en la Home
- ✅ Sistema de reseñas interactivo con localStorage
- ✅ Botón flotante de WhatsApp (número: 57 320 677 1346)
- ✅ Filtros por categoría y paginación en catálogo
- ✅ Diseño responsive mobile-first
- ✅ Optimización de imágenes con Next.js Image
- ✅ SEO optimizado con metadatos dinámicos
- ✅ Tipografía serif (Playfair Display) + sans-serif (Geist)
- ✅ Paleta de colores crema/antracita consistente
- ✅ Animaciones sutiles y transiciones suaves
- ✅ Modal de reseñas con overlay cálido
- ✅ Tratamiento visual unificado con mix-blend-multiply

**Stack tecnológico:**
- Next.js 16.2.10 (App Router + Turbopack)
- TypeScript (tipado estricto)
- Tailwind CSS v4
- Lucide React (iconos)
- Vercel (plataforma de deploy recomendada)

**Estructura de archivos:**
```
src/
├── app/
│   ├── catalogo/
│   │   ├── page.tsx (Server Component)
│   │   └── CatalogGrid.tsx (Client Component)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── common/ (Button, SectionTitle, WhatsAppFloating)
│   ├── layout/ (Navbar, Footer)
│   └── sections/ (Hero, MissionVision, ProductGrid, Values, Reviews)
├── constants/
│   └── data.ts (BRAND_INFO, BRAND_VALUES, etc.)
├── data/
│   └── products.ts (15 productos reales)
└── types/
    ├── index.ts (Review)
    └── product.ts (Product, ProductCategory, ProductImage)
```

**Próximamente:**
- Línea femenina "Colección Ella" (44 productos adicionales)
- Integración con pasarela de pagos
- Panel administrativo para gestión de productos

---

**Desarrollado con dedicación para Esencia Boutique.**
