export default function Header() {
  return (
    <header className="bg-navy-dark text-white">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <span className="text-lg font-extrabold tracking-wide">
          <span className="text-gold">Nhất Tín</span> Logistics
        </span>
        <nav className="hidden gap-8 text-sm font-medium text-white/90 md:flex">
          <a href="#giai-phap" className="hover:text-gold">Giải pháp</a>
          <a href="#quy-trinh" className="hover:text-gold">Quy trình</a>
          <a href="#faq" className="hover:text-gold">FAQ</a>
          <a href="#lien-he" className="hover:text-gold">Liên hệ</a>
        </nav>
        <a
          href="#dang-ky"
          className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-navy-dark hover:bg-gold-light"
        >
          Đăng ký tư vấn →
        </a>
      </div>
    </header>
  );
}
