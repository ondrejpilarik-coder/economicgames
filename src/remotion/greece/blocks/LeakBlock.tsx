import React from "react";
import { PlacedBlock } from "../script";
import { BlockShell, Card } from "../ui";

// Block 2 — why the wage leaks: two brakes and one edge.
export const LeakBlock: React.FC<{ block: PlacedBlock }> = ({ block }) => {
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
          tone="bad"
          icon="📉"
          title="Narrow high-value sectors"
          body="Most work stays in cheaper services — the average hits a sector ceiling."
        />
        <Card
          delay={24}
          tone="bad"
          icon="👥"
          title="Fewer people in work"
          body="The average leans on a thinner pool of employees and turns fragile."
        />
        <Card
          delay={34}
          tone="good"
          icon="🗺️"
          title="One edge: spread output"
          body="Activity reaches more regions — not just Athens."
        />
      </div>
    </BlockShell>
  );
};
