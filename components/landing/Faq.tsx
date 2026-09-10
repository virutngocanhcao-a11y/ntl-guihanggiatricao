"use client";

import { useState } from "react";
import Image from "next/image";
import { FaqItem } from "@/lib/content-schema";

export default function Faq({
  intro,
  items,
  image,
}: {
  intro: string;
  items: FaqItem[];
  image?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface py-10 md:py-14 border-b border-gray-200" id="faq">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-ink md:text-4xl mb-8 md:mb-10">
          {intro}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <div className="lg:w-[38%] hidden lg:block w-full">
            <div className="sticky top-20">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src={image || "/images/faq-illustration.jpg"}
                  alt="Tư vấn viên"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-[62%] w-full">
            <div className="space-y-3">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={item.question}
                    className={`rounded-2xl border bg-white transition-all overflow-hidden ${
                      isOpen
                        ? "border-gold shadow-md ring-1 ring-gold/30"
                        : "border-gray-200/90 shadow-sm hover:shadow-md hover:border-gold"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4.5 sm:py-5 text-left transition-colors hover:bg-gold/5"
                    >
                      <span className="flex items-center gap-3.5 text-[15px] sm:text-base font-extrabold text-navy">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-black text-navy">
                          ?
                        </span>
                        {item.question}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm text-navy font-extrabold transition-colors">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 pl-[3.25rem] border-t border-gray-100/80 bg-gray-50/30">
                        <p className="text-[15px] text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-white via-gold/10 to-white border-2 border-gold shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[15px] font-extrabold text-ink">Bạn có thắc mắc đặc thù cho đơn hàng của mình?</p>
                <p className="text-xs text-gray-500 mt-1">Chuyên viên logistics sẽ liên hệ giải đáp và tính toán chi phí chi tiết.</p>
              </div>
              <a
                href="#dang-ky"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-navy hover:bg-gold-light shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Đăng ký tư vấn ngay &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
