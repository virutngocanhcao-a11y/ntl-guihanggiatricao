import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  fullName: string;
  company?: string;
  phone: string;
  cargoType?: string;
}

function isValidPayload(body: unknown): body is LeadPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return typeof b.fullName === "string" && b.fullName.trim().length > 0 &&
    typeof b.phone === "string" && /^[0-9+\s()-]{8,15}$/.test(b.phone.trim());
}

export async function POST(req: NextRequest) {
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

  const endpoint = process.env.GTG_CRM_ENDPOINT;
  const apiKey = process.env.GTG_CRM_API_KEY;

  const leadData = {
    full_name: body.fullName.trim(),
    company: body.company?.trim() || "",
    phone: body.phone.trim(),
    cargo_type: body.cargoType?.trim() || "",
    source: "Landing Page - Giao Hang Gia Tri Cao",
  };

  if (!endpoint || !apiKey) {
    console.warn(
      "[api/lead] GTG_CRM_ENDPOINT/GTG_CRM_API_KEY chưa được cấu hình. Lead nhận được:",
      leadData
    );
    return NextResponse.json(
      { error: "Hệ thống CRM chưa được cấu hình, vui lòng liên hệ quản trị viên." },
      { status: 503 }
    );
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
      return NextResponse.json(
        { error: "Không thể gửi thông tin tới CRM, vui lòng thử lại sau." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead] Lỗi khi gọi GTG CRM:", err);
    return NextResponse.json(
      { error: "Không thể kết nối tới CRM, vui lòng thử lại sau." },
      { status: 502 }
    );
  }
}
