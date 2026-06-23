import { ImageResponse } from "next/og";
import { IconArt } from "../pwa/icon-art";

// Generated PWA icon (192px). Served at /appicon-192.png — referenced by the
// web manifest. No binary asset needed; rendered on the fly.
export const runtime = "edge";

export function GET() {
  return new ImageResponse(<IconArt size={192} />, { width: 192, height: 192 });
}
