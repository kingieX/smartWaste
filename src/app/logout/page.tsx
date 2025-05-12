// app/logout/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all relevant localStorage items
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    // Redirect to login page
    router.replace("/auth/signin-selection");
  }, [router]);

  return null;
}
