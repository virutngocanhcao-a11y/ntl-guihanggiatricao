"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonPrimaryClass, inputClass, labelClass } from "@/components/admin/ui";
import { IconChevronLeft, IconEye, IconEyeOff } from "@/components/admin/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Đăng nhập thất bại.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="mx-auto w-full max-w-md px-6 pt-10">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-700">
            <IconChevronLeft className="h-4 w-4" />
            Về landing page
          </a>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16">
          {/* Màn hình nhỏ không có khối thương hiệu bên phải nên hiện logo ở đây */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-ntl.png" alt="Nhất Tín Logistics" className="mb-8 h-12 w-auto lg:hidden" />
          <h1 className="text-3xl font-semibold text-navy">Đăng nhập</h1>
          <p className="mt-2 text-sm text-neutral-500">Nhập mật khẩu quản trị để quản lý landing page.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className={labelClass}>
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <button type="submit" disabled={loading} className={`${buttonPrimaryClass} w-full`}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden bg-navy lg:flex lg:w-1/2">
        {/* Lưới trang trí giống TailAdmin */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute right-0 top-0 h-[168px] w-[168px] bg-white/[0.04]" />
        <div className="absolute bottom-0 left-0 h-[168px] w-[168px] bg-white/[0.04]" />

        <div className="relative z-10 flex max-w-xs flex-col items-center text-center">
          {/* Bản logo chữ trắng dành cho nền tối */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-ntl-white.png" alt="Nhất Tín Logistics" className="h-20 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Quản trị landing page Giao hàng giá trị cao – Nhất Tín Logistics
          </p>
        </div>
      </div>
    </div>
  );
}
