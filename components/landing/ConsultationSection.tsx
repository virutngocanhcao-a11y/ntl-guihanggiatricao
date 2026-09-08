import Icon from "@/components/Icon";
import LeadForm from "./LeadForm";

export default function ConsultationSection() {
  return (
    <section id="dang-ky" className="relative bg-[#f8f9fa] text-[#1a1a1a] py-10 md:py-14 overflow-hidden scroll-mt-10 border-b border-gray-200">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fdd800]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Prop & Trust */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d99400]/30 bg-[#fdd800]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#b37700]">
                <Icon name="shield-check" className="h-3.5 w-3.5 text-[#b37700]" />
                Giải pháp B2B Chuyên Biệt
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] md:text-4xl lg:text-[42px] leading-tight">
                Đăng Ký Nhận Báo Giá &amp; Tư Vấn Giải Pháp
              </h2>
              <p className="mt-2.5 text-sm md:text-[15px] text-gray-600 leading-relaxed max-w-xl">
                Để lại thông tin lô hàng của bạn. Đội ngũ chuyên viên logistics cấp cao của Nhất Tín sẽ trực tiếp liên hệ khảo sát và thiết kế phương án vận chuyển tối ưu nhất.
              </p>
            </div>

            {/* 4 Value Pillars */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-[#fdd800] hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdd800] text-[#222222] shadow-sm shadow-[#fdd800]/20">
                  <Icon name="headset" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a]">Phản Hồi Trong 15 Phút</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-normal">Tư vấn viên liên hệ hỗ trợ nhanh và chuẩn xác.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-[#fdd800] hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdd800] text-[#222222] shadow-sm shadow-[#fdd800]/20">
                  <Icon name="shield" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a]">Bảo Mật &amp; Cam Kết</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-normal">Bảo mật thông tin đơn hàng và giá trị tài sản 100%.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-[#fdd800] hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdd800] text-[#222222] shadow-sm shadow-[#fdd800]/20">
                  <Icon name="package" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a]">Lộ Trình Ưu Tiên</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-normal">Xếp lịch xe và phân luồng an ninh cao nhất.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-[#fdd800] hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fdd800] text-[#222222] shadow-sm shadow-[#fdd800]/20">
                  <Icon name="trophy" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a]">Chính Sách Linh Hoạt</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-normal">Chiết khấu và hợp đồng linh hoạt cho doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-white via-[#fdd800]/5 to-[#fdd800]/15 border-2 border-[#fdd800] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdd800] text-[#222222] shadow-sm">
                  <Icon name="phone" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Cần tư vấn trực tiếp ngay bây giờ?</p>
                  <p className="text-lg font-extrabold text-[#1a1a1a]">Hotline: <span className="text-[#d99400]">1900 63 6688</span></p>
                </div>
              </div>
              <a 
                href="tel:19006366888" 
                className="w-full sm:w-auto text-center rounded-xl bg-[#fdd800] px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-[#222222] hover:bg-[#ffe340] transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                Gọi Ngay →
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#fdd800]/30 to-[#fdd800]/10 blur-md pointer-events-none"></div>
              <div className="relative border border-gray-200/80 rounded-2xl shadow-xl overflow-hidden">
                <LeadForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
