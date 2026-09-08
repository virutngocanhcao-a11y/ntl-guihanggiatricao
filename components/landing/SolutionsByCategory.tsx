import Image from "next/image";
import { SolutionCategory } from "@/lib/content-schema";

const defaultSolutionImages = [
  "/images/category-phone.jpg",
  "/images/category-chip.jpg",
  "/images/category-machine.jpg",
];

function getValidSolutionImage(img: string | undefined, index: number) {
  if (!img || img.endsWith(".svg")) {
    return defaultSolutionImages[index] || defaultSolutionImages[0];
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
  return (
    <section className="bg-white py-10 md:py-14 border-b border-gray-100" id="giai-phap">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} className="overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center p-2 group">
              <div className="relative h-44 sm:h-48 w-full sm:w-1/2 lg:w-full xl:w-1/2 shrink-0 bg-[#f8f9fa] rounded-xl overflow-hidden flex items-center justify-center p-2.5 border border-gray-100">
                <div className="relative h-full w-full">
                  <Image src={getValidSolutionImage(item.image, i)} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, 300px" />
                </div>
              </div>
              <div className="p-3.5 sm:p-5 lg:p-3.5 xl:p-5 w-full">
                <h3 className="font-extrabold text-[#1a1a1a] text-[16px] md:text-lg">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-2 items-start">
                      <span className="text-[#d99400] mt-[2px] text-xs">●</span> 
                      <span className="font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-7 py-3 text-xs sm:text-sm font-extrabold uppercase text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:scale-105 transition-all"
          >
            Nhận giải pháp riêng cho doanh nghiệp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
