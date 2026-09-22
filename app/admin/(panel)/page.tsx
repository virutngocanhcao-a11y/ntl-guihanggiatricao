"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { LeadsResponse } from "@/lib/lead-stats";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import LeadsTable from "@/components/admin/LeadsTable";
import { formatDayLabel, formatNumber } from "@/components/admin/format";
import { buttonOutlineClass, cardClass } from "@/components/admin/ui";
import { IconRefresh, IconShieldAlert, IconUsers } from "@/components/admin/icons";

function MetricCard({
  icon,
  label,
  value,
  badge,
  badgeTone = "success",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  badgeTone?: "success" | "error" | "neutral";
}) {
  const tones = {
    success: "bg-emerald-50 text-emerald-600",
    error: "bg-red-50 text-red-600",
    neutral: "bg-neutral-100 text-neutral-600",
  };
  return (
    <div className={`${cardClass} p-5 md:p-6`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-navy">{icon}</div>
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <span className="text-sm text-neutral-500">{label}</span>
          <h4 className="mt-2 text-[28px] font-bold leading-none text-navy">{value}</h4>
        </div>
        {badge && (
          <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[badgeTone]}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function LeadChart({ days }: { days: { date: string; count: number }[] }) {
  const max = Math.max(...days.map((d) => d.count), 0);
  const step = Math.max(1, Math.ceil(max / 4));
  const top = step * 4;
  const ticks = [4, 3, 2, 1, 0].map((i) => i * step);

  return (
    <div className="flex gap-3">
      <div className="flex h-56 flex-col justify-between pb-6 text-right text-xs leading-none text-neutral-400">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="relative h-56 min-w-[480px]">
          <div className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between">
            {ticks.map((tick) => (
              <div key={tick} className="border-t border-dashed border-neutral-100" />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-6 top-0 flex items-end justify-between gap-2">
            {days.map((day) => (
              <div key={day.date} className="flex h-full flex-1 items-end justify-center">
                <div
                  className="group relative w-full max-w-[26px] rounded-t-md bg-gold transition-opacity hover:opacity-80"
                  style={{ height: `${(day.count / top) * 100}%`, minHeight: day.count ? 4 : 0 }}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-2 py-1 text-xs text-white group-hover:block">
                    {day.count} lead
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2">
            {days.map((day) => (
              <span key={day.date} className="flex-1 text-center text-[11px] text-neutral-500">
                {formatDayLabel(day.date)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const leadsRes = await fetch("/api/leads?page=1&perPage=6&stats=1");
      if (!leadsRes.ok) throw new Error("Không tải được dữ liệu lead.");
      setData(await leadsRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = data?.stats;

  return (
    <>
      <PageBreadcrumb title="Tổng quan">
        <button type="button" onClick={load} disabled={loading} className={buttonOutlineClass}>
          <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Làm mới
        </button>
      </PageBreadcrumb>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-2">
        <MetricCard
          icon={<IconUsers className="h-6 w-6" />}
          label="Tổng lead"
          value={stats ? formatNumber(stats.total) : "—"}
          badge={stats ? `+${stats.today} hôm nay` : undefined}
          badgeTone={stats?.today ? "success" : "neutral"}
        />
        <MetricCard
          icon={<IconShieldAlert className="h-6 w-6" />}
          label="IP gửi lặp"
          value={stats ? formatNumber(stats.repeatIpCount) : "—"}
          badge={stats ? (stats.repeatIpCount > 0 ? "Cần kiểm tra" : "Ổn định") : undefined}
          badgeTone={stats?.repeatIpCount ? "error" : "success"}
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <div className={`${cardClass} col-span-12 p-5 sm:p-6 xl:col-span-8`}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-navy">Lead 14 ngày gần nhất</h3>
            <p className="mt-1 text-sm text-neutral-500">Tính theo giờ Việt Nam</p>
          </div>
          {stats ? (
            <LeadChart days={stats.byDay} />
          ) : (
            <div className="flex h-56 items-center justify-center text-sm text-neutral-400">
              {loading ? "Đang tải..." : "Chưa có dữ liệu"}
            </div>
          )}
        </div>

        <div className={`${cardClass} col-span-12 flex flex-col p-5 sm:p-6 xl:col-span-4`}>
          <h3 className="text-lg font-semibold text-navy">IP gửi nhiều lead</h3>
          <p className="mt-1 text-sm text-neutral-500">Dùng để loại trừ IP trong Google Ads</p>
          <div className="mt-5 flex-1">
            {stats && stats.repeatIps.length > 0 ? (
              <ul className="divide-y divide-neutral-100">
                {stats.repeatIps.map(({ ip, count }) => (
                  <li key={ip} className="flex items-center justify-between py-3">
                    <span className="font-mono text-sm text-neutral-700">{ip}</span>
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                      {count} lead
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-10 text-center text-sm text-neutral-400">
                {loading ? "Đang tải..." : "Chưa phát hiện IP nào gửi lặp."}
              </p>
            )}
          </div>
          {stats && stats.repeatIpCount > stats.repeatIps.length && (
            <Link href="/admin/leads" className="mt-2 text-sm font-medium text-navy underline decoration-gold decoration-2 underline-offset-4 hover:decoration-navy">
              Xem thêm {stats.repeatIpCount - stats.repeatIps.length} IP khác trong danh sách lead
            </Link>
          )}
        </div>
      </div>

      <div className={`${cardClass} mt-4 md:mt-6`}>
        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5">
          <h3 className="text-lg font-semibold text-navy">Lead mới nhất</h3>
          <Link href="/admin/leads" className={`${buttonOutlineClass} h-9`}>
            Xem tất cả
          </Link>
        </div>
        <div className="border-t border-neutral-100">
          {data ? (
            <LeadsTable leads={data.leads} ipTotals={data.ipTotals} />
          ) : (
            <div className="px-6 py-14 text-center text-sm text-neutral-400">{loading ? "Đang tải..." : "—"}</div>
          )}
        </div>
      </div>
    </>
  );
}
