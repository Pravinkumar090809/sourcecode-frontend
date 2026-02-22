"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineUser, HiOutlineKey, HiOutlineBellAlert, HiOutlineShieldCheck, HiOutlineArrowRightOnRectangle, HiOutlineArrowRight } from "react-icons/hi2";

function SettingsContent() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const items = [
    { href: "/dashboard/profile", icon: HiOutlineUser, label: "Edit Profile", desc: "Update your name and email", color: "#ef4444" },
    { href: "/dashboard/change-password", icon: HiOutlineKey, label: "Change Password", desc: "Update your password", color: "#f59e0b" },
    { href: "#", icon: HiOutlineBellAlert, label: "Notifications", desc: "Manage email preferences", color: "#22c55e" },
    { href: "#", icon: HiOutlineShieldCheck, label: "Security", desc: "Two-factor authentication", color: "#8b5cf6" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account settings</p>
      </div>
      <div className="space-y-3 mb-6">
        {items.map((item, i) => (
          <Link key={i} href={item.href} className="glass rounded-xl p-4 flex items-center justify-between group hover:border-red-500/20 transition-all animate-fadeIn" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                <item.icon className="text-lg" style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
            <HiOutlineArrowRight className="text-slate-600 group-hover:text-red-400 transition-all" />
          </Link>
        ))}
      </div>
      <button onClick={() => { logout(); router.push("/"); }} className="glass rounded-xl p-4 w-full flex items-center gap-4 text-red-400 hover:bg-red-500/5 transition-all animate-fadeIn">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
          <HiOutlineArrowRightOnRectangle className="text-lg text-red-400" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">Logout</p>
          <p className="text-xs text-red-400/60">Sign out of your account</p>
        </div>
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return <AuthGuard><SettingsContent /></AuthGuard>;
}
