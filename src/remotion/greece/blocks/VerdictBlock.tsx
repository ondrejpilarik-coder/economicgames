import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PlacedBlock } from "../script";
import { BlockShell, Chip, THEME as T } from "../ui";

// Block 4 — the verdict: crisis legacy, €1,800/mo PPS ≈ 57% of the field, dead last.
export const VerdictBlock: React.FC<{ block: PlacedBlock }> = ({ block }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count €1,800/month up.
  const wage = Math.round(
    interpolate(frame, [30, 78], [0, 1800], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  // Gauge fills to 57% of the field.
  const gaugeP = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const pct = interpolate(gaugeP, [0, 1], [0, 57]);

  const chips = ["Austerity", "Internal devaluation", "Weakened unions", "Low-margin tourism"];

  return (
    <BlockShell
      kicker={block.kicker}
      headline={block.headline}
      text={block.text}
      durationInFrames={block.durationInFrames}
    >
      <div style={{ display: "flex", width: "100%", gap: 56, alignItems: "center" }}>
        {/* left: crisis legacy chips + Portugal note */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: T.muted, fontSize: 26, fontWeight: 600 }}>
            Written by the crisis — wages crushed from the bottom up:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {chips.map((c, i) => (
              <Chip key={c} delay={10 + i * 6} label={c} tone="bad" />
            ))}
          </div>
          <PortugalNote />
        </div>

        {/* right: the money shot */}
        <div
          style={{
            width: 620,
            background: "rgba(8,25,45,0.7)",
            border: `1px solid ${T.bad}55`,
            borderRadius: 24,
            padding: "34px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ color: T.muted, fontSize: 26, fontWeight: 600 }}>
            In purchasing power (PPS)
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ color: T.white, fontSize: 110, fontWeight: 900, letterSpacing: -3 }}>
              €{wage.toLocaleString("en-US")}
            </span>
            <span style={{ color: T.muted, fontSize: 34, fontWeight: 700 }}>/ month</span>
          </div>

          {/* 57%-of-field gauge */}
          <div style={{ marginTop: 6 }}>
            <div
              style={{
                height: 26,
                borderRadius: 999,
                background: "rgba(148,163,184,0.18)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${T.bad}, ${T.warn})`,
                }}
              />
            </div>
            <div style={{ marginTop: 12, color: T.bad, fontSize: 32, fontWeight: 800 }}>
              ≈ {Math.round(pct)}% of the field · dead last 🏴
            </div>
          </div>

          <div style={{ color: T.muted, fontSize: 23, lineHeight: 1.4, marginTop: 4 }}>
            In raw euros only a few rungs off the bottom — but measured by what the wage
            actually buys, it drops all the way down. And wages grow more slowly than most,
            so the country with the most room to catch up isn&apos;t.
          </div>
        </div>
      </div>
    </BlockShell>
  );
};

const PortugalNote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const opacity = interpolate(p, [0, 1], [0, 1]);
  const x = interpolate(p, [0, 1], [-20, 0]);
  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        marginTop: 8,
        padding: "20px 24px",
        borderRadius: 16,
        border: `1px solid ${T.good}55`,
        background: `${T.good}12`,
        color: T.white,
        fontSize: 26,
        lineHeight: 1.4,
      }}
    >
      🇵🇹 <b>Portugal</b> repaired an equally weak floor without the same crisis blow —
      and so it stands higher.
    </div>
  );
};
