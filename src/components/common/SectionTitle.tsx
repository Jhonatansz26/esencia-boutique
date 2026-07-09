interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  size?: "sm" | "md" | "lg";
}

export default function SectionTitle({
  title,
  subtitle,
  alignment = "left",
  size = "lg",
}: SectionTitleProps) {
  const alignClass = alignment === "center" ? "text-center" : "text-left";

  const sizeClass =
    size === "sm"
      ? "text-2xl md:text-3xl"
      : size === "md"
        ? "text-3xl md:text-4xl"
        : "text-4xl";

  return (
    <div className={alignClass}>
      {subtitle && (
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
          {subtitle}
        </p>
      )}
      <h2 className={`font-serif ${sizeClass} text-[#1A1A1A] tracking-wide`}>
        {title}
      </h2>
    </div>
  );
}
