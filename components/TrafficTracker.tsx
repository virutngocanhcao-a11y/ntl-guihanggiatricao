"use client";

import { useEffect } from "react";

// Cùng nhịp với ô "đang online" của trang Quốc tế — đủ mượt, đỡ tải R2.
const HEARTBEAT_MS = 150000;
const MAX_HEARTBEATS = 12;

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

    // Chỉ giữ "đang online" khi khách đang xem tab, tối đa 30 phút: tab bỏ quên không gọi server mãi.
    let sent = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      if (timer || sent >= MAX_HEARTBEATS) return;
      timer = setInterval(() => {
        if (++sent >= MAX_HEARTBEATS) stop();
        ping(false);
      }, HEARTBEAT_MS);
    };
    const onVisibility = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVisibility);
    if (document.visibilityState === "visible") start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null; // This component renders nothing
}
