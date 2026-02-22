"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { ADMIN_API_KEY } from "@/lib/store";
import { adminAPI } from "@/lib/api";
import { HiOutlineCodeBracket, HiOutlineKey, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!key) return toast.error("Please enter the admin API key");
    setLoading(true);
    const res = await adminAPI.dashboard(key);
    setLoading(false);
    if (res.success || res.data) {
      Cookies.set("admin_api_key", key, { expires: 7 });
      Cookies.set("admin_authenticated", "true", { expires: 7 });
      toast.success("Welcome to Admin Panel!");
      router.push("/admin");
    } else {
      toast.error("Invalid API key");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: { background: "rgba(20,20,30,0.95)", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.08)", fontSize: "14px", borderRadius: "12px" },
      }} />
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0a0a0f" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="w-full max-w-md animate-fadeIn relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              <HiOutlineCodeBracket className="text-2xl text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Login</h1>
            <p className="text-slate-500 text-sm">Enter your admin API key to continue</p>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Admin API Key</label>
                <div className="relative">
                  <HiOutlineKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type={showKey ? "text" : "password"} value={key} onChange={(e) => setKey(e.target.value)} className="input-glass w-full pl-10 pr-10" placeholder="sk_admin_..." />
                  <button type="button" onClick={() => setShowKey(!showKey)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    {showKey ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
                {loading ? "Verifying..." : "Login to Admin Panel"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
