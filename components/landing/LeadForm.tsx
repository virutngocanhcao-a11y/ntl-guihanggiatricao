"use client";

import { useState } from "react";

const cargoTypes = [
  "Điện thoại & thiết bị di động",
  "Laptop & thiết bị CNTT",
  "Linh kiện điện tử",
  "Máy móc & thiết bị",
  "Hàng thương mại giá trị cao khác",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      cargoType: (form.elements.namedItem("cargoType") as HTMLSelectElement).value,
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
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xl text-center">
        <p className="text-lg font-semibold text-navy">Cảm ơn bạn đã đăng ký!</p>
        <p className="mt-2 text-sm text-gray-600">
          Đội ngũ Nhất Tín Logistics sẽ liên hệ tư vấn trong thời gian sớm nhất.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-gold underline underline-offset-2"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-xl">
      <h3 className="text-lg font-bold text-navy">
        Nhận tư vấn giải pháp
        <br />
        giao hàng giá trị cao
      </h3>
      <div className="mt-4 space-y-3">
        <input
          name="fullName"
          required
          placeholder="Họ tên"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="company"
          placeholder="Công ty"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-navy"
        />
        <input
          name="phone"
          required
          type="tel"
          placeholder="Số điện thoại"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-navy"
        />
        <select
          name="cargoType"
          defaultValue=""
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-navy"
        >
          <option value="" disabled>
            Loại hàng hóa
          </option>
          {cargoTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 w-full rounded-lg bg-gold py-3 text-sm font-bold text-navy-dark transition hover:bg-gold-light disabled:opacity-60"
      >
        {status === "submitting" ? "Đang gửi..." : "Nhận tư vấn →"}
      </button>
    </form>
  );
}
