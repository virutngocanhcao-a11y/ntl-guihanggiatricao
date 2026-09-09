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
      "Giải pháp vận chuyển dành cho điện thoại, thiết bị điện tử, linh kiện, máy móc và các đơn hàng có giá trị cao.",
    badges: [
      { icon: "map-pin", label: "Theo dõi hành trình" },
      { icon: "shield", label: "Bảo hiểm hàng hóa" },
      { icon: "headset", label: "Tư vấn giải pháp" },
    ],
    heroImage: "/images/key-visual.jpg",
  },
  painPointsIntro: "Một đơn hàng giá trị cao không chỉ là một kiện hàng",
  painPoints: [
    {
      icon: "box-alert",
      title: "Thất lạc hàng hóa",
      desc: "Nguy cơ thất lạc, hư hỏng, mất mát trong quá trình vận chuyển.",
    },
    {
      icon: "search",
      title: "Khó kiểm soát hành trình",
      desc: "Thiếu thông tin minh bạch, khó theo dõi trạng thái đơn hàng theo thời gian thực.",
    },
    {
      icon: "star",
      title: "Ảnh hưởng trải nghiệm khách hàng",
      desc: "Giao trễ, hàng lỗi gây mất niềm tin và ảnh hưởng thương hiệu.",
    },
    {
      icon: "invoice",
      title: "Tăng chi phí xử lý sự cố",
      desc: "Chi phí bồi hoàn, khiếu nại và xử lý sự cố tốn kém, mất thời gian.",
    },
  ],
  bannerNote: "Hàng giá trị cao cần một quy trình giao nhận chặt chẽ hơn.",
  productCategoriesIntro: "Những mặt hàng thường cần giải pháp giao hàng giá trị cao",
  productCategories: [
    { image: "/images/category-phone.jpg", title: "Điện thoại & thiết bị di động" },
    { image: "/images/category-laptop.jpg", title: "Laptop & thiết bị CNTT" },
    { image: "/images/category-chip.jpg", title: "Linh kiện điện tử" },
    { image: "/images/category-machine.jpg", title: "Máy móc & thiết bị" },
    { image: "/images/category-bag.jpg", title: "Hàng thương mại giá trị cao khác" },
  ],
  processIntro: "Giải pháp giao hàng giá trị cao của Nhất Tín Logistics",
  processSteps: [
    { number: "01", title: "Tiếp nhận yêu cầu", desc: "Tiếp nhận thông tin, đánh giá loại hàng và nhu cầu doanh nghiệp." },
    { number: "02", title: "Kiểm soát tại điểm nhận", desc: "Kiểm tra, đóng gói, niêm phong và xác nhận tình trạng hàng hóa." },
    { number: "03", title: "Vận chuyển & theo dõi", desc: "Vận chuyển an toàn, theo dõi hành trình theo thời gian thực." },
    { number: "04", title: "Giao nhận & xác nhận", desc: "Giao đúng người nhận, kiểm tra và xác nhận tình trạng khi giao hàng." },
    { number: "05", title: "Bảo hiểm theo giá trị hàng hóa", desc: "Bảo hiểm toàn phần theo giá trị khai báo, bồi thường minh bạch." },
  ],
  whyChooseUsIntro: "Vì sao doanh nghiệp chọn Nhất Tín Logistics?",
  whyChooseUs: [
    { icon: "map-vn", title: "Phục vụ toàn quốc", desc: "Mạng lưới rộng khắp, phủ đến 63 tỉnh thành." },
    { icon: "building", title: "Tối ưu cho khách hàng doanh nghiệp", desc: "Quy trình chuyên biệt, ưu tiên xử lý và hỗ trợ nhanh chóng." },
    { icon: "monitor", title: "Theo dõi đơn hàng rõ ràng", desc: "Cập nhật trạng thái liên tục, minh bạch mọi lúc, mọi nơi." },
    { icon: "package", title: "Nhiều lựa chọn dịch vụ", desc: "Đa dạng dịch vụ phù hợp với nhu cầu và ngân sách doanh nghiệp." },
    { icon: "headset", title: "Đội ngũ tư vấn hỗ trợ", desc: "Chuyên nghiệp, tận tâm, đồng hành cùng doanh nghiệp 24/7." },
    { icon: "trophy", title: "Kinh nghiệm vận hành hàng giá trị cao", desc: "Hơn 10 năm kinh nghiệm vận hành an toàn, tin cậy cho hàng giá trị cao." },
  ],
  quote: "Giá trị cao. Trách nhiệm cao hơn.",
  solutionsIntro: "Giải pháp phù hợp cho từng nhóm hàng",
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
  faq: [
    {
      question: "Hàng giá trị cao là gì?",
      answer:
        "Là các mặt hàng có giá trị kinh tế lớn hoặc dễ hư hỏng như điện thoại, laptop, linh kiện điện tử, máy móc, hàng hiệu... cần quy trình đóng gói, vận chuyển và bảo hiểm đặc biệt hơn hàng hóa thông thường.",
    },
    {
      question: "Nhất Tín Logistics có nhận giao hàng giá trị cao không?",
      answer:
        "Có. Nhất Tín Logistics cung cấp giải pháp giao hàng giá trị cao dành riêng cho doanh nghiệp với quy trình kiểm soát chặt chẽ từ điểm nhận đến điểm giao.",
    },
    {
      question: "Gửi hàng giá trị cao có cần bảo hiểm không?",
      answer:
        "Chúng tôi khuyến nghị mua bảo hiểm theo giá trị khai báo để đảm bảo quyền lợi bồi thường minh bạch nếu có sự cố phát sinh trong quá trình vận chuyển.",
    },
    {
      question: "Doanh nghiệp gửi số lượng lớn có chính sách riêng không?",
      answer:
        "Có. Đội ngũ tư vấn của chúng tôi sẽ xây dựng giải pháp và chính sách giá riêng phù hợp với khối lượng, tần suất và loại hàng hóa của từng doanh nghiệp.",
    },
  ],
  ctaBanner: {
    titleLine1: "HƠN CẢ MỘT DỊCH VỤ",
    titleLine2: "",
  },
  footer: {
    companyName: "Nhất Tín Logistics",
    tagline: "Hơn cả một dịch vụ",
    hotline: "1900 63 6688",
    website: "www.ntlogistics.vn",
    email: "cskh@ntlogistics.vn",
  },
};
