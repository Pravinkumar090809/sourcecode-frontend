"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineBolt,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";

const plans = [
  {
    name: "Starter",
    price: 19,
    desc: "Perfect for trying out",
    features: [
      "1 Source Code",
      "Basic Documentation",
      "Email Support",
      "Personal License",
    ],
    color: "#64748b",
    gradient: "from-slate-500 to-slate-600",
    glowColor: "rgba(100, 116, 139, 0.15)",
    popular: false,
  },
  {
    name: "Professional",
    price: 49,
    desc: "Most popular choice",
    features: [
      "5 Source Codes",
      "Full Documentation",
      "Priority Support",
      "Commercial License",
      "Free Updates",
    ],
    color: "#ef4444",
    gradient: "from-red-500 to-red-600",
    glowColor: "rgba(239, 68, 68, 0.2)",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    desc: "For teams & agencies",
    features: [
      "Unlimited Codes",
      "Premium Documentation",
      "24/7 Dedicated Support",
      "Enterprise License",
      "Lifetime Updates",
      
    ],
    color: "#a855f7",
    gradient: "from-purple-500 to-purple-600",
    glowColor: "rgba(168, 85, 247, 0.15)",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.2),
              0 0 40px rgba(239, 68, 68, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.4),
              0 0 60px rgba(239, 68, 68, 0.2),
              0 0 80px rgba(239, 68, 68, 0.1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        /* Running Border Wrapper */
        .running-border-wrapper {
          position: relative;
          padding: 2px;
          border-radius: 1.5rem;
          overflow: hidden;
          animation: glowPulse 3s ease-in-out infinite;
        }

        .running-border-wrapper::before {
          content: "";
          position: absolute;
          top: -150%;
          left: -150%;
          width: 400%;
          height: 400%;
          background: conic-gradient(
            #ef4444 0deg,
            #f97316 60deg,
            transparent 120deg,
            transparent 180deg,
            #ef4444 240deg,
            #f97316 300deg,
            transparent 360deg
          );
          animation: rotate 3s linear infinite;
          z-index: 0;
        }

        .running-border-inner {
          position: relative;
          background: linear-gradient(
            160deg,
            rgba(0, 0, 0, 0.97) 0%,
            rgba(10, 10, 10, 0.95) 50%,
            rgba(0, 0, 0, 0.97) 100%
          );
          border-radius: calc(1.5rem - 2px);
          height: 100%;
          z-index: 1;
        }

        /* Glass Card */
        .glass-card {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.04) 100%
          );
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        /* Popular Card Hover */
        .popular-card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .popular-card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Shimmer Button */
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }

        .shimmer-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Grid Background */
        .grid-bg {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          animation: gridMove 8s linear infinite;
        }

        /* Feature item hover */
        .feature-item {
          transition: all 0.2s ease;
        }

        .feature-item:hover {
          transform: translateX(4px);
        }

        /* Badge float */
        .float-badge {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/[0.02] rounded-full blur-[150px]" />

          {/* Top Gradient Fade */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase text-red-400 bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
              <HiOutlineBolt className="text-sm" /> Simple Pricing
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Plan
              </span>
            </h1>
            <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Pay per product or choose a bundle. No subscriptions, no hidden
              fees. One-time payment, lifetime access.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                {plan.popular ? (
                  /* ── Popular Card ── */
                  <div className="running-border-wrapper h-full popular-card-hover">
                    <div className="running-border-inner p-6  flex flex-col relative">
                      {/* Popular Badge */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 float-badge">
                        <div className="px-5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-red-500/40 bg-gradient-to-r from-red-500 to-orange-500 whitespace-nowrap">
                          <HiOutlineStar className="text-yellow-200" /> Most
                          Popular
                        </div>
                      </div>

                      {/* Inner Glow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

                      {/* Plan Info */}
                      <div className="relative">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 mt-4">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                          {plan.desc}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-1.5 mb-8">
                          <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            ₹{plan.price}
                          </span>
                          <span className="text-slate-600 text-xs sm:text-sm font-medium">
                            /one-time
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-6" />

                        {/* Features */}
                        <ul className="space-y-3.5 mb-8 flex-grow">
                          {plan.features.map((f, j) => (
                            <li
                              key={j}
                              className="feature-item flex items-center gap-3 text-sm text-slate-300"
                            >
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center">
                                <HiOutlineCheckCircle className="text-red-400 text-sm" />
                              </div>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto">
                        <Link
                          href="/products"
                          className="shimmer-btn block text-center py-3.5 sm:py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:shadow-xl"
                        >
                          Get Started{" "}
                          <HiOutlineArrowRight className="inline ml-1.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Normal Cards ── */
                  <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full flex flex-col relative group">
                    {/* Hover Glow */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: plan.glowColor }}
                    />

                    {/* Plan Info */}
                    <div className="relative">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 mb-8">
                        <span
                          className="text-4xl sm:text-5xl font-extrabold"
                          style={{ color: plan.color }}
                        >
                          ₹{plan.price}
                        </span>
                        <span className="text-slate-600 text-xs sm:text-sm font-medium">
                          /one-time
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        className="h-px mb-6"
                        style={{
                          background: `linear-gradient(to right, transparent, ${plan.color}30, transparent)`,
                        }}
                      />

                      {/* Features */}
                      <ul className="space-y-3.5 mb-8 flex-grow">
                        {plan.features.map((f, j) => (
                          <li
                            key={j}
                            className="feature-item flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors"
                          >
                            <div
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{
                                background: `${plan.color}15`,
                              }}
                            >
                              <HiOutlineCheckCircle
                                className="text-sm"
                                style={{ color: plan.color }}
                              />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto relative">
                      <Link
                        href="/products"
                        className="block text-center py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-slate-400 hover:text-white border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                      >
                        Get Started{" "}
                        <HiOutlineArrowRight className="inline ml-1.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Trust Badges */}
          <div
            className="mt-12 sm:mt-16 lg:mt-20 animate-fadeInUp"
            style={{ animationDelay: "600ms" }}
          >
            {/* Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {[
                {
                  icon: HiOutlineCheckCircle,
                  text: "Lifetime access",
                  color: "#22c55e",
                },
                {
                  icon: HiOutlineCurrencyRupee,
                  text: "No recurring fees",
                  color: "#22c55e",
                },
                {
                  icon: HiOutlineClock,
                  text: "30-day money back",
                  color: "#22c55e",
                },
                {
                  icon: HiOutlineShieldCheck,
                  text: "Secure checkout",
                  color: "#22c55e",
                },
              ].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04]"
                >
                  <item.icon style={{ color: item.color }} className="text-sm" />
                  {item.text}
                </span>
              ))}
            </div>

            {/* FAQ Hint */}
            <div className="text-center mt-8">
              <p className="text-slate-600 text-xs sm:text-sm">
                Have questions?{" "}
                <Link
                  href="/contact"
                  className="text-red-500 hover:text-red-400 underline underline-offset-4 decoration-red-500/30 hover:decoration-red-400/50 transition-colors"
                >
                  Contact our team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}