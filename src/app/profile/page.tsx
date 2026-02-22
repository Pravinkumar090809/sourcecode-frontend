"use client";

import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiUser, HiMail, HiCalendar, HiShieldCheck, HiLogout, HiArrowRight } from "react-icons/hi";

function ProfileContent() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="py-6 relative z-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-slate-800">My <span className="gradient-text">Profile</span></h1>

        {/* Avatar Card */}
        <div className="glass-strong p-8 text-center mb-6 animate-fade-in-up relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center mx-auto mb-4 text-3xl font-extrabold text-white shadow-xl shadow-orange-500/20">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-extrabold text-slate-800">{user?.name}</h2>
          <span className={`badge mt-3 ${user?.role === "admin" ? "badge-warning" : "badge-success"}`}>
            {user?.role === "admin" ? "⚡ Admin" : "👤 User"}
          </span>
        </div>

        {/* Details */}
        <div className="glass p-6 space-y-5 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {[
            { icon: HiUser, label: "Full Name", value: user?.name, color: "icon-box-orange", iconColor: "text-orange-500" },
            { icon: HiMail, label: "Email", value: user?.email, color: "icon-box-blue", iconColor: "text-blue-500" },
            { icon: HiShieldCheck, label: "Role", value: user?.role, color: "icon-box-green", iconColor: "text-emerald-500" },
            { icon: HiCalendar, label: "Member Since", value: user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "N/A", color: "icon-box-purple", iconColor: "text-purple-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`icon-box ${item.color} w-11 h-11`}>
                <item.icon className={`${item.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/dashboard" className="glass p-4 flex items-center justify-between group hover:-translate-y-1 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="icon-box icon-box-blue w-10 h-10">
                <HiArrowRight className="text-blue-500" />
              </div>
              <span className="text-sm font-medium text-slate-600">View My Orders</span>
            </div>
            <HiArrowRight className="text-slate-300 group-hover:text-orange-500 transition-colors" />
          </Link>

          <button onClick={handleLogout} className="w-full glass p-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-all font-semibold hover:-translate-y-1">
            <HiLogout /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <AuthGuard><ProfileContent /></AuthGuard>;
}
