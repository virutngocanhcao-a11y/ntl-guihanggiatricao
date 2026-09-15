import type { LeadItem } from "@/lib/lead-stats";
import { formatDateTime } from "./format";

function initialOf(name: string): string {
  // Tên người Việt đặt tên gọi ở cuối, nên lấy chữ cái đầu của từ cuối cùng
  return name.trim().split(/\s+/).pop()?.charAt(0).toUpperCase() || "?";
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`whitespace-nowrap px-5 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 ${className}`}>
      {children}
    </th>
  );
}

export default function LeadsTable({
  leads,
  ipTotals = {},
  startIndex,
  emptyText = "Chưa có lead nào.",
}: {
  leads: LeadItem[];
  ipTotals?: Record<string, number>;
  /** Truyền vào thì hiện cột số thứ tự */
  startIndex?: number;
  emptyText?: string;
}) {
  if (leads.length === 0) {
    return <div className="px-6 py-14 text-center text-sm text-gray-500">{emptyText}</div>;
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[820px]">
        <thead className="border-b border-gray-100">
          <tr>
            {startIndex !== undefined && <Th className="w-14">#</Th>}
            <Th>Khách hàng</Th>
            <Th>Số điện thoại</Th>
            <Th>Loại hàng</Th>
            <Th>Thời gian</Th>
            <Th>IP</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead, i) => {
            const repeat = lead.ip ? ipTotals[lead.ip] ?? 1 : 1;
            return (
              <tr key={lead.id} className="transition-colors hover:bg-gray-50">
                {startIndex !== undefined && (
                  <td className="px-5 py-3 text-sm text-gray-400 sm:px-6">{startIndex + i + 1}</td>
                )}
                <td className="px-5 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-500">
                      {initialOf(lead.fullName)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">{lead.fullName}</p>
                      <p className="truncate text-xs text-gray-500">{lead.company || "Không ghi công ty"}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                  <a href={`tel:${lead.phone}`} className="text-sm text-gray-600 transition-colors hover:text-brand-500">
                    {lead.phone}
                  </a>
                </td>
                <td className="px-5 py-3 sm:px-6">
                  {lead.cargoType ? (
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {lead.cargoType}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-300">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 sm:px-6">
                  {formatDateTime(lead.submittedAt)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                  {lead.ip ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-600">{lead.ip}</span>
                      {repeat > 1 && (
                        <span
                          title={`IP này đã gửi tổng cộng ${repeat} lead`}
                          className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600"
                        >
                          ×{repeat}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-300">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
