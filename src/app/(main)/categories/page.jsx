"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { HiOutlineCodeBracket, HiOutlineDevicePhoneMobile, HiOutlineGlobeAlt, HiOutlineCommandLine, HiOutlinePaintBrush, HiOutlineCpuChip, HiOutlineCircleStack, HiOutlineArrowRight } from "react-icons/hi2";

const categories = [
  { slug: "web-apps", title: "Web Applications", desc: "Full-stack web apps with modern frameworks", icon: HiOutlineGlobeAlt, color: "#ef4444", count: 45 },
  { slug: "mobile-apps", title: "Mobile Apps", desc: "React Native, Flutter & native mobile apps", icon: HiOutlineDevicePhoneMobile, color: "#f59e0b", count: 32 },
  { slug: "apis-backend", title: "APIs & Backend", desc: "REST APIs, GraphQL, microservices", icon: HiOutlineCommandLine, color: "#22c55e", count: 28 },
  { slug: "ui-templates", title: "UI Templates", desc: "Beautiful UI kits and design templates", icon: HiOutlinePaintBrush, color: "#8b5cf6", count: 56 },
  { slug: "ai-ml", title: "AI & Machine Learning", desc: "ML models, AI tools, and data science", icon: HiOutlineCpuChip, color: "#06b6d4", count: 18 },
  { slug: "databases", title: "Database & Tools", desc: "Database schemas, admin panels, dev tools", icon: HiOutlineCircleStack, color: "#ec4899", count: 24 },
  { slug: "scripts", title: "Scripts & Utilities", desc: "Automation scripts, CLI tools, utilities", icon: HiOutlineCodeBracket, color: "#14b8a6", count: 38 },
  { slug: "ecommerce", title: "E-Commerce", desc: "Complete e-commerce solutions & plugins", icon: HiOutlineCodeBracket, color: "#f97316", count: 22 },
];

export default function CategoriesPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-slate-500">Browse source code by category</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="glass rounded-2xl p-6 hover-lift group animate-fadeIn transition-all hover:border-red-500/20" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                <c.icon className="text-2xl" style={{ color: c.color }} />
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-red-400 transition-colors">{c.title}</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{c.count} products</span>
                <HiOutlineArrowRight className="text-sm text-slate-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
