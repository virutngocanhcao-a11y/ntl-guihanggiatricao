import type { Metadata } from "next";
import "./globals.css";
import { getContent } from "@/lib/get-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Giao Hàng Giá Trị Cao Cho Doanh Nghiệp | Nhất Tín Logistics",
    description:
      "Giải pháp vận chuyển dành cho điện thoại, thiết bị điện tử, linh kiện, máy móc và các đơn hàng có giá trị cao. Theo dõi hành trình, bảo hiểm hàng hóa, tư vấn giải pháp.",
    icons: content.global?.faviconImage ? { icon: content.global.faviconImage } : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-white text-navy-dark antialiased">{children}</body>
    </html>
  );
}
