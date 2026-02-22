"use client";
import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#0a0a0f" }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="text-center animate-fadeIn relative z-10">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <HiOutlineExclamationTriangle className="text-4xl text-red-500" />
        </div>
        <h1 className="text-7xl font-black mb-2" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium">Go Home</Link>
          <Link href="/products" className="btn-secondary px-6 py-2.5 rounded-xl text-sm">Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
