import Image from "next/image";
import { SolutionCategory } from "@/lib/content-schema";

export default function SolutionsByCategory({
  intro,
  items,
}: {
  intro: string;
  items: SolutionCategory[];
}) {
  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24" id="giai-phap">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md shadow-gray-200/50 hover:shadow-xl transition-shadow flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center p-2">
              <div className="relative h-48 sm:h-56 w-full sm:w-1/2 lg:w-full xl:w-1/2 shrink-0 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-50">
                <div className="relative h-full w-full">
                  <Image src={item.image} alt={item.title} fill className="object-contain" sizes="(max-width: 640px) 100vw, 300px" />
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-4 xl:p-6 w-full">
                <h3 className="font-extrabold text-[#222222] text-lg">{item.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#222222]">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 items-start">
                      <span className="text-[#222222] mt-[2px] text-xs">●</span> 
                      <span className="font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
