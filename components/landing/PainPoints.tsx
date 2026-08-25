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
    <section className="bg-white py-16 md:py-24 relative z-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-extrabold text-[#222222] md:text-4xl max-w-3xl mx-auto">
          {intro}
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow relative overflow-hidden"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 border border-gray-100 relative">
                <Icon name={item.icon} className="h-8 w-8 text-[#222222]" />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#fdd800] border-2 border-white flex items-center justify-center">
                  <Icon name="shield-check" className="h-3 w-3 text-[#222222]" />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#222222]">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-4 rounded-full border-2 border-[#fdd800] bg-[#fdd800]/10 px-8 py-5">
          <Icon name="building" className="h-7 w-7 shrink-0 text-[#fdd800]" />
          <p className="text-base font-bold text-[#222222]">{bannerNote}</p>
        </div>
      </div>
    </section>
  );
}
