"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import Loading from "@/components/Loading";
import { HiShoppingBag, HiCurrencyRupee, HiCheckCircle, HiClock, HiTrendingUp, HiCollection } from "react-icons/hi";

interface DashboardData {
  total_products: number;
  active_products: number;
  total_orders: number;
  paid_orders: number;
  pending_orders: number;
  failed_orders: number;
  total_revenue: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.dashboard(ADMIN_API_KEY).then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const stats = [
    { icon: HiShoppingBag, label: "Total Products", value: data?.total_products || 0, gradient: "from-orange-500 to-yellow-400", bg: "bg-orange-50", textColor: "text-orange-500" },
    { icon: HiTrendingUp, label: "Active Products", value: data?.active_products || 0, gradient: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", textColor: "text-emerald-500" },
    { icon: HiCollection, label: "Total Orders", value: data?.total_orders || 0, gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-50", textColor: "text-blue-500" },
    { icon: HiCheckCircle, label: "Paid Orders", value: data?.paid_orders || 0, gradient: "from-emerald-500 to-green-400", bg: "bg-emerald-50", textColor: "text-emerald-500" },
    { icon: HiClock, label: "Pending Orders", value: data?.pending_orders || 0, gradient: "from-amber-500 to-yellow-400", bg: "bg-amber-50", textColor: "text-amber-500" },
    { icon: HiCurrencyRupee, label: "Total Revenue", value: `₹${data?.total_revenue || 0}`, gradient: "from-purple-500 to-pink-400", bg: "bg-purple-50", textColor: "text-purple-500" },
  ];

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-5 sm:p-6 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up group" style={{ animationDelay: `${0.08 * i}s` }}>
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`text-xl ${stat.textColor}`} />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
