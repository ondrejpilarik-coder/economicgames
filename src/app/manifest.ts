import type { MetadataRoute } from "next";

// Web App Manifest — makes the site installable. Next serves this at
// /manifest.webmanifest and links it from <head> automatically.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Economic Games",
    short_name: "EconGames",
    description: "Economic Games — živý náhled Remotion videí.",
    start_url: "/",
    scope: "/",
    display: "standalone", // opens fullscreen, no browser address bar
    orientation: "any",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/appicon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/appicon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/appicon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
