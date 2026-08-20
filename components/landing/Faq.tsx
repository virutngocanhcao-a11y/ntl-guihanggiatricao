"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/content-schema";

export default function Faq({ intro, items }: { intro: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-content px-6 py-16" id="faq">
      <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
        {intro}
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-navy">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs text-gold">
                    ?
                  </span>
                  {item.question}
                </span>
                <span className="text-lg text-gold">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm text-gray-600">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
