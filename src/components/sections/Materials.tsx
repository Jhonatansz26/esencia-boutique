"use client";

import Image from "next/image";
import EditableText from "@/components/admin/EditableText";
import ImageDropZone from "@/components/admin/ImageDropZone";
import EmptySectionState from "@/components/admin/EmptySectionState";
import { SECTION_THEMES, SectionThemeId } from "@/lib/section-themes";
import { buildFilterString, type ImageFilters } from "@/lib/image-filters";

const DEFAULT_MATERIALS = [
  {
    name: "Acero Inoxidable",
    description: "Resistencia eterna, brillo que no se rinde.",
    image: "/images/cadena-urban.png",
  },
  {
    name: "Colección Leopardo",
    description: "La fuerza del metal y la audacia del diseño salvaje en una sola pieza.",
    image: "/images/leopardo-premium.png",
  },
  {
    name: "Piedras Naturales",
    description: "La tierra habla a través de cada cuenta.",
    image: "/images/manilla-ojo-de-tigre.png",
  },
];

interface MaterialsProps {
  editable?: boolean;
  editableConfig?: {
    materials?: Array<{
      name?: string;
      description?: string;
      image?: string;
    }>;
    imageFilters?: ImageFilters;
    [key: string]: unknown;
  };
  onUpdateConfig?: (key: string, value: unknown) => void;
}

export default function Materials({ editable, editableConfig, onUpdateConfig }: MaterialsProps) {
  const themeId = (editableConfig?.theme as SectionThemeId) ?? "default";
  const theme = SECTION_THEMES[themeId];
  const filterString = buildFilterString(editableConfig?.imageFilters);

  const isEmpty = editable && (!editableConfig?.materials || editableConfig.materials.length === 0);

  if (isEmpty) {
    return <EmptySectionState sectionType="materials" />;
  }

  const materials = editableConfig?.materials?.length
    ? editableConfig.materials.map((m, i) => ({
        name: m.name || DEFAULT_MATERIALS[i]?.name || "",
        description: m.description || DEFAULT_MATERIALS[i]?.description || "",
        image: m.image || DEFAULT_MATERIALS[i]?.image || "",
      }))
    : DEFAULT_MATERIALS;

  const commitMaterialName = (index: number, newValue: string) => {
    if (!onUpdateConfig || !newValue) return;
    const updatedMaterials = materials.map((m, i) => {
      if (i === index) return { ...m, name: newValue };
      return m;
    });
    onUpdateConfig("materials", updatedMaterials);
  };

  const commitMaterialImage = (index: number, newUrl: string) => {
    if (!onUpdateConfig || !newUrl) return;
    const updatedMaterials = materials.map((m, i) => {
      if (i === index) return { ...m, image: newUrl };
      return m;
    });
    onUpdateConfig("materials", updatedMaterials);
  };

  return (
    <section
      id="materiales"
      className={`scroll-mt-24 py-24 md:py-36 px-6 md:px-16 ${theme.bgClass} ${theme.textClass}`}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
          MATERIALES
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-16 max-w-xl">
          Lo que tocamos define lo que perdura
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {materials.map((material, index) => (
            <div
              key={index}
              className="group relative overflow-hidden cursor-default"
            >
              {editable && onUpdateConfig ? (
                <ImageDropZone
                  sectionId={`materials-${index}`}
                  onImageUpdate={(url) => commitMaterialImage(index, url)}
                >
                  <div className="relative w-full md:h-[500px] h-[400px] overflow-hidden">
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 33vw"
                      style={filterString ? { filter: filterString } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                </ImageDropZone>
              ) : (
                <div className="relative w-full md:h-[500px] h-[400px] overflow-hidden">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 33vw"
                    style={filterString ? { filter: filterString } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 md:p-8 pb-8 md:pb-10 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                {editable && onUpdateConfig ? (
                  <EditableText
                    as="h3"
                    value={material.name}
                    onCommit={(v) => commitMaterialName(index, v)}
                    enableAI
                    className="font-serif text-xl text-white mb-2 cursor-text rounded-sm ring-offset-2 ring-offset-black/50 hover:ring-2 hover:ring-[#D4AF37]/30 focus:ring-2 focus:ring-[#D4AF37]/50 transition-all px-1 -mx-1"
                  />
                ) : (
                  <h3 className="font-serif text-xl text-white mb-2">
                    {material.name}
                  </h3>
                )}
                <p className="text-white/80 text-sm tracking-wide leading-relaxed">
                  {material.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
