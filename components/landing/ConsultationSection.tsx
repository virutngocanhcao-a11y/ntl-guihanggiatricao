import Icon from "@/components/Icon";
import LeadForm from "./LeadForm";

export default function ConsultationSection() {
  return (
    <section id="dang-ky" className="relative bg-[#1a1a1a] text-white py-16 md:py-24 overflow-hidden scroll-mt-10 border-b border-[#fdd800]/20">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fdd800]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fdd800]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & Trust */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#fdd800]/30 bg-[#fdd800]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#fdd800]">
                <Icon name="shield-check" className="h-4 w-4 text-[#fdd800]" />
                Giải pháp B2B Chuyên Biệt
              </div>
              <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl leading-tight">
                Đăng Ký Nhận Báo Giá &amp; Tư Vấn Giải Pháp
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                Để lại thông tin lô hàng của bạn. Đội ngũ chuyên viên logistics cấp cao của Nhất Tín sẽ trực tiếp liên hệ khảo sát và thiết kế phương án vận chuyển tối ưu nhất.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fdd800] text-[#222222]">
                  <Icon name="headset" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Phản Hồi Trong 15 Phút</h3>
                  <p className="mt-1 text-sm text-white/70 leading-normal">Tư vấn viên liên hệ hỗ trợ nhanh và chuẩn xác.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fdd800] text-[#222222]">
                  <Icon name="shield" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bảo Mật &amp; Cam Kết</h3>
                  <p className="mt-1 text-sm text-white/70 leading-normal">Bảo mật thông tin đơn hàng và giá trị tài sản 100%.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fdd800] text-[#222222]">
                  <Icon name="package" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Lộ Trình Ưu Tiên</h3>
                  <p className="mt-1 text-sm text-white/70 leading-normal">Xếp lịch xe và phân luồng an ninh cao nhất.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#fdd800] text-[#222222]">
                  <Icon name="trophy" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Chính Sách Linh Hoạt</h3>
                  <p className="mt-1 text-sm text-white/70 leading-normal">Chiết khấu và hợp đồng linh hoạt cho doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#222222] border border-[#fdd800]/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdd800]/20 text-[#fdd800]">
                  <Icon name="phone" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">Cần tư vấn trực tiếp ngay bây giờ?</p>
                  <p className="text-lg font-extrabold text-[#fdd800]">Hotline: 1900 63 6688</p>
                </div>
              </div>
              <a 
                href="tel:19006366888" 
                className="w-full sm:w-auto text-center rounded-lg bg-[#fdd800] px-5 py-2.5 text-xs font-bold uppercase text-[#222222] hover:bg-[#ffe340] transition-colors shadow"
              >
                Gọi Ngay →
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#fdd800]/40 to-transparent blur-md pointer-events-none"></div>
              <div className="relative">
                <LeadForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
