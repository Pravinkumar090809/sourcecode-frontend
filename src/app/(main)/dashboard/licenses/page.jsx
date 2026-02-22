"use client";
import { AuthGuard } from "@/components/AuthGuard";
import { HiOutlineKey, HiOutlineCheckCircle } from "react-icons/hi2";

function Content() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Licenses</h1>
        <p className="text-slate-500 text-sm">Your software licenses</p>
      </div>
      <div className="glass rounded-2xl p-16 text-center animate-fadeIn">
        <HiOutlineKey className="text-5xl text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">All Licenses Active</h3>
        <p className="text-sm text-slate-500 mb-4">All your purchased products include a commercial license</p>
        <div className="inline-flex items-center gap-2 text-sm text-green-400"><HiOutlineCheckCircle /> License included with every purchase</div>
      </div>
    </div>
  );
}

export default function LicensesPage() {
  return <AuthGuard><Content /></AuthGuard>;
}
