"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import toast from "react-hot-toast";
import { HiMail, HiLockClosed, HiArrowRight, HiExclamationCircle } from "react-icons/hi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await authAPI.login({ email: email.trim(), password });
      if (res.success) {
        setAuth(res.data.user, res.data.token);
        toast.success("Welcome back! 🎉");
        router.push(res.data.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center relative z-10">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-strong p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-orange-500/20 animate-bounce-gentle">
              <span className="text-white text-2xl font-extrabold">S</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">Welcome Back</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-semibold">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  className={`input-glass !pl-11 ${errors.email ? "input-error" : ""}`}
                  placeholder="you@email.com"
                />
              </div>
              {errors.email && <p className="error-text"><HiExclamationCircle /> {errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-semibold">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: undefined }); }}
                  className={`input-glass !pl-11 ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="error-text"><HiExclamationCircle /> {errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !mt-7 !py-3.5">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <HiArrowRight /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-7">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
