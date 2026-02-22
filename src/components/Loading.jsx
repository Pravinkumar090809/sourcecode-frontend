"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full" style={{ border: "3px solid #fed7aa" }} />
        <div className="absolute inset-0 rounded-full animate-spin" style={{ border: "3px solid #f97316", borderTopColor: "transparent" }} />
      </div>
    </div>
  );
}
