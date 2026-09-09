import { ProcessStep } from "@/lib/content-schema";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

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
    <section className="bg-white py-16 text-[#1a1a1a] md:py-24" id="quy-trinh">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Quy trình"
          title={intro}
          highlight="giá trị cao"
          subtitle="Năm bước kiểm soát chặt chẽ từ lúc tiếp nhận đến khi hàng đến tay người nhận."
        />

        <div className="relative mt-12 md:mt-16">
          {/* Timeline Line */}
          <div className="absolute left-[10%] right-[10%] top-[40px] z-0 hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div key={step.number} className="group flex flex-col items-center text-center">
                <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-white ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                  <Image src={stepImages[i] || stepImages[0]} alt={step.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#fdd800] text-[13px] font-bold text-[#1a1a1a]">
                  {step.number}
                </div>
                <h3 className="mt-4 px-1 text-[15px] font-semibold leading-[1.45] text-[#1a1a1a]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs px-1 text-[13.5px] leading-[1.65] text-gray-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:mt-14">
            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fdd800] px-7 py-3.5 text-[14px] font-bold text-[#1a1a1a] transition-colors hover:bg-[#ffe340]"
            >
              Tư vấn quy trình cho lô hàng của bạn &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
