import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Đen thương hiệu. Tên "navy" giữ lại vì trang admin đang dùng.
        navy: {
          DEFAULT: "#222222",
          // Brand guideline chỉ có một màu đen #222222. Giữ các tên cũ để
          // code hiện có không vỡ, nhưng tất cả đều trỏ về đúng màu brand.
          dark: "#222222",
        },
        ink: "#222222",
        // Vàng thương hiệu #FDD800. Trạng thái hover dùng brightness-95
        // (tối nhẹ chính màu này) thay vì một tông vàng khác.
        gold: "#fdd800",
        // Nền xám nhạt xen kẽ giữa các section
        surface: "#f8f9fa",
      },
      boxShadow: {
        // Bóng đổ pha sắc đen brand #222222 (TailAdmin gốc pha xanh xám)
        "theme-xs": "0px 1px 2px 0px rgba(34, 34, 34, 0.05)",
        "theme-lg": "0px 12px 16px -4px rgba(34, 34, 34, 0.08), 0px 4px 6px -2px rgba(34, 34, 34, 0.03)",
      },
      maxWidth: {
        content: "1200px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '"San Francisco"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
