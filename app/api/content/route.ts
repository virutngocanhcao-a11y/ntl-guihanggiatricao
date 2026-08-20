import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { getContent } from "@/lib/get-content";
import { CONTENT_KEY, getR2Client, isR2Configured } from "@/lib/r2-client";
import { LandingContent } from "@/lib/content-schema";

function isAuthorized(req: NextRequest): Promise<boolean> {
  return verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "Cloudflare R2 chưa được cấu hình trên server, không thể lưu nội dung." },
      { status: 503 }
    );
  }

  let body: LandingContent;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  try {
    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: CONTENT_KEY,
        Body: JSON.stringify(body, null, 2),
        ContentType: "application/json",
      })
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/content] Lỗi khi lưu content.json lên R2:", err);
    return NextResponse.json({ error: "Không thể lưu nội dung lên R2." }, { status: 500 });
  }
}
