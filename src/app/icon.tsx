import { ImageResponse } from "next/og";
import { IconArt } from "./pwa/icon-art";

// Browser tab / favicon — Next injects the <link rel="icon"> automatically.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconArt size={64} />, { ...size });
}
