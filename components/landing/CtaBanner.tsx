"use client";

import { CtaBannerContent } from "@/lib/content-schema";
import Image from "next/image";

export default function CtaBanner({ content }: { content: CtaBannerContent }) {
  return (
    <section className="bg-gradient-to-r from-[#fdd800] via-[#ffe033] to-[#ffea66] overflow-hidden shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 sm:gap-8 px-6 sm:flex-row sm:justify-between sm:text-left min-h-[240px] py-6 sm:py-0">
        
        <div className="relative hidden sm:block h-52 sm:h-[210px] md:h-[230px] w-full sm:w-[320px] md:w-[400px] shrink-0 self-end">
          {/* Yellow truck image */}
          <div className="absolute bottom-0 left-0 h-[112%] w-full flex items-end justify-center pointer-events-none">
            <div className="relative w-[115%] h-full">
              <Image src="/images/cta-truck.jpg" alt="Nhất Tín Logistics Truck" fill className="object-cover rounded-tl-2xl rounded-tr-2xl shadow-lg" sizes="(max-width: 640px) 100vw, 400px" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-7 sm:py-8 self-center w-full">
          <h2 className="text-center text-[22px] font-bold leading-[1.35] tracking-[-0.01em] text-[#1a1a1a] sm:text-left sm:text-[26px] md:text-[30px]">
            {content.titleLine1}
            <br />
            <span className="font-extrabold">{content.titleLine2}</span>
          </h2>
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-form"))}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-[#1a1a1a] px-8 py-4 text-center text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#333333]"
          >
            Đăng ký tư vấn ngay &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
