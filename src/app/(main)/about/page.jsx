"use client";
import Footer from "@/components/Footer";
import { HiOutlineCodeBracket, HiOutlineHeart, HiOutlineRocketLaunch, HiOutlineUsers, HiOutlineGlobeAlt, HiOutlineShieldCheck } from "react-icons/hi2";

export default function AboutPage() {
  const values = [
    { icon: HiOutlineCodeBracket, title: "Quality First", desc: "Every piece of code is reviewed for quality, performance, and best practices.", color: "#ef4444" },
    { icon: HiOutlineHeart, title: "Developer Love", desc: "Built by developers, for developers. We understand your needs.", color: "#ec4899" },
    { icon: HiOutlineRocketLaunch, title: "Innovation", desc: "Constantly adding new technologies and modern frameworks.", color: "#f59e0b" },
    { icon: HiOutlineShieldCheck, title: "Trust & Security", desc: "Secure payments, instant delivery, and lifetime access guaranteed.", color: "#22c55e" },
  ];
  const stats = [
    { value: "500+", label: "Products" }, { value: "10K+", label: "Customers" },
    { value: "99.9%", label: "Uptime" }, { value: "4.9★", label: "Rating" },
  ];
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About SourceCode</h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">We&apos;re on a mission to help developers build faster with premium, production-ready source code. Founded in 2024, we&apos;ve helped thousands of developers accelerate their projects.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="text-2xl font-bold text-red-400">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-fadeIn hover-lift" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                  <v.icon className="text-xl" style={{ color: v.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8 text-center animate-fadeIn">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
            <HiOutlineUsers className="text-xl text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Meet Our Founder</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">SourceCode is built and maintained by <span className="text-red-400 font-medium">Pravinkumar</span>, a passionate full-stack developer dedicated to helping fellow developers succeed.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
