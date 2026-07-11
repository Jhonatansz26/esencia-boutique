"use client";

import EditableText from "@/components/admin/EditableText";
import EmptySectionState from "@/components/admin/EmptySectionState";
import { SECTION_THEMES, SectionThemeId } from "@/lib/section-themes";

interface PhilosophyProps {
  editable?: boolean;
  editableConfig?: {
    mission?: { title?: string; description?: string };
    vision?: { title?: string; description?: string };
    [key: string]: unknown;
  };
  onUpdateConfig?: (key: string, value: unknown) => void;
}

const DEFAULT_MISSION = {
  title: "Misión",
  description:
    "Brindar a nuestros clientes prendas de vestir y accesorios de alta calidad que reflejen estilo, elegancia y autenticidad, ofreciendo una atención personalizada que haga de cada compra una experiencia única y satisfactoria.",
};

const DEFAULT_VISION = {
  title: "Visión",
  description:
    "Ser una boutique reconocida a nivel regional y nacional por su excelencia, innovación y compromiso con la moda, consolidándonos como la primera opción de nuestros clientes por la calidad de nuestros productos y el servicio que ofrecemos.",
};

export default function Philosophy({ editable, editableConfig, onUpdateConfig }: PhilosophyProps) {
  const themeId = (editableConfig?.theme as SectionThemeId) ?? "default";
  const theme = SECTION_THEMES[themeId];

  const isEmpty =
    editable &&
    (!editableConfig?.mission?.title || editableConfig.mission.title.trim() === "") &&
    (!editableConfig?.vision?.title || editableConfig.vision.title.trim() === "");

  if (isEmpty) {
    return <EmptySectionState sectionType="philosophy" />;
  }

  const mission = {
    title: editableConfig?.mission?.title || DEFAULT_MISSION.title,
    description: editableConfig?.mission?.description || DEFAULT_MISSION.description,
  };

  const vision = {
    title: editableConfig?.vision?.title || DEFAULT_VISION.title,
    description: editableConfig?.vision?.description || DEFAULT_VISION.description,
  };

  const commitBlock = (block: "mission" | "vision", field: "title" | "description", value: string) => {
    if (!onUpdateConfig || !value) return;
    const currentBlock = editableConfig?.[block] || {};
    const updatedBlock = { ...currentBlock, [field]: value };
    onUpdateConfig(block, updatedBlock);
  };

  const editableClass = editable
    ? "cursor-text rounded-sm ring-offset-2 ring-offset-[var(--color-brand-surface,#FAF7F2)] hover:ring-2 hover:ring-[var(--color-brand-primary,#D4AF37)]/30 focus:ring-2 focus:ring-[var(--color-brand-primary,#D4AF37)]/50 transition-all px-1 -mx-1"
    : "";

  return (
    <section className={`py-20 md:py-28 px-6 md:px-16 ${theme.bgClass || "bg-[var(--color-brand-surface,#FAF7F2)]"} ${theme.textClass}`}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-brand-primary,#D4AF37)] text-center mb-16">
          Nuestra Esencia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-8 items-start">
          <div className="relative border-r-0 md:border-r border-[var(--color-brand-text,#1A1A1A)]/10 md:pr-12 min-h-[160px]">
            <span className="absolute -top-10 -left-2 font-[family-name:var(--font-brand-heading)] text-8xl text-stone-200/40 select-none pointer-events-none">
              01
            </span>
            <div className="relative z-10">
              {editable && onUpdateConfig ? (
                <>
                  <EditableText
                    as="p"
                    value={mission.title}
                    onCommit={(v) => commitBlock("mission", "title", v)}
                    className={`text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-[family-name:var(--font-brand-body)] ${editableClass}`}
                  />
                  <EditableText
                    as="p"
                    value={mission.description}
                    onCommit={(v) => commitBlock("mission", "description", v)}
                    className={`font-[family-name:var(--font-brand-heading)] text-base md:text-lg text-[var(--color-brand-text,#1A1A1A)] leading-relaxed ${editableClass}`}
                  />
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-[family-name:var(--font-brand-body)]">
                    {mission.title}
                  </p>
                  <p className="font-[family-name:var(--font-brand-heading)] text-base md:text-lg text-[var(--color-brand-text,#1A1A1A)] leading-relaxed">
                    {mission.description}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="relative md:pl-12 min-h-[160px]">
            <span className="absolute -top-10 -left-2 font-[family-name:var(--font-brand-heading)] text-8xl text-stone-200/40 select-none pointer-events-none">
              02
            </span>
            <div className="relative z-10">
              {editable && onUpdateConfig ? (
                <>
                  <EditableText
                    as="p"
                    value={vision.title}
                    onCommit={(v) => commitBlock("vision", "title", v)}
                    className={`text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-[family-name:var(--font-brand-body)] ${editableClass}`}
                  />
                  <EditableText
                    as="p"
                    value={vision.description}
                    onCommit={(v) => commitBlock("vision", "description", v)}
                    className={`font-[family-name:var(--font-brand-heading)] text-base md:text-lg text-[var(--color-brand-text,#1A1A1A)] leading-relaxed ${editableClass}`}
                  />
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 font-[family-name:var(--font-brand-body)]">
                    {vision.title}
                  </p>
                  <p className="font-[family-name:var(--font-brand-heading)] text-base md:text-lg text-[var(--color-brand-text,#1A1A1A)] leading-relaxed">
                    {vision.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
