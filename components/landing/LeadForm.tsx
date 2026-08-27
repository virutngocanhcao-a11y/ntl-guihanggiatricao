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
      <div className="rounded-2xl bg-white p-7 md:p-8 shadow-2xl text-center">
        <p className="text-xl font-bold text-[#222222]">Cảm ơn bạn đã đăng ký!</p>
        <p className="mt-3 text-[15px] text-gray-600">
          Đội ngũ Nhất Tín Logistics sẽ liên hệ tư vấn trong thời gian sớm nhất.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-[#fdd800] hover:text-[#e5c300] transition-colors"
        >
          Gửi yêu cầu khác &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-7 md:p-8 shadow-2xl">
      <h3 className="text-[#222222] text-xl md:text-2xl font-bold mb-6 leading-snug">
        Nhận tư vấn giải pháp<br />giao hàng giá trị cao
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          required
          placeholder="Họ tên"
          className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#fdd800] focus:ring-1 focus:ring-[#fdd800] text-[#222222] placeholder-gray-400 font-medium"
        />
        <input
          name="company"
          placeholder="Công ty"
          className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#fdd800] focus:ring-1 focus:ring-[#fdd800] text-[#222222] placeholder-gray-400 font-medium"
        />
        <input
          name="phone"
          required
          type="tel"
          pattern="^0[0-9]{9}$"
          title="Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)"
          placeholder="Số điện thoại"
          className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#fdd800] focus:ring-1 focus:ring-[#fdd800] text-[#222222] placeholder-gray-400 font-medium"
        />
        <div className="relative">
          <select
            name="cargoType"
            defaultValue=""
            required
            className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#fdd800] focus:ring-1 focus:ring-[#fdd800] text-gray-500 font-medium appearance-none bg-white"
          >
            <option value="" disabled>
              Loại hàng hóa
            </option>
            {cargoTypes.map((type) => (
              <option key={type} value={type} className="text-[#222222]">
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full mt-2 bg-[#fdd800] text-[#222222] font-bold py-4 rounded-lg hover:bg-[#ffe340] transition-colors uppercase shadow-md shadow-[#fdd800]/20 disabled:opacity-60"
        >
          {status === "submitting" ? "Đang gửi..." : "Nhận tư vấn →"}
        </button>
      </form>
    </div>
  );
}
