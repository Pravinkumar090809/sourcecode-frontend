"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineClipboardDocumentCheck, HiOutlineUser, HiOutlineShieldCheck, HiOutlineCog6Tooth, HiOutlineClipboardDocumentList, HiOutlineArrowPath } from "react-icons/hi2";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = Cookies.get("admin_api_key");

  const fetchLogs = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getActivityLogs(key, 50);
      if (res.success) setLogs(res.data || []);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

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
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineClipboardDocumentCheck className="text-red-400 flex-shrink-0" /> Activity Logs
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Platform activity and audit trail ({logs.length} entries)</p>
        </div>
        <button onClick={() => { setLoading(true); fetchLogs(); }} className="btn-secondary text-xs sm:text-sm w-fit">
          <HiOutlineArrowPath className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-6 animate-fadeIn">
        {loading ? (
          <div className="p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center"><HiOutlineClipboardDocumentCheck className="text-4xl text-slate-600 mx-auto mb-3" /><h3 className="text-base font-semibold text-white mb-2">No Activity Yet</h3><p className="text-slate-500 text-sm">Activity logs will appear here as actions are performed</p></div>
        ) : (
        <div className="space-y-2 sm:space-y-3">
          {logs.map((log) => {
            const timeAgo = getTimeAgo(new Date(log.created_at));
            return (
            <div key={log.id} className="flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center bg-white/5 shrink-0 mt-0.5">
                {typeIcons[log.type] || typeIcons.general}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{log.action}</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{log.details}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] sm:text-xs text-slate-600">{timeAgo}</p>
                <p className="text-[10px] text-slate-700 mt-0.5">{log.actor}</p>
              </div>
            </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}
