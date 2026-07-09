interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  size?: "sm" | "md" | "lg";
  number?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  alignment = "left",
  size = "lg",
  number,
}: SectionTitleProps) {
  const alignClass = alignment === "center" ? "text-center" : "text-left";

  const sizeClass =
    size === "sm"
      ? "text-2xl md:text-3xl"
      : size === "md"
        ? "text-3xl md:text-4xl"
        : "text-4xl";

  return (
    <div className={`relative ${alignClass}`}>
      {number && (
        <span
          className={`absolute font-serif text-8xl md:text-9xl text-stone-200/40 select-none pointer-events-none leading-none -z-0 ${
            alignment === "center"
              ? "-top-6 left-1/2 -translate-x-1/2"
              : "-top-8 -left-2 md:-left-4"
          }`}
          aria-hidden="true"
        >
          {number}
        </span>
      )}

      <div className="relative z-10">
        {subtitle && (
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            {subtitle}
          </p>
        )}
        <h2 className={`font-serif ${sizeClass} text-[#1A1A1A] tracking-wide`}>
          {title}
        </h2>
      </div>
    </div>
  );
}
