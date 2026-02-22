"use client";

import Link from "next/link";
import { HiCode, HiStar, HiShieldCheck, HiLightningBolt } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="glass group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer">
        {/* Gradient Top */}
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="icon-box icon-box-orange group-hover:scale-110 group-hover:rotate-3 transition-all">
              <HiCode className="text-orange-500 text-xl" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded-md">
              {new Date(product.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-800 mb-1.5 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {product.description || "Premium source code ready to use"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">
              <HiShieldCheck className="text-xs" /> Verified
            </span>
            <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">
              <HiLightningBolt className="text-xs" /> Instant
            </span>
            <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 font-medium">
              <HiStar className="text-xs" /> Premium
            </span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-2xl font-extrabold gradient-text">₹{product.price}</span>
            <span className="text-xs px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all">
              Buy Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
