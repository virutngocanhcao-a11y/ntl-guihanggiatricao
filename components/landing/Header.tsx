export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <span className="text-[22px] font-extrabold tracking-tight">
          <span className="text-[#fdd800]">Nhất Tín</span> Logistics
        </span>
        <nav className="hidden gap-8 text-[13px] font-semibold text-white/90 md:flex uppercase tracking-wider">
          <a href="#giai-phap" className="hover:text-[#fdd800] transition-colors">Giải pháp</a>
          <a href="#quy-trinh" className="hover:text-[#fdd800] transition-colors">Quy trình</a>
          <a href="#faq" className="hover:text-[#fdd800] transition-colors">FAQ</a>
          <a href="#lien-he" className="hover:text-[#fdd800] transition-colors">Liên hệ</a>
        </nav>
        <a
          href="#dang-ky"
          className="rounded-lg bg-[#fdd800] px-5 py-2.5 text-[13px] font-bold text-[#222222] hover:bg-[#ffe340] transition-colors uppercase shadow-sm"
        >
          Đăng ký tư vấn ngay &rarr;
        </a>
      </div>
    </header>
  );
}
