import Image from "next/image";
import Icon from "@/components/Icon";
import { HeroContent } from "@/lib/content-schema";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative bg-white text-[#1a1a1a] overflow-hidden min-h-[420px] lg:h-[470px] xl:h-[500px] flex items-center pt-20 lg:pt-0 border-b border-gray-200">
      
      {/* Background Graphic & Visual - White theme */}
      <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
        <div className="relative w-full h-full lg:w-[60%] xl:w-[58%] max-w-[1200px]">
          <Image
            src={content.heroImage}
            alt="Giao hàng giá trị cao Nhất Tín Logistics"
            fill
            style={{ objectFit: "contain", objectPosition: "center right" }}
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          {/* Subtle gradient to merge left side */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent hidden lg:block"></div>
        </div>
      </div>
      
      {/* Very faint decorative grid on the left */}
      <div className="absolute inset-y-0 left-0 w-1/3 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,white,transparent)]"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-6 lg:py-0">
        
        {/* LEFT: TEXT & ACTION */}
        <div className="w-full lg:w-[52%] xl:w-[48%] shrink-0">
          <h1 className="text-3xl font-extrabold leading-[1.1] md:text-4xl lg:text-[44px] xl:text-[48px] uppercase tracking-tight text-[#1a1a1a]">
            <span className="block">{content.titleLine1}</span>
            <span className="text-[#d99400] block mt-0.5 mb-0.5">{content.titleLine2}</span>
            <span className="block whitespace-nowrap">{content.titleLine3}</span>
          </h1>
          
          <p className="mt-3.5 max-w-[460px] text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
            {content.subtitle}
          </p>

          {/* 3 Badges on 1 row */}
          <div className="mt-5 flex flex-wrap sm:flex-nowrap items-center justify-start gap-2.5 max-w-lg">
            {content.badges.map((badge) => (
              <div key={badge.label} className="flex flex-1 items-center justify-center sm:justify-start gap-2 rounded-xl border border-gray-200/90 bg-white/90 backdrop-blur-sm px-3.5 py-2 text-[13px] font-bold text-gray-800 shadow-sm hover:border-[#fdd800] transition-all whitespace-nowrap h-10">
                <Icon name={badge.icon} className="h-4 w-4 text-[#d99400] shrink-0" />
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#fdd800] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#222222] hover:bg-[#ffe340] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Nhận tư vấn giải pháp
              <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#quy-trinh"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:-translate-y-0.5"
            >
              Xem quy trình 5 bước &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
