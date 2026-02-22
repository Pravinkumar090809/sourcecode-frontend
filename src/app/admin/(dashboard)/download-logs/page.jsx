"use client";
import { useState } from "react";
import { HiOutlineArrowDownTray, HiOutlineDocumentArrowDown } from "react-icons/hi2";

export default function AdminDownloadLogsPage() {
  const [logs] = useState([
    { id: 1, user: "Ravi Kumar", email: "ravi@test.com", product: "React Dashboard", file: "react-dashboard-v2.zip", date: "2025-01-15 14:32", ip: "103.21.xx.xx" },
    { id: 2, user: "Priya Singh", email: "priya@test.com", product: "Node.js API Kit", file: "node-api-kit.zip", date: "2025-01-15 12:10", ip: "122.17.xx.xx" },
    { id: 3, user: "Amit Patel", email: "amit@test.com", product: "Flutter App", file: "flutter-ecom.zip", date: "2025-01-14 18:45", ip: "49.36.xx.xx" },
    { id: 4, user: "Sneha Verma", email: "sneha@test.com", product: "React Dashboard", file: "react-dashboard-v2.zip", date: "2025-01-14 09:20", ip: "157.48.xx.xx" },
  ]);

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineArrowDownTray className="text-red-400" /> Download Logs</h1>
        <p className="text-slate-500 text-sm">Track all file downloads by users</p>
      </div>

      <div className="glass rounded-2xl p-4 mb-6 animate-fadeIn">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center"><p className="text-2xl font-bold text-white">{logs.length}</p><p className="text-xs text-slate-500">Total Downloads</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-green-400">{new Set(logs.map(l => l.email)).size}</p><p className="text-xs text-slate-500">Unique Users</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-blue-400">{new Set(logs.map(l => l.product)).size}</p><p className="text-xs text-slate-500">Products</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-purple-400">{logs.filter(l => l.date.includes("2025-01-15")).length}</p><p className="text-xs text-slate-500">Today</p></div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>User</th><th>Product</th><th>File</th><th>Date & Time</th><th>IP</th></tr></thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td><p className="text-white text-sm font-medium">{l.user}</p><p className="text-slate-500 text-xs">{l.email}</p></td>
                  <td className="text-slate-300 text-sm">{l.product}</td>
                  <td className="text-slate-400 text-xs font-mono flex items-center gap-1"><HiOutlineDocumentArrowDown className="text-red-400" size={14} />{l.file}</td>
                  <td className="text-slate-500 text-xs">{l.date}</td>
                  <td className="text-slate-600 text-xs font-mono">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
