import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Đen thương hiệu. Tên "navy" giữ lại vì trang admin đang dùng.
        navy: {
          DEFAULT: "#222222",
          dark: "#181818",
          light: "#333333",
        },
        // Đen đậm hơn navy, dùng cho chữ tiêu đề trên nền sáng
        ink: "#1a1a1a",
        // Vàng thương hiệu
        gold: {
          DEFAULT: "#fdd800",
          light: "#ffe340", // trạng thái hover của nút vàng
          mid: "#ffe033", // điểm giữa của dải gradient banner CTA
          deep: "#e5c300", // hover của chữ màu vàng
          text: "#b37700", // vàng đủ đậm để làm màu chữ trên nền sáng
        },
        // Nền xám nhạt xen kẽ giữa các section
        surface: "#f8f9fa",
        // Màu chủ đạo của trang admin (theo TailAdmin). Landing page không dùng.
        brand: {
          25: "#f2f7ff",
          50: "#ecf3ff",
          100: "#dde9ff",
          300: "#9cb9ff",
          500: "#465fff",
          600: "#3641f5",
          950: "#161950",
        },
      },
      boxShadow: {
        "theme-xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "theme-lg": "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
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
