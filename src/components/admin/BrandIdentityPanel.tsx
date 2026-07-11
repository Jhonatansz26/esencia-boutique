"use client";

import { useState, useEffect } from "react";
import { Palette, Type, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { getDesignTokens, updateDesignTokens, type DesignTokens } from "@/app/actions/design-tokens";

interface BrandIdentityPanelProps {
  onTokenChange?: () => void;
  onToast?: (message: string, type: "success" | "error") => void;
}

const COLOR_PRESETS = {
  aurea: {
    primary: "#D4AF37",
    surface: "#FDFBF7",
    text: "#1A1A1A",
  },
  midnight: {
    primary: "#C0C0C0",
    surface: "#1A1A1A",
    text: "#FDFBF7",
  },
  platino: {
    primary: "#E5E4E2",
    surface: "#FAFAFA",
    text: "#2C2C2C",
  },
};

const HEADING_FONTS = ["Playfair Display", "Cormorant Garamond"];

export default function BrandIdentityPanel({ onTokenChange, onToast }: BrandIdentityPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tokens, setTokens] = useState<DesignTokens | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!isExpanded || hasLoaded) return;
    let cancelled = false;
    getDesignTokens()
      .then((data) => {
        if (!cancelled) {
          setTokens(data);
          setHasLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Error loading tokens:", error);
        onToast?.("Error al cargar la identidad de marca.", "error");
        if (!cancelled) setHasLoaded(true);
      });
    return () => { cancelled = true; };
  }, [isExpanded, hasLoaded, onToast]);

  const loading = isExpanded && !hasLoaded && !tokens;

  const handleColorPresetChange = async (preset: keyof typeof COLOR_PRESETS) => {
    if (!tokens) return;

    setSaving(true);
    try {
      const result = await updateDesignTokens("color", COLOR_PRESETS[preset]);
      if (result.success) {
        setTokens((prev) => prev ? { ...prev, color: COLOR_PRESETS[preset] } : prev);
        onTokenChange?.();
        onToast?.(result.message, "success");
      } else {
        onToast?.(result.message, "error");
      }
    } catch (error) {
      console.error("Error updating color preset:", error);
      onToast?.("Error al actualizar la paleta de colores.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleHeadingFontChange = async (font: string) => {
    if (!tokens) return;

    setSaving(true);
    try {
      const result = await updateDesignTokens("font", { heading: font });
      if (result.success) {
        setTokens((prev) => prev ? { ...prev, font: { ...prev.font, heading: font } } : prev);
        onTokenChange?.();
        onToast?.(result.message, "success");
      } else {
        onToast?.(result.message, "error");
      }
    } catch (error) {
      console.error("Error updating heading font:", error);
      onToast?.("Error al actualizar la tipografía.", "error");
    } finally {
      setSaving(false);
    }
  };

  const getCurrentPreset = (): keyof typeof COLOR_PRESETS | null => {
    if (!tokens) return null;
    for (const [key, preset] of Object.entries(COLOR_PRESETS)) {
      if (
        tokens.color.primary === preset.primary &&
        tokens.color.surface === preset.surface &&
        tokens.color.text === preset.text
      ) {
        return key as keyof typeof COLOR_PRESETS;
      }
    }
    return null;
  };

  return (
    <div className="border-t border-white/8 mt-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Palette size={14} className="text-[#D4AF37]" />
          <span className="text-xs uppercase tracking-wider text-white/80">
            Identidad de Marca
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={14} className="text-white/40" />
        ) : (
          <ChevronDown size={14} className="text-white/40" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="animate-spin text-[#D4AF37]" size={16} />
            </div>
          ) : tokens ? (
            <>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                  <Palette size={10} />
                  Paleta de Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(COLOR_PRESETS).map(([key, preset]) => {
                    const isActive = getCurrentPreset() === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleColorPresetChange(key as keyof typeof COLOR_PRESETS)}
                        disabled={saving}
                        className={`relative flex flex-col items-center gap-1.5 p-2 rounded-sm border transition-all ${
                          isActive
                            ? "border-[#D4AF37] bg-white/5"
                            : "border-white/10 hover:border-white/20"
                        } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div
                          className="w-full h-8 rounded-sm border border-white/10"
                          style={{ backgroundColor: preset.surface }}
                        >
                          <div
                            className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: preset.primary }}
                          />
                        </div>
                        <span className="text-[9px] text-white/60 capitalize">{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                  <Type size={10} />
                  Tipografía de Encabezados
                </label>
                <select
                  value={tokens.font.heading}
                  onChange={(e) => handleHeadingFontChange(e.target.value)}
                  disabled={saving}
                  className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#D4AF37] outline-none disabled:opacity-50"
                >
                  {HEADING_FONTS.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
