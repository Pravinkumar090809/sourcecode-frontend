"use client";
import { useState, useEffect } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineClock } from "react-icons/hi2";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { supportAPI } from "@/lib/api";
import toast from "react-hot-toast";

function Content() {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supportAPI.getTicket(token, id).then((res) => {
      if (res.success) setTicket(res.data || res.ticket);
      else toast.error(res.message || "Failed to load ticket");
      setLoading(false);
    }).catch((e) => { console.error(e); setLoading(false); });
  }, [id, token]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8"><div className="glass rounded-2xl h-64 animate-pulse" /></div>;
  if (!ticket) return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-500">Ticket not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/dashboard/support" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Support
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <h1 className="text-xl font-bold text-white">{ticket.subject}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-amber-400 bg-amber-500/10 flex items-center gap-1"><HiOutlineClock /> {ticket.status}</span>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Category: {ticket.category}</p>
          <p className="text-sm text-slate-500">Priority: {ticket.priority}</p>
          <p className="text-regular text-white">{ticket.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function TicketDetailPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
