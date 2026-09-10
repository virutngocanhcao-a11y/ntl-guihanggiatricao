import Icon from "@/components/Icon";
import Image from "next/image";
import { WhyReason } from "@/lib/content-schema";
import SectionCta from "./SectionCta";

export default function WhyChooseUs({
  intro,
  items,
}: {
  intro: string;
  items: WhyReason[];
  quote?: string;
}) {
  return (
    <section className="bg-surface text-ink py-10 md:py-14 relative z-20 overflow-hidden border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-ink md:text-4xl max-w-5xl mx-auto leading-tight lg:whitespace-nowrap">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="relative inline-block pb-2.5 mx-1.5">
                  <span className="relative z-10">chọn</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-gold rounded-full" />
                </span>
              )}
            </span>
          ))}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200/90 bg-white p-6 text-center shadow-sm hover:shadow-xl hover:border-gold transition-all hover:-translate-y-1.5 flex flex-col items-center group duration-300">
              <div className="relative mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy shadow-sm shadow-gold/20 group-hover:scale-110 transition-all duration-300">
                  <Icon name={item.icon} className="h-7 w-7 text-navy" />
                </div>
              </div>
              <h3 className="font-extrabold text-navy text-[15px] md:text-base leading-snug transition-colors">{item.title}</h3>
              <p className="mt-2 text-[13px] md:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <SectionCta>Trở thành đối tác của Nhất Tín &rarr;</SectionCta>
        </div>
      </div>
    </section>
  );
}
