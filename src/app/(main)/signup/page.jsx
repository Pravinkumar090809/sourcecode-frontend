"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash, HiOutlineUser, HiOutlineCodeBracket } from "react-icons/hi2";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Please fill all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    const res = await authAPI.register({ name, email, password });
    setLoading(false);
    if (res.success) {
      setAuth(res.user || res.data?.user, res.token || res.data?.token);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
            <HiOutlineCodeBracket className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-500 text-sm">Join SourceCode and start building</p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-glass w-full pl-10" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Email Address</label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-glass w-full pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-glass w-full pl-10 pr-10" placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-glass w-full pl-10" placeholder="Repeat password" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all">
              {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</span> : "Create Account"}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">Already have an account? <Link href="/login" className="text-red-400 hover:text-red-300 font-medium">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
