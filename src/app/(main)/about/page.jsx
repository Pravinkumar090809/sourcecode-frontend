"use client";
import Footer from "@/components/Footer";
import { HiOutlineCodeBracket, HiOutlineHeart, HiOutlineRocketLaunch, HiOutlineUsers, HiOutlineGlobeAlt, HiOutlineShieldCheck, HiOutlineAcademicCap, HiOutlineLightBulb } from "react-icons/hi2";

export default function AboutPage() {
  const values = [
    { icon: HiOutlineCodeBracket, title: "Quality First", desc: "Every piece of code is reviewed for quality, performance, and best practices before it goes live on our platform.", color: "#ef4444" },
    { icon: HiOutlineHeart, title: "Developer Love", desc: "Built by developers, for developers. We understand the frustration of starting from scratch — that's why we exist.", color: "#ec4899" },
    { icon: HiOutlineRocketLaunch, title: "Innovation", desc: "We continuously add new technologies and modern frameworks to keep our catalog relevant and up-to-date.", color: "#f59e0b" },
    { icon: HiOutlineShieldCheck, title: "Trust & Security", desc: "Secure payments via Cashfree, instant digital delivery, and lifetime access to everything you purchase.", color: "#22c55e" },
    { icon: HiOutlineAcademicCap, title: "Learning-Focused", desc: "Our code isn't just functional — it's well-documented and structured to help you learn best practices as you build.", color: "#3b82f6" },
    { icon: HiOutlineLightBulb, title: "Real-World Projects", desc: "Every product is based on real business use cases, not toy examples. You get code that's ready for production.", color: "#8b5cf6" },
  ];
  const stats = [
    { value: "10+", label: "Products" }, { value: "50+", label: "Customers" },
    { value: "99.9%", label: "Uptime" }, { value: "4.8★", label: "Rating" },
  ];
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About SourceCode</h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">We&apos;re on a mission to help developers build faster with premium, production-ready source code. Founded in 2024, SourceCode provides carefully crafted, real-world project templates and boilerplate code that saves you hundreds of development hours. Every product is built, tested, and maintained by experienced full-stack developers.</p>
        </div>

        {/* Our Story */}
        <div className="glass rounded-2xl p-8 mb-16 animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
          <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
            <p>SourceCode was born out of a simple observation: developers spend too much time setting up boilerplate, configuring authentication, integrating payment gateways, and writing repetitive code for features that have been built thousands of times before.</p>
            <p>As a full-stack developer, our founder Pravinkumar experienced this firsthand while building projects for clients and personal ventures. The idea was clear — create a marketplace where developers can purchase production-ready code packages that are well-structured, properly documented, and ready to deploy.</p>
            <p>Today, SourceCode offers a growing catalog of digital products built with modern technologies like React, Next.js, Node.js, Express, MongoDB, and more. Each product goes through a rigorous review process to ensure code quality, security best practices, and real-world usability.</p>
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* What We Offer */}
        <div className="glass rounded-2xl p-8 mb-16 animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-400 leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">🛒 Digital Product Marketplace</h3>
              <p>A curated collection of source code packages, templates, and boilerplate projects that you can purchase and download instantly.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">📦 Full Project Source Code</h3>
              <p>Complete, working projects with frontend, backend, database schemas, and deployment configurations — not just snippets or tutorials.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">🔒 Secure Payments</h3>
              <p>All transactions are processed through Cashfree, a trusted payment gateway, supporting UPI, credit/debit cards, and net banking.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">♾️ Lifetime Access</h3>
              <p>Buy once, download forever. Every purchase comes with lifetime access to the code and all future updates at no extra cost.</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 text-center animate-fadeIn">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
            <HiOutlineUsers className="text-xl text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Meet Our Founder</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto mb-4">SourceCode is built and maintained by <span className="text-red-400 font-medium">Pravinkumar</span>, a passionate full-stack developer dedicated to helping fellow developers succeed.</p>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">With experience in React, Next.js, Node.js, MongoDB, and cloud deployment, Pravinkumar builds every product with the same care and attention to detail that he would use for his own projects. The goal is simple: save developers time and help them ship faster.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
