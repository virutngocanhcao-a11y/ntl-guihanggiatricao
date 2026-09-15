import type { StoredLead } from "./leads-storage";

export type LeadItem = StoredLead;

export interface LeadStats {
  total: number;
  today: number;
  byDay: { date: string; count: number }[];
  /** Các IP gửi từ 2 lead trở lên, nhiều nhất trước */
  repeatIps: { ip: string; count: number }[];
  repeatIpCount: number;
}

export interface LeadsResponse {
  leads: LeadItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  /** Tổng số lead của từng IP có mặt trong trang, đếm trên toàn bộ dữ liệu */
  ipTotals: Record<string, number>;
  stats?: LeadStats;
}

// Server Vercel chạy giờ UTC, còn "hôm nay" phải tính theo giờ Việt Nam
const VN_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function vnDayKey(time: number): string {
  return new Date(time + VN_OFFSET_MS).toISOString().slice(0, 10);
}

export function countByIp(leads: LeadItem[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    if (!lead.ip || lead.ip === "unknown") continue;
    counts.set(lead.ip, (counts.get(lead.ip) ?? 0) + 1);
  }
  return counts;
}

export function buildLeadStats(
  leads: LeadItem[],
  ipCounts: Map<string, number> = countByIp(leads),
  days = 14,
  now = Date.now()
): LeadStats {
  const perDay = new Map<string, number>();
  for (const lead of leads) {
    const time = Date.parse(lead.submittedAt);
    if (Number.isNaN(time)) continue;
    const key = vnDayKey(time);
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }

  const byDay = Array.from({ length: days }, (_, i) => {
    const date = vnDayKey(now - (days - 1 - i) * DAY_MS);
    return { date, count: perDay.get(date) ?? 0 };
  });

  const repeat = [...ipCounts].filter(([, count]) => count > 1).sort((a, b) => b[1] - a[1]);

  return {
    total: leads.length,
    today: perDay.get(vnDayKey(now)) ?? 0,
    byDay,
    repeatIps: repeat.slice(0, 8).map(([ip, count]) => ({ ip, count })),
    repeatIpCount: repeat.length,
  };
}
