"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productAPI, paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Loading from "@/components/Loading";
import {
  HiArrowLeft,
  HiCube,
  HiTag,
  HiShoppingCart,
  HiCheckCircle,
  HiCode,
  HiLightningBolt,
  HiDownload,
} from "react-icons/hi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (!id) return;
    productAPI
      .getById(id)
      .then((res) => setProduct(res.data || null))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = async () => {
    if (!user || !token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    setBuying(true);
    try {
      const res = await paymentAPI.create(product.id, token);
      if (res.success && res.data?.payment_link) {
        window.location.href = res.data.payment_link;
      } else {
        toast.error(res.message || "Payment failed");
      }
    } catch {
      toast.error("Payment failed");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <Loading />;

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <HiCube className="text-5xl text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">
          Product Not Found
        </h2>
        <button onClick={() => router.back()} className="btn-secondary text-sm mt-4">
          <HiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const highlights = [
    { icon: HiCode, text: "Clean, documented code" },
    { icon: HiLightningBolt, text: "Production ready" },
    { icon: HiDownload, text: "Instant download" },
    { icon: HiCheckCircle, text: "Lifetime access" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-4">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors"
      >
        <HiArrowLeft /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main */}
        <div className="lg:col-span-3 space-y-5">
          {/* Header */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="icon-box icon-box-orange w-14 h-14 text-2xl shrink-0">
                <HiCube />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {product.title}
                </h1>
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="badge-orange">
                        <HiTag className="text-[10px]" /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <h2 className="font-bold text-slate-800 mb-3">Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Highlights */}
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <h2 className="font-bold text-slate-800 mb-4">What You Get</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/40">
                  <h.icon className="text-orange-500 text-lg shrink-0" />
                  <span className="text-sm text-slate-600">{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:sticky lg:top-24 space-y-5">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text">
                ₹{product.price}
              </div>
              <p className="text-xs text-slate-400 mt-1">One-time payment</p>
            </div>

            <button
              onClick={handleBuy}
              disabled={buying}
              className="btn-primary w-full justify-center text-base"
            >
              {buying ? (
                "Processing..."
              ) : (
                <>
                  <HiShoppingCart className="text-lg" />
                  Buy Now
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 border-t border-white/20">
              {[
                "Instant delivery",
                "Secure payment",
                "Download anytime",
                "Full source code",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-500"
                >
                  <HiCheckCircle className="text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
