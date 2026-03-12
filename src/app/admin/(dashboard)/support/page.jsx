"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineTicket, HiOutlineChatBubbleLeftRight, HiOutlineArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  const fetchTickets = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getTickets(key);
      if (res.success) setTickets(res.data || []);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const statusBadge = { open: "badge-red", "in-progress": "badge-yellow", closed: "badge-green" };
  const priorityColor = { high: "text-red-400", medium: "text-yellow-400", low: "text-green-400" };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineTicket className="text-red-400 flex-shrink-0" /> Support Tickets
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Manage customer support requests ({tickets.length} total)</p>
        </div>
        <button onClick={() => { setLoading(true); fetchTickets(); }} className="btn-secondary text-xs sm:text-sm w-fit">
          <HiOutlineArrowPath className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn">
        {loading ? (
          <div className="p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table-glass">
                <thead><tr><th>Ticket ID</th><th>User</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr key={t.id}>
                      <td className="text-white font-mono text-sm">{t.id?.slice(0, 8)}...</td>
                      <td><p className="text-slate-400 text-sm">{t.user_name}</p><p className="text-slate-500 text-xs">{t.user_email}</p></td>
                      <td className="text-slate-300 text-sm">{t.subject}</td>
                      <td><span className={`text-xs font-medium ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                      <td><span className={`${statusBadge[t.status]} text-xs`}>{t.status}</span></td>
                      <td className="text-slate-500 text-xs">{new Date(t.created_at).toLocaleDateString()}</td>
                      <td>
                        {t.status !== "closed" ? (
                          <button onClick={async () => { const res = await adminAPI.updateTicketStatus(key, t.id, "closed"); if (res.success) { setTickets(tickets.map((x) => x.id === t.id ? { ...x, status: "closed" } : x)); toast.success("Ticket closed"); } }} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><HiOutlineChatBubbleLeftRight size={14} /> Close</button>
                        ) : <span className="text-slate-600 text-xs">Closed</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden p-3 space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-slate-400">{t.id?.slice(0, 8)}...</span>
                    <span className={`${statusBadge[t.status]} text-[10px]`}>{t.status}</span>
                  </div>
                  <p className="text-sm text-white font-medium mb-1">{t.subject}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{t.user_name}</span>
                    <span className={`font-medium ${priorityColor[t.priority]}`}>{t.priority}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-600">{new Date(t.created_at).toLocaleDateString()}</span>
                    {t.status !== "closed" ? (
                      <button onClick={async () => { const res = await adminAPI.updateTicketStatus(key, t.id, "closed"); if (res.success) { setTickets(tickets.map((x) => x.id === t.id ? { ...x, status: "closed" } : x)); toast.success("Ticket closed"); } }} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><HiOutlineChatBubbleLeftRight size={12} /> Close</button>
                    ) : <span className="text-slate-600 text-xs">Closed</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
