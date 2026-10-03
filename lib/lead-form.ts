import { isProvince, normalizeVi } from "./provinces";

// Dùng chung cho form (client) và /api/lead (server) để hai bên kiểm tra giống nhau.

export const CUSTOMER_TYPES = [
  { value: "enterprise", label: "Doanh nghiệp / Công ty" },
  { value: "shop", label: "Hộ kinh doanh / Shop" },
  { value: "individual", label: "Cá nhân" },
] as const;
export type CustomerType = (typeof CUSTOMER_TYPES)[number]["value"];

export const OTHER_CARGO_GROUP = "Khác";

export const CARGO_GROUPS: { name: string; items: string[] }[] = [
  { name: "Điện thoại & thiết bị di động", items: ["Điện thoại", "Máy tính bảng", "Đồng hồ thông minh", "Phụ kiện cao cấp"] },
  { name: "Laptop & thiết bị CNTT", items: ["Laptop", "Máy chủ / thiết bị mạng", "Ổ cứng / SSD", "Máy ảnh / máy quay"] },
  { name: "Linh kiện điện tử", items: ["Chip / IC", "Bo mạch", "Màn hình / tấm nền", "Linh kiện khác"] },
  { name: "Máy móc & thiết bị", items: ["Thiết bị y tế", "Thiết bị đo lường", "Máy công nghiệp nhỏ"] },
  { name: "Trang sức, đồng hồ, hàng hiệu", items: ["Đồng hồ", "Túi xách / hàng hiệu", "Trang sức"] },
  { name: "Hồ sơ, giấy tờ quan trọng", items: ["Hồ sơ thầu", "Hợp đồng / chứng từ gốc"] },
  { name: OTHER_CARGO_GROUP, items: [] },
];

export const FREQUENCIES = ["1 lần", "Hằng tuần", "Hằng ngày"] as const;

export type LeadInput = {
  fullName: string;
  phone: string;
  customerType: string;
  company: string;
  taxCode: string;
  cargoGroup: string;
  cargoItems: string[];
  cargoOther: string;
  frequency: string;
  origin: string;
  destination: string;
};

// Những gì khách hay gõ cho có vào ô công ty khi thật ra không có công ty
const JUNK_COMPANY = new Set([
  "ca nhan", "khach le", "khong", "khong co", "ko", "ko co", "k", "k co", "kco", "chua co", "chua",
  "na", "n a", "none", "no", "nothing", "x", "xx", "xxx", "tu do", "rieng", "gia dinh",
]);

export function isJunkCompany(company: string, fullName: string): boolean {
  const c = normalizeVi(company);
  if (c.replace(/ /g, "").length < 3) return true;
  if (/^[0-9 ]+$/.test(c)) return true;
  if (JUNK_COMPANY.has(c) || c.includes("ca nhan")) return true;
  return c === normalizeVi(fullName);
}

// MST 10 số, hoặc 13 số cho chi nhánh (dạng 0123456789-001)
const TAX_CODE = /^\d{10}(-?\d{3})?$/;

/** Trả về tên trường -> câu báo lỗi; object rỗng nghĩa là hợp lệ. */
export function validateLead(input: LeadInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.fullName) errors.fullName = "Vui lòng nhập họ và tên";
  if (!/^0\d{9}$/.test(input.phone)) errors.phone = "Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)";

  if (!CUSTOMER_TYPES.some((t) => t.value === input.customerType)) {
    errors.customerType = "Vui lòng chọn bạn gửi hàng với tư cách gì";
  } else if (input.customerType !== "individual") {
    if (!input.company) errors.company = "Vui lòng nhập tên công ty / shop";
    else if (isJunkCompany(input.company, input.fullName)) {
      errors.company = "Vui lòng nhập đúng tên công ty / shop (gửi với tư cách cá nhân thì chọn \"Cá nhân\" ở trên)";
    }
    if (input.taxCode && !TAX_CODE.test(input.taxCode)) errors.taxCode = "Mã số thuế gồm 10 hoặc 13 số";
  }

  const group = CARGO_GROUPS.find((g) => g.name === input.cargoGroup);
  if (!group) errors.cargoGroup = "Vui lòng chọn nhóm hàng";
  else if (group.name === OTHER_CARGO_GROUP) {
    if (!input.cargoOther) errors.cargoOther = "Vui lòng ghi rõ mặt hàng cần gửi";
  } else if (input.cargoItems.length === 0 || !input.cargoItems.every((i) => group.items.includes(i))) {
    errors.cargoItems = "Vui lòng chọn ít nhất một mặt hàng";
  }

  if (!FREQUENCIES.includes(input.frequency as (typeof FREQUENCIES)[number])) errors.frequency = "Vui lòng chọn tần suất gửi";
  if (!isProvince(input.origin)) errors.origin = "Vui lòng chọn tỉnh/thành gửi hàng từ danh sách";
  if (!isProvince(input.destination)) errors.destination = "Vui lòng chọn tỉnh/thành nhận hàng từ danh sách";

  return errors;
}

/** Mô tả mặt hàng gọn một dòng cho sale, vd. "Laptop & thiết bị CNTT: Laptop, Ổ cứng / SSD". */
export function describeCargo(input: Pick<LeadInput, "cargoGroup" | "cargoItems" | "cargoOther">): string {
  if (input.cargoGroup === OTHER_CARGO_GROUP) return `Khác: ${input.cargoOther}`;
  return `${input.cargoGroup}: ${input.cargoItems.join(", ")}`;
}
