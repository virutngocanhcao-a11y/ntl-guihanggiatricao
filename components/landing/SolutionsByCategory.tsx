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
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl max-w-5xl mx-auto leading-tight lg:whitespace-nowrap">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.title} className="overflow-hidden rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all hover:-translate-y-1.5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center p-3 group duration-300">
              <div className="relative h-44 sm:h-48 w-full sm:w-1/2 lg:w-full xl:w-1/2 shrink-0 bg-gradient-to-b from-[#f8f9fa] to-white rounded-xl overflow-hidden flex items-center justify-center p-3 border border-gray-100">
                <div className="relative h-full w-full">
                  <Image src={getValidSolutionImage(item.image, i)} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 300px" />
                </div>
              </div>
              <div className="p-4 sm:p-5 lg:p-4 xl:p-5 w-full">
                <h3 className="font-extrabold text-[#1a1a1a] text-[16px] md:text-lg group-hover:text-[#b37700] transition-colors">{item.title}</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-gray-700">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 items-start">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#fdd800]/25 text-[#b37700] text-[11px] font-black mt-0.5">✓</span> 
                      <span className="font-medium text-gray-700 leading-snug">{bullet}</span>
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            Nhận giải pháp riêng cho doanh nghiệp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
