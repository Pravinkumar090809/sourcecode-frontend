"use client";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineStar, HiOutlinePencilSquare } from "react-icons/hi2";

function Content() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Reviews</h1>
          <p className="text-slate-500 text-sm">Reviews you&apos;ve submitted</p>
        </div>
        <Link href="/dashboard/reviews/new" className="btn-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2">
          <HiOutlinePencilSquare /> Write Review
        </Link>
      </div>
      <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
        <HiOutlineStar className="text-5xl text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Reviews Yet</h3>
        <p className="text-sm text-slate-500">Share your experience with products you&apos;ve purchased</p>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
