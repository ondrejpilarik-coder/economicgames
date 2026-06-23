import { ImageResponse } from "next/og";
import { IconArt } from "./pwa/icon-art";

// Apple touch icon (180px) — used when iOS users "Add to Home Screen".
// Next injects the <link rel="apple-touch-icon"> automatically.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<IconArt size={180} />, { ...size });
}
