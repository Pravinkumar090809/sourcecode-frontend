"use client";
import { useState } from "react";
import { HiOutlineClipboardDocumentList, HiOutlineUser, HiOutlineShieldCheck, HiOutlineCog6Tooth } from "react-icons/hi2";

export default function AdminActivityLogsPage() {
  const [logs] = useState([
    { id: 1, action: "Product Created", user: "Admin", details: "Created 'React Dashboard Pro'", type: "product", time: "2 min ago" },
    { id: 2, action: "Order Completed", user: "System", details: "Order #ORD-1015 marked as paid", type: "order", time: "15 min ago" },
    { id: 3, action: "User Registered", user: "System", details: "New user ravi@test.com registered", type: "user", time: "1 hour ago" },
    { id: 4, action: "Product Updated", user: "Admin", details: "Updated pricing for 'Node.js API Kit'", type: "product", time: "2 hours ago" },
    { id: 5, action: "Admin Login", user: "Admin", details: "Admin logged in from 103.21.xx.xx", type: "auth", time: "3 hours ago" },
    { id: 6, action: "File Uploaded", user: "Admin", details: "Uploaded flutter-ecom-v3.zip", type: "file", time: "5 hours ago" },
    { id: 7, action: "Refund Processed", user: "Admin", details: "Refund ₹499 for order #ORD-1008", type: "payment", time: "1 day ago" },
    { id: 8, action: "Settings Updated", user: "Admin", details: "Updated platform settings", type: "settings", time: "2 days ago" },
  ]);

  const typeIcons = {
    product: <HiOutlineCog6Tooth className="text-blue-400" />,
    order: <HiOutlineClipboardDocumentList className="text-green-400" />,
    user: <HiOutlineUser className="text-purple-400" />,
    auth: <HiOutlineShieldCheck className="text-yellow-400" />,
    file: <HiOutlineClipboardDocumentList className="text-red-400" />,
    payment: <HiOutlineClipboardDocumentList className="text-orange-400" />,
    settings: <HiOutlineCog6Tooth className="text-slate-400" />,
  };

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineClipboardDocumentList className="text-red-400" /> Activity Logs</h1>
        <p className="text-slate-500 text-sm">Platform activity and audit trail</p>
      </div>

      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 shrink-0 mt-0.5">
                {typeIcons[log.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{log.action}</p>
                <p className="text-xs text-slate-500 mt-0.5">{log.details}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-600">{log.time}</p>
                <p className="text-[10px] text-slate-700 mt-0.5">{log.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
