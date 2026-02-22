// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { 
  HiCode, 
  HiLightningBolt, 
  HiShieldCheck, 
  HiArrowRight, 
  HiStar, 
  HiDownload,
  HiSparkles
} from "react-icons/hi";

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
      <div className="max-w-6xl mx-auto">
        
        {/* ═══ HERO SECTION ═══ */}
        <section className="text-center py-8 sm:py-12 lg:py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 text-orange-600 text-[10px] sm:text-xs font-bold mb-5 sm:mb-6 animate-fade-in-up shadow-sm">
            <HiLightningBolt className="animate-bounce-gentle" />
            <span>Premium Source Code Marketplace</span>
          </div>

          {/* Heading */}
          <h1 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Get{" "}
            <span className="gradient-text">Production-Ready</span>
            <br className="hidden xs:block" />
            <span className="xs:hidden"> </span>
            Source Code
          </h1>

          {/* Subtitle */}
          <p 
            className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Buy verified, tested & premium source code. Download instantly. Build faster than ever.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col xs:flex-row justify-center items-center gap-3 mb-8 sm:mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/products" className="btn-primary w-full xs:w-auto !py-3 !px-6">
              Browse Products <HiArrowRight />
            </Link>
            <Link href="/signup" className="btn-secondary w-full xs:w-auto !py-3 !px-6">
              Create Account
            </Link>
          </div>

          {/* Trust Badges */}
          <div 
            className="flex flex-wrap justify-center gap-3 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: HiShieldCheck, text: "100% Verified", color: "text-emerald-500" },
              { icon: HiDownload, text: "Instant Download", color: "text-blue-500" },
              { icon: HiStar, text: "Premium Quality", color: "text-amber-500" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                <badge.icon className={badge.color} />
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FEATURES SECTION ═══ */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
            {[
              { 
                icon: HiCode, 
                title: "Clean Code", 
                desc: "Well-structured & documented",
                iconClass: "icon-box-blue",
                iconColor: "text-blue-500"
              },
              { 
                icon: HiShieldCheck, 
                title: "Verified & Tested", 
                desc: "Manually reviewed code",
                iconClass: "icon-box-green",
                iconColor: "text-emerald-500"
              },
              { 
                icon: HiLightningBolt, 
                title: "Instant Download", 
                desc: "Get ZIP immediately",
                iconClass: "icon-box-orange",
                iconColor: "text-orange-500"
              },
            ].map((f, i) => (
              <div 
                key={i} 
                className="glass p-4 sm:p-5 text-center hover:-translate-y-1 transition-transform animate-fade-in-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className={`icon-box ${f.iconClass} mx-auto mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12`}>
                  <f.icon className={`${f.iconColor} text-lg sm:text-xl`} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-0.5 sm:mb-1">{f.title}</h3>
                <p className="text-[10px] sm:text-xs text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PRODUCTS SECTION ═══ */}
        <section className="py-6 sm:py-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold">
                <span className="gradient-text">Latest</span> Products
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Fresh source codes ready to buy</p>
            </div>
            <Link 
              href="/products" 
              className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1 font-semibold group"
            >
              View All 
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex-center py-12">
              <Loading />
            </div>
          ) : products.length === 0 ? (
            <div className="glass p-8 sm:p-12 text-center">
              <div className="icon-box icon-box-orange mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14">
                <HiCode className="text-orange-500 text-xl sm:text-2xl" />
              </div>
              <p className="text-sm text-slate-500 font-medium">No products available yet</p>
              <p className="text-xs text-slate-400 mt-1">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {products.slice(0, 6).map((product, i) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ═══ STATS SECTION ═══ */}
        <section className="py-6 sm:py-10">
          <div className="glass-strong p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "500+", label: "Products", icon: HiCode },
                { value: "10K+", label: "Downloads", icon: HiDownload },
                { value: "4.9★", label: "Rating", icon: HiStar },
                { value: "24/7", label: "Support", icon: HiSparkles },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                    <stat.icon className="text-orange-500 text-sm sm:text-base" />
                    <span className="text-base sm:text-xl md:text-2xl font-extrabold gradient-text">{stat.value}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="py-6 sm:py-10 pb-8">
          <div className="glass-strong p-5 sm:p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500" />
            
            <h2 className="text-base sm:text-xl md:text-2xl font-extrabold mb-2">
              Ready to <span className="gradient-text">Build Faster</span>?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm mx-auto">
              Join developers who save time with premium, tested source code.
            </p>
            
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center">
              <Link href="/signup" className="btn-primary">Get Started Free</Link>
              <Link href="/products" className="btn-secondary">Browse Code</Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}