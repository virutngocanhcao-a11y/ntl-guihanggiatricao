"use client";

import { useState, useRef, useEffect } from "react";
import Turnstile, { turnstileSiteKey } from "./Turnstile";

const cargoTypes = [
  "Điện thoại & thiết bị di động",
  "Laptop & thiết bị CNTT",
  "Linh kiện điện tử",
  "Máy móc & thiết bị",
  "Hàng thương mại giá trị cao khác",
];

type Status = "idle" | "submitting" | "success" | "error" | "cooldown";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(Date.now());
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  // Reset form load time when status returns to idle
  useEffect(() => {
    if (status === "idle") {
      formLoadedAt.current = Date.now();
    }
  }, [status]);

  // Cooldown timer after successful submission
  useEffect(() => {
    if (status !== "cooldown") return;
    if (cooldownSeconds <= 0) {
      setStatus("idle");
      return;
    }
    const timer = setTimeout(() => setCooldownSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, cooldownSeconds]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;
    
    // Client-side honeypot check
    if (honeypot) {
      // Fake success to not alert bots
      setStatus("success");
      return;
    }

    // Client-side timing check (< 3 seconds is suspicious)
    const elapsed = Date.now() - formLoadedAt.current;
    if (elapsed < 3000) {
      setErrorMessage("Vui lòng kiểm tra lại thông tin trước khi gửi.");
      setStatus("error");
      return;
    }

    // Chưa qua được Turnstile thì không cho gửi (chỉ áp dụng khi đã cấu hình key)
    if (turnstileSiteKey && !turnstileToken) {
      setErrorMessage("Vui lòng chờ xác minh bảo mật hoàn tất rồi gửi lại.");
      setStatus("error");
      return;
    }

    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      cargoType: (form.elements.namedItem("cargoType") as HTMLSelectElement).value,
      _hp: honeypot || "",
      _ts: formLoadedAt.current,
      _turnstile: turnstileToken,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Gửi thông tin thất bại, vui lòng thử lại.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    } finally {
      // Token Turnstile chỉ dùng được một lần, phải xin token mới cho lần gửi sau
      setTurnstileToken("");
      setTurnstileReset((n) => n + 1);
    }
  }

  function handleReset() {
    setCooldownSeconds(30);
    setStatus("cooldown");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-7 md:p-8 shadow-2xl text-center">
        <p className="text-xl font-bold text-navy">Cảm ơn bạn đã đăng ký!</p>
        <p className="mt-3 text-[15px] text-gray-600">
          Đội ngũ Nhất Tín Logistics sẽ liên hệ tư vấn trong thời gian sớm nhất.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 text-sm font-bold text-gold hover:text-gold-deep transition-colors"
        >
          Gửi yêu cầu khác &rarr;
        </button>
      </div>
    );
  }

  const isDisabled = status === "submitting" || status === "cooldown";

  return (
    <div className="bg-white rounded-2xl p-7 md:p-8 shadow-2xl">
      <h3 className="text-navy text-xl md:text-2xl font-bold mb-6 leading-snug">
        Nhận tư vấn giải pháp<br />giao hàng giá trị cao
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot - hidden from real users */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <input
          name="fullName"
          required
          placeholder="Họ và tên"
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-navy placeholder-gray-400 font-medium"
        />
        <input
          name="company"
          placeholder="Tên công ty / Doanh nghiệp"
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-navy placeholder-gray-400 font-medium"
        />
        <input
          name="phone"
          required
          type="tel"
          pattern="^0[0-9]{9}$"
          title="Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)"
          placeholder="Số điện thoại liên hệ"
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-navy placeholder-gray-400 font-medium"
        />
        <div className="relative">
          <select
            name="cargoType"
            defaultValue=""
            required
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-gray-500 font-medium appearance-none"
          >
            <option value="" disabled>
              Chọn loại hàng hóa cần gửi
            </option>
            {cargoTypes.map((type) => (
              <option key={type} value={type} className="text-navy">
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <Turnstile onVerify={setTurnstileToken} resetSignal={turnstileReset} />

        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full mt-3 bg-gold text-navy font-extrabold py-4 rounded-xl hover:bg-gold-light transition-all uppercase tracking-wide shadow-md shadow-gold/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting"
            ? "Đang gửi thông tin..."
            : status === "cooldown"
            ? `Vui lòng chờ ${cooldownSeconds}s`
            : "Nhận tư vấn ngay →"}
        </button>
      </form>
    </div>
  );
}
