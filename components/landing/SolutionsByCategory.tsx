import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { SolutionCategory } from "@/lib/content-schema";

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

function getValidSolutionImage(img: string | undefined, index: number) {
  if (!img || img.endsWith(".svg")) {
    return defaultCategories[index]?.image || defaultCategories[0].image;
  }
  return img;
}

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
    <section className="bg-white py-16 md:py-24" id="giai-phap">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Giải pháp"
          title={intro || "Giải pháp phù hợp cho từng nhóm hàng"}
          subtitle="Năng lực xử lý và vận chuyển an toàn chuyên biệt cho từng đặc thù mặt hàng giá trị cao."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 md:mt-14">
          {displayItems.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
            >
              {/* Product Visual */}
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-white p-4 sm:h-52">
                <div className="relative h-full w-full">
                  <Image
                    src={getValidSolutionImage(item.image, i)}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 240px"
                  />
                </div>
              </div>

              {/* Category Name Label */}
              <div className="mt-auto flex min-h-[64px] items-center justify-center border-t border-gray-100 p-4">
                <p className="text-[14px] font-semibold leading-[1.45] text-[#1a1a1a]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-[#1a1a1a] underline decoration-[#fdd800] decoration-2 underline-offset-4 transition-colors hover:text-[#b37700]"
          >
            Nhận giải pháp riêng cho doanh nghiệp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
