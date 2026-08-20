# NTL – Giao Hàng Giá Trị Cao (Landing Page)

Landing page quảng bá dịch vụ "Giao hàng giá trị cao" của Nhất Tín Logistics. Next.js 14 (App Router) + TypeScript + Tailwind CSS, deploy trên Vercel.

## Kiến trúc

- **Không dùng database.** Nội dung động (hero banner, text các section, ảnh) lưu trong **Cloudflare R2** (object storage tương thích S3):
  - `content.json` — 1 file JSON chứa toàn bộ nội dung landing page.
  - `uploads/*` — ảnh admin upload qua trang quản trị.
- Nếu chưa cấu hình R2, trang tự dùng nội dung mặc định trong `lib/default-content.ts` (không bao giờ lỗi).
- Form "Nhận tư vấn" gọi `/api/lead`, forward sang **GTG CRM** qua `GTG_CRM_ENDPOINT` + `GTG_CRM_API_KEY`.
- Trang `/admin` chỉnh nội dung + upload ảnh, bảo vệ bằng mật khẩu đơn (`ADMIN_PASSWORD`), không có hệ thống user/DB.

## Cài đặt local

```bash
npm install
cp .env.example .env.local
# điền các giá trị thật vào .env.local
npm run dev
```

Không có `.env.local` với R2 credentials thật, trang chủ vẫn chạy bình thường với nội dung mặc định — chỉ có `/admin` sẽ không lưu được thay đổi.

## Cấu hình Cloudflare R2

1. Vào Cloudflare dashboard → R2 → tạo bucket mới (vd `ntl-guihanggiatricao`).
2. Bật **Public Access** cho bucket (hoặc gắn custom domain) → lấy public URL, điền vào `R2_PUBLIC_URL`.
3. Vào **Manage API Tokens** → tạo token có quyền Object Read & Write cho bucket → lấy Access Key ID / Secret Access Key.
4. Điền `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL` vào env vars (local: `.env.local`; production: Vercel Project Settings → Environment Variables).

## Cấu hình GTG CRM

Điền `GTG_CRM_ENDPOINT` và `GTG_CRM_API_KEY` theo tài liệu tích hợp của GTG CRM. Request gửi lên có dạng:

```json
{
  "full_name": "...",
  "company": "...",
  "phone": "...",
  "cargo_type": "...",
  "source": "Landing Page - Giao Hang Gia Tri Cao"
}
```

với header `Authorization: Bearer <GTG_CRM_API_KEY>`. Nếu format CRM yêu cầu khác, chỉnh trong `app/api/lead/route.ts`.

## Trang Admin

- URL: `/admin` (tự chuyển hướng sang `/admin/login` nếu chưa đăng nhập).
- Mật khẩu: giá trị `ADMIN_PASSWORD` trong env vars — **đổi giá trị mặc định trước khi deploy thật.**
- Sau khi sửa nội dung, bấm **Lưu tất cả** để ghi `content.json` lên R2. Trang chủ luôn đọc bản mới nhất (không cache).

## Deploy Vercel

1. Push code lên GitHub repo `ntl-guihanggiatricao`.
2. Import project vào Vercel.
3. Khai báo đầy đủ env vars ở trên trong Vercel Project Settings.
4. Deploy.
