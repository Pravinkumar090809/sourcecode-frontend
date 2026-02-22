"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import Loading from "@/components/Loading";
import { HiUsers, HiShieldCheck, HiMail, HiSearch, HiCalendar } from "react-icons/hi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await adminAPI.getUsers(ADMIN_API_KEY);
      if (res.success) { setUsers(res.data || []); setFiltered(res.data || []); }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!search.trim()) setFiltered(users);
    else {
      const q = search.toLowerCase();
      setFiltered(users.filter((u) => u.email?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q)));
    }
  }, [search, users]);

  if (loading) return <Loading />;

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Registered <span className="gradient-text">Users</span></h1>
          <p className="text-xs text-slate-400 mt-1">{users.length} total users</p>
        </div>
        <div className="relative w-full sm:w-64">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-glass !pl-10 !py-2.5 text-sm" placeholder="Search users..." />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-10 text-center animate-fade-in-scale">
          <div className="icon-box icon-box-purple mx-auto mb-4 w-16 h-16">
            <HiUsers className="text-purple-500 text-2xl" />
          </div>
          <p className="text-slate-500 font-medium">{search ? "No matching users" : "No users yet"}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u, i) => (
            <div key={u.id} className="glass p-5 animate-fade-in-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <div className="flex items-center gap-3 mb-4">
                {u.role === "admin" ? (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {u.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {u.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-sm text-slate-700 truncate">{u.name}</p>
                  {u.role === "admin" ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      <HiShieldCheck className="text-xs" /> Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      User
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <HiMail className="text-blue-400" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-green-400" />
                  <span>Joined {new Date(u.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
