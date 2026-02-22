"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { HiOutlineCheckCircle, HiOutlineArrowRight, HiOutlineBolt, HiOutlineRocketLaunch, HiOutlineStar } from "react-icons/hi2";

const plans = [
  { name: "Starter", price: 99, desc: "Perfect for trying out", features: ["1 Source Code", "Basic Documentation", "Email Support", "Personal License"], color: "#64748b", popular: false },
  { name: "Professional", price: 499, desc: "Most popular choice", features: ["5 Source Codes", "Full Documentation", "Priority Support", "Commercial License", "Free Updates", "Discord Access"], color: "#ef4444", popular: true },
  { name: "Enterprise", price: 1999, desc: "For teams & agencies", features: ["Unlimited Codes", "Premium Documentation", "24/7 Dedicated Support", "Enterprise License", "Lifetime Updates", "Custom Branding", "API Access", "Team Management"], color: "#8b5cf6", popular: false },
];

export default function PricingPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-14 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-medium text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <HiOutlineBolt /> Simple Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-slate-500 max-w-lg mx-auto">Pay per product or choose a bundle. No subscriptions, no hidden fees.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`glass rounded-2xl p-6 relative animate-fadeIn hover-lift ${plan.popular ? "ring-2 ring-red-500/30" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                  <HiOutlineStar /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold" style={{ color: plan.color }}>₹{plan.price}</span>
                <span className="text-slate-600 text-sm">/one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                    <HiOutlineCheckCircle className="flex-shrink-0" style={{ color: plan.color }} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/products" className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${plan.popular ? "btn-primary" : "btn-secondary"}`}>
                Get Started <HiOutlineArrowRight className="inline ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
