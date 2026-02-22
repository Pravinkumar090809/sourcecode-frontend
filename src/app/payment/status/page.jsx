"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { paymentAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Loading from "@/components/Loading";
import {
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiArrowRight,
} from "react-icons/hi";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuthStore();
  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState("Verifying your payment...");

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      setMessage("No order ID found");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await paymentAPI.verify(orderId, token || "");
        if (res.success) {
          const s = res.data?.status || res.data?.order_status;
          if (s === "completed" || s === "PAID") {
            setStatus("success");
            setMessage("Payment successful! Your download is ready.");
          } else if (s === "failed" || s === "FAILED") {
            setStatus("error");
            setMessage("Payment failed. Please try again.");
          } else {
            setStatus("pending");
            setMessage("Payment is being processed...");
          }
        } else {
          setStatus("error");
          setMessage(res.message || "Verification failed");
        }
      } catch {
        setStatus("error");
        setMessage("Could not verify payment");
      }
    };

    checkStatus();
  }, [orderId, token]);

  const icons = {
    checking: <HiClock className="text-5xl text-yellow-500 mx-auto mb-4" />,
    success: <HiCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />,
    error: <HiXCircle className="text-5xl text-red-500 mx-auto mb-4" />,
    pending: <HiClock className="text-5xl text-yellow-500 mx-auto mb-4" />,
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-8">
      <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center max-w-md w-full">
        {icons[status]}
        <h1
          className={`text-xl sm:text-2xl font-bold mb-2 ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-500"
              : "text-yellow-600"
          }`}
        >
          {status === "success"
            ? "Payment Successful!"
            : status === "error"
            ? "Payment Failed"
            : status === "pending"
            ? "Processing..."
            : "Checking..."}
        </h1>
        <p className="text-sm text-slate-500 mb-6">{message}</p>

        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="btn-primary text-sm"
          >
            Go to Dashboard <HiArrowRight />
          </button>
          {status === "error" && (
            <button
              onClick={() => router.push("/products")}
              className="btn-secondary text-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentStatusContent />
    </Suspense>
  );
}
