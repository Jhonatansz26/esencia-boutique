"use client";

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onConfirmLeave: () => void;
  onCancel: () => void;
  onSaveAndLeave: () => void;
}

export default function UnsavedChangesModal({
  isOpen,
  onConfirmLeave,
  onCancel,
  onSaveAndLeave,
}: UnsavedChangesModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(28, 20, 14, 0.6)" }}
    >
      <div className="bg-[#FAF7F2] rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <h2 className="font-serif text-xl text-[#1A1A1A] mb-3 tracking-wide">
          Tienes cambios sin guardar
        </h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Si sales ahora, perderás los cambios realizados en el editor visual.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onSaveAndLeave}
            className="w-full px-4 py-3 bg-[#1A1A1A] text-[#FDFBF7] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors"
          >
            Guardar y salir
          </button>
          <button
            type="button"
            onClick={onConfirmLeave}
            className="w-full px-4 py-3 text-xs uppercase tracking-wider text-stone-500 hover:text-red-700 border border-stone-200 hover:border-red-300 rounded-sm transition-colors"
          >
            Salir sin guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-2 text-xs uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
