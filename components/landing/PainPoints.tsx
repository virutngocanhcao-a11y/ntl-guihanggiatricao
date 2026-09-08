import Icon from "@/components/Icon";
import Image from "next/image";
import { PainPoint } from "@/lib/content-schema";

const painImages = [
  '/images/pain-damaged.jpg',
  '/images/pain-tracking.jpg',
  '/images/pain-experience.jpg',
  '/images/pain-costs.jpg'
];

export default function PainPoints({
  intro,
  items,
  bannerNote,
}: {
  intro: string;
  items: PainPoint[];
  bannerNote: string;
}) {
  return (
    <section className="bg-white py-10 md:py-14 relative z-20 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all group flex flex-col hover:-translate-y-1"
            >
              {/* Large Feature Image on Top */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={painImages[i] || painImages[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fdd800]/15 text-[#d99400] shrink-0">
                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-[15px] md:text-base font-extrabold text-[#1a1a1a] leading-snug">{item.title}</h3>
                </div>
                <p className="text-[13px] md:text-sm text-gray-600 leading-relaxed mt-1 flex-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 md:mt-10 max-w-3xl rounded-2xl bg-gradient-to-r from-[#fdd800]/15 via-[#fdd800]/5 to-transparent border border-[#fdd800]/40 p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdd800] text-[#222222] shadow-md shadow-[#fdd800]/25">
              <Icon name="shield" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#d99400]">Cam kết dịch vụ</p>
              <p className="text-base md:text-lg font-extrabold text-[#1a1a1a] mt-0.5">
                {bannerNote}
              </p>
            </div>
          </div>
          <a
            href="#quy-trinh"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[#222222] bg-[#fdd800] hover:bg-[#ffe340] px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Xem quy trình 5 bước &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
