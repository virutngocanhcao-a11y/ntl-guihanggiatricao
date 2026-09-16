import { LandingContent } from "./content-schema";

export const defaultContent: LandingContent = {
  global: {
    logoImage: "",
    faviconImage: "",
  },
  hero: {
    titleLine1: "GIAO HÀNG",
    titleLine2: "GIÁ TRỊ CAO",
    titleLine3: "CHO DOANH NGHIỆP",
    subtitle:
      "Giải pháp vận chuyển dành cho doanh nghiệp, nhà phân phối và chuỗi bán lẻ có nhu cầu giao điện thoại, thiết bị điện tử, linh kiện, máy móc và các mặt hàng giá trị cao.",
    badges: [
      { icon: "map-pin", label: "Theo dõi hành trình" },
      { icon: "shield", label: "Bảo hiểm hàng hóa" },
      { icon: "headset", label: "Tư vấn giải pháp" },
    ],
    heroImage: "/images/key-visual.jpg",
  },
  painPointsIntro: "Với doanh nghiệp, một đơn hàng giá trị cao không chỉ là một kiện hàng",
  painPoints: [
    {
      icon: "box-alert",
      title: "Thất lạc hoặc hư hỏng hàng hóa",
      desc: "Có thể gây gián đoạn vận hành, phát sinh chi phí và ảnh hưởng kế hoạch kinh doanh.",
    },
    {
      icon: "search",
      title: "Khó kiểm soát hành trình",
      desc: "Thiếu thông tin trạng thái khiến doanh nghiệp khó theo dõi và xử lý đơn hàng.",
    },
    {
      icon: "star",
      title: "Ảnh hưởng trải nghiệm khách hàng",
      desc: "Giao chậm hoặc hàng lỗi có thể ảnh hưởng trực tiếp đến uy tín thương hiệu.",
    },
    {
      icon: "invoice",
      title: "Tăng chi phí xử lý sự cố",
      desc: "Phát sinh bồi hoàn, đối soát và khiếu nại làm tăng chi phí vận hành.",
    },
  ],
  bannerNote: "Hàng giá trị cao cần một quy trình giao nhận phù hợp với yêu cầu vận hành doanh nghiệp.",
  productCategoriesIntro: "Những nhóm hàng giá trị cao doanh nghiệp thường cần vận chuyển",
  productCategories: [
    { image: "/images/category-phone.jpg", title: "Điện thoại & thiết bị di động" },
    { image: "/images/category-laptop.jpg", title: "Laptop & thiết bị CNTT" },
    { image: "/images/category-chip.jpg", title: "Linh kiện điện tử" },
    { image: "/images/category-machine.jpg", title: "Máy móc & thiết bị" },
    { image: "/images/category-bag.jpg", title: "Hàng thương mại giá trị cao khác" },
  ],
  processIntro: "Giải pháp giao hàng giá trị cao của Nhất Tín Logistics",
  processSteps: [
    { number: "01", title: "Tiếp nhận yêu cầu", desc: "Tiếp nhận thông tin loại hàng, sản lượng, tuyến giao và nhu cầu vận chuyển của doanh nghiệp." },
    { number: "02", title: "Kiểm soát tại điểm nhận", desc: "Kiểm tra, đóng gói, niêm phong và xác nhận tình trạng hàng hóa theo yêu cầu." },
    { number: "03", title: "Vận chuyển & theo dõi", desc: "Tổ chức vận chuyển và cập nhật trạng thái đơn hàng trong suốt hành trình." },
    { number: "04", title: "Giao nhận & xác nhận", desc: "Giao đúng điểm nhận, xác nhận tình trạng và hoàn tất bàn giao." },
    { number: "05", title: "Chính sách bảo hiểm hàng hóa", desc: "Áp dụng theo giá trị khai báo và điều kiện dịch vụ phù hợp." },
  ],
  whyChooseUsIntro: "Vì sao doanh nghiệp chọn Nhất Tín Logistics?",
  whyChooseUs: [
    { icon: "map-vn", title: "Phục vụ toàn quốc", desc: "Mạng lưới vận hành rộng, hỗ trợ nhu cầu giao hàng đa điểm." },
    { icon: "building", title: "Tối ưu cho khách hàng doanh nghiệp", desc: "Tư vấn phương án theo sản lượng, tuyến giao và đặc thù hàng hóa." },
    { icon: "monitor", title: "Theo dõi đơn hàng rõ ràng", desc: "Cập nhật trạng thái giúp doanh nghiệp chủ động kiểm soát hành trình." },
    { icon: "package", title: "Nhiều lựa chọn dịch vụ", desc: "Linh hoạt theo yêu cầu về thời gian, loại hàng và ngân sách." },
    { icon: "headset", title: "Đội ngũ tư vấn hỗ trợ", desc: "Đồng hành trong quá trình triển khai và xử lý nhu cầu vận chuyển." },
    { icon: "trophy", title: "Kinh nghiệm vận hành hàng giá trị cao", desc: "Phù hợp với các nhóm hàng cần kiểm soát chặt trong giao nhận." },
  ],
  quote: "Giá trị cao. Trách nhiệm cao hơn.",
  solutionsIntro: "Giải pháp theo từng nhóm hàng giá trị cao",
  solutionsByCategory: [
    {
      image: "/images/category-phone.jpg",
      title: "Điện thoại & thiết bị di động",
      bullets: [],
    },
    {
      image: "/images/category-laptop.jpg",
      title: "Laptop & thiết bị CNTT",
      bullets: [],
    },
    {
      image: "/images/category-chip.jpg",
      title: "Linh kiện điện tử & phụ tùng",
      bullets: [],
    },
    {
      image: "/images/category-medical.jpg",
      title: "Thiết bị y tế & thiết bị chuyên dụng",
      bullets: [],
    },
    {
      image: "/images/category-machine.jpg",
      title: "Máy móc & thiết bị công nghiệp",
      bullets: [],
    },
  ],
  faqIntro: "Câu hỏi thường gặp",
  faqImage: "/images/faq-illustration.jpg",
  faq: [
    {
      question: "Doanh nghiệp nào phù hợp với dịch vụ giao hàng giá trị cao?",
      answer:
        "Dịch vụ phù hợp với doanh nghiệp sản xuất, nhà phân phối, chuỗi bán lẻ và đơn vị thương mại điện tử thường xuyên vận chuyển điện thoại, thiết bị điện tử, linh kiện, máy móc hoặc các mặt hàng giá trị cao cần kiểm soát chặt trong quá trình giao nhận.",
    },
    {
      question: "Nhất Tín Logistics nhận vận chuyển những nhóm hàng giá trị cao nào?",
      answer:
        "Nhất Tín Logistics nhận vận chuyển điện thoại & thiết bị di động, laptop & thiết bị CNTT, linh kiện điện tử & phụ tùng, thiết bị y tế & thiết bị chuyên dụng, máy móc & thiết bị công nghiệp cùng các mặt hàng thương mại giá trị cao khác. Với hàng có yêu cầu đặc thù, đội ngũ tư vấn sẽ đánh giá và đề xuất phương án phù hợp.",
    },
    {
      question: "Doanh nghiệp có thể theo dõi hành trình đơn hàng như thế nào?",
      answer:
        "Trạng thái đơn hàng được cập nhật trong suốt hành trình, từ khi tiếp nhận đến khi hoàn tất bàn giao, giúp doanh nghiệp chủ động theo dõi và xử lý đơn hàng kịp thời.",
    },
    {
      question: "Doanh nghiệp có sản lượng lớn có chính sách riêng không?",
      answer:
        "Có. Nhất Tín Logistics xây dựng chính sách và phương án vận chuyển riêng theo sản lượng, tần suất, tuyến giao và đặc thù hàng hóa của từng doanh nghiệp.",
    },
  ],
  ctaBanner: {
    titleLine1: "HƠN CẢ MỘT DỊCH VỤ",
    titleLine2: "",
    image: "/images/cta-truck.jpg",
  },
  footer: {
    companyName: "Nhất Tín Logistics",
    tagline: "Hơn cả một dịch vụ",
    hotline: "1900 63 6688 (phím 2)",
    website: "www.ntlogistics.vn",
    email: "cskh@ntlogistics.vn",
  },
};
