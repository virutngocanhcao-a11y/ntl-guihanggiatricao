/**
 * Nút CTA vàng đặt ở cuối mỗi section.
 *
 * Bốn section (Quy trình, Nhóm hàng, Giải pháp, Vì sao chọn NTL) trước đây
 * lặp lại y hệt chuỗi class này. Gom về một chỗ để sau này đổi kiểu nút chỉ
 * phải sửa một lần.
 *
 * Các nút vàng khác trên trang (header, hero, nút gọi hotline) có kích thước
 * và hiệu ứng riêng nên vẫn để tại chỗ, không ép dùng chung.
 */
export default function SectionCta({
  href = "#dang-ky",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-navy hover:bg-gold-light shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0"
    >
      {children}
    </a>
  );
}
