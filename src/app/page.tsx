import Hero from "@/components/sections/Hero";
import Materials from "@/components/sections/Materials";
import ProductGrid from "@/components/sections/ProductGrid";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";
import Philosophy from "@/components/sections/Philosophy";
import SectionDivider from "@/components/common/SectionDivider";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function Home() {
  return (
    <main>
      <Hero />
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
      <SectionDivider />

      <ScrollReveal>
        <Philosophy />
      </ScrollReveal>
    </main>
  );
}
