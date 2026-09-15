"use client";

import { useEffect } from "react";

export default function TrafficTracker() {
  useEffect(() => {
    // Lượt vào trang admin không phải khách, không tính vào tỉ lệ chuyển đổi
    if (window.location.pathname.startsWith("/admin")) return;
    // Only track once per session
    if (sessionStorage.getItem("_tracked")) return;
    sessionStorage.setItem("_tracked", "1");
    fetch("/api/traffic", { method: "POST" }).catch(() => {});
  }, []);

  return null; // This component renders nothing
}
