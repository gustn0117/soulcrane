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
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
