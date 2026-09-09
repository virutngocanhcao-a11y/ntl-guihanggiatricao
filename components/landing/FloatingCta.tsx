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
        className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-4 py-3 text-[13px] font-medium text-[#1a1a1a] shadow-md backdrop-blur-sm transition-colors hover:border-gray-300 sm:flex"
        title="Gọi hotline 1900 63 6688"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fdd800] text-[#1a1a1a]">
          <Icon name="phone" className="h-3 w-3" />
        </span>
        <span>1900 63 6688</span>
      </a>

      {/* Main Floating Form CTA */}
      <a
        href="#dang-ky"
        className="flex items-center gap-2 rounded-full bg-[#fdd800] px-6 py-3.5 text-[13.5px] font-bold text-[#1a1a1a] shadow-lg transition-colors hover:bg-[#ffe340]"
      >
        <span>Điền form tư vấn</span>
      </a>
    </div>
  );
}
