import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
}

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "rounded-sm px-6 py-3 tracking-wide transition-all duration-300 hover:bg-opacity-90 font-medium";

  const variantStyles =
    variant === "primary"
      ? "bg-[#1A1A1A] text-[#FDFBF7] hover:bg-opacity-90"
      : "bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7]";

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
