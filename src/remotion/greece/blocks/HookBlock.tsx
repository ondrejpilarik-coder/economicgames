import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PlacedBlock } from "../script";
import { BlockShell, THEME as T, useReveal } from "../ui";

// Block 1 — the hook: prestige badges vs. the lowest paycheck in the field.
export const HookBlock: React.FC<{ block: PlacedBlock }> = ({ block }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge1 = useReveal(16, 24);
  const badge2 = useReveal(24, 24);

  // The "lowest paycheck" bar drops to the floor.
  const dropP = spring({ frame: frame - 34, fps, config: { damping: 200, mass: 0.8 } });
  const barHeight = interpolate(dropP, [0, 1], [220, 46]);

  return (
    <BlockShell
      kicker={block.kicker}
      headline={block.headline}
      headlineBig
      text={block.text}
      durationInFrames={block.durationInFrames}
    >
      <div style={{ display: "flex", width: "100%", alignItems: "center", gap: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ ...badge1, ...pill(T.accent) }}>🏛️ Cradle of European civilisation</div>
          <div style={{ ...badge2, ...pill(T.accent) }}>🚢 Global shipping power</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 130,
              height: barHeight,
              borderRadius: 14,
              background: `linear-gradient(180deg, ${T.bad}, #7f1d1d)`,
              alignSelf: "flex-end",
            }}
          />
          <div style={{ color: T.bad, fontSize: 30, fontWeight: 800, textAlign: "center" }}>
            …yet the paycheck
            <br />
            buys the least
          </div>
        </div>
      </div>
    </BlockShell>
  );
};

const pill = (color: string): React.CSSProperties => ({
  padding: "18px 28px",
  borderRadius: 16,
  border: `1px solid ${color}66`,
  background: `${color}14`,
  color: T.white,
  fontSize: 34,
  fontWeight: 700,
});
