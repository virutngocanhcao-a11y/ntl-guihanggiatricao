"use client";

import { GlobalSettings } from "@/lib/content-schema";
import { useState } from "react";

export default function Header({ global }: { global?: GlobalSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-[#1a1a1a]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center">
          {global?.logoImage ? (
            <img src={global.logoImage} alt="Nhất Tín Logistics" className="h-8 md:h-10 w-auto object-contain" />
          ) : (
            <span className="text-[22px] font-extrabold tracking-tight text-[#222222]">
              <span className="bg-[#fdd800] text-[#222222] px-1.5 py-0.5 rounded-md mr-1">Nhất Tín</span>Logistics
            </span>
          )}
        </a>
        <nav className="hidden gap-8 text-[13px] font-bold text-[#222222] md:flex uppercase tracking-wider">
          <a href="#giai-phap" className="hover:text-black hover:underline hover:decoration-[#fdd800] hover:decoration-2 hover:underline-offset-4 transition-colors">Giải pháp</a>
          <a href="#quy-trinh" className="hover:text-black hover:underline hover:decoration-[#fdd800] hover:decoration-2 hover:underline-offset-4 transition-colors">Quy trình</a>
          <a href="#faq" className="hover:text-black hover:underline hover:decoration-[#fdd800] hover:decoration-2 hover:underline-offset-4 transition-colors">FAQ</a>
          <a href="#lien-he" className="hover:text-black hover:underline hover:decoration-[#fdd800] hover:decoration-2 hover:underline-offset-4 transition-colors">Liên hệ</a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#dang-ky"
            className="rounded-xl bg-[#fdd800] px-5 py-2.5 text-[13px] font-extrabold text-[#222222] hover:bg-[#ffe340] transition-all uppercase shadow-sm hover:shadow-md hover:scale-[1.02]"
          >
            Đăng ký tư vấn ngay &rarr;
          </a>
          <button
            className="md:hidden text-[#1a1a1a] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 flex flex-col gap-4 px-6 py-6 text-[13px] font-bold text-[#222222] uppercase tracking-wider shadow-2xl">
          <a href="#giai-phap" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">Giải pháp</a>
          <a href="#quy-trinh" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">Quy trình</a>
          <a href="#faq" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">FAQ</a>
          <a href="#lien-he" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">Liên hệ</a>
        </div>
      )}
    </header>
  );
}
