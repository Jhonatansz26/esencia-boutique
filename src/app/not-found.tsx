import Link from "next/link";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#FDFBF7]">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl md:text-9xl text-stone-200/50 leading-none select-none mb-4">
          404
        </p>

        <div className="h-px w-12 bg-[#1A1A1A]/20 mx-auto mb-6" />

        <h1 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] tracking-wide mb-4">
          Esta pieza no se encuentra en nuestra colección
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          Es posible que el enlace esté roto o que la página haya sido
          movida. Explora el resto de nuestras piezas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Volver al Inicio
            </Button>
          </Link>
          <Link href="/catalogo">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
