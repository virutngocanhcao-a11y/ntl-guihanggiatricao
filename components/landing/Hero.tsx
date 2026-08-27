import Image from "next/image";
import Icon from "@/components/Icon";
import { HeroContent } from "@/lib/content-schema";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative bg-[#222222] text-white overflow-hidden min-h-[640px] lg:h-[720px] xl:h-[760px] flex items-center pt-24 lg:pt-0">
      
      {/* Background Graphic & Visual - Fully visible and unblocked */}
      <div className="absolute inset-0 z-0 flex justify-end opacity-95 mix-blend-lighten pointer-events-none">
        <div className="relative w-full h-full lg:w-[68%] xl:w-[65%] max-w-[1300px]">
          <Image
            src={content.heroImage}
            alt="Giao hàng giá trị cao Nhất Tín Logistics"
            fill
            style={{ objectFit: "cover", objectPosition: "center right" }}
            priority
            sizes="(max-width: 1024px) 100vw, 1300px"
          />
          {/* Subtle gradients to seamlessly merge edges into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/40 to-transparent lg:w-1/2"></div>
        </div>
      </div>
      
      {/* Very faint dotted pattern on the left side */}
      <div className="absolute inset-y-0 left-0 w-1/3 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fdd800_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,white,transparent)]"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-12 lg:py-0">
        
        {/* LEFT: TEXT & ACTION */}
        <div className="w-full lg:w-[52%] xl:w-[48%] shrink-0">
          <h1 className="text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-[54px] xl:text-[62px] uppercase tracking-tight">
            <span className="text-white block">{content.titleLine1}</span>
            <span className="text-[#fdd800] block mt-1 mb-1">{content.titleLine2}</span>
            <span className="text-white block whitespace-nowrap">{content.titleLine3}</span>
          </h1>
          
          <p className="mt-6 max-w-[500px] text-white/80 text-[16px] md:text-[18px] leading-relaxed">
            {content.subtitle}
          </p>

          {/* 3 Badges on 1 row */}
          <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center justify-start gap-3 max-w-xl">
            {content.badges.map((badge) => (
              <div key={badge.label} className="flex flex-1 items-center justify-center sm:justify-start gap-2 rounded-lg border border-white/10 bg-[#222222]/80 px-3.5 py-2.5 text-[13px] xl:text-sm font-semibold text-white backdrop-blur-md whitespace-nowrap h-12">
                <Icon name={badge.icon} className="h-5 w-5 text-[#fdd800] shrink-0" />
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#fdd800] px-8 py-4 text-base font-extrabold uppercase text-[#222222] hover:bg-[#ffe340] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Nhận tư vấn giải pháp
              <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#quy-trinh"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Xem quy trình 5 bước &rarr;
            </a>
          </div>

        </div>

      </div>

      {/* Thin yellow divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fdd800] z-20"></div>
    </section>
  );
}
