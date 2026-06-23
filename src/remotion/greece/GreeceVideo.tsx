import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  GREECE_THEME,
  GREECE_TIMELINE,
  PlacedBlock,
  VOICEOVER_ENABLED,
} from "./script";
import { Backdrop } from "./ui";
import { HookBlock } from "./blocks/HookBlock";
import { LeakBlock } from "./blocks/LeakBlock";
import { ReformBlock } from "./blocks/ReformBlock";
import { VerdictBlock } from "./blocks/VerdictBlock";

const renderBlock = (block: PlacedBlock) => {
  switch (block.id) {
    case "hook":
      return <HookBlock block={block} />;
    case "leak":
      return <LeakBlock block={block} />;
    case "reform":
      return <ReformBlock block={block} />;
    case "verdict":
      return <VerdictBlock block={block} />;
  }
};

// The full Greece segment: 4 blocks laid back-to-back, sized to the narration.
// No audio is baked in — see script.ts for how a later MP3 stays in sync.
export const GreeceVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: GREECE_THEME.bg, fontFamily: GREECE_THEME.font }}>
      <Backdrop />

      {GREECE_TIMELINE.map((block) => (
        <Sequence
          key={block.id}
          from={block.from}
          durationInFrames={block.durationInFrames}
          name={`${block.index + 1}. ${block.kicker}`}
        >
          {renderBlock(block)}
        </Sequence>
      ))}

      {/* VOICEOVER SLOT — drop your cloned-voice track at
          public/greece/voiceover.mp3, then set VOICEOVER_ENABLED = true in
          script.ts. The cut already lines up with the narration. */}
      {VOICEOVER_ENABLED ? <Audio src={staticFile("greece/voiceover.mp3")} /> : null}
    </AbsoluteFill>
  );
};
