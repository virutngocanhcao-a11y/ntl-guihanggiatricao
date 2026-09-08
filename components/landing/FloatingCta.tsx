"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/Icon";

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show when scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Hotline Quick Call */}
      <a
        href="tel:19006366888"
        className="hidden sm:flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 px-4 py-3 text-xs font-bold text-[#1a1a1a] shadow-lg hover:shadow-xl hover:border-[#fdd800] transition-all"
        title="Gọi hotline 1900 63 6688"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fdd800] text-[#222222]">
          <Icon name="phone" className="h-3 w-3" />
        </span>
        <span>1900 63 6688</span>
      </a>

      {/* Main Floating Form CTA */}
      <a
        href="#dang-ky"
        className="flex items-center gap-2.5 rounded-full bg-[#fdd800] px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#222222] shadow-2xl hover:bg-[#ffe340] hover:scale-105 transition-all border-2 border-white ring-4 ring-[#fdd800]/20"
      >
        <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span>Điền form tư vấn</span>
      </a>
    </div>
  );
}
