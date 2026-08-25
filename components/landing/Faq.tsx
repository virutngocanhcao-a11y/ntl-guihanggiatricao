"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/content-schema";

export default function Faq({ intro, items }: { intro: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-24" id="faq">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl">
          {intro}
        </h2>

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="flex items-center gap-4 text-base font-bold text-[#222222]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fdd800] text-sm font-bold text-white">
                      ?
                    </span>
                    {item.question}
                  </span>
                  <span className="text-xl text-[#222222] font-light">{isOpen ? "−" : "+"}</span>
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
    </section>
  );
}
