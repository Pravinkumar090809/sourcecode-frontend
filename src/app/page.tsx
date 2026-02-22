"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { HiCode, HiLightningBolt, HiShieldCheck, HiArrowRight, HiStar, HiDownload } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll().then((res) => {
      if (res.success) setProducts(res.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative z-10">
      {/* ═══ HERO ═══ */}
      <section className="px-4 pt-10 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 text-orange-600 text-xs font-bold mb-8 animate-fade-in-up shadow-sm">
            <HiLightningBolt className="text-sm animate-bounce-gentle" /> Premium Source Code Marketplace
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-5 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Get{" "}
            <span className="gradient-text relative inline-block">
              Production-Ready
              <svg className="absolute -bottom-2 left-0 w-full hidden sm:block" viewBox="0 0 300 12" fill="none"><path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 6" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round"/><defs><linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0"><stop offset="0" stopColor="#FF6B35"/><stop offset="1" stopColor="#FFB800"/></linearGradient></defs></svg>
            </span>
            <br />Source Code
          </h1>

          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Buy verified, tested & premium source code. Download instantly. Build faster than ever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/products" className="btn-primary text-base !py-4 !px-8">
              Browse Products <HiArrowRight />
            </Link>
            <Link href="/signup" className="btn-secondary text-base !py-4 !px-8">
              Create Account
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: HiShieldCheck, text: "100% Verified", color: "text-emerald-500" },
              { icon: HiDownload, text: "Instant Download", color: "text-blue-500" },
              { icon: HiStar, text: "Premium Quality", color: "text-amber-500" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <b.icon className={`${b.color}`} />
                <span className="font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: HiCode, title: "Clean Code", desc: "Well-structured, documented & production ready", color: "icon-box-blue", iconColor: "text-blue-500" },
            { icon: HiShieldCheck, title: "Verified & Tested", desc: "Every source code is manually reviewed & tested", color: "icon-box-green", iconColor: "text-emerald-500" },
            { icon: HiLightningBolt, title: "Instant Download", desc: "Get your ZIP file immediately after payment", color: "icon-box-orange", iconColor: "text-orange-500" },
          ].map((f, i) => (
            <div key={i} className="glass p-6 text-center hover:-translate-y-2 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className={`icon-box ${f.color} mx-auto mb-4`}>
                <f.icon className={`${f.iconColor} text-xl`} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1.5">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                <span className="gradient-text">Latest</span> Products
              </h2>
              <p className="text-sm text-slate-400 mt-1">Fresh source codes ready to buy</p>
            </div>
            <Link href="/products" className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1 font-semibold group">
              View All <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? <Loading /> : products.length === 0 ? (
            <div className="glass p-16 text-center">
              <div className="icon-box icon-box-orange mx-auto mb-4 w-16 h-16">
                <HiCode className="text-orange-500 text-2xl" />
              </div>
              <p className="text-slate-500 font-medium">No products available yet</p>
              <p className="text-xs text-slate-400 mt-1">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.slice(0, 6).map((product, i) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500" />
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Ready to <span className="gradient-text">Build Faster</span>?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Join developers who save time with premium, tested source code.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary !py-3.5">Get Started Free</Link>
              <Link href="/products" className="btn-secondary !py-3.5">Browse Code</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
