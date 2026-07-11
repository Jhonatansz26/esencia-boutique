"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import AIRefinePopover from "@/components/admin/AIRefinePopover";

interface EditableTextProps {
  value: string;
  onCommit: (newValue: string) => void;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  enableAI?: boolean;
}

export default function EditableText({
  value,
  onCommit,
  className,
  as: Tag = "h1",
  enableAI = false,
}: EditableTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasInitialized = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (ref.current && !hasInitialized.current) {
      ref.current.textContent = value;
      hasInitialized.current = true;
    }
  }, [value]);

  const handleFocus = () => {
    setIsEditing(true);
    setShowConfirm(false);
  };

  const handleBlur = () => {
    const newValue = ref.current?.textContent?.trim() ?? "";
    onCommit(newValue);
    setIsEditing(false);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 400);
  };

  const handleAIVariantSelect = (text: string) => {
    if (ref.current) {
      ref.current.textContent = text;
    }
    onCommit(text);
  };

  return (
    <div className="relative">
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement & HTMLDivElement & HTMLLabelElement>}
        contentEditable
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`outline-none focus:outline-none ${className ?? ""}`}
      />
      {isEditing && (
        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse pointer-events-none" />
      )}
      <AnimatePresence>
        {showConfirm && (
          <motion.span
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-0.5 -right-0.5 pointer-events-none"
          >
            <Check size={10} className="text-[#D4AF37]" />
          </motion.span>
        )}
      </AnimatePresence>
      {enableAI && isEditing && (
        <div className="absolute -top-6 right-0 z-50">
          <AIRefinePopover
            currentText={value}
            onSelectVariant={handleAIVariantSelect}
          />
        </div>
      )}
    </div>
  );
}
