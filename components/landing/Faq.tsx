"use client";

import { useState } from "react";
import Image from "next/image";
import { FaqItem } from "@/lib/content-schema";

export default function Faq({ intro, items }: { intro: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#f8f9fa] py-7 md:py-9 border-b border-gray-200" id="faq">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-extrabold text-[#1a1a1a] md:text-3xl lg:text-4xl mb-6 md:mb-7">
          {intro}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <div className="lg:w-[38%] hidden lg:block w-full">
            <div className="sticky top-20">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <Image src="/images/faq-illustration.jpg" alt="Tư vấn viên" fill className="object-cover" sizes="400px" />
              </div>
            </div>
          </div>
          
          <div className="lg:w-[62%] w-full">
            <div className="space-y-3">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.question} className="rounded-xl border border-gray-200/90 bg-white shadow-sm hover:shadow-md hover:border-[#fdd800] transition-all">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-4 text-base font-bold text-[#1a1a1a]">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fdd800] text-sm font-bold text-[#222222]">
                          ?
                        </span>
                        {item.question}
                      </span>
                      <span className="text-xl text-[#222222] font-semibold">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 pl-[3.25rem]">
                        <p className="text-[15px] text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
