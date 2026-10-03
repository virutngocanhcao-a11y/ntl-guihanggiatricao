"use client";

import { useState, useRef, useEffect } from "react";
import Turnstile, { turnstileSiteKey } from "./Turnstile";
import ProvinceSelect from "./ProvinceSelect";
import {
  CARGO_GROUPS,
  CUSTOMER_TYPES,
  FREQUENCIES,
  LeadInput,
  OTHER_CARGO_GROUP,
  validateLead,
} from "@/lib/lead-form";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-navy placeholder-gray-400 font-medium";

const chipClass = (on: boolean) =>
  `px-3.5 py-2 rounded-full border text-sm font-semibold transition-all ${
    on ? "border-gold bg-gold/15 text-navy" : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gold/60"
  }`;

// Thứ tự trường trên form, để focus vào trường lỗi đầu tiên
const FIELD_ORDER = [
  "fullName", "phone", "customerType", "company", "taxCode",
  "cargoGroup", "cargoItems", "cargoOther", "frequency", "origin", "destination",
];

type Status = "idle" | "submitting" | "success" | "error" | "cooldown";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(Date.now());
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customerType, setCustomerType] = useState("");
  const [cargoGroup, setCargoGroup] = useState("");
  const [cargoItems, setCargoItems] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");

  // Lưu UTM/gclid ngay khi vào trang phòng khi khách chuyển trang rồi mới điền form
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid"]) {
      const value = query.get(key);
      if (value) sessionStorage.setItem(key, value.slice(0, 200));
    }
  }, []);

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

    const text = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | null)?.value || "").trim();
    const isIndividual = customerType === "individual";
    const lead: LeadInput = {
      fullName: text("fullName"),
      phone: text("phone").replace(/[\s.-]/g, ""),
      customerType,
      company: isIndividual ? "" : text("company"),
      taxCode: isIndividual ? "" : text("taxCode"),
      cargoGroup,
      cargoItems,
      cargoOther: cargoGroup === OTHER_CARGO_GROUP ? text("cargoOther") : "",
      frequency,
      origin: text("origin"),
      destination: text("destination"),
    };

    const nextErrors = validateLead(lead);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      setErrorMessage("Vui lòng kiểm tra lại các trường được đánh dấu.");
      setStatus("error");
      document.getElementById(`lf-${firstInvalid}`)?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    // Chưa qua được Turnstile thì không cho gửi (chỉ áp dụng khi đã cấu hình key)
    if (turnstileSiteKey && !turnstileToken) {
      setErrorMessage("Vui lòng chờ xác minh bảo mật hoàn tất rồi gửi lại.");
      setStatus("error");
      return;
    }

    // Tham số theo dõi quảng cáo (UTM / gclid) từ URL landing page
    const query = new URLSearchParams(window.location.search);
    const tracking: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid"]) {
      const value = query.get(key) || sessionStorage.getItem(key);
      if (value) tracking[key] = value.slice(0, 200);
    }

    const data = {
      ...tracking,
      ...lead,
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
      setErrors({});
      setCustomerType("");
      setCargoGroup("");
      setCargoItems([]);
      setFrequency("");
      window.fbq?.("track", "Lead");
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
          className="mt-6 text-sm font-bold text-gold hover:opacity-80 transition-colors"
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
        Nhận tư vấn giải pháp<br />giao hàng giá trị cao cho doanh nghiệp
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot - hidden from real users */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Block id="fullName" error={errors.fullName}>
          <input name="fullName" placeholder="Họ và tên" className={inputClass} />
        </Block>
        <Block id="phone" error={errors.phone}>
          <input name="phone" type="tel" inputMode="numeric" placeholder="Số điện thoại liên hệ" className={inputClass} />
        </Block>

        <Block id="customerType" error={errors.customerType} label="Bạn gửi hàng với tư cách">
          <div className="flex flex-wrap gap-2">
            {CUSTOMER_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                aria-pressed={customerType === t.value}
                onClick={() => setCustomerType(t.value)}
                className={chipClass(customerType === t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Block>

        {customerType !== "individual" && (
          <>
            <Block id="company" error={errors.company}>
              <input name="company" placeholder="Tên công ty / Shop" className={inputClass} />
            </Block>
            <Block id="taxCode" error={errors.taxCode}>
              <input name="taxCode" inputMode="numeric" placeholder="Mã số thuế (không bắt buộc)" className={inputClass} />
            </Block>
          </>
        )}

        <Block id="cargoGroup" error={errors.cargoGroup}>
          <div className="relative">
            <select
              value={cargoGroup}
              onChange={(e) => {
                setCargoGroup(e.target.value);
                setCargoItems([]);
              }}
              className={`${inputClass} appearance-none ${cargoGroup ? "" : "text-gray-400"}`}
            >
              <option value="" disabled>
                Chọn nhóm hàng cần gửi
              </option>
              {CARGO_GROUPS.map((g) => (
                <option key={g.name} value={g.name} className="text-navy">
                  {g.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </Block>

        {cargoGroup === OTHER_CARGO_GROUP ? (
          <Block id="cargoOther" error={errors.cargoOther}>
            <input name="cargoOther" placeholder="Ghi rõ mặt hàng cần gửi" className={inputClass} />
          </Block>
        ) : (
          cargoGroup && (
            <Block id="cargoItems" error={errors.cargoItems} label="Mặt hàng cụ thể (chọn được nhiều)">
              <div className="flex flex-wrap gap-2">
                {CARGO_GROUPS.find((g) => g.name === cargoGroup)?.items.map((item) => {
                  const on = cargoItems.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setCargoItems((list) => (on ? list.filter((i) => i !== item) : [...list, item]))
                      }
                      className={chipClass(on)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </Block>
          )
        )}

        <Block id="frequency" error={errors.frequency} label="Tần suất gửi">
          <div className="flex flex-wrap gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={frequency === f}
                onClick={() => setFrequency(f)}
                className={chipClass(frequency === f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Block>

        <Block id="origin" error={errors.origin}>
          <ProvinceSelect name="origin" placeholder="Điểm gửi (tỉnh/thành phố)" className={inputClass} />
        </Block>
        <Block id="destination" error={errors.destination}>
          <ProvinceSelect name="destination" placeholder="Điểm nhận (tỉnh/thành phố)" className={inputClass} />
        </Block>

        <Turnstile onVerify={setTurnstileToken} resetSignal={turnstileReset} />

        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full mt-3 bg-gold text-navy font-extrabold py-4 rounded-xl hover:brightness-95 transition-all uppercase tracking-wide shadow-md shadow-gold/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting"
            ? "Đang gửi thông tin..."
            : status === "cooldown"
            ? `Vui lòng chờ ${cooldownSeconds}s`
            : "Nhận tư vấn doanh nghiệp →"}
        </button>
      </form>
    </div>
  );
}

function Block({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={`lf-${id}`}>
      {label && <p className="mb-2 text-sm font-semibold text-navy">{label}</p>}
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
