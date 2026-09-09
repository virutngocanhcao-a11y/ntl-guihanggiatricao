import Image from "next/image";
import SectionHeading from "./SectionHeading";
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
    <section className="bg-[#fafafa] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Mặt hàng"
          title={intro}
          highlight="giá trị cao"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 md:mt-14">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
            >
              <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-white p-4 sm:h-48">
                <div className="relative h-full w-full">
                  <Image src={getValidImage(item.image, i)} alt={item.title} fill className="object-contain transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 250px" />
                </div>
              </div>
              <div className="mt-auto border-t border-gray-100 p-4">
                <p className="text-[14px] font-semibold leading-[1.45] text-[#1a1a1a]">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-[#1a1a1a] underline decoration-[#fdd800] decoration-2 underline-offset-4 transition-colors hover:text-[#b37700]"
          >
            Đăng ký báo giá theo loại hàng &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
