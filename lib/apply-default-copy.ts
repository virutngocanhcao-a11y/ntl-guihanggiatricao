import { LandingContent } from "./content-schema";
import { defaultContent } from "./default-content";

/**
 * Áp bộ nội dung chữ mặc định (bản B2B) lên nội dung đang lưu trên R2.
 *
 * Trang live đọc content.json trên R2 và nó ghi đè giá trị mặc định trong code,
 * nên đổi copy trong default-content.ts không tự hiện lên live. Hàm này dùng cho
 * nút "Nạp nội dung B2B mới" trong admin: chỉ thay các trường chữ đã được viết
 * lại, còn ảnh, icon, logo, footer, tên nhóm hàng... giữ nguyên như admin đã chỉnh.
 */
export function applyDefaultCopy(current: LandingContent): LandingContent {
  const d = defaultContent;

  // Ảnh do admin upload thì giữ lại; còn ảnh mẫu (.svg cũ) thì lấy ảnh mặc định mới
  const keepImage = (currentImage: string | undefined, fallback: string) =>
    currentImage && !currentImage.endsWith(".svg") ? currentImage : fallback;

  return {
    ...current,
    hero: { ...current.hero, subtitle: d.hero.subtitle },

    painPointsIntro: d.painPointsIntro,
    painPoints: d.painPoints.map((item, i) => ({ ...item, icon: current.painPoints[i]?.icon ?? item.icon })),
    bannerNote: d.bannerNote,

    productCategoriesIntro: d.productCategoriesIntro,

    processSteps: d.processSteps.map((step, i) => ({ ...step, number: current.processSteps[i]?.number ?? step.number })),

    whyChooseUs: d.whyChooseUs.map((item, i) => ({
      ...item,
      icon: current.whyChooseUs[i]?.icon ?? item.icon,
      title: current.whyChooseUs[i]?.title ?? item.title,
    })),

    solutionsIntro: d.solutionsIntro,
    // Bản cũ có 3 nhóm, bản mới 5 nhóm nên không ghép ảnh theo vị trí được
    solutionsByCategory: d.solutionsByCategory.map((item) => {
      const sameTitle = current.solutionsByCategory.find((c) => c.title === item.title);
      return { ...item, image: keepImage(sameTitle?.image, item.image) };
    }),

    faq: d.faq,
  };
}
