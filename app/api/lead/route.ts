import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-storage";
import { CUSTOMER_TYPES, LeadInput, describeCargo, validateLead } from "@/lib/lead-form";

const LEAD_CENTER_ENDPOINT = "https://ntl-mkt-leads-center.vercel.app/api/leads";

/**
 * Forward lead sang Marketing Lead Center (NTL) — nguồn tổng hợp lead
 * dùng chung cho toàn công ty. Không chặn response nếu lỗi, chỉ log.
 */
async function forwardToLeadCenter(
  leadData: LeadInput & { cargoType: string },
  pageUrl: string,
  tracking: Record<string, string>
) {
  try {
    const res = await fetch(LEAD_CENTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_CENTER_API_KEY ? { "x-api-key": process.env.LEAD_CENTER_API_KEY } : {}),
      },
      body: JSON.stringify({
        source_type: "landing_page",
        source_name: "LP - Hàng giá trị cao",
        name: leadData.fullName,
        phone: leadData.phone,
        company: leadData.company || undefined,
        customer_type: leadData.customerType,
        service: "Hàng giá trị cao",
        need: `Loại hàng: ${leadData.cargoType}`,
        goods_type: leadData.cargoType,
        origin: leadData.origin,
        destination: leadData.destination,
        frequency: leadData.frequency,
        customer_note: leadData.taxCode ? `MST: ${leadData.taxCode}` : undefined,
        landing_page_url: pageUrl || undefined,
        ...tracking,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[api/lead] Lead Center forward failed:", res.status, text);
    }
  } catch (err) {
    console.error("[api/lead] Lead Center forward error:", err);
  }
}

interface LeadPayload {
  _hp?: string; // honeypot
  _ts?: number; // form load timestamp
  _turnstile?: string; // Cloudflare Turnstile token
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
}

/**
 * Xác minh token Turnstile với Cloudflare.
 * Chưa cấu hình TURNSTILE_SECRET_KEY thì bỏ qua bước này để form vẫn chạy.
 */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // chưa bật chống bot

  if (!token) return false;

  try {
    const form = new URLSearchParams();
    form.append("secret", secret);
    form.append("response", token);
    if (ip && ip !== "unknown") form.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form }
    );
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[api/lead] Turnstile tu choi:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    // Cloudflare lỗi mạng: cho qua để không chặn nhầm khách thật
    console.error("[api/lead] Khong goi duoc Turnstile siteverify:", err);
    return true;
  }
}

// Simple in-memory rate limiter
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max 5 submissions per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipSubmissions.get(ip) || [];
  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  ipSubmissions.set(ip, valid);
  return valid.length >= RATE_LIMIT_MAX;
}

function recordSubmission(ip: string): void {
  const timestamps = ipSubmissions.get(ip) || [];
  timestamps.push(Date.now());
  ipSubmissions.set(ip, timestamps);
}

// Cleanup old entries periodically (every 30 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of ipSubmissions.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (valid.length === 0) ipSubmissions.delete(ip);
    else ipSubmissions.set(ip, valid);
  }
}, 30 * 60 * 1000);

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function parseLead(b: Record<string, unknown>): LeadInput {
  const customerType = str(b.customerType);
  const isIndividual = customerType === "individual";
  return {
    fullName: str(b.fullName),
    phone: str(b.phone).replace(/[\s.-]/g, ""),
    customerType,
    company: isIndividual ? "" : str(b.company),
    taxCode: isIndividual ? "" : str(b.taxCode, 20),
    cargoGroup: str(b.cargoGroup),
    cargoItems: Array.isArray(b.cargoItems) ? b.cargoItems.slice(0, 20).map((i) => str(i)) : [],
    cargoOther: str(b.cargoOther),
    frequency: str(b.frequency),
    origin: str(b.origin),
    destination: str(b.destination),
  };
}

export async function POST(req: NextRequest) {
  // Get client IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }
  const lead = parseLead(body as Record<string, unknown>);
  const [firstError] = Object.values(validateLead(lead));
  if (firstError) {
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  // Honeypot check — if bot filled the hidden field, silently reject
  const meta = body as LeadPayload;
  if (meta._hp) {
    // Return 200 to not alert the bot
    return NextResponse.json({ ok: true });
  }

  // Timing check — form submitted too quickly (< 3 seconds)
  if (meta._ts && typeof meta._ts === "number") {
    const elapsed = Date.now() - meta._ts;
    if (elapsed < 3000) {
      return NextResponse.json(
        { error: "Vui lòng kiểm tra lại thông tin trước khi gửi." },
        { status: 400 }
      );
    }
  }

  // Turnstile — lop chan bot chinh
  if (!(await verifyTurnstile(meta._turnstile, ip))) {
    return NextResponse.json(
      { error: "Xác minh bảo mật thất bại. Vui lòng tải lại trang và thử lại." },
      { status: 403 }
    );
  }

  // Record submission for rate limiting
  recordSubmission(ip);

  const leadData = {
    ...lead,
    cargoType: describeCargo(lead),
    company: lead.company || CUSTOMER_TYPES.find((t) => t.value === lead.customerType)!.label,
  };

  // Save lead to R2 (backup storage)
  await saveLead({
    fullName: leadData.fullName,
    company: leadData.company,
    phone: leadData.phone,
    cargoType: leadData.cargoType,
    origin: leadData.origin,
    destination: leadData.destination,
    customerType: leadData.customerType,
    taxCode: leadData.taxCode || undefined,
    frequency: leadData.frequency,
    source: "Landing Page - Giao Hang Gia Tri Cao",
    ip,
  }).catch((err) =>
    console.error("[api/lead] Failed to save lead to R2:", err)
  );

  // Forward to Marketing Lead Center (nguồn lead tổng hợp toàn công ty)
  const tracking: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "gclid"] as const) {
    const value = meta[key];
    if (typeof value === "string" && value.trim()) tracking[key] = value.trim().slice(0, 200);
  }
  await forwardToLeadCenter(leadData, req.headers.get("referer") || "", tracking);

  return NextResponse.json({ ok: true });
}
