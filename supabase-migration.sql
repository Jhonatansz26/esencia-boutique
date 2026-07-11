-- ============================================
-- ESENCIA BOUTIQUE - MIGRACIÓN SUPABASE
-- ============================================
-- Ejecuta este script completo en el SQL Editor de Supabase
-- Dashboard: https://supabase.com/dashboard/project/nlsehgaihqdyixbfluur/sql/new

-- 1. CREAR TABLA PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  material TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  images JSONB NOT NULL DEFAULT '[]',
  featured BOOLEAN NOT NULL DEFAULT false,
  whatsapp_message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Permitir lectura pública de productos"
  ON products FOR SELECT
  USING (true);

-- Política: Permitir inserción pública (para el panel admin sin auth por ahora)
CREATE POLICY "Permitir inserción pública de productos"
  ON products FOR INSERT
  WITH CHECK (true);

-- Política: Permitir actualización pública
CREATE POLICY "Permitir actualización pública de productos"
  ON products FOR UPDATE
  USING (true);

-- Política: Permitir eliminación pública
CREATE POLICY "Permitir eliminación pública de productos"
  ON products FOR DELETE
  USING (true);

-- 3. SEED: 15 PRODUCTOS MASCULINOS (EBH)
-- ============================================
INSERT INTO products (id, name, category, material, description, price, images, featured, whatsapp_message) VALUES
('EBH-001', 'Pulso Ébano Gold', 'manilla', ARRAY['cordón negro', 'detalles dorados'], 'Manilla ajustable en cordón negro con cuentas mate y sutiles balines dorados. Un diseño moderno, masculino y versátil para cualquier ocasión.', 30000, '[{"src":"/images/pulso-ebano-gold.png","alt":"Pulso Ébano Gold","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-001: Pulso Ébano Gold.'),
('EBH-002', 'Pulso Tigre Terra', 'manilla', ARRAY['ojo de tigre', 'mano de fátima'], 'Manilla elástica elaborada con piedra natural ojo de tigre en tonos tierra y un dije central protector de la Mano de Fátima. Un accesorio con fuerte personalidad.', 30000, '[{"src":"/images/pulso-tigre-terra.png","alt":"Pulso Tigre Terra","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-002: Pulso Tigre Terra.'),
('EBH-003', 'Pulso Tigre Titan', 'manilla', ARRAY['ojo de tigre', 'hematita'], 'Manilla elástica que combina la mística piedra ojo de tigre con cuentas cilíndricas de hematita gris metalizada. Ideal para un look varonil e imponente.', 30000, '[{"src":"/images/pulso-tigre-titan.png","alt":"Pulso Tigre Titan","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-003: Pulso Tigre Titan.'),
('EBH-004', 'Cadena Faith Gold', 'cadena', ARRAY['oro', 'dije cruz'], 'Cadena de eslabones finos dorados acompañada de un dije de cruz minimalista pulido. Un clásico espiritual atemporal que aporta luz a cualquier outfit.', 25000, '[{"src":"/images/cadena-faith-gold.png","alt":"Cadena Faith Gold","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-004: Cadena Faith Gold.'),
('EBH-005', 'Cadena Urban Steel', 'cadena', ARRAY['plata', 'dije rectangular'], 'Cadena plateada fina con un dije rectangular plano de acero satinado. El epítome del diseño minimalista contemporáneo urbano.', 25000, '[{"src":"/images/cadena-urban.png","alt":"Cadena Urban Steel","width":800,"height":800}]', true, 'Hola! Estoy interesado en la referencia EBH-005: Cadena Urban Steel.'),
('EBH-006', 'Pulso Emerald Gold', 'manilla', ARRAY['cuentas verdes', 'detalles dorados'], 'Exclusiva pulsera ajustable confeccionada con piedras cilíndricas en verde esmeralda profundo y balines de oro brillante. Aporta una distinción única.', 30000, '[{"src":"/images/pulso-emerald.png","alt":"Pulso Emerald Gold","width":800,"height":800}]', true, 'Hola! Estoy interesado en la referencia EBH-006: Pulso Emerald Gold.'),
('EBH-007', 'Cadena San Benito', 'cadena', ARRAY['oro', 'dije san benito'], 'Elegante cadena dorada de eslabones resistentes con la clásica medalla de San Benito finamente tallada en relieve. Protección y sofisticación.', 25000, '[{"src":"/images/cadena-san-benito.jpg","alt":"Cadena San Benito","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-007: Cadena San Benito.'),
('EBH-008', 'Manilla San Benito', 'manilla', ARRAY['cordón negro', 'dorada'], 'Manilla ajustable trenzada a mano en hilo negro encerado, adornada con una hermosa medalla central dorada de San Benito.', 25000, '[{"src":"/images/manilla-san-benito.jpg","alt":"Manilla San Benito","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-008: Manilla San Benito.'),
('EBH-009', 'Manilla de Balín', 'manilla', ARRAY['plata', 'dije corona'], 'Espectacular pieza elástica compuesta por balines plateados de acero quirúrgico y un dije central de corona imperial texturizada.', 30000, '[{"src":"/images/manilla-de-balin-con-dije-de-tigre.png","alt":"Manilla de Balín","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-009: Manilla de Balín.'),
('EBH-010', 'Manilla Ojo de Tigre', 'manilla', ARRAY['ojo de tigre', 'dorada'], 'Pulsera de esferas perfectas de ojo de tigre natural seleccionadas a mano, con un balín de oro central que realza los destellos marrones de la piedra.', 30000, '[{"src":"/images/manilla-ojo-de-tigre.png","alt":"Manilla Ojo de Tigre","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-010: Manilla Ojo de Tigre.'),
('EBH-011', 'Manilla de la Virgen', 'manilla', ARRAY['madera', 'perlas blancas'], 'Diseño conceptual sacro que entrelaza cuentas de madera noble pulida con perlas blancas genuinas y una medalla mística central.', 25000, '[{"src":"/images/manilla-de-la-virgen.png","alt":"Manilla de la Virgen","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-011: Manilla de la Virgen.'),
('EBH-012', 'Legacy Black', 'set', ARRAY['negro mate', 'detalles dorados'], 'Set premium de tres piezas coordinadas que combina esferas negro mate (ónix) con texturas y dijes dorados grabados. El conjunto definitivo del caballero moderno.', 30000, '[{"src":"/images/legacy-black-ebh-012.png","alt":"Legacy Black","width":800,"height":800}]', true, 'Hola! Estoy interesado en la referencia EBH-012: Legacy Black.'),
('EBH-013', 'Legacy Arcoíris', 'manilla', ARRAY['piedras multicolor', 'dorado'], 'Divertida y fina pulsera elástica con una selección de piedras minerales multicolores pastel y un dije colgante de corazón bañado en oro.', 30000, '[{"src":"/images/legacy-arcoiris.png","alt":"Legacy Arcoíris","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-013: Legacy Arcoíris.'),
('EBH-014', 'Legacy Negro', 'manilla', ARRAY['piedra volcánica', 'cruz'], 'Pulsera rústica y elegante compuesta íntegramente por piedra volcánica porosa negra y un dije plano de cruz en acero pavonado.', 30000, '[{"src":"/images/legacy-negro.png","alt":"Legacy Negro","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-014: Legacy Negro.'),
('EBH-015', 'Legacy Múltiple Color', 'manilla', ARRAY['cuarzo rosa', 'corazón dorado'], 'Fina manilla elástica de cuentas pulidas de cuarzo rosa natural combinada con separadores dorados y un dije de corazón suave.', 30000, '[{"src":"/images/legacy-multiple-color.jpg","alt":"Legacy Múltiple Color","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBH-015: Legacy Múltiple Color.');

-- 4. SEED: 12 PRODUCTOS FEMENINOS (EBM) - PLACEHOLDERS
-- ============================================
INSERT INTO products (id, name, category, material, description, price, images, featured, whatsapp_message) VALUES
('EBM-001', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-001.jpeg","alt":"EBM-001","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-001.'),
('EBM-002', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-002.jpeg","alt":"EBM-002","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-002.'),
('EBM-003', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-003.jpeg","alt":"EBM-003","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-003.'),
('EBM-004', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-004.jpeg","alt":"EBM-004","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-004.'),
('EBM-005', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-005.jpeg","alt":"EBM-005","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-005.'),
('EBM-006', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-006.jpeg","alt":"EBM-006","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-006.'),
('EBM-007', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-007.jpeg","alt":"EBM-007","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-007.'),
('EBM-008', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-008.jpeg","alt":"EBM-008","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-008.'),
('EBM-009', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-009.jpeg","alt":"EBM-009","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-009.'),
('EBM-010', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-010.jpeg","alt":"EBM-010","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-010.'),
('EBM-011', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-011.jpeg","alt":"EBM-011","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-011.'),
('EBM-012', 'Nueva Joya Ella (Editar)', 'collar', ARRAY['por definir'], 'Espacio disponible para descripción.', 0, '[{"src":"/images/EBM-012.jpeg","alt":"EBM-012","width":800,"height":800}]', false, 'Hola! Estoy interesado en la referencia EBM-012.');

-- 5. VERIFICAR INSERCIÓN
-- ============================================
SELECT id, name, category, price, featured FROM products ORDER BY id;

-- ============================================
-- 6. CREAR TABLA PAGE_LAYOUT (CMS Dinámico)
-- ============================================
-- Fase 1: Modo Diseñador - Control de orden y visibilidad de secciones

CREATE TABLE IF NOT EXISTS page_layout (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL DEFAULT 'home',
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

CREATE UNIQUE INDEX IF NOT EXISTS page_layout_slug_idx ON page_layout(page_slug);

ALTER TABLE page_layout ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON page_layout;
CREATE POLICY "Public read access" ON page_layout FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Authenticated users can update" ON page_layout;
CREATE POLICY "Authenticated users can update" ON page_layout FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
