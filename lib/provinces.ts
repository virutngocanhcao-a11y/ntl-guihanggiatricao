// 34 tỉnh/thành sau sắp xếp đơn vị hành chính (hiệu lực từ 01/07/2025).
// `formerly` là tỉnh cũ đã sáp nhập vào, `aliases` là tên gọi tắt/thành phố quen
// thuộc, để khách gõ "Bình Dương" hay "Sài Gòn" vẫn tìm ra đúng tỉnh mới.
export const PROVINCES: { name: string; formerly: string[]; aliases: string[] }[] = [
  { name: "Hà Nội", formerly: [], aliases: ["HN"] },
  { name: "TP. Hồ Chí Minh", formerly: ["Bình Dương", "Bà Rịa - Vũng Tàu", "Vũng Tàu"], aliases: ["HCM", "TPHCM", "Sài Gòn"] },
  { name: "Hải Phòng", formerly: ["Hải Dương"], aliases: [] },
  { name: "Đà Nẵng", formerly: ["Quảng Nam"], aliases: [] },
  { name: "Cần Thơ", formerly: ["Sóc Trăng", "Hậu Giang"], aliases: [] },
  { name: "Huế", formerly: ["Thừa Thiên Huế"], aliases: [] },
  { name: "An Giang", formerly: ["Kiên Giang"], aliases: ["Phú Quốc"] },
  { name: "Bắc Ninh", formerly: ["Bắc Giang"], aliases: [] },
  { name: "Cà Mau", formerly: ["Bạc Liêu"], aliases: [] },
  { name: "Cao Bằng", formerly: [], aliases: [] },
  { name: "Đắk Lắk", formerly: ["Phú Yên"], aliases: [] },
  { name: "Điện Biên", formerly: [], aliases: [] },
  { name: "Đồng Nai", formerly: ["Bình Phước"], aliases: [] },
  { name: "Đồng Tháp", formerly: ["Tiền Giang"], aliases: [] },
  { name: "Gia Lai", formerly: ["Bình Định"], aliases: [] },
  { name: "Hà Tĩnh", formerly: [], aliases: [] },
  { name: "Hưng Yên", formerly: ["Thái Bình"], aliases: [] },
  { name: "Khánh Hòa", formerly: ["Ninh Thuận"], aliases: ["Nha Trang"] },
  { name: "Lai Châu", formerly: [], aliases: [] },
  { name: "Lâm Đồng", formerly: ["Đắk Nông", "Bình Thuận"], aliases: ["Đà Lạt"] },
  { name: "Lạng Sơn", formerly: [], aliases: [] },
  { name: "Lào Cai", formerly: ["Yên Bái"], aliases: [] },
  { name: "Nghệ An", formerly: [], aliases: [] },
  { name: "Ninh Bình", formerly: ["Hà Nam", "Nam Định"], aliases: [] },
  { name: "Phú Thọ", formerly: ["Vĩnh Phúc", "Hòa Bình"], aliases: [] },
  { name: "Quảng Ngãi", formerly: ["Kon Tum"], aliases: [] },
  { name: "Quảng Ninh", formerly: [], aliases: [] },
  { name: "Quảng Trị", formerly: ["Quảng Bình"], aliases: [] },
  { name: "Sơn La", formerly: [], aliases: [] },
  { name: "Tây Ninh", formerly: ["Long An"], aliases: [] },
  { name: "Thái Nguyên", formerly: ["Bắc Kạn"], aliases: [] },
  { name: "Thanh Hóa", formerly: [], aliases: [] },
  { name: "Tuyên Quang", formerly: ["Hà Giang"], aliases: [] },
  { name: "Vĩnh Long", formerly: ["Bến Tre", "Trà Vinh"], aliases: [] },
];

const PROVINCE_NAMES = new Set(PROVINCES.map((p) => p.name));

export function isProvince(value: string): boolean {
  return PROVINCE_NAMES.has(value);
}

/** Bỏ dấu, chữ thường, bỏ ký tự thừa: "TP. Hồ Chí Minh" -> "tp ho chi minh". */
/** Khách gõ đúng nguyên một tên (tên mới, tên cũ hoặc tên gọi khác) thì trả về tỉnh tương ứng. */
export function findProvinceExact(query: string): string | undefined {
  const q = normalizeVi(query);
  if (!q) return undefined;
  return PROVINCES.find((p) => [p.name, ...p.formerly, ...p.aliases].some((n) => normalizeVi(n) === q))?.name;
}

export function normalizeVi(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** `formerly`: tỉnh cũ khớp với chuỗi khách gõ, để hiển thị "(gồm Bình Dương cũ)". */
export type ProvinceMatch = { name: string; formerly?: string };

/**
 * Lọc tỉnh theo chuỗi khách gõ (không phân biệt dấu). Tỉnh khớp tên chính
 * đứng trước, khớp tên cũ/tên gọi khác đứng sau.
 */
export function searchProvinces(query: string): ProvinceMatch[] {
  const q = normalizeVi(query);
  if (!q) return PROVINCES.map(({ name }) => ({ name }));

  const byName: ProvinceMatch[] = [];
  const byAlias: ProvinceMatch[] = [];
  for (const { name, formerly, aliases } of PROVINCES) {
    if (normalizeVi(name).includes(q)) {
      byName.push({ name });
      continue;
    }
    const former = formerly.find((a) => normalizeVi(a).includes(q));
    if (former) byAlias.push({ name, formerly: former });
    else if (aliases.some((a) => normalizeVi(a).includes(q))) byAlias.push({ name });
  }
  return [...byName, ...byAlias];
}
