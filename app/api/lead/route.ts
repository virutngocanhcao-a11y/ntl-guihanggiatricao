import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-storage";

interface LeadPayload {
  fullName: string;
  company?: string;
  phone: string;
  cargoType?: string;
  _hp?: string; // honeypot
  _ts?: number; // form load timestamp
  _turnstile?: string; // Cloudflare Turnstile token
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

function isValidPayload(body: unknown): body is LeadPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return typeof b.fullName === "string" && b.fullName.trim().length > 0 &&
    typeof b.phone === "string" && /^[0-9+\s()-]{8,15}$/.test(b.phone.trim());
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

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Vui lòng nhập đầy đủ Họ tên và Số điện thoại hợp lệ." },
      { status: 400 }
    );
  }

  // Honeypot check — if bot filled the hidden field, silently reject
  if (body._hp) {
    // Return 200 to not alert the bot
    return NextResponse.json({ ok: true });
  }

  // Timing check — form submitted too quickly (< 3 seconds)
  if (body._ts && typeof body._ts === "number") {
    const elapsed = Date.now() - body._ts;
    if (elapsed < 3000) {
      return NextResponse.json(
        { error: "Vui lòng kiểm tra lại thông tin trước khi gửi." },
        { status: 400 }
      );
    }
  }

  // Turnstile — lop chan bot chinh
  if (!(await verifyTurnstile(body._turnstile, ip))) {
    return NextResponse.json(
      { error: "Xác minh bảo mật thất bại. Vui lòng tải lại trang và thử lại." },
      { status: 403 }
    );
  }

  // Record submission for rate limiting
  recordSubmission(ip);

  const leadData = {
    fullName: body.fullName.trim(),
    company: body.company?.trim() || "",
    phone: body.phone.trim(),
    cargoType: body.cargoType?.trim() || "",
    source: "Landing Page - Giao Hang Gia Tri Cao",
  };

  // Save lead to R2 (backup storage)
  await saveLead({ ...leadData, ip }).catch((err) =>
    console.error("[api/lead] Failed to save lead to R2:", err)
  );

  // Forward to CRM
  const endpoint = process.env.GTG_CRM_ENDPOINT;
  const apiKey = process.env.GTG_CRM_API_KEY;

  if (!endpoint || !apiKey) {
    console.warn(
      "[api/lead] GTG_CRM_ENDPOINT/GTG_CRM_API_KEY chưa được cấu hình. Lead đã lưu vào R2.",
      leadData
    );
    // Still return success since we saved to R2
    return NextResponse.json({ ok: true });
  }

  try {
    const crmRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(leadData),
    });

    if (!crmRes.ok) {
      const text = await crmRes.text().catch(() => "");
      console.error("[api/lead] GTG CRM trả lỗi:", crmRes.status, text);
      // Lead is still saved in R2, so return success
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead] Lỗi khi gọi GTG CRM:", err);
    // Lead is still saved in R2, so return success
    return NextResponse.json({ ok: true });
  }
}
