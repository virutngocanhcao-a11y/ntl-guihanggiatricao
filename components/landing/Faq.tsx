"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { FaqItem } from "@/lib/content-schema";

export default function Faq({ intro, items }: { intro: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#fafafa] py-16 md:py-24" id="faq">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Giải đáp" title={intro} />

        <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row lg:gap-12 md:mt-14">
          <div className="hidden w-full lg:block lg:w-[38%]">
            <div className="sticky top-20">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-gray-200">
                <Image src="/images/faq-illustration.jpg" alt="Tư vấn viên" fill className="object-cover" sizes="400px" />
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
                    className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                      isOpen ? "border-[#fdd800]" : "border-gray-200/80 hover:border-gray-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-3.5 text-[15px] font-semibold leading-[1.45] text-[#1a1a1a]">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fdd800] text-[11px] font-bold text-[#1a1a1a]">
                          ?
                        </span>
                        {item.question}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-[#1a1a1a]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-100 px-6 pb-6 pl-[3.25rem] pt-4">
                        <p className="text-[14.5px] leading-[1.75] text-gray-500">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#fdd800]/50 bg-[#fdd800]/[0.07] p-5 sm:flex-row">
              <div>
                <p className="text-[15px] font-semibold leading-[1.5] text-[#1a1a1a]">
                  Bạn có thắc mắc đặc thù cho đơn hàng của mình?
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-gray-500">
                  Chuyên viên logistics sẽ liên hệ giải đáp và tính toán chi phí chi tiết.
                </p>
              </div>
              <a
                href="#dang-ky"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1a1a1a] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#333333]"
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
