import Hero from "@/components/sections/Hero";
import MissionVision from "@/components/sections/MissionVision";
import ProductGrid from "@/components/sections/ProductGrid";
import Values from "@/components/sections/Values";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <MissionVision />
      <ProductGrid />
      <Values />
      <Reviews />
    </main>
  );
}
