"use client";

import { CtaBannerContent } from "@/lib/content-schema";
import Image from "next/image";

export default function CtaBanner({ content }: { content: CtaBannerContent }) {
  return (
    <section className="bg-gradient-to-r from-[#fdd800] via-[#ffe033] to-[#ffea66] overflow-hidden shadow-inner">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:gap-10 px-6 sm:flex-row sm:justify-between sm:text-left min-h-[260px] py-10 sm:py-0">
        
        <div className="relative hidden sm:block h-64 sm:h-[260px] md:h-[280px] w-full sm:w-[350px] md:w-[450px] shrink-0 self-end">
          {/* Yellow truck image */}
          <div className="absolute bottom-0 left-0 h-[115%] w-full flex items-end justify-center pointer-events-none">
            <div className="relative w-[120%] h-full">
              <Image src="/images/cta-truck.jpg" alt="Nhất Tín Logistics Truck" fill className="object-cover rounded-tl-3xl rounded-tr-3xl shadow-xl" sizes="(max-width: 640px) 100vw, 450px" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 sm:py-12 self-center w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl text-center sm:text-left tracking-tight">
            {content.titleLine1}
            <br />
            <span className="text-[#222222] font-black">{content.titleLine2}</span>
          </h2>
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-form"))}
            className="whitespace-nowrap rounded-xl bg-[#1a1a1a] px-8 py-4 text-base font-extrabold text-white hover:bg-[#333333] shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer text-center"
          >
            Đăng ký tư vấn ngay &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
