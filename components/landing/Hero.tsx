import Image from "next/image";
import Icon from "@/components/Icon";
import { HeroContent } from "@/lib/content-schema";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden bg-white pt-24 text-[#1a1a1a] lg:min-h-[560px] lg:pt-16 xl:min-h-[600px]">
      
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 pb-14 lg:pb-16">
        
        {/* LEFT: TEXT & ACTION */}
        <div className="w-full lg:w-[52%] xl:w-[48%] shrink-0">
          <h1 className="text-[30px] font-extrabold leading-[1.22] md:text-[38px] lg:text-[42px] xl:text-[46px] uppercase tracking-[-0.015em] text-[#1a1a1a]">
            <span className="block">{content.titleLine1}</span>
            <span className="block text-[#d99400]">{content.titleLine2}</span>
            <span className="block">{content.titleLine3}</span>
          </h1>

          <p className="mt-5 max-w-[440px] text-[15px] leading-[1.7] text-gray-500">
            {content.subtitle}
          </p>

          {/* 3 Badges on 1 row */}
          <div className="mt-7 flex max-w-lg flex-wrap items-center justify-start gap-2.5 sm:flex-nowrap">
            {content.badges.map((badge) => (
              <div key={badge.label} className="flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white/90 px-3.5 text-[13px] font-medium text-gray-700 backdrop-blur-sm sm:justify-start">
                <Icon name={badge.icon} className="h-4 w-4 shrink-0 text-[#d99400]" />
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fdd800] px-7 py-3.5 text-[14px] font-bold text-[#1a1a1a] shadow-sm transition-colors hover:bg-[#ffe340]"
            >
              Nhận tư vấn giải pháp
            </a>
            <a
              href="#quy-trinh"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-[14px] font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              Xem quy trình 5 bước &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
