import Image from "next/image";
import { ProductCategory } from "@/lib/content-schema";

const defaultCategoryImages = [
  "/images/category-phone.jpg",
  "/images/category-laptop.jpg",
  "/images/category-chip.jpg",
  "/images/category-machine.jpg",
  "/images/category-bag.jpg",
];

function getValidImage(img: string | undefined, index: number) {
  if (!img || img.endsWith(".svg")) {
    return defaultCategoryImages[index] || defaultCategoryImages[0];
  }
  return img;
}

export default function ProductCategories({
  intro,
  items,
}: {
  intro: string;
  items: ProductCategory[];
}) {
  return (
    <section className="bg-[#f8f9fa] py-10 md:py-14 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#222222] md:text-4xl max-w-5xl mx-auto leading-tight lg:whitespace-nowrap">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white border border-gray-200/90 text-center shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all hover:-translate-y-1.5 flex flex-col"
            >
              <div className="relative h-44 sm:h-48 w-full p-3 bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center overflow-hidden">
                <div className="relative h-full w-full">
                  <Image src={getValidImage(item.image, i)} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 250px" />
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white group-hover:bg-amber-50/20 mt-auto transition-colors">
                <p className="text-sm md:text-[15px] font-extrabold text-[#1a1a1a] group-hover:text-[#b37700] transition-colors leading-snug">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            Đăng ký báo giá theo loại hàng &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
