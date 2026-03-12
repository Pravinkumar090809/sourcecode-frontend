"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store";
import { supportAPI } from "@/lib/api";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineArrowLeft } from "react-icons/hi2";

function Content() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.message) return toast.error("Please fill all fields");
    if (!token) return toast.error("You must be logged in to submit a ticket");
    setLoading(true);
    try {
      const res = await supportAPI.createTicket(token, form);
      if (res.success) {
        toast.success("Support ticket created!");
        router.push("/dashboard/support");
      } else {
        toast.error(res.message || "Failed to create ticket");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/dashboard/support" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Support
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <h1 className="text-xl font-bold text-white mb-6">Create Support Ticket</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-glass w-full" placeholder="Brief description" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Message</label>
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-glass w-full resize-none" placeholder="Describe your issue..." />
          </div>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? "Creating..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewTicketPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
