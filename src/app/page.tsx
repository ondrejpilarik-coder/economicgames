"use client";

import { Player } from "@remotion/player";
import { useMemo } from "react";
import { EconomicGamesIntro } from "@/remotion/EconomicGamesIntro";
import {
  VIDEO_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultIntroProps,
} from "@/remotion/constants";

export default function Home() {
  // The same component the Remotion Studio renders — previewed live in the
  // browser via <Player>. No mp4 render, scrubbing/play works on mobile.
  const inputProps = useMemo(() => defaultIntroProps, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 16,
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Economic Games — náhled</h1>
      <p style={{ fontSize: 14, opacity: 0.7, textAlign: "center" }}>
        Živý Remotion náhled bez renderu. Funguje i na mobilu.
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          aspectRatio: `${VIDEO_WIDTH} / ${VIDEO_HEIGHT}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <Player
          component={EconomicGamesIntro}
          inputProps={inputProps}
          durationInFrames={VIDEO_DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionWidth={VIDEO_WIDTH}
          compositionHeight={VIDEO_HEIGHT}
          style={{ width: "100%", height: "100%" }}
          controls
          loop
          autoPlay
          acknowledgeRemotionLicense
        />
      </div>
    </main>
  );
}
