import { ImageResponse } from "next/og";
import { readContent } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "SOULCRANE — Film · Drama · Digital Content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const content = await readContent();
  const tagline = content?.hero?.tagline || "Film · Drama · Digital Content";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "76px 80px",
          background:
            "linear-gradient(135deg, #05070a 0%, #0a0c10 55%, #131722 100%)",
          color: "#f4f6f8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.42em",
              color: "#b9c0cb",
              textTransform: "uppercase",
            }}
          >
            SOULCRANE
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: "rgba(244, 246, 248, 0.18)",
            }}
          />
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.32em",
              color: "#6f7886",
              textTransform: "uppercase",
            }}
          >
            Showreel
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 84,
              height: 1,
              background: "#e5e7eb",
              opacity: 0.75,
              marginBottom: 26,
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.36em",
              color: "#b9c0cb",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 200,
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
              color: "#f4f6f8",
            }}
          >
            Beyond trend,
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
              color: "#ffffff",
            }}
          >
            a feeling.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
