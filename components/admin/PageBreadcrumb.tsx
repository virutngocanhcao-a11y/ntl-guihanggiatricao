import Link from "next/link";
import { IconChevronRight } from "./icons";

export default function PageBreadcrumb({
  title,
  children,
  className = "mb-6",
}: {
  title: string;
  /** Nút thao tác đặt bên phải tiêu đề */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <nav className="mt-1 flex items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/admin" className="transition-colors hover:text-gray-700">
            Trang chủ
          </Link>
          <IconChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-800">{title}</span>
        </nav>
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}
