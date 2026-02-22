"use client";
import { AuthGuard } from "@/components/AuthGuard";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineClock } from "react-icons/hi2";

function Content() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/dashboard/support" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Support
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <h1 className="text-xl font-bold text-white">Ticket Details</h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-amber-400 bg-amber-500/10 flex items-center gap-1"><HiOutlineClock /> Open</span>
        </div>
        <div className="text-center py-8">
          <p className="text-sm text-slate-500">Ticket details will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default function TicketDetailPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
