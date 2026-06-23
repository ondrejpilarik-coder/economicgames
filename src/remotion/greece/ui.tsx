import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GREECE_THEME, TAIL_PAUSE_SECONDS } from "./script";

const T = GREECE_THEME;

// Spring-based entrance: fade up. `delay` staggers elements within a block.
export const useReveal = (delay = 0, distance = 28) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  return {
    opacity: interpolate(p, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)`,
  };
};

// Persistent animated background — lives behind every block for continuity.
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const bars = [0.5, 0.8, 0.62, 0.92, 0.7, 0.55, 0.85, 0.66, 0.78];
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 22%, ${T.bgInner} 0%, ${T.bg} 70%)`,
      }}
    >
      {/* faint equalizer motif (shared with the intro's visual language) */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 30,
          opacity: 0.1,
          paddingBottom: height * 0.04,
        }}
      >
        {bars.map((target, i) => {
          const grow = spring({ frame: frame - i * 3, fps, config: { damping: 200 } });
          const wobble = Math.sin((frame + i * 22) / 26) * 0.06;
          const barHeight = interpolate(grow, [0, 1], [0, (target + wobble) * height * 0.6]);
          return (
            <div
              key={i}
              style={{
                width: width * 0.035,
                height: barHeight,
                background: `linear-gradient(180deg, ${T.accent}, transparent)`,
                borderRadius: 14,
              }}
            />
          );
        })}
      </AbsoluteFill>
      {/* Greek-blue edge accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 10,
          background: `linear-gradient(180deg, ${T.blue}, ${T.accent})`,
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{ boxShadow: "inset 0 0 320px rgba(0,0,0,0.65)" }}
      />
    </AbsoluteFill>
  );
};

const Kicker: React.FC<{ label: string }> = ({ label }) => {
  const r = useReveal(0, 16);
  return (
    <div style={{ ...r, display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 40 }}>🇬🇷</span>
      <span
        style={{
          color: T.accent,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const Headline: React.FC<{ text: string; big?: boolean }> = ({ text, big }) => {
  const r = useReveal(5, 34);
  return (
    <div
      style={{
        ...r,
        marginTop: 18,
        color: T.white,
        fontSize: big ? 150 : 72,
        fontWeight: 800,
        lineHeight: 1.04,
        letterSpacing: big ? -3 : -1,
        maxWidth: 1500,
      }}
    >
      {text}
    </div>
  );
};

// Karaoke caption — reveals word-by-word across the block length. This is the
// piece that keeps the cut readable WITHOUT audio and makes a later MP3 align:
// the words "are spoken" at the same cadence the narration will be.
export const Caption: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(/\s+/);
  const tail = Math.round(TAIL_PAUSE_SECONDS * fps);
  const revealFrames = Math.max(1, durationInFrames - tail);
  const spoken = (frame / revealFrames) * words.length;
  const active = Math.floor(spoken);
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        opacity,
        marginTop: 28,
        paddingTop: 26,
        borderTop: `2px solid rgba(56,189,248,0.25)`,
        fontSize: 34,
        lineHeight: 1.5,
        fontWeight: 500,
        maxWidth: 1560,
      }}
    >
      {words.map((w, i) => {
        const state = i < active ? "past" : i === active ? "now" : "future";
        return (
          <span
            key={i}
            style={{
              color:
                state === "past"
                  ? T.white
                  : state === "now"
                  ? T.accent
                  : "rgba(148,163,184,0.45)",
              fontWeight: state === "now" ? 700 : 500,
            }}
          >
            {w}{" "}
          </span>
        );
      })}
    </div>
  );
};

// Common block frame: kicker + headline + visual area + caption.
export const BlockShell: React.FC<{
  kicker: string;
  headline: string;
  headlineBig?: boolean;
  text: string;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ kicker, headline, headlineBig, text, durationInFrames, children }) => {
  return (
    <AbsoluteFill
      style={{
        padding: "86px 104px 70px",
        display: "flex",
        flexDirection: "column",
        fontFamily: T.font,
      }}
    >
      <Kicker label={kicker} />
      <Headline text={headline} big={headlineBig} />
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        {children}
      </div>
      <Caption text={text} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};

// A factor / reform card.
export const Card: React.FC<{
  delay: number;
  tone: "good" | "bad" | "warn" | "neutral";
  icon: string;
  title: string;
  body: string;
  meter?: number; // 0..1 impact bar, optional
}> = ({ delay, tone, icon, title, body, meter }) => {
  const r = useReveal(delay, 30);
  const color =
    tone === "good" ? T.good : tone === "bad" ? T.bad : tone === "warn" ? T.warn : T.accent;
  return (
    <div
      style={{
        ...r,
        flex: 1,
        background: "rgba(8,25,45,0.66)",
        border: `1px solid ${color}55`,
        borderTop: `4px solid ${color}`,
        borderRadius: 20,
        padding: "30px 30px 34px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        backdropFilter: "blur(2px)",
      }}
    >
      <div style={{ fontSize: 52 }}>{icon}</div>
      <div style={{ color: T.white, fontSize: 34, fontWeight: 800, lineHeight: 1.15 }}>
        {title}
      </div>
      <div style={{ color: T.muted, fontSize: 26, lineHeight: 1.4 }}>{body}</div>
      {meter !== undefined ? <Meter value={meter} color={color} /> : null}
    </div>
  );
};

// Animated horizontal bar that fills to `value` (0..1).
export const Meter: React.FC<{ value: number; color: string; label?: string }> = ({
  value,
  color,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const fill = interpolate(p, [0, 1], [0, value]);
  return (
    <div style={{ marginTop: "auto" }}>
      {label ? (
        <div style={{ color: T.muted, fontSize: 22, marginBottom: 8 }}>{label}</div>
      ) : null}
      <div
        style={{
          height: 16,
          borderRadius: 999,
          background: "rgba(148,163,184,0.18)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${fill * 100}%`,
            height: "100%",
            borderRadius: 999,
            background: color,
          }}
        />
      </div>
    </div>
  );
};

// Small pill / chip.
export const Chip: React.FC<{ delay: number; label: string; tone?: "bad" | "neutral" }> = ({
  delay,
  label,
  tone = "neutral",
}) => {
  const r = useReveal(delay, 18);
  const color = tone === "bad" ? T.bad : T.accent;
  return (
    <span
      style={{
        ...r,
        display: "inline-block",
        padding: "12px 22px",
        borderRadius: 999,
        border: `1px solid ${color}66`,
        background: `${color}1a`,
        color: T.white,
        fontSize: 26,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
};

export { T as THEME };
