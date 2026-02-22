"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import Loading from "./Loading";

export function AuthGuard({ children }) {
  const { user, token, isLoading } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !token) router.replace("/login");
  }, [isLoading, token, router]);
  if (isLoading) return <Loading />;
  if (!token) return null;
  return children;
}

export function AdminGuard({ children }) {
  const { isLoading } = useAuthStore();
  if (isLoading) return <Loading />;
  return children;
}
