import Image from "next/image";
import Icon from "@/components/Icon";
import LeadForm from "./LeadForm";
import { HeroContent } from "@/lib/content-schema";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative bg-[#222222] text-white overflow-hidden min-h-[680px] xl:h-[750px] flex items-center" id="dang-ky">
      
      {/* Background Graphic & Visual */}
      <div className="absolute inset-0 z-0 flex justify-center lg:justify-end opacity-90 mix-blend-lighten pointer-events-none">
        <div className="relative w-full h-full lg:w-[75%] max-w-[1200px]">
          <Image
            src={content.heroImage}
            alt="Giao hàng giá trị cao"
            fill
            style={{ objectFit: "cover", objectPosition: "center right" }}
            priority
          />
          {/* Subtle gradient to fade into background naturally */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Very faint dotted pattern on the left side only to avoid clutter */}
      <div className="absolute inset-y-0 left-0 w-1/2 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fdd800_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,white,transparent)]"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-10 px-6 py-12 lg:py-0">
        
        {/* LEFT: TEXT (approx 40%) */}
        <div className="w-full lg:w-[45%] xl:w-[40%] shrink-0">
          <h1 className="text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-[54px] xl:text-[64px] uppercase tracking-tight">
            <span className="text-white block">{content.titleLine1}</span>
            <span className="text-[#fdd800] block mt-1 mb-1">{content.titleLine2}</span>
            <span className="text-white block whitespace-nowrap">{content.titleLine3}</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-white/80 text-[17px] leading-relaxed">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap lg:flex-nowrap items-center justify-start gap-4">
            {content.badges.map((badge) => (
              <div key={badge.label} className="flex flex-1 items-center justify-center lg:justify-start gap-2.5 rounded-lg border border-white/10 bg-[#222222]/60 px-3 py-2.5 text-[13px] xl:text-sm font-semibold text-white backdrop-blur-md whitespace-nowrap h-12">
                <Icon name={badge.icon} className="h-5 w-5 text-[#fdd800] shrink-0" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
        
        {/* RIGHT: FORM (approx 30%) */}
        <div className="w-full max-w-[400px] lg:w-[30%] shrink-0 relative z-20">
          <LeadForm />
        </div>

      </div>

      {/* Thin yellow divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fdd800] z-20"></div>
    </section>
  );
}
