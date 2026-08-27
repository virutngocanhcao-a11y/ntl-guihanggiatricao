import { FooterContent } from "@/lib/content-schema";
import Icon from "@/components/Icon";

export default function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-white py-10 text-gray-700 border-t border-gray-200" id="lien-he">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-[15px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-extrabold text-[#1a1a1a]">{content.companyName}</span> – <span className="text-gray-500">{content.tagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="tel:19006366888" className="flex items-center gap-2 hover:text-[#d99400] transition-colors font-medium">
            <Icon name="phone" className="h-5 w-5 text-[#d99400]" />
            {content.hotline}
          </a>
          <a href="https://www.ntlogistics.vn" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#d99400] transition-colors font-medium">
            <Icon name="globe" className="h-5 w-5 text-[#d99400]" />
            {content.website}
          </a>
          <a href="mailto:cskh@ntlogistics.vn" className="flex items-center gap-2 hover:text-[#d99400] transition-colors font-medium">
            <Icon name="envelope" className="h-5 w-5 text-[#d99400]" />
            {content.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
