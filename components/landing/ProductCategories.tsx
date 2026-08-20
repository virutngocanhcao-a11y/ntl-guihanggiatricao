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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-content px-6">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          {intro}
        </h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-xl bg-white text-center shadow-sm"
            >
              <div className="relative h-36 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="px-3 py-4 text-sm font-semibold text-navy">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
