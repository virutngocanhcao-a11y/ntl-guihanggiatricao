import { ProcessStep } from "@/lib/content-schema";
import Image from "next/image";
import SectionCta from "./SectionCta";

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
    <section className="bg-white py-10 md:py-14 text-ink border-b border-gray-100" id="quy-trinh">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-ink md:text-4xl leading-snug">
          {intro.split("giá trị cao").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="relative inline-block pb-2.5 mx-1.5">
                  <span className="relative z-10">giá trị cao</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 bg-gold rounded-full" />
                </span>
              )}
            </span>
          ))}
        </h2>

        <div className="relative mt-8 md:mt-10">
          {/* Timeline Line */}
          <div className="absolute top-[112px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent hidden lg:block z-0" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center group flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold mx-auto mb-3 shadow-md group-hover:scale-110 transition-all duration-300 ring-4 ring-gold/20">
                  <Image src={stepImages[i] || stepImages[0]} alt={step.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold text-base font-extrabold text-navy shadow-md group-hover:bg-gold-light group-hover:scale-110 transition-all duration-300 ring-2 ring-white">
                  {step.number}
                </div>
                <h3 className="mt-3 text-base font-extrabold text-navy px-1 leading-snug h-12 flex items-center justify-center">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] md:text-sm text-gray-600 leading-relaxed px-1 max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <SectionCta>Tư vấn quy trình cho lô hàng của bạn &rarr;</SectionCta>
          </div>
        </div>
      </div>
    </section>
  );
}
