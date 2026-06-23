import React from "react";
import { PlacedBlock } from "../script";
import { BlockShell, Card } from "../ui";

// Block 3 — the reforms: right direction, but they press the average only gently.
export const ReformBlock: React.FC<{ block: PlacedBlock }> = ({ block }) => {
  return (
    <BlockShell
      kicker={block.kicker}
      headline={block.headline}
      text={block.text}
      durationInFrames={block.durationInFrames}
    >
      <div style={{ display: "flex", gap: 30, width: "100%" }}>
        <Card
          delay={14}
          tone="warn"
          icon="🎓"
          title="Private universities"
          body="A contested reform — payoff for wages is uncertain and years away."
          meter={0.25}
        />
        <Card
          delay={24}
          tone="warn"
          icon="🔁"
          title="Rebrain Greece"
          body="A tax break lures experts back home — it helps, but only indirectly."
          meter={0.4}
        />
        <Card
          delay={34}
          tone="warn"
          icon="🧪"
          title="Pfizer hub · Thessaloniki"
          body="Good for the economy, yet the thin domestic research base lets it seep in slowly."
          meter={0.3}
        />
      </div>
    </BlockShell>
  );
};
