import "./globals.css";

export const metadata = {
  title: "SOULCRANE",
  description:
    "소울크레인 - 영상 콘텐츠를 기반으로 세대를 아우르는 감동을 선사하는 전문 영상 제작사",
  openGraph: {
    title: "SOULCRANE",
    description: "경험을 넘어 트렌드를, 트렌드를 넘어 감동을",
    siteName: "SOULCRANE",
    locale: "ko_KR",
    type: "website",
  },
};

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
