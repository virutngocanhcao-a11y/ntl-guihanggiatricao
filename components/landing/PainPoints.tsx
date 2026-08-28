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
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow relative overflow-hidden flex flex-row items-center gap-6"
            >
              <div className="w-32 h-24 rounded-xl overflow-hidden relative shrink-0">
                <Image src={painImages[i] || painImages[0]} alt={item.title} fill className="object-cover" sizes="128px" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fdd800]/15 text-[#d99400] shrink-0">
                     <Icon name={item.icon} className="h-5 w-5" />
                   </div>
                   <h3 className="text-lg font-bold text-[#222222] leading-snug">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 md:mt-10 max-w-3xl rounded-2xl bg-gradient-to-r from-[#fdd800]/15 via-[#fdd800]/5 to-transparent border border-[#fdd800]/40 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
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
