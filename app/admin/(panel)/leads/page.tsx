"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadsResponse } from "@/lib/lead-stats";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb";
import LeadsTable from "@/components/admin/LeadsTable";
import { cardClass, inputClass } from "@/components/admin/ui";
import { IconChevronLeft, IconChevronRight, IconRefresh, IconSearch } from "@/components/admin/icons";

const PER_PAGE_OPTIONS = [10, 20, 50];

function pageWindow(current: number, total: number): number[] {
  const size = Math.min(5, total);
  let start = Math.max(1, current - 2);
  start = Math.min(start, total - size + 1);
  return Array.from({ length: size }, (_, i) => start + i);
}

export default function LeadsPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });
    if (debouncedQuery) params.set("q", debouncedQuery);

    fetch(`/api/leads?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: LeadsResponse | null) => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [page, perPage, debouncedQuery, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const from = data && data.total > 0 ? (data.page - 1) * data.perPage + 1 : 0;
  const to = data ? Math.min(data.page * data.perPage, data.total) : 0;

  return (
    <>
      <PageBreadcrumb title="Quản lý lead" />

      <div className={cardClass}>
        <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 sm:py-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-navy">Danh sách lead</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {data
                ? `${data.total} lead${debouncedQuery ? ` khớp “${debouncedQuery}”` : ""}`
                : "Đang tải..."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-[300px]">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên, SĐT, công ty, IP..."
                className={`${inputClass} pl-11`}
              />
            </div>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Số lead mỗi trang"
              className={`${inputClass} w-auto pr-8`}
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} / trang
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={reload}
              aria-label="Làm mới"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 shadow-theme-xs transition-colors hover:bg-neutral-50"
            >
              <IconRefresh className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        <div className={`border-t border-neutral-100 transition-opacity ${loading && data ? "opacity-60" : ""}`}>
          {data ? (
            <LeadsTable
              leads={data.leads}
              ipTotals={data.ipTotals}
              startIndex={(data.page - 1) * data.perPage}
              emptyText={debouncedQuery ? "Không có lead nào khớp với từ khoá." : "Chưa có lead nào."}
            />
          ) : (
            <div className="px-6 py-14 text-center text-sm text-neutral-400">Đang tải danh sách lead...</div>
          )}
        </div>

        {data && data.total > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-100 px-5 py-4 sm:flex-row sm:px-6">
            <p className="text-sm text-neutral-500">
              Hiển thị <span className="font-medium text-neutral-700">{from}–{to}</span> trong{" "}
              <span className="font-medium text-neutral-700">{data.total}</span> lead
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={data.page <= 1}
                className="flex h-10 items-center gap-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-700 shadow-theme-xs hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconChevronLeft className="h-4 w-4" />
                Trước
              </button>
              {pageWindow(data.page, data.totalPages).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    n === data.page ? "bg-gold text-navy" : "text-neutral-700 hover:bg-gold/15 hover:text-navy"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={data.page >= data.totalPages}
                className="flex h-10 items-center gap-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-700 shadow-theme-xs hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sau
                <IconChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
