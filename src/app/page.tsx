import { getPageLayout } from "@/lib/page-layout";
import { getDesignTokens } from "@/app/actions/design-tokens";
import Hero from "@/components/sections/Hero";
import Materials from "@/components/sections/Materials";
import ProductGrid from "@/components/sections/ProductGrid";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";
import Philosophy from "@/components/sections/Philosophy";
import PromoBanner from "@/components/sections/PromoBanner";
import SectionDivider from "@/components/common/SectionDivider";
import ScrollReveal from "@/components/common/ScrollReveal";

const SECTION_REGISTRY: Record<string, React.ComponentType<Record<string, unknown>>> = {
  materials: Materials,
  "product-grid": ProductGrid,
  values: Values,
  reviews: Reviews,
  philosophy: Philosophy,
  "promo-banner": PromoBanner,
};

export const revalidate = 30;

export default async function Home() {
  const [sections, designTokens] = await Promise.all([
    getPageLayout("home"),
    getDesignTokens(),
  ]);

  const orderedVisibleSections = sections
    .filter((s) => s.visible && s.type !== "hero")
    .sort((a, b) => a.order - b.order);

  const heroSection = sections.find((s) => s.type === "hero");

  return (
    <>
      {designTokens && (
        <style>{`
          :root {
            --color-brand-primary: ${designTokens.color.primary};
            --color-brand-surface: ${designTokens.color.surface};
            --color-brand-text: ${designTokens.color.text};
            --font-brand-heading: ${designTokens.font.heading}, serif;
            --font-brand-body: ${designTokens.font.body}, sans-serif;
            --radius-brand-base: ${designTokens.radius.base};
          }
        `}</style>
      )}
      <main>
        <div className="grid grid-cols-12 gap-4 px-4 py-6 w-full">
          <div className="col-span-12">
            <Hero editableConfig={heroSection?.config} />
          </div>
          <div className="col-span-12">
            <SectionDivider />
          </div>

          {orderedVisibleSections.map((section, index) => {
            const normalizedType = section.type.toLowerCase();
            const SectionComponent = SECTION_REGISTRY[normalizedType];
            if (!SectionComponent) return null;

            const spanClass = section.layoutColumns === 6 ? "col-span-12 md:col-span-6" : "col-span-12";

            return (
              <div key={section.id} className={spanClass}>
                <ScrollReveal>
                  <SectionComponent config={section.config} />
                </ScrollReveal>
                {index < orderedVisibleSections.length - 1 && <SectionDivider />}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
