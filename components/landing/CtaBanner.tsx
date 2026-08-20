import { CtaBannerContent } from "@/lib/content-schema";

export default function CtaBanner({ content }: { content: CtaBannerContent }) {
  return (
    <section className="bg-navy-dark">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {content.titleLine1}
          <br />
          <span className="text-gold">{content.titleLine2}</span>
        </h2>
        <a
          href="#dang-ky"
          className="whitespace-nowrap rounded-lg bg-gold px-6 py-3 font-bold text-navy-dark hover:bg-gold-light"
        >
          Đăng ký tư vấn ngay →
        </a>
      </div>
    </section>
  );
}
