"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineChatBubbleLeftRight, HiOutlinePlus, HiOutlineArrowPath } from "react-icons/hi2";
import { supportAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import toast from "react-hot-toast";

function Content() {
  const { token } = useAuthStore();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return setLoading(false);
    supportAPI.getTickets(token).then((res) => {
      if (res.success) setTickets(res.data || []);
      else toast.error(res.message || "Failed to load tickets");
      setLoading(false);
    }).catch((e) => { console.error(e); setLoading(false); });
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Support</h1>
          <p className="text-slate-500 text-sm">Get help with your purchases</p>
        </div>
        <Link href="/dashboard/support/new" className="btn-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
          <HiOutlinePlus /> New Ticket
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16"><HiOutlineArrowPath className="animate-spin mx-auto text-3xl text-slate-500" /></div>
      ) : tickets.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
          <HiOutlineChatBubbleLeftRight className="text-5xl text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Support Tickets</h3>
          <p className="text-sm text-slate-500 mb-4">Need help? Create a new support ticket</p>
          <Link href="/dashboard/support/new" className="btn-primary px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
            <HiOutlinePlus /> Create Ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <Link key={t.id} href={`/dashboard/support/${t.id}`} className="glass p-4 rounded-xl flex justify-between items-center hover:bg-white/5 transition-all">
              <div>
                <p className="text-white font-medium mb-1">{t.subject}</p>
                <p className="text-slate-400 text-xs truncate">{new Date(t.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "open" ? "badge-red" : t.status === "in-progress" ? "badge-yellow" : "badge-green"}`}>{t.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
