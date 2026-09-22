import { LandingContent } from "./content-schema";
import { defaultContent } from "./default-content";

const CONTENT_API_URL = "https://ntl-mkt-leads-center.vercel.app/api/public/content?slug=giatricao";

export async function getContent(): Promise<LandingContent> {
  try {
    const res = await fetch(CONTENT_API_URL, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) return defaultContent;

    const { content } = (await res.json()) as { content?: Partial<LandingContent> };
    if (!content) return defaultContent;

    return { ...defaultContent, ...content };
  } catch {
    return defaultContent;
  }
}
