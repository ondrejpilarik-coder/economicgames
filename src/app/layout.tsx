import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWARegister } from "./pwa-register";

export const metadata: Metadata = {
  title: "Economic Games — Preview",
  description: "Live Remotion preview (no render needed)",
  applicationName: "Economic Games",
  // Makes iOS treat "Add to Home Screen" as a standalone app.
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Economic Games",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Standalone PWA feel: fill the screen, sit under the notch.
  viewportFit: "cover",
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
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
