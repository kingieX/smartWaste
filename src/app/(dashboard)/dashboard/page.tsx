// app/dashboard/page.tsx (acts as a redirect handler based on role)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") router.replace("/dashboard/admin");
    else if (role === "collector") router.replace("/dashboard/collector");
    else if (role === "officer") router.replace("/dashboard/officer");
    else router.replace("/auth/login");
  }, [router]);

  return null;
}
