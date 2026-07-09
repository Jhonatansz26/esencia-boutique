import SectionTitle from "@/components/common/SectionTitle";
import { BRAND_VALUES } from "@/constants/data";
import { Sparkles, Gem, Shield, Heart } from "lucide-react";

export default function Values() {
  const valueIcons = [
    { icon: Gem, title: "Calidad" },
    { icon: Sparkles, title: "Elegancia" },
    { icon: Shield, title: "Autenticidad" },
    { icon: Heart, title: "Innovación" },
  ];

  return (
    <section className="py-20 px-6 md:px-16">
      <SectionTitle title="Lujo sin exceso" subtitle="Diferencial" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12 px-4">
        {BRAND_VALUES.map((value, index) => {
          const IconComponent = valueIcons[index].icon;
          return (
            <div key={value.title} className="flex flex-col gap-4">
              <div className="h-px w-full bg-[#1A1A1A]/20"></div>
              <IconComponent
                size={32}
                className="text-[#1A1A1A]"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold text-[#1A1A1A] tracking-wide">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
