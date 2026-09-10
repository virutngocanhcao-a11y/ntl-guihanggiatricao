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
