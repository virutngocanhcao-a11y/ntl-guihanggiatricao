"use client";

import { useEffect } from "react";

export default function TrafficTracker() {
  useEffect(() => {
    // Only track once per session
    if (sessionStorage.getItem("_tracked")) return;
    sessionStorage.setItem("_tracked", "1");
    fetch("/api/traffic", { method: "POST" }).catch(() => {});
  }, []);

  return null; // This component renders nothing
}
