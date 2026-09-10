"use client";

import { useEffect, useRef } from "react";

/**
 * Widget chống bot Cloudflare Turnstile.
 *
 * Nếu chưa cấu hình NEXT_PUBLIC_TURNSTILE_SITE_KEY thì component không render
 * gì cả và form vẫn gửi được như bình thường — để trang không chết khi chưa
 * kịp tạo key trên Cloudflare.
 *
 * Dùng chế độ render tường minh (render=explicit) vì form còn nằm trong modal,
 * mount sau khi script đã tải xong nên chế độ tự quét sẽ bỏ sót.
 */

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "flexible" | "compact";
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function Turnstile({
  onVerify,
  resetSignal = 0,
}: {
  onVerify: (token: string) => void;
  /** Đổi giá trị này để yêu cầu widget cấp token mới (sau khi gửi form xong). */
  resetSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  useEffect(() => {
    if (!turnstileSiteKey) return;

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: turnstileSiteKey,
          theme: "light",
          size: "flexible",
          callback: (token) => onVerifyRef.current(token),
          "error-callback": () => onVerifyRef.current(""),
          "expired-callback": () => onVerifyRef.current(""),
        });
      })
      .catch(() => {
        // Không tải được script (chặn mạng, adblock...) — bỏ qua để form
        // vẫn gửi được; server sẽ là nơi quyết định chấp nhận hay không.
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget đã bị gỡ sẵn */
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  // Cấp lại token mới sau mỗi lần gửi thành công (token cũ chỉ dùng được 1 lần)
  useEffect(() => {
    if (resetSignal === 0) return;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onVerifyRef.current("");
    }
  }, [resetSignal]);

  if (!turnstileSiteKey) return null;

  return <div ref={containerRef} className="mt-1" />;
}
