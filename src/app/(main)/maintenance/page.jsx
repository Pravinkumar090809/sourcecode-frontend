"use client";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

export default function MaintenancePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <HiOutlineWrenchScrewdriver className="text-4xl text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Under Maintenance</h1>
        <p className="text-slate-500 max-w-md mx-auto mb-6">We&apos;re performing some scheduled maintenance. We&apos;ll be back shortly!</p>
        <div className="flex items-center justify-center gap-2 text-sm text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Estimated downtime: 30 minutes
        </div>
      </div>
    </div>
  );
}
