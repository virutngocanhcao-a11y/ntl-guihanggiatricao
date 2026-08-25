import { CtaBannerContent } from "@/lib/content-schema";
import Image from "next/image";

export default function CtaBanner({ content }: { content: CtaBannerContent }) {
  return (
    <section className="bg-[#222222]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-0 sm:flex-row sm:justify-between sm:text-left h-[280px]">
        
        <div className="relative hidden sm:block h-full w-[450px] shrink-0 self-end">
          {/* Yellow truck image */}
          <div className="absolute bottom-0 left-0 h-[120%] w-full flex items-end justify-center pointer-events-none">
            <div className="relative w-[120%] h-full">
              <Image src="/images/cta-truck.jpg" alt="Nhất Tín Logistics Truck" fill className="object-cover rounded-tl-3xl rounded-tr-3xl shadow-lg" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 py-14 self-center w-full">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl text-center md:text-left">
            {content.titleLine1}
            <br />
            <span className="text-[#fdd800]">{content.titleLine2}</span>
          </h2>
          <a
            href="#dang-ky"
            className="whitespace-nowrap rounded-lg bg-[#fdd800] px-8 py-4 text-base font-bold text-[#222222] hover:bg-[#ffe340] shadow-md transition-colors"
          >
            Đăng ký tư vấn ngay &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
