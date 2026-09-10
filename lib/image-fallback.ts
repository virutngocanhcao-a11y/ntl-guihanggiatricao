/**
 * Chọn ảnh hiển thị cho một thẻ sản phẩm.
 *
 * Nội dung cũ lưu trên R2 còn trỏ tới các file .svg placeholder từ bản dựng
 * đầu tiên (những file đó đã bị thay bằng ảnh chụp .jpg). Nên ngoài trường
 * hợp thiếu ảnh, ta còn coi mọi đường dẫn .svg là "chưa có ảnh thật" và rơi
 * về ảnh mặc định tương ứng.
 */
export function imageOrFallback(
  img: string | undefined,
  fallbacks: string[],
  index: number
): string {
  if (!img || img.endsWith(".svg")) {
    return fallbacks[index] || fallbacks[0];
  }
  return img;
}
