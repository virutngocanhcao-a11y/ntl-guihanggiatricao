"use client";

import { CtaBannerContent } from "@/lib/content-schema";
import Image from "next/image";

export default function CtaBanner({ content }: { content: CtaBannerContent }) {
  const slogan =
    content?.titleLine1 && content.titleLine1 !== "Giá trị được trao đi."
      ? content.titleLine1
      : "HƠN CẢ MỘT DỊCH VỤ";

  return (
    <section className="bg-gradient-to-r from-gold via-gold-mid to-gold overflow-hidden border-y border-gold shadow-inner py-6 sm:py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        
        {/* Truck visual - Framed cleanly */}
        <div className="relative h-36 w-60 sm:h-40 sm:w-68 md:h-44 md:w-80 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 shrink-0">
          <Image
            src={content?.image || "/images/cta-truck.jpg"}
            alt="Nhất Tín Logistics Truck"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 240px, 320px"
          />
        </div>

        {/* Center: Slogan */}
        <div className="flex-1 text-center sm:text-left px-2 lg:px-6">
          <p className="text-xs uppercase font-extrabold tracking-widest text-navy/70 mb-1">
            Nhất Tín Logistics
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black uppercase text-navy tracking-tight leading-tight">
            {slogan}
          </h2>
          {content?.titleLine2 && content.titleLine2 !== "Chữ Tín được giữ lại." && (
            <p className="text-sm font-bold text-navy/80 mt-1">{content.titleLine2}</p>
          )}
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0">
          <button
            onClick={() => window.dispatchEvent(new Event("open-lead-form"))}
            className="whitespace-nowrap rounded-xl bg-navy px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-black shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ring-4 ring-black/10"
          >
            Đăng ký tư vấn ngay &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
