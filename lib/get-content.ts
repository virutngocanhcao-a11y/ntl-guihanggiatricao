import { LandingContent } from "./content-schema";
import { defaultContent } from "./default-content";

const CONTENT_API_URL = "https://ntl-mkt-leads-center.vercel.app/api/public/content?slug=giatricao";

export async function getContent(): Promise<LandingContent> {
  try {
    // Cache 5 phút: trang chủ dựng lại tối đa 5 phút/lần thay vì mỗi lượt xem (tiết kiệm CPU Vercel).
    // Sửa nội dung trong Lead Center sẽ hiện trên trang sau tối đa 5 phút.
    const res = await fetch(CONTENT_API_URL, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return defaultContent;

    const { content } = (await res.json()) as { content?: Partial<LandingContent> };
    if (!content) return defaultContent;

    return { ...defaultContent, ...content };
  } catch {
    return defaultContent;
  }
}
