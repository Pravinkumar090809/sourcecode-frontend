"use client";
import Link from "next/link";
import { HiOutlineShoppingCart, HiOutlineStar, HiOutlineTag } from "react-icons/hi2";
import { FiPackage, FiDownload } from "react-icons/fi";

export default function ProductCard({ product, index = 0 }) {
  const price = product.price || 0;
  const tags = product.tags ? (typeof product.tags === "string" ? product.tags.split(",") : product.tags) : [];

  return (
    <Link href={`/products/${product.id}`} className="group block animate-fadeIn" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(139,92,246,0.1))" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <FiPackage className="text-5xl text-red-500/30 group-hover:text-red-500/50 transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              ₹{price}
            </span>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
            <HiOutlineStar className="text-yellow-400 text-xs" />
            <span className="text-slate-300">4.8</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-1.5 line-clamp-1 group-hover:text-red-400 transition-colors">{product.title}</h3>
          <p className="text-slate-500 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description || "Premium source code package"}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 3).map((t, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] text-slate-400" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <HiOutlineTag className="text-red-400" style={{ fontSize: 9 }} />{t.trim()}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500">
              <FiDownload className="text-xs" />
              <span className="text-[10px]">Instant Download</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(239,68,68,0.1)" }}>
              <HiOutlineShoppingCart className="text-sm" /> Buy Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
