"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import { BRAND_INFO } from "@/constants/data";
import EditableText from "@/components/admin/EditableText";
import ImageDropZone from "@/components/admin/ImageDropZone";
import { buildFilterString, type ImageFilters } from "@/lib/image-filters";
import { HeroConfig, HERO_DEFAULTS } from "@/types/sections";

interface HeroProps {
  editable?: boolean;
  editableConfig?: HeroConfig;
  onUpdateConfig?: (key: string, value: string) => void;
}

export default function Hero({ editable, editableConfig, onUpdateConfig }: HeroProps) {
  const eyebrow  = editableConfig?.eyebrow  || HERO_DEFAULTS.eyebrow;
  const title    = editableConfig?.title    || HERO_DEFAULTS.title;
  const subtitle = editableConfig?.subtitle || BRAND_INFO.slogan;
  const heroImage = editableConfig?.image   || "/images/cadena-faith-gold.png";
  const ctaText  = editableConfig?.ctaText  || HERO_DEFAULTS.ctaText;
  const ctaHref  = editableConfig?.ctaHref  || HERO_DEFAULTS.ctaHref;
  const filterString = buildFilterString(editableConfig?.imageFilters as ImageFilters | undefined);

  const editRingClass =
    "cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] " +
    "hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 " +
    "focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1";

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center gap-8 px-6 md:px-16 py-12">
      <div className="flex flex-col gap-6">
        {/* ── Eyebrow ─────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-[#1A1A1A]/40" />
          {editable && onUpdateConfig ? (
            <EditableText
              as="p"
              value={eyebrow}
              onCommit={(v) => onUpdateConfig("eyebrow", v)}
              className={`text-xs uppercase tracking-widest text-gray-500 ${editRingClass}`}
            />
          ) : (
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {eyebrow}
            </p>
          )}
        </div>

        {/* ── Heading h1 ──────────────────────────────────────── */}
        {editable && onUpdateConfig ? (
          <EditableText
            as="h1"
            value={title}
            onCommit={(v) => onUpdateConfig("title", v)}
            enableAI
            className={`font-[family-name:var(--font-brand-heading,"Playfair_Display")] text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-text,#1A1A1A)] leading-[1.05] ${editRingClass}`}
          />
        ) : (
          <h1 className={`font-[family-name:var(--font-brand-heading,"Playfair_Display")] text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-text,#1A1A1A)] leading-[1.05]`}>
            {title}
          </h1>
        )}

        {/* ── Subtitle ────────────────────────────────────────── */}
        {editable && onUpdateConfig ? (
          <EditableText
            as="p"
            value={subtitle}
            onCommit={(v) => onUpdateConfig("subtitle", v)}
            enableAI
            className={`font-[family-name:var(--font-brand-body,"Inter")] text-lg text-gray-600 leading-relaxed max-w-md ${editRingClass}`}
          />
        ) : (
          <p className={`font-[family-name:var(--font-brand-body,"Inter")] text-lg text-gray-600 leading-relaxed max-w-md`}>
            {subtitle}
          </p>
        )}

        {/* ── CTA Button ──────────────────────────────────────── */}
        <div className="mt-4 flex flex-col gap-2">
          {editable && onUpdateConfig ? (
            <>
              {/*
                In editable mode we render the button text as an EditableText
                overlaid visually over a static button shell. This keeps the
                button style intact while letting the admin type directly on it.
              */}
              <div className="relative inline-flex">
                <Button href={ctaHref} variant="primary">
                  <EditableText
                    as="span"
                    value={ctaText}
                    onCommit={(v) => onUpdateConfig("ctaText", v)}
                    className={`uppercase tracking-wide text-sm font-medium ${editRingClass}`}
                  />
                </Button>
              </div>

              {/* ctaHref floating input — only visible in editable mode */}
              <div className="flex items-center gap-2 mt-1">
                <label
                  htmlFor="hero-cta-href"
                  className="text-[10px] uppercase tracking-widest text-gray-400 whitespace-nowrap"
                >
                  URL del botón
                </label>
                <input
                  id="hero-cta-href"
                  type="text"
                  defaultValue={ctaHref}
                  onBlur={(e) => onUpdateConfig("ctaHref", e.target.value.trim())}
                  placeholder="/catalogo"
                  className="flex-1 bg-white/60 border border-[#D4AF37]/30 rounded-sm px-2 py-1 text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </>
          ) : (
            <Button href={ctaHref} variant="primary">
              {ctaText}
            </Button>
          )}
        </div>
      </div>

      {/* ── Hero Image ────────────────────────────────────────── */}
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
