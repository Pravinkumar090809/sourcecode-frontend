"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineReceiptRefund, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  const fetchRefunds = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getRefunds(key);
      if (res.success) setRefunds(res.data || []);
    } catch (error) {
      console.error("Failed to fetch refunds:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchRefunds(); }, [fetchRefunds]);

  const statusBadge = { pending: "badge-yellow", approved: "badge-green", rejected: "badge-red" };

  const handleAction = async (id, action) => {
    const res = await adminAPI.updateRefund(key, id, action);
    if (res.success) {
      setRefunds(refunds.map((r) => r.id === id ? { ...r, status: action } : r));
      toast.success(`Refund ${action}`);
    } else {
      toast.error(res.message || "Failed to update");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineReceiptRefund className="text-red-400 flex-shrink-0" /> Refund Requests
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Review and manage customer refund requests ({refunds.length} total)</p>
        </div>
        <button onClick={() => { setLoading(true); fetchRefunds(); }} className="btn-secondary text-xs sm:text-sm w-fit">
          <HiOutlineArrowPath className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fadeIn">
        {[
          { label: "Pending", count: refunds.filter((r) => r.status === "pending").length, color: "text-yellow-400" },
          { label: "Approved", count: refunds.filter((r) => r.status === "approved").length, color: "text-green-400" },
          { label: "Rejected", count: refunds.filter((r) => r.status === "rejected").length, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-[10px] sm:text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="glass rounded-xl p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
      ) : refunds.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><HiOutlineReceiptRefund className="text-4xl text-slate-600 mx-auto mb-3" /><h3 className="text-base font-semibold text-white mb-2">No Refund Requests</h3><p className="text-slate-500 text-sm">Refund requests will appear here</p></div>
      ) : (
      <>
      <div className="hidden md:block glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>Refund ID</th><th>User</th><th>Amount</th><th>Reason</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r.id}>
                  <td className="text-white font-mono text-sm">{r.id?.slice(0, 8)}...</td>
                  <td><p className="text-slate-400 text-sm">{r.user_name}</p><p className="text-slate-500 text-xs">{r.user_email}</p></td>
                  <td className="text-white font-semibold text-sm">₹{r.amount}</td>
                  <td className="text-slate-400 text-sm max-w-[150px] truncate">{r.reason}</td>
                  <td><span className={`${statusBadge[r.status]} text-xs`}>{r.status}</span></td>
                  <td className="text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td>
                    {r.status === "pending" ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleAction(r.id, "approved")} className="text-green-400 hover:text-green-300 transition-colors"><HiOutlineCheckCircle size={18} /></button>
                        <button onClick={() => handleAction(r.id, "rejected")} className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineXCircle size={18} /></button>
                      </div>
                    ) : <span className="text-slate-600 text-xs">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3 animate-fadeIn">
        {refunds.map((r) => (
          <div key={r.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-400">{r.id?.slice(0, 8)}...</span>
              <span className={`${statusBadge[r.status]} text-[10px]`}>{r.status}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div><span className="text-sm text-white font-medium">{r.user_name}</span><p className="text-xs text-slate-500">{r.user_email}</p></div>
              <span className="text-sm text-white font-semibold">₹{r.amount}</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">{r.reason}</p>
            <p className="text-[10px] text-slate-600 mb-2">{new Date(r.created_at).toLocaleDateString()}</p>
            {r.status === "pending" && (
              <div className="flex gap-2 pt-2 border-t border-white/[0.04]">
                <button onClick={() => handleAction(r.id, "approved")} className="flex-1 py-1.5 rounded-lg text-xs text-green-400 bg-green-500/10 hover:bg-green-500/20 transition-colors text-center">Approve</button>
                <button onClick={() => handleAction(r.id, "rejected")} className="flex-1 py-1.5 rounded-lg text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors text-center">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
      </>)}
    </div>
  );
}
