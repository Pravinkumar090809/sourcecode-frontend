"use client";
import { useState, useEffect } from "react";
import { HiOutlineTicket, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTickets([
        { id: "TK-001", user: "Ravi Kumar", subject: "Download not working", status: "open", priority: "high", date: "2025-01-15" },
        { id: "TK-002", user: "Priya Singh", subject: "Payment issue", status: "in-progress", priority: "medium", date: "2025-01-14" },
        { id: "TK-003", user: "Amit Patel", subject: "Feature request", status: "closed", priority: "low", date: "2025-01-13" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const statusColor = { open: "badge-red", "in-progress": "badge-yellow", closed: "badge-green" };
  const priorityColor = { high: "text-red-400", medium: "text-yellow-400", low: "text-green-400" };

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineTicket className="text-red-400" /> Support Tickets</h1>
        <p className="text-slate-500 text-sm">Manage customer support requests</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
        {loading ? (
          <div className="p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead><tr><th>Ticket ID</th><th>User</th><th>Subject</th><th>Priority</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="text-white font-mono text-sm">{t.id}</td>
                    <td className="text-slate-400 text-sm">{t.user}</td>
                    <td className="text-slate-300 text-sm">{t.subject}</td>
                    <td><span className={`text-xs font-medium ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                    <td><span className={`${statusColor[t.status]} text-xs`}>{t.status}</span></td>
                    <td className="text-slate-500 text-xs">{t.date}</td>
                    <td><button className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"><HiOutlineChatBubbleLeftRight size={14} /> Reply</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
