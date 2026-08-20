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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-content px-6">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          {intro}
        </h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="relative h-40 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-navy">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-gold">•</span> {bullet}
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
