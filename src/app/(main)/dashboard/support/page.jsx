"use client";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineChatBubbleLeftRight, HiOutlinePlus } from "react-icons/hi2";

function Content() {
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
      <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
        <HiOutlineChatBubbleLeftRight className="text-5xl text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Support Tickets</h3>
        <p className="text-sm text-slate-500 mb-4">Need help? Create a new support ticket</p>
        <Link href="/dashboard/support/new" className="btn-primary px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
          <HiOutlinePlus /> Create Ticket
        </Link>
      </div>
    </div>
  );
}

export default function SupportPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
