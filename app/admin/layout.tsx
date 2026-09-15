import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị | Nhất Tín Logistics",
  robots: { index: false, follow: false },
};

// Font SF dùng chung với landing page (khai báo trong globals.css + tailwind font-sans)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">{children}</div>;
}
