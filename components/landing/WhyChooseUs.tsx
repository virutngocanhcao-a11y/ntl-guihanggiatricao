import Icon from "@/components/Icon";
import Image from "next/image";
import { WhyReason } from "@/lib/content-schema";

export default function WhyChooseUs({
  intro,
  items,
  quote,
}: {
  intro: string;
  items: WhyReason[];
  quote: string;
}) {
  return (
    <section className="bg-[#f8f9fa] text-[#1a1a1a] py-10 md:py-14 relative z-20 overflow-hidden border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl max-w-5xl mx-auto leading-tight lg:whitespace-nowrap">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="relative inline-block pb-2.5 mx-1.5">
                  <span className="relative z-10">chọn</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#fdd800] rounded-full" />
                </span>
              )}
            </span>
          ))}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200/90 bg-white p-6 text-center shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all hover:-translate-y-1.5 flex flex-col items-center group duration-300">
              <div className="relative mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fdd800] text-[#222222] shadow-sm shadow-[#fdd800]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon name={item.icon} className="h-7 w-7 text-[#222222]" />
                </div>
              </div>
              <h3 className="font-extrabold text-[#222222] text-[15px] md:text-base leading-snug transition-colors">{item.title}</h3>
              <p className="mt-2 text-[13px] md:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 md:mt-10 max-w-2xl rounded-full border-2 border-[#fdd800] bg-gradient-to-r from-white via-[#fdd800]/5 to-white px-8 py-4 flex items-center justify-center gap-5 shadow-sm relative">
          <span className="text-[#fdd800] text-4xl leading-none font-serif absolute left-6 top-1">&ldquo;</span>
          <p className="text-base font-extrabold text-[#222222] z-10 pl-5">
            {quote}
          </p>
          <div className="flex items-center ml-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdd800] text-[#222222] shadow-sm">
              <Icon name="box" className="h-5 w-5 text-[#222222]" />
            </span>
          </div>
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            Trở thành đối tác của Nhất Tín &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
