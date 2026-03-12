"use client";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import { HiOutlineStar, HiOutlineTrash, HiOutlineArrowPath } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const key = Cookies.get("admin_api_key");

  const fetchReviews = useCallback(async (showRefresh = false) => {
    if (!key) return;
    if (showRefresh) setRefreshing(true);
    try {
      const res = await adminAPI.getReviews(key);
      if (res.success) setReviews(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [key]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    const res = await adminAPI.deleteReview(key, id);
    if (res.success) {
      toast.success("Review deleted");
      setReviews(reviews.filter((r) => r.id !== id));
    } else {
      toast.error(res.message || "Failed to delete");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <HiOutlineStar className="text-red-400 flex-shrink-0" /> Customer Reviews
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">Manage and moderate reviews ({reviews.length} total)</p>
        </div>
        <button onClick={() => fetchReviews(true)} disabled={refreshing} className="btn-secondary text-xs sm:text-sm w-fit">
          <HiOutlineArrowPath className={refreshing ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn">
        {loading ? (
          <div className="p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center">
            <HiOutlineStar className="text-4xl text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-2">No Reviews Yet</h3>
            <p className="text-slate-500 text-sm">Reviews will appear here when customers submit them</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="table-glass">
                <thead><tr><th>User</th><th>Product</th><th>Rating</th><th>Comment</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id}>
                      <td><p className="text-white font-medium text-sm">{r.user_name}</p><p className="text-slate-500 text-xs">{r.user_email}</p></td>
                      <td className="text-slate-400 text-sm">{r.product_title}</td>
                      <td><div className="flex gap-0.5">{[...Array(5)].map((_, i) => <HiOutlineStar key={i} className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} size={14} />)}</div></td>
                      <td className="text-slate-400 text-sm max-w-[200px] truncate">{r.comment}</td>
                      <td className="text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                      <td><button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineTrash size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden p-3 space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <div><span className="text-sm text-white font-medium">{r.user_name}</span><p className="text-xs text-slate-500">{r.user_email}</p></div>
                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineTrash size={14} /></button>
                  </div>
                  <p className="text-xs text-slate-400 mb-1.5">{r.product_title}</p>
                  <div className="flex gap-0.5 mb-1.5">{[...Array(5)].map((_, i) => <HiOutlineStar key={i} className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} size={12} />)}</div>
                  <p className="text-xs text-slate-500">{r.comment}</p>
                  <p className="text-[10px] text-slate-600 mt-1.5">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
