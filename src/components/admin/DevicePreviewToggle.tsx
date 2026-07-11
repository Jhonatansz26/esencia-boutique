"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface DevicePreviewToggleProps {
  mode: ViewportMode;
  onChange: (mode: ViewportMode) => void;
}

const DEVICES: { mode: ViewportMode; icon: typeof Monitor; label: string }[] = [
  { mode: "desktop", icon: Monitor, label: "Desktop (1440px)" },
  { mode: "tablet", icon: Tablet, label: "Tablet (768px)" },
  { mode: "mobile", icon: Smartphone, label: "Mobile (375px)" },
];

export default function DevicePreviewToggle({ mode, onChange }: DevicePreviewToggleProps) {
  return (
    <div className="flex items-center gap-0.5 bg-transparent">
      {DEVICES.map(({ mode: deviceMode, icon: Icon, label }) => {
        const isActive = mode === deviceMode;
        return (
          <button
            key={deviceMode}
            type="button"
            onClick={() => onChange(deviceMode)}
            title={label}
            className={`relative flex items-center justify-center w-8 h-8 rounded-sm transition-colors duration-200 ${
              isActive
                ? "text-[#D4AF37]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon size={15} />
            {isActive && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#D4AF37] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
