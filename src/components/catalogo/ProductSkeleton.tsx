interface ProductSkeletonProps {
  count?: number;
  featuredEvery?: number;
}

export default function ProductSkeleton({
  count = 12,
  featuredEvery = 7,
}: ProductSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[340px] gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => {
        const isFeatured = (index + 1) % featuredEvery === 0 && index !== 0;
        return (
          <SkeletonCard key={index} isFeatured={isFeatured} />
        );
      })}
    </div>
  );
}

function SkeletonCard({ isFeatured }: { isFeatured: boolean }) {
  return (
    <div
      className={`flex flex-col ${
        isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-sm bg-stone-200/50 animate-pulse ${
          isFeatured ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-square"
        }`}
        style={{ animationDuration: "2.2s" }}
      />

      <div className="mt-4 flex flex-col gap-2.5">
        <div
          className={`h-3 rounded-sm bg-stone-200/50 animate-pulse ${
            isFeatured ? "w-2/3" : "w-3/4"
          }`}
          style={{ animationDuration: "2.2s" }}
        />
        <div
          className="h-2.5 w-1/2 rounded-sm bg-stone-200/40 animate-pulse"
          style={{ animationDuration: "2.2s", animationDelay: "0.15s" }}
        />
        <div
          className="h-3 w-1/3 rounded-sm bg-stone-200/50 animate-pulse"
          style={{ animationDuration: "2.2s", animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}
