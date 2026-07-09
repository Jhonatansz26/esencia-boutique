import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "rounded-sm px-6 py-3 tracking-wide transition-all duration-300 hover:bg-opacity-90 font-medium";

  const variantStyles =
    variant === "primary"
      ? "bg-[#1A1A1A] text-[#FDFBF7] hover:bg-opacity-90"
      : "bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFBF7]";

  const combinedStyles = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    // Si es una URL externa, usar <a> nativo con target="_blank"
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    // Si es una ruta interna, usar <Link> de Next.js
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={combinedStyles}>
      {children}
    </button>
  );
}
