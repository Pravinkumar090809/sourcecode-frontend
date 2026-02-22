"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { AuthGuard } from "@/components/AuthGuard";
import {
  HiUser,
  HiMail,
  HiShieldCheck,
  HiLogout,
  HiCalendar,
} from "react-icons/hi";

function ProfileContent() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          My <span className="gradient-text">Profile</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your account information
        </p>
      </div>

      {/* Avatar */}
      <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
          <span className="text-2xl font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
        {user?.role === "admin" && (
          <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-semibold">
            <HiShieldCheck /> Admin
          </span>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="icon-box icon-box-orange w-9 h-9">
              <HiUser className="text-sm" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Name</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="icon-box icon-box-blue w-9 h-9">
              <HiMail className="text-sm" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Email</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 break-all">
            {user?.email}
          </p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="icon-box icon-box-green w-9 h-9">
              <HiShieldCheck className="text-sm" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Role</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 capitalize">
            {user?.role || "user"}
          </p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="icon-box icon-box-yellow w-9 h-9">
              <HiCalendar className="text-sm" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Joined</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-500 font-semibold hover:bg-red-100 transition-colors"
      >
        <HiLogout className="text-lg" />
        Logout
      </button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
