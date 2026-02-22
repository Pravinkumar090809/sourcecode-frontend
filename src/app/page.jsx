"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import {
  HiCode,
  HiLightningBolt,
  HiShieldCheck,
  HiDownload,
  HiStar,
  HiCube,
  HiArrowRight,
} from "react-icons/hi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI
      .getAll()
      .then((res) => setProducts(res.data?.slice(0, 6) || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: HiCode,
      title: "Production Ready",
      desc: "Clean, well-structured code ready for deployment",
      color: "orange",
    },
    {
      icon: HiLightningBolt,
      title: "Instant Download",
      desc: "Get your source code immediately after purchase",
      color: "yellow",
    },
    {
      icon: HiShieldCheck,
      title: "Secure Payment",
      desc: "Safe transactions powered by Cashfree gateway",
      color: "green",
    },
    {
      icon: HiDownload,
      title: "Lifetime Access",
      desc: "Download anytime from your dashboard",
      color: "blue",
    },
  ];

  const stats = [
    { value: "50+", label: "Source Codes" },
    { value: "1K+", label: "Downloads" },
    { value: "4.9", label: "Rating" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 py-4">
      {/* -------- HERO -------- */}
      <section className="relative text-center py-12 sm:py-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 sm:mb-8">
          <HiStar className="text-orange-500 text-sm" />
          <span className="text-xs sm:text-sm font-semibold text-orange-600">
            Premium Source Codes
          </span>
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
          Build Faster With{" "}
          <span className="gradient-text">Ready-Made</span>
          <br />
          Source Codes
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Get production-ready source codes for web apps, mobile apps, APIs and
          more. Skip weeks of development time.
        </p>

        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/products" className="btn-primary text-sm sm:text-base w-full xs:w-auto">
            <HiCube className="text-lg" />
            Browse Products
          </Link>
          <Link
            href="/dashboard"
            className="btn-secondary text-sm sm:text-base w-full xs:w-auto"
          >
            My Dashboard
            <HiArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <HiShieldCheck className="text-green-500" /> Secure
          </span>
          <span className="flex items-center gap-1.5">
            <HiLightningBolt className="text-yellow-500" /> Instant
          </span>
          <span className="flex items-center gap-1.5">
            <HiStar className="text-orange-500" /> Premium
          </span>
        </div>
      </section>

      {/* -------- FEATURES -------- */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Why Choose <span className="gradient-text">Source Code Web</span>?
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Everything you need to accelerate your development
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`icon-box icon-box-${f.color} w-12 h-12 mx-auto mb-4`}
              >
                <f.icon className="text-xl" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------- PRODUCTS -------- */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Latest premium source codes
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            View All <HiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <HiCube className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No products available yet</p>
          </div>
        )}

        <Link
          href="/products"
          className="sm:hidden btn-secondary text-sm w-full mt-4 justify-center"
        >
          View All Products <HiArrowRight />
        </Link>
      </section>

      {/* -------- STATS -------- */}
      <section className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- CTA -------- */}
      <section className="max-w-3xl mx-auto text-center py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to <span className="gradient-text">Get Started</span>?
        </h2>
        <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
          Browse our collection and find the perfect source code for your next
          project.
        </p>
        <Link href="/products" className="btn-primary text-sm sm:text-base">
          <HiCube className="text-lg" />
          Explore Products
        </Link>
      </section>
    </div>
  );
}
