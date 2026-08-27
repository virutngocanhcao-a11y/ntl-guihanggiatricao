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
    <section className="bg-[#222222] text-white py-16 md:py-24 relative z-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/warehouse-bg.jpg" alt="Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#222222]/80"></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <h2 className="text-center text-3xl font-extrabold text-white md:text-4xl max-w-3xl mx-auto">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">chọn</span>}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 p-6 text-center shadow-lg hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-sm flex flex-col items-center">
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#fdd800]/20 border border-[#fdd800]/30">
                  <Icon name={item.icon} className="h-10 w-10 text-[#fdd800]" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#222222] flex items-center justify-center shadow-sm border border-white/10">
                  <Icon name="shield-check" className="h-4 w-4 text-[#fdd800]" />
                </div>
              </div>
              <h3 className="font-extrabold text-white text-[15px] leading-snug">{item.title}</h3>
              <p className="mt-3 text-[13px] text-white/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-full border border-[#fdd800] bg-white/10 backdrop-blur-sm px-10 py-5 flex items-center justify-center gap-6 shadow-md shadow-[#fdd800]/10 relative">
          <span className="text-[#fdd800] text-5xl leading-none font-serif absolute left-8 top-2">&ldquo;</span>
          <p className="text-xl font-extrabold text-white z-10 pl-8">
            {quote}
          </p>
          <div className="flex items-center ml-4">
             <Icon name="box" className="h-10 w-10 text-[#fdd800]" />
          </div>
        </div>
      </div>
    </section>
  );
}
