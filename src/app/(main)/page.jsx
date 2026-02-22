"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { HiOutlineCodeBracket, HiOutlineBolt, HiOutlineShieldCheck, HiOutlineArrowDownTray, HiOutlineRocketLaunch, HiOutlineStar, HiOutlineCurrencyRupee, HiOutlineUsers, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiPackage, FiZap, FiLock, FiDownload } from "react-icons/fi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll().then((res) => {
      if (res.success) setProducts((res.products || res.data || []).slice(0, 6));
      setLoading(false);
    });
  }, []);

  const features = [
    { icon: FiPackage, title: "Premium Code", desc: "Hand-crafted, production-ready source code packages", color: "#ef4444" },
    { icon: FiZap, title: "Instant Access", desc: "Download immediately after purchase, no waiting", color: "#f59e0b" },
    { icon: FiLock, title: "Secure Payment", desc: "Powered by Cashfree with 100% secure transactions", color: "#22c55e" },
    { icon: FiDownload, title: "Lifetime Access", desc: "Buy once, download forever with free updates", color: "#8b5cf6" },
  ];

  const stats = [
    { icon: HiOutlineCodeBracket, value: "500+", label: "Source Codes", color: "#ef4444" },
    { icon: HiOutlineUsers, value: "10K+", label: "Happy Customers", color: "#22c55e" },
    { icon: HiOutlineStar, value: "4.9", label: "Avg Rating", color: "#f59e0b" },
    { icon: HiOutlineCurrencyRupee, value: "₹99", label: "Starting From", color: "#8b5cf6" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle,#ef4444,transparent)" }} />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle,#8b5cf6,transparent)" }} />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-medium text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <HiOutlineRocketLaunch className="text-sm" /> Premium Source Code Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Build Faster With<br />
            <span style={{ background: "linear-gradient(135deg,#ef4444,#dc2626,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Premium Code
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get production-ready source code for web apps, mobile apps, and more. Ship faster, build smarter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group">
              Explore Products <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/become-customer" className="btn-secondary px-8 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
              How It Works <HiOutlineBolt />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: "#0a0a0f", background: `hsl(${i * 80}, 70%, 50%)` }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <HiOutlineStar key={i} className="text-yellow-400 text-xs fill-yellow-400" />)}
              </div>
              <p className="text-xs text-slate-500">Trusted by 10,000+ developers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-12 -mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center animate-fadeIn hover-lift" style={{ animationDelay: `${i * 100}ms` }}>
              <s.icon className="text-2xl mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose <span style={{ color: "#ef4444" }}>SourceCode</span>?</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Everything you need to accelerate your development workflow</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover-lift animate-fadeIn group" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon className="text-2xl" style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-slate-500 text-sm">Hand-picked premium source code packages</p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
              View All <HiOutlineArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44" style={{ background: "rgba(255,255,255,0.03)" }} />
                  <div className="p-4 space-y-3">
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "70%" }} />
                    <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.03)", width: "90%" }} />
                    <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.03)", width: "50%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <FiPackage className="text-4xl text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500">No products available yet</p>
            </div>
          )}
          <div className="text-center mt-8 sm:hidden">
            <Link href="/products" className="btn-secondary px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
              View All Products <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-500">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Browse & Choose", desc: "Explore our curated collection of premium source code packages", icon: HiOutlineCodeBracket },
              { step: "02", title: "Secure Payment", desc: "Pay securely via Cashfree with multiple payment options", icon: HiOutlineShieldCheck },
              { step: "03", title: "Download & Build", desc: "Get instant access to download and start building right away", icon: HiOutlineArrowDownTray },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 relative hover-lift animate-fadeIn" style={{ animationDelay: `${i * 150}ms` }}>
                <span className="text-5xl font-black absolute top-4 right-4" style={{ color: "rgba(239,68,68,0.08)" }}>{s.step}</span>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <s.icon className="text-xl text-red-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: "rgba(239,68,68,0.1)" }} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">Ready to Build Something Amazing?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">Join thousands of developers who trust SourceCode for premium, production-ready source code.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/signup" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                Get Started Free <HiOutlineArrowRight />
              </Link>
              <Link href="/products" className="btn-secondary px-8 py-3.5 rounded-xl text-sm">Browse Products</Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 relative z-10">
              {["No hidden fees", "Instant downloads", "Lifetime access"].map((t, i) => (
                <span key={i} className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400"><HiOutlineCheckCircle className="text-green-400" />{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
