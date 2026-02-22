"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productAPI, paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { HiCode, HiShieldCheck, HiLightningBolt, HiStar, HiArrowLeft, HiCreditCard, HiDownload, HiCheckCircle } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (params.id) {
      productAPI.getById(params.id as string).then((res) => {
        if (res.success) setProduct(res.data);
        setLoading(false);
      });
    }
  }, [params.id]);

  const handleBuy = async () => {
    if (!user) {
      toast.error("Please login to purchase");
      router.push("/login");
      return;
    }
    setBuying(true);
    try {
      const res = await paymentAPI.create(token!, {
        product_id: product!.id,
        buyer_email: user.email,
        buyer_name: user.name,
      });
      if (res.success && res.data.payment_session_id) {
        toast.success("Redirecting to payment...");
        const cfUrl = `https://sandbox.cashfree.com/pg/orders/sessions/${res.data.payment_session_id}`;
        window.open(cfUrl, "_blank");
        router.push(`/payment/status?order_id=${res.data.cashfree_order_id}`);
      } else {
        toast.error(res.message || "Payment creation failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <Loading />;

  if (!product) {
    return (
      <div className="py-16 text-center relative z-10">
        <div className="glass-strong max-w-md mx-auto p-10 animate-fade-in-scale">
          <div className="icon-box icon-box-orange mx-auto mb-5 w-16 h-16">
            <HiCode className="text-orange-500 text-2xl" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">This product doesn&apos;t exist or has been removed.</p>
          <button onClick={() => router.push("/products")} className="btn-primary"><HiArrowLeft /> Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 mb-6 transition-colors font-medium">
          <HiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-strong overflow-hidden animate-fade-in-up">
              <div className="h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500" />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="icon-box icon-box-orange w-16 h-16 shrink-0">
                    <HiCode className="text-orange-500 text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">{product.title}</h1>
                    <p className="text-xs text-slate-400">Added {new Date(product.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium"><HiShieldCheck /> Verified</span>
                  <span className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium"><HiLightningBolt /> Instant Delivery</span>
                  <span className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 font-medium"><HiStar /> Premium</span>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h3 className="text-sm font-bold text-slate-700 mb-2">Description</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{product.description || "Premium production-ready source code. Clean, well-documented, tested and ready to deploy."}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-sm font-bold text-slate-800 mb-4">What You Get</h3>
              <div className="space-y-3">
                {["Complete source code (ZIP)", "Documentation & setup guide", "Lifetime access & updates", "Commercial usage license"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-500">
                    <HiCheckCircle className="text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-strong p-6 sm:p-8 lg:sticky lg:top-24 animate-slide-in-right">
              <div className="text-center mb-6">
                <p className="text-xs text-slate-400 mb-1 font-medium">Price</p>
                <p className="text-5xl font-extrabold gradient-text">₹{product.price}</p>
                <p className="text-xs text-slate-400 mt-1">One-time payment</p>
              </div>

              <button onClick={handleBuy} disabled={buying} className="btn-primary w-full text-base !py-4 mb-4 animate-pulse-glow">
                {buying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><HiCreditCard /> Buy Now</>}
              </button>

              <div className="space-y-3 mt-5">
                {[
                  { icon: HiDownload, text: "Instant download after payment" },
                  { icon: HiShieldCheck, text: "Secure payment via Cashfree" },
                  { icon: HiStar, text: "100% satisfaction guaranteed" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <item.icon className="text-orange-500 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
