"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { HiOutlineRocketLaunch, HiOutlineUserPlus, HiOutlineMagnifyingGlass, HiOutlineCreditCard, HiOutlineArrowDownTray, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";

export default function BecomeCustomerPage() {
  const steps = [
    { icon: HiOutlineUserPlus, title: "Create Account", desc: "Sign up for free in seconds with just your name and email.", color: "#ef4444" },
    { icon: HiOutlineMagnifyingGlass, title: "Browse Products", desc: "Explore our curated collection of premium source code packages.", color: "#f59e0b" },
    { icon: HiOutlineCreditCard, title: "Secure Payment", desc: "Pay securely via Cashfree with UPI, cards, or net banking.", color: "#22c55e" },
    { icon: HiOutlineArrowDownTray, title: "Download & Build", desc: "Get instant access to download and start building your project.", color: "#8b5cf6" },
  ];

  const benefits = [
    "Instant download access", "Commercial license included", "Lifetime free updates",
    "Priority email support", "Complete documentation", "Setup guides included",
    "No hidden fees", "Secure payment gateway",
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-14 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineRocketLaunch className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Become a Customer</h1>
          <p className="text-slate-400 max-w-lg mx-auto">Join thousands of developers who trust SourceCode for premium source code</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center hover-lift animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="text-xl" style={{ color: s.color }} />
              </div>
              <div className="text-xs text-slate-600 mb-2">Step {i + 1}</div>
              <h3 className="text-white font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 mb-12 animate-fadeIn">
          <h2 className="text-xl font-bold text-white text-center mb-8">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <HiOutlineCheckCircle className="text-green-400 flex-shrink-0" /> {b}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center animate-fadeIn">
          <Link href="/signup" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
            Get Started Free <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
