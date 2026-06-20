import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EconomicGamesIntroProps } from "./constants";

export const EconomicGamesIntro: React.FC<EconomicGamesIntroProps> = ({
  title,
  subtitle,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Title springs up and fades in.
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.6 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle follows slightly delayed.
  const subtitleOpacity = interpolate(frame, [18, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // A subtle animated "market" bar chart in the background.
  const bars = [0.4, 0.7, 0.55, 0.85, 0.6, 0.95, 0.7];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 30%, #0f172a 0%, #020617 70%)",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      {/* background bars */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 28,
          opacity: 0.25,
          paddingBottom: height * 0.05,
        }}
      >
        {bars.map((target, i) => {
          const grow = spring({
            frame: frame - i * 4,
            fps,
            config: { damping: 200 },
          });
          const barHeight = interpolate(grow, [0, 1], [0, target * height * 0.6]);
          return (
            <div
              key={i}
              style={{
                width: width * 0.04,
                height: barHeight,
                background: `linear-gradient(180deg, ${accent}, transparent)`,
                borderRadius: 12,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* foreground text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            color: "white",
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            opacity: subtitleOpacity,
            color: accent,
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
