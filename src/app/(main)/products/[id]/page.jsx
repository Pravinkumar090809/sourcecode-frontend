"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { productAPI, paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Footer from "@/components/Footer";
import { HiOutlineShoppingCart, HiOutlineStar, HiOutlineTag, HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineArrowDownTray, HiOutlineBolt, HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { FiPackage, FiCode, FiLayers, FiDownload } from "react-icons/fi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    productAPI.getById(id).then((res) => {
      if (res.success) setProduct(res.product || res.data);
      setLoading(false);
    });
  }, [id]);

  const handleBuy = async () => {
    if (!token) { router.push("/login"); return; }
    setBuying(true);
    const res = await paymentAPI.create(token, { product_id: id, email: user.email });
    setBuying(false);
    if (res.success && res.payment_link) {
      window.location.href = res.payment_link;
    } else if (res.success && res.order_id) {
      router.push(`/payment/processing?order_id=${res.order_id}`);
    } else {
      toast.error(res.message || "Payment failed");
    }
  };

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="glass rounded-2xl overflow-hidden animate-pulse">
        <div className="h-64" style={{ background: "rgba(255,255,255,0.03)" }} />
        <div className="p-8 space-y-4">
          <div className="h-6 rounded w-1/2" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-4 rounded w-3/4" style={{ background: "rgba(255,255,255,0.03)" }} />
          <div className="h-4 rounded w-2/3" style={{ background: "rgba(255,255,255,0.03)" }} />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Product Not Found</h2>
      <Link href="/products" className="text-red-400 text-sm hover:text-red-300">← Back to Products</Link>
    </div>
  );

  const tags = product.tags ? (typeof product.tags === "string" ? product.tags.split(",") : product.tags) : [];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
          <HiOutlineArrowLeft /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 animate-fadeIn">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="h-64 sm:h-80 flex items-center justify-center relative" style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(139,92,246,0.08))" }}>
                <FiPackage className="text-8xl text-red-500/20" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                  <HiOutlineStar className="text-yellow-400" /> 4.8 Rating
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiCode className="text-red-400" /> Description
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{product.description || "Premium source code package with complete documentation."}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiLayers className="text-red-400" /> What&apos;s Included
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Complete source code", "Documentation", "Free updates", "Support access", "Commercial license", "Setup guide"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <HiOutlineCheckCircle className="text-green-400 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5 animate-fadeIn" style={{ animationDelay: "150ms" }}>
            <div className="glass rounded-2xl p-6 sticky top-20">
              <h1 className="text-xl font-bold text-white mb-2">{product.title}</h1>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tags.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs text-slate-400" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <HiOutlineTag className="text-red-400" style={{ fontSize: 10 }} />{t.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold" style={{ color: "#ef4444" }}>₹{product.price || 0}</span>
                <span className="text-sm text-slate-600 line-through">₹{((product.price || 0) * 2)}</span>
                <span className="px-2 py-0.5 rounded text-xs font-medium text-green-400" style={{ background: "rgba(34,197,94,0.1)" }}>50% OFF</span>
              </div>

              <button onClick={handleBuy} disabled={buying} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2 mb-3">
                {buying ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</> : <><HiOutlineShoppingCart /> Buy Now</>}
              </button>

              <div className="space-y-3 pt-4 border-t border-white/5">
                {[
                  { icon: HiOutlineShieldCheck, text: "Secure Payment via Cashfree", color: "#22c55e" },
                  { icon: HiOutlineArrowDownTray, text: "Instant Download Access", color: "#ef4444" },
                  { icon: HiOutlineBolt, text: "Lifetime Free Updates", color: "#f59e0b" },
                  { icon: HiOutlineClock, text: "24/7 Support Available", color: "#8b5cf6" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <f.icon style={{ color: f.color }} className="flex-shrink-0" /> {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
