import "./globals.css";
import { readContent } from "@/lib/content";

export async function generateMetadata() {
  const content = await readContent();
  const seo = content?.seo || {};
  const title = seo.title || "SOULCRANE";
  const description =
    seo.description ||
    "소울크레인 - 영상 콘텐츠를 기반으로 세대를 아우르는 감동을 선사하는 전문 영상 제작사";
  const siteUrl = seo.siteUrl || "https://soulcrane.co.kr";

  const meta = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "SOULCRANE",
      locale: "ko_KR",
      type: "website",
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (seo.ogImage) {
    meta.openGraph.images = [
      { url: seo.ogImage, width: 1200, height: 630, alt: title },
    ];
    meta.twitter.images = [seo.ogImage];
  }

  return meta;
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2179246359533617');
fbq('track', 'PageView');`,
          }}
        />
        {/* End Meta Pixel Code */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2179246359533617&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code (noscript) */}
        {children}
      </body>
    </html>
  );
}
