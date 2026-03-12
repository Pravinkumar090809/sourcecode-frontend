"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineArrowDownTray, HiOutlineDocumentArrowDown, HiOutlineArrowPath } from "react-icons/hi2";

export default function AdminDownloadLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  const fetchLogs = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getDownloadLogs(key, 100);
      if (res.success) setLogs(res.data || []);
    } catch (error) {
      console.error("Failed to fetch download logs:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: logs.length,
      uniqueUsers: new Set(logs.map(l => l.user_email)).size,
      uniqueProducts: new Set(logs.map(l => l.product_title).filter(Boolean)).size,
      today: logs.filter(l => new Date(l.created_at).toDateString() === today).length,
    };
  }, [logs]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineArrowDownTray className="text-red-400 flex-shrink-0" /> Download Logs
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Track all file downloads by users</p>
        </div>
        <button onClick={() => { setLoading(true); fetchLogs(); }} className="btn-secondary text-xs sm:text-sm w-fit">
          <HiOutlineArrowPath className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 mb-4 sm:mb-6 animate-fadeIn">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">{loading ? "..." : stats.total}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Total Downloads</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-400">{loading ? "..." : stats.uniqueUsers}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Unique Users</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-blue-400">{loading ? "..." : stats.uniqueProducts}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Products</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-purple-400">{loading ? "..." : stats.today}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Today</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass rounded-xl p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
      ) : logs.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center"><HiOutlineArrowDownTray className="text-4xl text-slate-600 mx-auto mb-3" /><h3 className="text-base font-semibold text-white mb-2">No Downloads Yet</h3><p className="text-slate-500 text-sm">Download logs will appear here when users download files</p></div>
      ) : (
      <>
      <div className="hidden md:block glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="table-glass">
            <thead><tr><th>User</th><th>Product</th><th>File</th><th>Date & Time</th><th>IP</th></tr></thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td><p className="text-white text-sm font-medium">{l.user_name || "User"}</p><p className="text-slate-500 text-xs">{l.user_email}</p></td>
                  <td className="text-slate-300 text-sm">{l.product_title || "—"}</td>
                  <td><span className="text-slate-400 text-xs font-mono flex items-center gap-1"><HiOutlineDocumentArrowDown className="text-red-400 flex-shrink-0" size={14} />{l.file_name || "—"}</span></td>
                  <td className="text-slate-500 text-xs">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="text-slate-600 text-xs font-mono">{l.ip_address || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3 animate-fadeIn">
        {logs.map((l) => (
          <div key={l.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">{l.user_name || "User"}</span>
              <span className="text-[10px] text-slate-600 font-mono">{l.ip_address || ""}</span>
            </div>
            <p className="text-xs text-slate-400 mb-1">{l.product_title || "—"}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <HiOutlineDocumentArrowDown className="text-red-400 flex-shrink-0" size={12} />
              <span className="font-mono truncate">{l.file_name || "—"}</span>
            </div>
            <p className="text-[10px] text-slate-600">{new Date(l.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      </>)}
    </div>
  );
}
