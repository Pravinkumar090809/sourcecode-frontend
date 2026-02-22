"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HiOutlineStar, HiOutlineTrash } from "react-icons/hi2";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReviews([
        { id: 1, user: "Ravi Kumar", product: "React Dashboard", rating: 5, comment: "Excellent code quality!", date: "2025-01-15" },
        { id: 2, user: "Priya Singh", product: "Node.js API Kit", rating: 4, comment: "Very helpful, minor docs issue", date: "2025-01-14" },
        { id: 3, user: "Amit Patel", product: "Flutter E-commerce", rating: 5, comment: "Amazing product!", date: "2025-01-13" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2"><HiOutlineStar className="text-red-400" /> Reviews</h1>
        <p className="text-slate-500 text-sm">Manage customer reviews</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden animate-fadeIn">
        {loading ? (
          <div className="p-12 text-center"><span className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin inline-block" /></div>
        ) : reviews.length === 0 ? (
          <div className="empty-state"><HiOutlineStar className="text-4xl text-slate-600 mx-auto mb-3" /><p className="text-slate-500">No reviews yet</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-glass">
              <thead><tr><th>User</th><th>Product</th><th>Rating</th><th>Comment</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td className="text-white font-medium text-sm">{r.user}</td>
                    <td className="text-slate-400 text-sm">{r.product}</td>
                    <td><div className="flex gap-0.5">{[...Array(5)].map((_, i) => <HiOutlineStar key={i} className={i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} size={14} />)}</div></td>
                    <td className="text-slate-400 text-sm max-w-[200px] truncate">{r.comment}</td>
                    <td className="text-slate-500 text-xs">{r.date}</td>
                    <td><button className="text-red-400 hover:text-red-300 transition-colors"><HiOutlineTrash size={16} /></button></td>
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
