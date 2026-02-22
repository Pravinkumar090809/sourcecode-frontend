export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 animate-fade-in-scale">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-yellow-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-yellow-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>
        <p className="text-sm text-slate-400 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
