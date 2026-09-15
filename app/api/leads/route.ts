import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { listLeads } from "@/lib/leads-storage";
import { buildLeadStats, countByIp, type LeadsResponse } from "@/lib/lead-stats";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const url = new URL(req.url);
  const requestedPage = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const perPage = Math.min(100, Math.max(1, parseInt(url.searchParams.get("perPage") || "10", 10)));
  const query = (url.searchParams.get("q") || "").trim().toLowerCase();

  const allLeads = await listLeads();
  const filtered = query
    ? allLeads.filter((lead) =>
        [lead.fullName, lead.phone, lead.company, lead.cargoType, lead.ip].some((value) =>
          (value || "").toLowerCase().includes(query)
        )
      )
    : allLeads;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  // Tìm kiếm có thể làm số trang giảm, nên kẹp lại để không trả về trang rỗng
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * perPage;
  const leads = filtered.slice(start, start + perPage);

  // Đếm trên toàn bộ lead chứ không chỉ trang hiện tại, để badge "×N" phản ánh
  // đúng số lần một IP đã gửi form
  const allIpCounts = countByIp(allLeads);
  const ipTotals: Record<string, number> = {};
  for (const lead of leads) {
    if (lead.ip) ipTotals[lead.ip] = allIpCounts.get(lead.ip) ?? 1;
  }

  const body: LeadsResponse = { leads, total, page, perPage, totalPages, ipTotals };
  if (url.searchParams.get("stats") === "1") {
    body.stats = buildLeadStats(allLeads, allIpCounts);
  }

  return NextResponse.json(body);
}
