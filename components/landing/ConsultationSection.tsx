import Icon from "@/components/Icon";
import LeadForm from "./LeadForm";

export default function ConsultationSection() {
  return (
    <section id="dang-ky" className="relative scroll-mt-10 overflow-hidden bg-[#fafafa] py-16 text-[#1a1a1a] md:py-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -mr-20 -mt-20 right-0 top-0 h-96 w-96 rounded-full bg-[#fdd800]/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* Left Column: Value Prop & Trust */}
          <div className="space-y-7 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d99400]/25 bg-[#fdd800]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b37700]">
                <Icon name="shield-check" className="h-3.5 w-3.5 text-[#b37700]" />
                Giải pháp B2B chuyên biệt
              </div>
              <h2 className="mt-4 text-[26px] font-bold leading-[1.3] tracking-[-0.01em] text-[#1a1a1a] md:text-[32px] lg:text-[36px]">
                Đăng ký nhận báo giá &amp; tư vấn giải pháp
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-gray-500">
                Để lại thông tin lô hàng của bạn. Đội ngũ chuyên viên logistics cấp cao của Nhất Tín sẽ trực tiếp liên hệ khảo sát và thiết kế phương án vận chuyển tối ưu nhất.
              </p>
            </div>

            {/* 4 Value Pillars */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="flex gap-4 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-gray-300">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fdd800]/15 text-[#b37700]">
                  <Icon name="headset" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#1a1a1a]">Phản hồi trong 15 phút</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-gray-500">Tư vấn viên liên hệ hỗ trợ nhanh và chuẩn xác.</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-gray-300">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fdd800]/15 text-[#b37700]">
                  <Icon name="shield" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#1a1a1a]">Bảo mật &amp; cam kết</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-gray-500">Bảo mật thông tin đơn hàng và giá trị tài sản 100%.</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-gray-300">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fdd800]/15 text-[#b37700]">
                  <Icon name="package" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#1a1a1a]">Lộ trình ưu tiên</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-gray-500">Xếp lịch xe và phân luồng an ninh cao nhất.</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-gray-300">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fdd800]/15 text-[#b37700]">
                  <Icon name="trophy" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-snug text-[#1a1a1a]">Chính sách linh hoạt</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-gray-500">Chiết khấu và hợp đồng linh hoạt cho doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[#fdd800]/50 bg-[#fdd800]/[0.07] p-5 sm:flex-row">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdd800] text-[#1a1a1a]">
                  <Icon name="phone" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-500">Cần tư vấn trực tiếp ngay bây giờ?</p>
                  <p className="mt-0.5 text-[17px] font-bold text-[#1a1a1a]">
                    Hotline: <span className="text-[#d99400]">1900 63 6688</span>
                  </p>
                </div>
              </div>
              <a
                href="tel:19006366888"
                className="w-full rounded-lg bg-[#1a1a1a] px-6 py-3 text-center text-[13px] font-semibold text-white transition-colors hover:bg-[#333333] sm:w-auto"
              >
                Gọi ngay →
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
