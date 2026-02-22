"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineStar, HiOutlineArrowLeft } from "react-icons/hi2";
import Link from "next/link";

function Content() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");
    if (!review) return toast.error("Please write a review");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Review submitted successfully!");
    router.push("/dashboard/reviews");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/dashboard/reviews" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
        <HiOutlineArrowLeft /> Back to Reviews
      </Link>
      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <h1 className="text-xl font-bold text-white mb-6">Write a Review</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setRating(s)} className="text-2xl transition-transform hover:scale-110">
                  <HiOutlineStar className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1.5 block">Your Review</label>
            <textarea rows={5} value={review} onChange={(e) => setReview(e.target.value)} className="input-glass w-full resize-none" placeholder="Share your experience..." />
          </div>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewReviewPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
