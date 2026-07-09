import ProductSkeleton from "@/components/catalogo/ProductSkeleton";

export default function CatalogoLoading() {
  return (
    <main className="py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-10 md:h-14 w-64 md:w-96 bg-stone-200/50 rounded-sm animate-pulse mx-auto mb-4" />
          <div className="h-4 w-80 bg-stone-200/40 rounded-sm animate-pulse mx-auto" />
        </div>

        <div className="flex justify-center gap-8 mb-8 border-b border-[#1A1A1A]/10 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-stone-200/40 rounded-sm animate-pulse"
            />
          ))}
        </div>

        <ProductSkeleton count={12} />
      </div>
    </main>
  );
}
