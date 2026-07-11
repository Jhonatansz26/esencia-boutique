"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { SECTION_THEME_LIST, SectionThemeId } from "@/lib/section-themes";

interface ThemeSelectorProps {
  currentTheme: SectionThemeId;
  onSelect: (theme: SectionThemeId) => void;
}

export default function ThemeSelector({ currentTheme, onSelect }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        title="Cambiar tema de la sección"
        className="flex items-center justify-center w-7 h-7 rounded-sm text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-colors"
      >
        <Palette size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 z-40 flex flex-col gap-1 p-2 rounded-sm bg-[#1A1A1A] border border-white/10 shadow-xl min-w-[180px]">
          {SECTION_THEME_LIST.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(theme.id);
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-sm hover:bg-white/5 transition-colors text-left"
            >
              <span className={`w-4 h-4 rounded-full shrink-0 ${theme.swatchClass}`} />
              <span className="flex-1 text-xs text-white/80 tracking-wide">
                {theme.label}
              </span>
              {currentTheme === theme.id && (
                <Check size={12} className="text-[#D4AF37] shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
