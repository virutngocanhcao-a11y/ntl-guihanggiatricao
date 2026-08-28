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
        <h2 className="text-center text-3xl font-extrabold text-[#1a1a1a] md:text-4xl max-w-3xl mx-auto">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">chọn</span>}
            </span>
          ))}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200/80 bg-white p-6 text-center shadow-sm hover:shadow-xl hover:border-[#fdd800] transition-all flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fdd800]/15 border border-[#fdd800]/30 group-hover:scale-105 transition-transform">
                  <Icon name={item.icon} className="h-8 w-8 text-[#d99400]" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-200">
                  <Icon name="shield-check" className="h-3.5 w-3.5 text-[#d99400]" />
                </div>
              </div>
              <h3 className="font-extrabold text-[#1a1a1a] text-[15px] leading-snug">{item.title}</h3>
              <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 md:mt-10 max-w-2xl rounded-full border-2 border-[#fdd800] bg-white px-8 py-4 flex items-center justify-center gap-6 shadow-md shadow-[#fdd800]/15 relative">
          <span className="text-[#d99400] text-4xl leading-none font-serif absolute left-6 top-1">&ldquo;</span>
          <p className="text-lg font-extrabold text-[#1a1a1a] z-10 pl-6">
            {quote}
          </p>
          <div className="flex items-center ml-2">
             <Icon name="box" className="h-8 w-8 text-[#d99400]" />
          </div>
        </div>
      </div>
    </section>
  );
}
