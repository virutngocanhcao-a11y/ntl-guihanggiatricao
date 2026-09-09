import Icon from "@/components/Icon";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
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
    <section className="relative z-20 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Thách thức"
          title={intro}
          subtitle="Những rủi ro doanh nghiệp thường gặp khi vận chuyển hàng có giá trị lớn."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
            >
              {/* Large Feature Image on Top */}
              <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-48">
                <Image
                  src={painImages[i] || painImages[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#fdd800]/20 text-[#b37700]">
                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-[15px] font-semibold leading-[1.4] text-[#1a1a1a]">{item.title}</h3>
                </div>
                <p className="flex-1 text-[13.5px] leading-[1.65] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-xl border border-[#fdd800]/50 bg-[#fdd800]/[0.07] p-6 sm:flex-row md:mt-14 lg:max-w-5xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fdd800] text-[#1a1a1a]">
              <Icon name="shield" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b37700]">
                Cam kết dịch vụ
              </p>
              <p className="mt-1 text-[16px] font-semibold leading-[1.5] text-[#1a1a1a] md:text-[17px]">
                {bannerNote}
              </p>
            </div>
          </div>
          <a
            href="#quy-trinh"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1a1a1a] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#333333]"
          >
            Xem quy trình 5 bước &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
