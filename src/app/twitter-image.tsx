import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oneir Solutions - ERP & Accounting Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "linear-gradient(120deg, #1E2C31 0%, #3B4E4D 42%, #3A3052 100%)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.9 }}>Oneir Solutions</div>
        <div
          style={{
            marginTop: "16px",
            fontSize: 66,
            lineHeight: 1.08,
            fontWeight: 700,
            maxWidth: "900px",
          }}
        >
          ERP & Accounting Software
        </div>
      </div>
    ),
    size,
  );
}
