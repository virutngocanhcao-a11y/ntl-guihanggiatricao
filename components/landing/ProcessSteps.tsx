import { ProcessStep } from "@/lib/content-schema";
import Image from "next/image";

const stepImages = [
  '/images/step-consult.jpg', 
  '/images/step-packing.jpg', 
  '/images/step-transport.jpg', 
  '/images/step-delivery.jpg', 
  '/images/step-insurance.jpg'
];

export default function ProcessSteps({
  intro,
  steps,
}: {
  intro: string;
  steps: ProcessStep[];
}) {
  return (
    <section className="bg-white py-10 md:py-14 text-[#1a1a1a] border-b border-gray-100" id="quy-trinh">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl">
          {intro.split("giá trị cao").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">giá trị cao</span>}
            </span>
          ))}
        </h2>

        <div className="relative mt-8 md:mt-10">
          {/* Timeline Line */}
          <div className="absolute top-28 left-[10%] right-[10%] h-1 bg-[#fdd800]/40 hidden lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center group">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#fdd800] mx-auto mb-3 shadow-md group-hover:scale-105 transition-transform">
                  <Image src={stepImages[i] || stepImages[0]} alt={step.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#fdd800] text-base font-extrabold text-[#222222] shadow-md group-hover:bg-[#ffe340] transition-colors">
                  {step.number}
                </div>
                <h3 className="mt-3 text-base font-bold text-[#1a1a1a] px-1 leading-snug h-10 flex items-center justify-center">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] md:text-sm text-gray-600 leading-relaxed px-1">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fdd800] px-7 py-3 text-xs sm:text-sm font-extrabold uppercase text-[#222222] hover:bg-[#ffe340] shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              Tư vấn quy trình cho lô hàng của bạn &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
