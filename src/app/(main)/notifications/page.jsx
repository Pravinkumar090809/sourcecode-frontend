"use client";
import Footer from "@/components/Footer";
import { HiOutlineBell } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Order #1234 Delivered", body: "Your order has been delivered successfully.", time: "2h" },
    { id: 2, title: "New Update Available", body: "A new update for the product you purchased is available.", time: "1d" },
    { id: 3, title: "Support Reply", body: "Support replied to your ticket #5678.", time: "3d" },
  ]);

  const dismiss = (id) => setNotifications((s) => s.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-800 text-sky-400">
              <HiOutlineBell className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-sm text-slate-500">Recent alerts about your orders and account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearAll} className="text-sm text-slate-400 hover:text-white">
              Clear all
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-slate-400">You're all caught up — no new notifications.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="glass rounded-xl p-4 flex items-start justify-between">
                <div className="pr-3 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">{n.title}</h3>
                    <span className="text-xs text-slate-500">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{n.body}</p>
                </div>
                <button onClick={() => dismiss(n.id)} className="text-slate-400 hover:text-white p-2 rounded">
                  <FiX />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
