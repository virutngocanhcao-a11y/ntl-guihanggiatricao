import Image from "next/image";
import { SolutionCategory } from "@/lib/content-schema";
import { imageOrFallback } from "@/lib/image-fallback";
import SectionCta from "./SectionCta";

const defaultCategories = [
  {
    title: "Điện thoại & thiết bị di động",
    image: "/images/category-phone.jpg",
  },
  {
    title: "Laptop & thiết bị CNTT",
    image: "/images/category-laptop.jpg",
  },
  {
    title: "Linh kiện điện tử & phụ tùng",
    image: "/images/category-chip.jpg",
  },
  {
    title: "Thiết bị y tế & thiết bị chuyên dụng",
    image: "/images/category-medical.jpg",
  },
  {
    title: "Máy móc & thiết bị công nghiệp",
    image: "/images/category-machine.jpg",
  },
];

const defaultSolutionImages = defaultCategories.map((c) => c.image);

export default function SolutionsByCategory({
  intro,
  items,
}: {
  intro: string;
  items: SolutionCategory[];
}) {
  const displayItems =
    items && items.length >= 5
      ? items
      : defaultCategories.map((def, idx) => ({
          title: items?.[idx]?.title || def.title,
          image: items?.[idx]?.image || def.image,
        }));

  return (
    <section className="bg-white py-10 md:py-14 border-b border-gray-100" id="giai-phap">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-ink md:text-4xl max-w-5xl mx-auto leading-tight lg:whitespace-nowrap">
          {intro || "Giải pháp phù hợp cho từng nhóm hàng"}
        </h2>
        <p className="mt-2.5 text-center text-sm md:text-[15px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Năng lực xử lý và vận chuyển an toàn chuyên biệt cho từng đặc thù mặt hàng giá trị cao
        </p>

        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {displayItems.map((item, i) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white border border-gray-200/90 text-center shadow-sm hover:shadow-xl hover:border-gold transition-all hover:-translate-y-1.5 flex flex-col duration-300"
            >
              {/* Product Visual */}
              <div className="relative h-48 sm:h-52 w-full p-3.5 bg-gradient-to-b from-gray-50/70 to-white flex items-center justify-center overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={imageOrFallback(item.image, defaultSolutionImages, i)}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 240px"
                  />
                </div>
              </div>

              {/* Category Name Label */}
              <div className="p-4 border-t border-gray-100 bg-white group-hover:bg-gold/10 mt-auto transition-colors flex items-center justify-center min-h-[64px]">
                <p className="text-sm sm:text-[14.5px] font-extrabold text-navy transition-colors leading-snug">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <SectionCta>Nhận giải pháp riêng cho doanh nghiệp &rarr;</SectionCta>
        </div>
      </div>
    </section>
  );
}
