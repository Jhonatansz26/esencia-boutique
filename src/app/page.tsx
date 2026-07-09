import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/MissionVision";
import Materials from "@/components/sections/Materials";
import ProductGrid from "@/components/sections/ProductGrid";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";
import SectionDivider from "@/components/common/SectionDivider";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />

      <ScrollReveal>
        <BrandStory />
      </ScrollReveal>
      <SectionDivider />

      <ScrollReveal>
        <Materials />
      </ScrollReveal>
      <SectionDivider />

      <ScrollReveal>
        <ProductGrid />
      </ScrollReveal>
      <SectionDivider />

      <ScrollReveal>
        <Values />
      </ScrollReveal>
      <SectionDivider />

      <ScrollReveal>
        <Reviews />
      </ScrollReveal>
    </main>
  );
}
