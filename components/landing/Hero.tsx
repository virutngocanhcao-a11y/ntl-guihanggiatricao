import Image from "next/image";
import Icon from "@/components/Icon";
import LeadForm from "./LeadForm";
import { HeroContent } from "@/lib/content-schema";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="bg-navy-dark text-white" id="dang-ky">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {content.titleLine1}
            <br />
            <span className="text-gold">{content.titleLine2}</span>
            <br />
            {content.titleLine3}
          </h1>
          <p className="mt-5 max-w-md text-white/80">{content.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {content.badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-white/90">
                <Icon name={badge.icon} className="h-8 w-8 rounded-full bg-white/10 p-1.5 text-gold" />
                {badge.label}
              </div>
            ))}
          </div>
          <div className="relative mt-8 hidden md:block">
            <Image
              src={content.heroImage}
              alt="Giao hàng giá trị cao"
              width={560}
              height={0}
              style={{ height: "auto", width: "100%" }}
              priority
            />
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
