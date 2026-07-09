import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/MissionVision";
import Materials from "@/components/sections/Materials";
import ProductGrid from "@/components/sections/ProductGrid";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";
import SectionDivider from "@/components/common/SectionDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />

      <BrandStory />
      <SectionDivider />

      <Materials />
      <SectionDivider />

      <ProductGrid />
      <SectionDivider />

      <Values />
      <SectionDivider />

      <Reviews />
    </main>
  );
}
