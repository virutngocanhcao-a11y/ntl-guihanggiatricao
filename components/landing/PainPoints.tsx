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
    <section className="bg-white py-16 md:py-24 relative z-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
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
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 border border-gray-100 relative shrink-0">
                     <Icon name={item.icon} className="h-5 w-5 text-[#222222]" />
                     <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#fdd800] border border-white flex items-center justify-center">
                       <Icon name="shield-check" className="h-2 w-2 text-[#222222]" />
                     </div>
                   </div>
                   <h3 className="text-lg font-bold text-[#222222] leading-snug">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-4 rounded-full border-2 border-[#fdd800] bg-[#fdd800]/10 px-8 py-5">
          <Icon name="building" className="h-7 w-7 shrink-0 text-[#fdd800]" />
          <p className="text-base font-bold text-[#222222]">{bannerNote}</p>
        </div>
      </div>
    </section>
  );
}
