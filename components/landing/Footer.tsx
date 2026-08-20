import { FooterContent } from "@/lib/content-schema";

export default function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="bg-navy-dark py-8 text-white/80" id="lien-he">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-bold text-white">{content.companyName}</span> – {content.tagline}
          <p className="text-white/50">© {new Date().getFullYear()} {content.companyName}. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <span>Hotline: {content.hotline}</span>
          <span>Website: {content.website}</span>
          <span>Email: {content.email}</span>
        </div>
      </div>
    </footer>
  );
}
