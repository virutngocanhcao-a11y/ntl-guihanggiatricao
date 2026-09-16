import Icon from "@/components/Icon";
import { HOTLINE_TEL_HREF } from "@/lib/contact";
import LeadForm from "./LeadForm";

export default function ConsultationSection() {
  return (
    <section id="dang-ky" className="relative bg-surface text-ink py-10 md:py-14 overflow-hidden scroll-mt-10 border-b border-gray-200">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Prop & Trust */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                <Icon name="shield-check" className="h-3.5 w-3.5 text-navy" />
                Giải pháp B2B Chuyên Biệt
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-navy md:text-4xl lg:text-[40px] leading-tight">
                ĐĂNG KÝ NHẬN GIẢI PHÁP VẬN CHUYỂN CHO DOANH NGHIỆP
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
                Để lại thông tin nhu cầu vận chuyển. Đội ngũ Nhất Tín Logistics sẽ tư vấn phương án phù hợp theo loại hàng, sản lượng, tuyến giao và yêu cầu vận hành của doanh nghiệp.
              </p>
            </div>

            {/* 4 Value Pillars */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-gold hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy shadow-sm shadow-gold/20">
                  <Icon name="headset" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-snug">Tư vấn nhanh</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">Hỗ trợ doanh nghiệp xác định phương án phù hợp.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-gold hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy shadow-sm shadow-gold/20">
                  <Icon name="shield" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-snug">Bảo mật thông tin</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">Kiểm soát thông tin hàng hóa và dữ liệu giao nhận.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-gold hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy shadow-sm shadow-gold/20">
                  <Icon name="package" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-snug">Phương án vận chuyển phù hợp</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">Tư vấn theo đặc thù hàng hóa và tuyến giao.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:border-gold hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy shadow-sm shadow-gold/20">
                  <Icon name="trophy" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-snug">Chính sách doanh nghiệp</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">Linh hoạt theo sản lượng và nhu cầu vận chuyển.</p>
                </div>
              </div>
            </div>

            {/* Hotline banner - Sleek, lightweight, premium bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3.5 rounded-xl bg-white border border-gray-200/90 shadow-sm hover:border-gold transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/20 text-navy shrink-0">
                  <Icon name="phone" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Cần tư vấn trực tiếp ngay bây giờ?</p>
                  <p className="text-[15px] sm:text-base font-bold text-navy">
                    Hotline: <span className="font-extrabold text-navy tracking-tight">1900 63 6688</span> <span className="text-xs font-semibold text-gray-500">(phím 2)</span>
                  </p>
                </div>
              </div>
              <a 
                href={HOTLINE_TEL_HREF} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy hover:brightness-95 transition-all shadow-sm active:scale-95 shrink-0"
              >
                Gọi ngay &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold/30 to-gold/10 blur-md pointer-events-none"></div>
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
