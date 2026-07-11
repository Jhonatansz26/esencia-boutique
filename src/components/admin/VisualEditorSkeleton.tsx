export default function VisualEditorSkeleton() {
  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      <div className="fixed top-0 left-0 h-full w-[360px] bg-stone-200/30 border-r border-stone-200/50 flex flex-col">
        <div className="px-6 py-5 border-b border-stone-200/50">
          <div
            className="h-3 w-24 rounded-sm bg-stone-300/40 animate-pulse"
            style={{ animationDuration: "2.2s" }}
          />
          <div
            className="h-5 w-40 rounded-sm bg-stone-300/50 animate-pulse mt-3"
            style={{ animationDuration: "2.2s", animationDelay: "0.15s" }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-sm border border-stone-200/40 bg-stone-200/20 px-3 py-3"
            >
              <div
                className="w-4 h-4 rounded-sm bg-stone-300/40 animate-pulse"
                style={{
                  animationDuration: "2.2s",
                  animationDelay: `${index * 0.15}s`,
                }}
              />
              <div
                className="flex-1 h-3 rounded-sm bg-stone-300/40 animate-pulse"
                style={{
                  animationDuration: "2.2s",
                  animationDelay: `${index * 0.15}s`,
                }}
              />
              <div
                className="w-9 h-5 rounded-full bg-stone-300/40 animate-pulse"
                style={{
                  animationDuration: "2.2s",
                  animationDelay: `${index * 0.15}s`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="px-6 py-5 border-t border-stone-200/50 flex gap-2">
          <div
            className="flex-1 h-10 rounded-sm bg-stone-300/40 animate-pulse"
            style={{ animationDuration: "2.2s" }}
          />
          <div
            className="flex-1 h-10 rounded-sm bg-[#D4AF37]/30 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.15s" }}
          />
        </div>
      </div>

      <div className="flex-1 ml-[360px]">
        <div className="sticky top-0 z-40 bg-[#FDFBF7] border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div
            className="h-3 w-32 rounded-sm bg-stone-200/50 animate-pulse"
            style={{ animationDuration: "2.2s" }}
          />
          <div
            className="h-3 w-20 rounded-sm bg-stone-200/50 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.15s" }}
          />
        </div>

        <main className="px-6 py-8 flex flex-col gap-6">
          <div
            className="w-full h-[400px] rounded-sm bg-stone-200/40 animate-pulse"
            style={{ animationDuration: "2.2s" }}
          />
          <div
            className="w-full h-[300px] rounded-sm bg-stone-200/40 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.15s" }}
          />
          <div
            className="w-full h-[250px] rounded-sm bg-stone-200/40 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.3s" }}
          />
          <div
            className="w-full h-[350px] rounded-sm bg-stone-200/40 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.45s" }}
          />
          <div
            className="w-full h-[200px] rounded-sm bg-stone-200/40 animate-pulse"
            style={{ animationDuration: "2.2s", animationDelay: "0.6s" }}
          />
        </main>
      </div>
    </div>
  );
}
