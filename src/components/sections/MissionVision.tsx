import SectionTitle from "@/components/common/SectionTitle";
import { BRAND_INFO } from "@/constants/data";

export default function MissionVision() {
  return (
    <section className="py-24 md:py-36 bg-transparent px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <SectionTitle title="Misión" size="sm" />
          <p className="text-gray-600 leading-relaxed text-lg">
            {BRAND_INFO.mission}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SectionTitle title="Visión" size="sm" />
          <p className="text-gray-600 leading-relaxed text-lg">
            {BRAND_INFO.vision}
          </p>
        </div>
      </div>
    </section>
  );
}
