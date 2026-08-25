import Icon from "@/components/Icon";
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
    <section className="bg-white py-16 md:py-24 relative z-20" id="giai-phap">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro.split("chọn").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">chọn</span>}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-100 p-6 text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow bg-white flex flex-col items-center">
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#fdd800]/10 border border-[#fdd800]/20">
                  <Icon name={item.icon} className="h-10 w-10 text-[#222222]" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                  <Icon name="shield-check" className="h-4 w-4 text-[#fdd800]" />
                </div>
              </div>
              <h3 className="font-extrabold text-[#222222] text-[15px] leading-snug">{item.title}</h3>
              <p className="mt-3 text-[13px] text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-full border border-[#fdd800] bg-white px-10 py-5 flex items-center justify-center gap-6 shadow-md shadow-[#fdd800]/10 relative">
          <span className="text-[#fdd800] text-5xl leading-none font-serif absolute left-8 top-2">&ldquo;</span>
          <p className="text-xl font-extrabold text-[#222222] z-10 pl-8">
            {quote}
          </p>
          <div className="flex items-center ml-4">
             <Icon name="box" className="h-10 w-10 text-[#222222]" />
          </div>
        </div>
      </div>
    </section>
  );
}
