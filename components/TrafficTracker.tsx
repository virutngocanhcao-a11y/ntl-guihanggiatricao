"use client";

import { useEffect } from "react";

// Cùng nhịp với ô "đang online" của trang Quốc tế — đủ mượt, đỡ tải R2.
const HEARTBEAT_MS = 150000;

export default function TrafficTracker() {
  useEffect(() => {
    // Lượt vào trang admin không phải khách, không tính vào tỉ lệ chuyển đổi
    if (window.location.pathname.startsWith("/admin")) return;

    let sessionId = sessionStorage.getItem("_traffic_session_id");
    if (!sessionId) {
      sessionId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("_traffic_session_id", sessionId);
    }

    // Tổng lượt truy cập chỉ tăng 1 lần / phiên; nhịp "đang online" thì luôn ping lại.
    const alreadyCountedVisit = sessionStorage.getItem("_tracked") === "1";
    sessionStorage.setItem("_tracked", "1");

    function ping(isFirstPing: boolean) {
      fetch("/api/traffic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, heartbeatOnly: !isFirstPing }),
      }).catch(() => {});
    }

    ping(!alreadyCountedVisit);
    const interval = setInterval(() => ping(false), HEARTBEAT_MS);
    return () => clearInterval(interval);
  }, []);

  return null; // This component renders nothing
}
