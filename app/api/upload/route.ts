import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { getR2Client, isR2Configured, r2PublicUrl } from "@/lib/r2-client";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  if (!(await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "Cloudflare R2 chưa được cấu hình trên server, không thể upload ảnh." },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Không tìm thấy file." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Định dạng ảnh không được hỗ trợ." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Ảnh vượt quá 5MB." }, { status: 400 });
  }

  const extension = file.type.split("/")[1].replace("svg+xml", "svg");
  const key = `uploads/${randomUUID()}.${extension}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );
    return NextResponse.json({ url: r2PublicUrl(key) });
  } catch (err) {
    console.error("[api/upload] Lỗi khi upload ảnh lên R2:", err);
    return NextResponse.json({ error: "Không thể upload ảnh lên R2." }, { status: 500 });
  }
}
