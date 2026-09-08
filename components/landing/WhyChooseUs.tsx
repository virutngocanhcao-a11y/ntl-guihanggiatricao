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
    <section className="bg-[#f8f9fa] text-[#1a1a1a] py-7 md:py-9 relative z-20 overflow-hidden border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <h2 className="text-center text-2xl font-extrabold text-[#1a1a1a] md:text-3xl lg:text-4xl max-w-3xl mx-auto">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">chọn</span>}
            </span>
          ))}
        </h2>

        <div className="mt-6 md:mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200/80 bg-white p-5 text-center shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all flex flex-col items-center group">
              <div className="relative mb-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fdd800]/15 border border-[#fdd800]/30 group-hover:scale-105 transition-transform">
                  <Icon name={item.icon} className="h-7 w-7 text-[#d99400]" />
                </div>
              </div>
              <h3 className="font-extrabold text-[#1a1a1a] text-[14.5px] leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-[12.5px] md:text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 md:mt-7 max-w-2xl rounded-full border-2 border-[#fdd800] bg-white px-7 py-3.5 flex items-center justify-center gap-5 shadow-sm relative">
          <span className="text-[#d99400] text-3xl leading-none font-serif absolute left-5 top-1">&ldquo;</span>
          <p className="text-base font-extrabold text-[#1a1a1a] z-10 pl-5">
            {quote}
          </p>
          <div className="flex items-center ml-1">
             <Icon name="box" className="h-7 w-7 text-[#d99400]" />
          </div>
        </div>

        <div className="mt-6 md:mt-7 text-center">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-7 py-3 text-xs sm:text-sm font-extrabold uppercase text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:scale-105 transition-all"
          >
            Trở thành đối tác của Nhất Tín &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
