import { LandingContent } from "./content-schema";
import { defaultContent } from "./default-content";
import { CONTENT_KEY, isR2Configured, r2PublicUrl } from "./r2-client";

export async function getContent(): Promise<LandingContent> {
  if (!isR2Configured()) {
    return defaultContent;
  }

  try {
    const res = await fetch(r2PublicUrl(CONTENT_KEY), {
      cache: "no-store",
    });
    if (!res.ok) {
      return defaultContent;
    }
    const data = (await res.json()) as Partial<LandingContent>;
    return { ...defaultContent, ...data };
  } catch {
    return defaultContent;
  }
}
