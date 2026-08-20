import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giao Hàng Giá Trị Cao Cho Doanh Nghiệp | Nhất Tín Logistics",
  description:
    "Giải pháp vận chuyển dành cho điện thoại, thiết bị điện tử, linh kiện, máy móc và các đơn hàng có giá trị cao. Theo dõi hành trình, bảo hiểm hàng hóa, tư vấn giải pháp.",
};

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
