import AdminShell from "@/components/admin/AdminShell";

// Route group (panel) gắn sidebar + header cho mọi trang admin,
// riêng /admin/login nằm ngoài nhóm nên không có khung này.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
