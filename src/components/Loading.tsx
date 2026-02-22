// components/Loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-[3px] border-orange-200 rounded-full" />
        <div className="absolute inset-0 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}