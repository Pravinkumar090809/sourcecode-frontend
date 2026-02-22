"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { HiMail, HiLockClosed, HiArrowRight } from "react-icons/hi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Fill all fields");
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setAuth(res.data.user, res.data.token);
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome <span className="gradient-text">Back</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Email
            </label>
            <div className="relative">
              <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass pl-11"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glass pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? "Signing in..." : "Sign In"}
            <HiArrowRight />
          </button>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-orange-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
