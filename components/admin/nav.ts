// Các khối nội dung của landing page. Dùng chung cho menu con ở sidebar
// và làm id neo (anchor) của từng card trong trang chỉnh nội dung.
export const CONTENT_SECTIONS = [
  { id: "cai-dat-chung", label: "Cài đặt chung" },
  { id: "hero", label: "Hero banner" },
  { id: "pain-points", label: "Điểm khó khăn" },
  { id: "nhom-hang", label: "Nhóm mặt hàng" },
  { id: "quy-trinh", label: "Quy trình 5 bước" },
  { id: "vi-sao", label: "Vì sao chọn NTL" },
  { id: "giai-phap", label: "Giải pháp" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "cta", label: "CTA cuối trang" },
  { id: "footer", label: "Footer" },
] as const;

export type ContentSectionId = (typeof CONTENT_SECTIONS)[number]["id"];

export function sectionLabel(id: ContentSectionId): string {
  return CONTENT_SECTIONS.find((section) => section.id === id)?.label ?? id;
}
