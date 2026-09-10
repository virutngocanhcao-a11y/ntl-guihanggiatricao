import { FooterContent } from "@/lib/content-schema";
import { HOTLINE_TEL_HREF } from "@/lib/contact";
import Icon from "@/components/Icon";

export default function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-white py-6 md:py-8 text-gray-700 border-t border-gray-200" id="lien-he">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-[15px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-extrabold text-navy">{content.companyName}</span> – <span className="text-gray-500">{content.tagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={HOTLINE_TEL_HREF} className="flex items-center gap-2.5 text-navy hover:text-black transition-colors font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy shrink-0 shadow-sm">
              <Icon name="phone" className="h-3.5 w-3.5" />
            </span>
            {content.hotline}
          </a>
          <a href="https://www.ntlogistics.vn" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-navy hover:text-black transition-colors font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy shrink-0 shadow-sm">
              <Icon name="globe" className="h-3.5 w-3.5" />
            </span>
            {content.website}
          </a>
          <a href="mailto:cskh@ntlogistics.vn" className="flex items-center gap-2.5 text-navy hover:text-black transition-colors font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy shrink-0 shadow-sm">
              <Icon name="envelope" className="h-3.5 w-3.5" />
            </span>
            {content.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
