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
    <section className="bg-[#222222] py-16 md:py-24 text-white" id="quy-trinh">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">
          {intro.split("giá trị cao").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="border-b-4 border-[#fdd800]">giá trị cao</span>}
            </span>
          ))}
        </h2>

        <div className="relative mt-20">
          {/* Timeline Line */}
          <div className="absolute top-24 left-[10%] right-[10%] h-0.5 bg-[#fdd800]/30 hidden lg:block" />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center group">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#fdd800]/30 mx-auto mb-4">
                  <Image src={stepImages[i] || stepImages[0]} alt={step.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fdd800] text-xl font-extrabold text-[#222222] shadow-[0_0_0_8px_rgba(253,216,0,0.15)] group-hover:shadow-[0_0_0_12px_rgba(253,216,0,0.2)] transition-shadow">
                  {step.number}
                </div>
                <h3 className="mt-8 text-lg font-bold text-white px-2 leading-snug h-12 flex items-center justify-center">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm text-white/70 leading-relaxed px-1">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
