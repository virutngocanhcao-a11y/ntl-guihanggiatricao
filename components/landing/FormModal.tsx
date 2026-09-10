"use client";

import { useState, useEffect } from "react";
import LeadForm from "./LeadForm";

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleOpenModal() {
      setIsOpen(true);
    }
    window.addEventListener("open-lead-form", handleOpenModal);
    return () => window.removeEventListener("open-lead-form", handleOpenModal);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Đóng"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <LeadForm />
      </div>
    </div>
  );
}
