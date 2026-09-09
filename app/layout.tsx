import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { getContent } from "@/lib/get-content";
import TrafficTracker from "@/components/TrafficTracker";

const GTM_ID = "GTM-PXB7HCK2";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Giao Hàng Giá Trị Cao Cho Doanh Nghiệp | Nhất Tín Logistics",
    description:
      "Giải pháp vận chuyển dành cho điện thoại, thiết bị điện tử, linh kiện, máy móc và các đơn hàng có giá trị cao. Theo dõi hành trình, bảo hiểm hàng hóa, tư vấn giải pháp.",
    icons: content.global?.faviconImage ? { icon: content.global.faviconImage } : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-white text-navy-dark antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <TrafficTracker />
        {children}
      </body>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </html>
  );
}
