import Icon from "@/components/Icon";
import SectionHeading from "./SectionHeading";
import { WhyReason } from "@/lib/content-schema";

export default function WhyChooseUs({
  intro,
  items,
  quote,
}: {
  intro: string;
  items: WhyReason[];
  quote: string;
}) {
  return (
    <section className="relative z-20 overflow-hidden bg-[#fafafa] py-16 text-[#1a1a1a] md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Năng lực" title={intro} highlight="Nhất Tín Logistics" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {items.map((item) => (
            <div key={item.title} className="group flex flex-col items-center rounded-xl border border-gray-200/80 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fdd800]/15">
                <Icon name={item.icon} className="h-6 w-6 text-[#d99400]" />
              </div>
              <h3 className="text-[15px] font-semibold leading-[1.45] text-[#1a1a1a]">{item.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center md:mt-14">
          <p className="text-[19px] font-semibold leading-[1.5] text-[#1a1a1a] md:text-[22px]">
            <span className="text-[#d99400]">&ldquo;</span>
            {quote}
            <span className="text-[#d99400]">&rdquo;</span>
          </p>
        </div>
      </div>
    </section>
  );
}
