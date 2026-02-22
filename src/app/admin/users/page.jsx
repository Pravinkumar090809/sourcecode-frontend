"use client";

import { useEffect, useState, useMemo } from "react";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import {
  HiUsers,
  HiSearch,
  HiUser,
  HiMail,
  HiShieldCheck,
  HiCalendar,
} from "react-icons/hi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminAPI
      .getUsers(ADMIN_API_KEY)
      .then((res) => setUsers(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          All <span className="gradient-text">Users</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">{users.length} users</p>
      </div>

      <div className="relative max-w-md">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-glass pl-11"
          placeholder="Search users..."
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass rounded-2xl h-40 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <HiUsers className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            {search ? "No users match" : "No users yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="glass rounded-2xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {u.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm text-slate-800 truncate">
                    {u.name}
                  </h3>
                  {u.role === "admin" && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-orange-600">
                      <HiShieldCheck /> Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <HiMail className="text-slate-400 shrink-0" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <HiCalendar className="text-slate-400 shrink-0" />
                  <span>
                    {u.created_at
                      ? new Date(u.created_at).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
