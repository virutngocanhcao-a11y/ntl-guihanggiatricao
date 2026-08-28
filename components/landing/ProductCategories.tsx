import Image from "next/image";
import { ProductCategory } from "@/lib/content-schema";

export default function ProductCategories({
  intro,
  items,
}: {
  intro: string;
  items: ProductCategory[];
}) {
  return (
    <section className="bg-[#f8f9fa] py-10 md:py-14 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-8 md:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white border border-gray-100 text-center shadow-md shadow-gray-200/50 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-56 w-full p-4 bg-gray-50/50 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <Image src={item.image} alt={item.title} fill className="object-contain group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 250px" />
                </div>
              </div>
              <div className="p-4 border-t border-gray-50">
                <p className="text-[15px] font-bold text-[#222222] leading-snug">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
