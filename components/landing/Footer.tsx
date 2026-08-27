import { FooterContent } from "@/lib/content-schema";
import Icon from "@/components/Icon";

export default function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-[#1a1a1a] py-8 text-white/80 border-t border-[#fdd800]/20" id="lien-he">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-[15px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-extrabold text-[#fdd800]">{content.companyName}</span> – {content.tagline}
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="tel:19006366888" className="flex items-center gap-2">
            <Icon name="phone" className="h-5 w-5 text-white/60" />
            {content.hotline}
          </a>
          <a href="https://www.ntlogistics.vn" target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <Icon name="globe" className="h-5 w-5 text-white/60" />
            {content.website}
          </a>
          <a href="mailto:cskh@ntlogistics.vn" className="flex items-center gap-2">
            <Icon name="envelope" className="h-5 w-5 text-white/60" />
            {content.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
