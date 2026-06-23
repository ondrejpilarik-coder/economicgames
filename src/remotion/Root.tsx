import React from "react";
import { Composition } from "remotion";
import { EconomicGamesIntro } from "./EconomicGamesIntro";
import {
  VIDEO_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultIntroProps,
} from "./constants";
import { GreeceVideo } from "./greece/GreeceVideo";
import { GREECE_DURATION_IN_FRAMES, GREECE_FPS } from "./greece/script";

// Registered for Remotion Studio (`npm run studio`) and rendering
// (`npm run render`). The Next.js <Player> preview reuses the same
// component + constants, so studio and the browser preview never drift.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EconomicGamesIntro"
        component={EconomicGamesIntro}
        durationInFrames={VIDEO_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultIntroProps}
      />
      <Composition
        id="GreeceWageStory"
        component={GreeceVideo}
        durationInFrames={GREECE_DURATION_IN_FRAMES}
        fps={GREECE_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
