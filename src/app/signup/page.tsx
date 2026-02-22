"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import toast from "react-hot-toast";
import { HiUser, HiMail, HiLockClosed, HiArrowRight, HiExclamationCircle } from "react-icons/hi";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required";
    else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) errs.password = "Need uppercase & lowercase";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await authAPI.register({ name: name.trim(), email: email.trim(), password });
      if (res.success) {
        setAuth(res.data.user, res.data.token);
        toast.success("Account created! 🎉");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="glass-strong p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-orange-500/20 animate-bounce-gentle">
              <span className="text-white text-2xl font-extrabold">S</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">Create Account</h1>
            <p className="text-sm text-slate-400 mt-1">Join the marketplace today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5" noValidate>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-semibold">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); clearError("name"); }} className={`input-glass !pl-11 ${errors.name ? "input-error" : ""}`} placeholder="John Doe" />
              </div>
              {errors.name && <p className="error-text"><HiExclamationCircle /> {errors.name}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-semibold">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email"); }} className={`input-glass !pl-11 ${errors.email ? "input-error" : ""}`} placeholder="you@email.com" />
              </div>
              {errors.email && <p className="error-text"><HiExclamationCircle /> {errors.email}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-semibold">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearError("password"); }} className={`input-glass !pl-11 ${errors.password ? "input-error" : ""}`} placeholder="Min 6 characters" />
              </div>
              {errors.password && <p className="error-text"><HiExclamationCircle /> {errors.password}</p>}
              {/* Strength bar */}
              {password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className={`h-1 flex-1 rounded-full transition-all ${
                      password.length >= n * 3 ? (password.length >= 12 ? "bg-emerald-400" : password.length >= 8 ? "bg-yellow-400" : "bg-orange-400") : "bg-slate-200"
                    }`} />
                  ))}
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !mt-7 !py-3.5">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <HiArrowRight /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-7">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
