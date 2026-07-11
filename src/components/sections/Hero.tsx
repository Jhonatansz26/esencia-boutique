import Image from "next/image";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";
import EditableText from "@/components/admin/EditableText";
import ImageDropZone from "@/components/admin/ImageDropZone";
import { buildFilterString, type ImageFilters } from "@/lib/image-filters";

interface HeroProps {
  editable?: boolean;
  editableConfig?: {
    title?: string;
    subtitle?: string;
    image?: string;
    imageFilters?: ImageFilters;
    [key: string]: unknown;
  };
  onUpdateConfig?: (key: string, value: string) => void;
}

export default function Hero({ editable, editableConfig, onUpdateConfig }: HeroProps) {
  const title = editableConfig?.title || "Esencia en cada detalle";
  const subtitle = editableConfig?.subtitle || BRAND_INFO.slogan;
  const heroImage = editableConfig?.image || "/images/cadena-faith-gold.png";
  const filterString = buildFilterString(editableConfig?.imageFilters);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center gap-8 px-6 md:px-16 py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-[#1A1A1A]/40"></div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            JOYERÍA MINIMALISTA
          </p>
        </div>

        {editable && onUpdateConfig ? (
          <EditableText
            as="h1"
            value={title}
            onCommit={(v) => onUpdateConfig("title", v)}
            enableAI
            className={`font-[family-name:var(--font-brand-heading,"Playfair_Display")] text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-text,#1A1A1A)] leading-[1.05] cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1`}
          />
        ) : (
          <h1 className={`font-[family-name:var(--font-brand-heading,"Playfair_Display")] text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-text,#1A1A1A)] leading-[1.05]`}>
            {title}
          </h1>
        )}

        {editable && onUpdateConfig ? (
          <EditableText
            as="p"
            value={subtitle}
            onCommit={(v) => onUpdateConfig("subtitle", v)}
            enableAI
            className={`font-[family-name:var(--font-brand-body,"Inter")] text-lg text-gray-600 leading-relaxed max-w-md cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1`}
          />
        ) : (
          <p className={`font-[family-name:var(--font-brand-body,"Inter")] text-lg text-gray-600 leading-relaxed max-w-md`}>
            {subtitle}
          </p>
        )}

        <div className="mt-4">
          <Button href="/catalogo" variant="primary">
            VER COLECCIÓN
          </Button>
        </div>
      </div>

      {editable && onUpdateConfig ? (
        <ImageDropZone
          sectionId="hero"
          onImageUpdate={(url) => onUpdateConfig("image", url)}
        >
          <div className="relative w-full h-[500px] max-h-[500px] overflow-hidden">
            <Image
              src={heroImage}
              alt="Joyería minimalista elegante"
              fill
              className="object-contain"
              priority
              style={filterString ? { filter: filterString } : undefined}
            />
          </div>
        </ImageDropZone>
      ) : (
        <div className="relative w-full h-[500px] max-h-[500px] overflow-hidden">
          <Image
            src={heroImage}
            alt="Joyería minimalista elegante"
            fill
            className="object-contain"
            priority
            style={filterString ? { filter: filterString } : undefined}
          />
        </div>
      )}
    </section>
  );
}
