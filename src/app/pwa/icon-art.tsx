import React from "react";

// Shared icon artwork (pure shapes, no font needed) so Satori/ImageResponse
// renders it reliably. A mini "market" bar chart on a dark tile — matches the
// EconomicGamesIntro visual language.
export function IconArt({ size }: { size: number }) {
  const bars = [0.42, 0.68, 0.52, 0.9, 0.62];
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: size * 0.045,
        background: "#0b1220",
        padding: size * 0.18, // safe zone for maskable icons
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: size * 0.095,
            height: size * h * 0.6,
            background: "#22d3ee",
            borderRadius: size * 0.028,
          }}
        />
      ))}
    </div>
  );
}
