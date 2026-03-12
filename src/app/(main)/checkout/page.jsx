"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { productAPI, paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import toast from "react-hot-toast";
import { load } from "@cashfreepayments/cashfree-js";
import { HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("product_id");
  const { user, token } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      productAPI.getById(productId).then((res) => {
        if (res.success) setProduct(res.product || res.data);
        setLoading(false);
      });
    } else { router.push("/products"); }
  }, [productId, router]);

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/coupons/validate?code=${encodeURIComponent(coupon.trim())}`);
      const data = await res.json();
      if (data.success) {
        if (!product) {
          toast.error("Product not loaded");
          return;
        }
        // compute discount based on type
        let disc = 0;
        if (data.data.type === "percent") {
          disc = Math.round((product.price * (data.data.discount || 0)) / 100);
        } else {
          disc = data.data.discount || 0;
        }
        if (disc > (product.price || 0)) disc = product.price || 0;
        setDiscount(disc);
        toast.success("Coupon applied!");
      } else {
        setDiscount(0);
        toast.error(data.message || "Invalid coupon");
      }
    } catch (err) {
      console.error("Coupon check error", err);
      toast.error("Failed to validate coupon");
      setDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      const res = await paymentAPI.create(token, {
        product_id: productId,
        buyer_email: user.email,
        buyer_name: user.name || "Customer",
        coupon_code: coupon.trim() || undefined,
      });
      if (res.success) {
        const d = res.data || res;
        if (d.payment_session_id) {
          const cashfree = await load({ mode: "sandbox" });
          await cashfree.checkout({
            paymentSessionId: d.payment_session_id,
            redirectTarget: "_self",
          });
        } else if (d.payment_link) {
          window.location.href = d.payment_link;
        } else {
          router.push(`/payment/processing?order_id=${d.cashfree_order_id || d.order_id}`);
        }
      } else {
        toast.error(res.message || "Payment failed");
        console.error("Payment create response:", res);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment initialization failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="max-w-lg mx-auto px-4 py-12"><div className="glass rounded-2xl h-64 animate-pulse" /></div>;
  if (!product) return <div className="text-center py-20 text-slate-500">Product not found</div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Checkout</h1>
        <p className="text-slate-500 text-sm">Complete your purchase</p>
      </div>
      <div className="glass rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
            <FiPackage className="text-xl text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">{product.title}</h3>
            <p className="text-xs text-slate-500">Source Code Package</p>
          </div>
          <span className="text-xl font-bold text-red-400">₹{product.price || 0}</span>
        </div>
        <div className="space-y-3 mb-6">
          {["Instant download after payment", "Commercial license included", "Lifetime free updates", "Email support"].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
              <HiOutlineCheckCircle className="text-green-400" /> {f}
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className="input-glass flex-1"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              disabled={couponLoading || !coupon.trim()}
              className="btn-secondary px-3 py-1 text-xs"
            >
              {couponLoading ? "..." : "Apply"}
            </button>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm text-green-400">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="text-sm text-slate-400">Total</span>
            <span className="text-lg font-bold text-white">₹{(product.price || 0) - discount}</span>
          </div>
        </div>
        <button onClick={handlePay} disabled={paying} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
          {paying ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</> : <><HiOutlineCreditCard /> Pay ₹{Math.max((product.price || 0) - discount,0)}</>}
        </button>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-600">
          <HiOutlineShieldCheck /> Secured by Cashfree Payment Gateway
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <AuthGuard><CheckoutContent /></AuthGuard>;
}
