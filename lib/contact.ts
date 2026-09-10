/**
 * Thông tin hotline dùng chung cho toàn trang.
 *
 * Trước đây số này được viết cứng ở 3 component với 2 phiên bản khác nhau:
 * "tel:1900636688" (đúng) và "tel:19006366888" (thừa một số 8 ở cuối, bấm ra
 * sai số). Gom về một chỗ để không lặp lại lỗi đó.
 */

/** Số hiển thị cho người đọc */
export const HOTLINE_DISPLAY = "1900 63 6688";

/** Nhánh cần bấm sau khi kết nối */
export const HOTLINE_EXTENSION = "(phím 2)";

/** Giá trị href cho thẻ <a> — chỉ gồm chữ số, không khoảng trắng */
export const HOTLINE_TEL_HREF = "tel:1900636688";
