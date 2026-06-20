import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Economic Games — Preview",
  description: "Live Remotion preview (no render needed)",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Mobile-friendly: dark theme, fits notches.
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
