"use client";
import { useState } from "react";
import { HiOutlineReceiptRefund, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState([
    { id: "RF-001", user: "Ravi Kumar", order: "ORD-1001", amount: 499, reason: "Not as described", status: "pending", date: "2025-01-15" },
    { id: "RF-002", user: "Priya Singh", order: "ORD-1005", amount: 299, reason: "Duplicate payment", status: "approved", date: "2025-01-14" },
    { id: "RF-003", user: "Amit Patel", order: "ORD-1008", amount: 999, reason: "Quality issue", status: "rejected", date: "2025-01-13" },
  ]);

  const statusColors = { pending: "badge-yellow", approved: "badge-green", rejected: "badge-red" };

  const handleAction = (id, action) => {
    setRefunds(refunds.map((r) => r.id === id ? { ...r, status: action } : r));
    toast.success(`Refund ${action}`);
  };

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineReceiptRefund className="text-red-400" /> Refund Requests</h1>
        <p className="text-slate-500 text-sm">Manage refund requests from customers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-fadeIn">
        {[
          { label: "Pending", count: refunds.filter((r) => r.status === "pending").length, color: "yellow" },
          { label: "Approved", count: refunds.filter((r) => r.status === "approved").length, color: "green" },
          { label: "Rejected", count: refunds.filter((r) => r.status === "rejected").length, color: "red" },
        ].map((s) => (
          <div key={s.label} className="stat-card"><p className="text-xs text-slate-500 mb-1">{s.label}</p><p className={`text-2xl font-bold text-${s.color}-400`}>{s.count}</p></div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>Refund ID</th><th>User</th><th>Order</th><th>Amount</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r.id}>
                  <td className="text-white font-mono text-sm">{r.id}</td>
                  <td className="text-slate-400 text-sm">{r.user}</td>
                  <td className="text-slate-400 font-mono text-sm">{r.order}</td>
                  <td className="text-white font-semibold text-sm">₹{r.amount}</td>
                  <td className="text-slate-400 text-sm max-w-[150px] truncate">{r.reason}</td>
                  <td><span className={`${statusColors[r.status]} text-xs`}>{r.status}</span></td>
                  <td>
                    {r.status === "pending" ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleAction(r.id, "approved")} className="text-green-400 hover:text-green-300"><HiOutlineCheckCircle size={18} /></button>
                        <button onClick={() => handleAction(r.id, "rejected")} className="text-red-400 hover:text-red-300"><HiOutlineXCircle size={18} /></button>
                      </div>
                    ) : <span className="text-slate-600 text-xs">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
