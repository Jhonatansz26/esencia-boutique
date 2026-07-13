"use client";

import Image from "next/image";
import { SECTION_THEMES, SectionThemeId } from "@/lib/section-themes";
import EditableText from "@/components/admin/EditableText";
import ImageDropZone from "@/components/admin/ImageDropZone";
import { BRAND_VALUES } from "@/constants/data";
import { type ValuesConfig, VALUES_DEFAULTS } from "@/types/sections";

interface ValuesProps {
  config?: ValuesConfig;
  editableConfig?: ValuesConfig;
  editable?: boolean;
  onUpdateConfig?: (key: string, value: unknown) => void;
}

interface MosaicBlock {
  title: string;
  description: string;
  number: string;
  spanClass: string;
  heightClass: string;
  large?: boolean;
  bgImage?: string;
}

const MOSAIC_LAYOUT: Omit<MosaicBlock, "title" | "description">[] = [
  {
    number: "01",
    spanClass: "lg:col-span-2 lg:row-span-2",
    heightClass: "h-[320px] sm:h-[360px] lg:h-auto",
    large: true,
    bgImage: "/images/valores-calidad.png",
  },
  {
    number: "02",
    spanClass: "lg:col-span-2 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
  {
    number: "03",
    spanClass: "lg:col-span-1 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
  {
    number: "04",
    spanClass: "lg:col-span-1 lg:row-span-1",
    heightClass: "h-[200px] lg:h-auto",
  },
];

export default function Values({
  config,
  editableConfig,
  editable = false,
  onUpdateConfig,
}: ValuesProps) {
  const activeConfig = editable ? (editableConfig ?? config) : config;

  const themeId = (activeConfig?.theme as SectionThemeId) ?? "default";
  const theme = SECTION_THEMES[themeId];

  const eyebrow = activeConfig?.eyebrow || VALUES_DEFAULTS.eyebrow;
  const sectionTitle = activeConfig?.sectionTitle || VALUES_DEFAULTS.sectionTitle;
  const configItems = activeConfig?.items || [];

  // Re-run every render so it reacts to config changes
  const mosaicValues: MosaicBlock[] = BRAND_VALUES.map((defaultVal, index) => {
    const customVal = configItems[index];
    const staticLayout = MOSAIC_LAYOUT[index];
    return {
      title: customVal?.title ?? defaultVal.title,
      description: customVal?.description ?? defaultVal.description,
      bgImage: customVal?.bgImage ?? staticLayout.bgImage,
      ...staticLayout,
    };
  });

  const commitItemTitle = (index: number, newTitle: string) => {
    if (!onUpdateConfig) return;
    const updated = mosaicValues.map((v) => ({
      title: v.title,
      description: v.description,
      bgImage: v.bgImage,
    }));
    updated[index] = { ...updated[index], title: newTitle };
    onUpdateConfig("items", updated);
  };

  const commitItemDescription = (index: number, newDesc: string) => {
    if (!onUpdateConfig) return;
    const updated = mosaicValues.map((v) => ({
      title: v.title,
      description: v.description,
      bgImage: v.bgImage,
    }));
    updated[index] = { ...updated[index], description: newDesc };
    onUpdateConfig("items", updated);
  };

  const commitItemBgImage = (index: number, newUrl: string) => {
    if (!onUpdateConfig) return;
    const updated = mosaicValues.map((v) => ({
      title: v.title,
      description: v.description,
      bgImage: v.bgImage,
    }));
    updated[index] = { ...updated[index], bgImage: newUrl };
    onUpdateConfig("items", updated);
  };

  const editRingClass =
    "cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FDFBF7)] " +
    "hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 " +
    "focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1";

  return (
    <section className={`py-24 md:py-36 px-6 md:px-16 ${theme.bgClass} ${theme.textClass}`}>
      <div className="max-w-6xl mx-auto mb-16">
        {editable && onUpdateConfig ? (
          <>
            <EditableText
              as="p"
              value={eyebrow}
              onCommit={(v) => onUpdateConfig("eyebrow", v)}
              className={`text-xs uppercase tracking-[0.2em] text-stone-500 mb-3 ${editRingClass}`}
            />
            <EditableText
              as="h2"
              value={sectionTitle}
              onCommit={(v) => onUpdateConfig("sectionTitle", v)}
              enableAI
              className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] tracking-wide ${editRingClass}`}
            />
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] tracking-wide">
              {sectionTitle}
            </h2>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-6 lg:auto-rows-[180px]">
        {mosaicValues.map((value, index) => (
          <div
            key={value.number}
            className={`relative overflow-hidden border border-[#1A1A1A]/10 ${value.spanClass} ${value.heightClass} ${
              value.bgImage ? "bg-transparent" : value.large ? "bg-[#FAF7F2]" : "bg-[#FDFBF7]"
            }`}
          >
            {value.bgImage ? (
              <div className="absolute inset-0 z-0">
                {editable && onUpdateConfig ? (
                  <ImageDropZone
                    sectionId={`values-tile-${index}`}
                    onImageUpdate={(url) => commitItemBgImage(index, url)}
                  >
                    <div className="relative w-full h-full">
                      <Image src={value.bgImage} alt={value.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                    </div>
                  </ImageDropZone>
                ) : (
                  <Image
                    src={value.bgImage}
                    alt={value.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
              </div>
            ) : (
              value.large && (
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, #1A1A1A 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
              )
            )}

            <span
              className={`absolute -top-3 -right-1 sm:-top-4 sm:-right-2 font-serif select-none pointer-events-none leading-none z-0 ${
                value.bgImage
                  ? "text-white/10"
                  : "text-stone-200/40"
              } ${
                value.large
                  ? "text-9xl sm:text-[10rem] md:text-9xl"
                  : "text-7xl sm:text-8xl"
              }`}
              aria-hidden="true"
            >
              {value.number}
            </span>

            <div
              className={`relative h-full flex flex-col z-10 pointer-events-none ${
                value.large ? "justify-between p-7 sm:p-9 md:p-8" : "justify-end p-6 md:p-8"
              }`}
            >
              {value.large ? (
                <>
                  <div className={`h-px w-10 mt-2 ${value.bgImage ? "bg-white/40" : "bg-[#1A1A1A]/30"}`} />
                  <div className="mt-auto pointer-events-auto">
                    {editable && onUpdateConfig ? (
                      <>
                        <EditableText
                          as="h3"
                          value={value.title}
                          onCommit={(v) => commitItemTitle(index, v)}
                          className={`text-sm md:text-base font-medium uppercase tracking-[0.15em] mb-3 ${
                            value.bgImage ? "text-white" : "text-[#1A1A1A]"
                          } ${editRingClass}`}
                        />
                        <EditableText
                          as="p"
                          value={value.description}
                          onCommit={(v) => commitItemDescription(index, v)}
                          className={`text-sm leading-relaxed max-w-xs ${
                            value.bgImage ? "text-stone-200" : "text-gray-600"
                          } ${editRingClass}`}
                        />
                      </>
                    ) : (
                      <>
                        <h3 className={`text-sm md:text-base font-medium uppercase tracking-[0.15em] mb-3 ${
                          value.bgImage ? "text-white" : "text-[#1A1A1A]"
                        }`}>
                          {value.title}
                        </h3>
                        <p className={`text-sm leading-relaxed max-w-xs ${
                          value.bgImage ? "text-stone-200" : "text-gray-600"
                        }`}>
                          {value.description}
                        </p>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="h-px w-10 bg-[#1A1A1A]/30 mb-4" />
                  <div className="pointer-events-auto">
                  {editable && onUpdateConfig ? (
                    <>
                      <EditableText
                        as="h3"
                        value={value.title}
                        onCommit={(v) => commitItemTitle(index, v)}
                        className={`text-sm md:text-base font-medium text-[#1A1A1A] uppercase tracking-[0.15em] mb-3 ${editRingClass}`}
                      />
                      <EditableText
                        as="p"
                        value={value.description}
                        onCommit={(v) => commitItemDescription(index, v)}
                        className={`text-xs md:text-sm text-gray-600 leading-relaxed ${editRingClass}`}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm md:text-base font-medium text-[#1A1A1A] uppercase tracking-[0.15em] mb-3">
                        {value.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </>
                  )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
