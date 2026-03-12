"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineEnvelope, HiOutlinePencilSquare } from "react-icons/hi2";
import toast from "react-hot-toast";

const TEMPLATE_DEFS = [
  { id: "welcome", name: "Welcome Email", trigger: "User Registration" },
  { id: "order_confirmation", name: "Order Confirmation", trigger: "Order Placed" },
  { id: "payment_success", name: "Payment Success", trigger: "Payment Verified" },
  { id: "download_ready", name: "Download Ready", trigger: "Order Completed" },
  { id: "password_reset", name: "Password Reset", trigger: "Password Reset Request" },
  { id: "refund_processed", name: "Refund Processed", trigger: "Refund Approved" },
];

export default function AdminEmailTemplatesPage() {
  const [templates, setTemplates] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const key = Cookies.get("admin_api_key");

  const fetchTemplates = useCallback(async () => {
    if (!key) return;
    try {
      const res = await adminAPI.getSettings(key, "email_");
      if (res.success && res.data) {
        setTemplates(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch email templates:", error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const getActive = (id) => templates[`email_${id}_active`] === "true";
  const getSubject = (id) => templates[`email_${id}_subject`] || "";

  const toggleTemplate = async (id) => {
    const newVal = getActive(id) ? "false" : "true";
    const updated = { ...templates, [`email_${id}_active`]: newVal };
    setTemplates(updated);
    const res = await adminAPI.updateSettings(key, { [`email_${id}_active`]: newVal });
    if (res.success) toast.success(`Template ${newVal === "true" ? "enabled" : "disabled"}`);
    else toast.error("Failed to update");
  };

  const saveSubject = async (id, subject) => {
    setSaving(true);
    const updated = { ...templates, [`email_${id}_subject`]: subject };
    setTemplates(updated);
    const res = await adminAPI.updateSettings(key, { [`email_${id}_subject`]: subject });
    setSaving(false);
    if (res.success) { toast.success("Template saved"); setEditing(null); }
    else toast.error("Failed to save");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineEnvelope className="text-red-400 flex-shrink-0" /> Email Templates
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">Manage automated email notifications</p>
      </div>

      <div className="space-y-3 sm:space-y-4 animate-fadeIn">
        {loading ? (
          <div className="glass rounded-xl sm:rounded-2xl p-8 text-center"><p className="text-slate-500 text-sm">Loading templates...</p></div>
        ) : (
          TEMPLATE_DEFS.map((t) => {
            const active = getActive(t.id);
            const subject = getSubject(t.id);
            return (
              <div key={t.id} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                      <span className={active ? "badge-green text-[10px] sm:text-xs" : "badge-red text-[10px] sm:text-xs"}>{active ? "Active" : "Inactive"}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-0.5 sm:mb-1 truncate">Subject: {subject}</p>
                    <p className="text-[10px] sm:text-xs text-slate-600">Trigger: {t.trigger}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <button onClick={() => toggleTemplate(t.id)} className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${active ? "bg-red-500" : "bg-white/10"}`}>
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${active ? "left-6" : "left-1"}`} />
                    </button>
                    <button onClick={() => setEditing(editing === t.id ? null : t.id)} className="text-slate-400 hover:text-white transition-colors"><HiOutlinePencilSquare size={18} /></button>
                  </div>
                </div>
                {editing === t.id && (
                  <div className="mt-4 pt-4 border-t border-white/5 animate-fadeIn">
                    <div className="space-y-3">
                      <div><label className="text-xs text-slate-500 block mb-1">Subject</label><input id={`subject-${t.id}`} className="input-glass w-full" defaultValue={subject} /></div>
                      <div><label className="text-xs text-slate-500 block mb-1">Body (HTML)</label><textarea className="input-glass w-full font-mono text-xs" rows={6} defaultValue={`<h1>Hello {{user_name}}</h1>\n<p>Thank you for using SourceCode Store.</p>\n<p>{{content}}</p>`} /></div>
                      <button onClick={() => { const val = document.getElementById(`subject-${t.id}`).value; saveSubject(t.id, val); }} disabled={saving} className="btn-primary px-4 py-2 rounded-xl text-sm disabled:opacity-50">{saving ? "Saving..." : "Save Template"}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
