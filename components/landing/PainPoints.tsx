import Icon from "@/components/Icon";
import { PainPoint } from "@/lib/content-schema";

export default function PainPoints({
  intro,
  items,
  bannerNote,
}: {
  intro: string;
  items: PainPoint[];
  bannerNote: string;
}) {
  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
        {intro}
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-gold" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/5">
              <Icon name={item.icon} className="h-7 w-7 text-navy" />
            </div>
            <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 px-5 py-4">
        <Icon name="box" className="h-6 w-6 shrink-0 text-gold" />
        <p className="text-sm font-medium text-navy">{bannerNote}</p>
      </div>
    </section>
  );
}
