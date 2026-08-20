import Icon from "@/components/Icon";
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
    <section className="mx-auto max-w-content px-6 py-16" id="giai-phap">
      <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
        {intro}
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-100 p-6 shadow-sm">
            <Icon name={item.icon} className="h-9 w-9 text-gold" />
            <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-navy-dark px-8 py-6 text-center text-white">
        <p className="text-xl font-semibold">
          <span className="text-gold">&ldquo;</span> {quote}
        </p>
      </div>
    </section>
  );
}
