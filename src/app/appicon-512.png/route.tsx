import { ImageResponse } from "next/og";
import { IconArt } from "../pwa/icon-art";

// Generated PWA icon (512px). Served at /appicon-512.png — referenced by the
// web manifest (used for "any" and "maskable" purposes).
export const runtime = "edge";

export function GET() {
  return new ImageResponse(<IconArt size={512} />, { width: 512, height: 512 });
}
