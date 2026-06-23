"use client";

import { Player } from "@remotion/player";
import { useMemo, useState } from "react";
import { EconomicGamesIntro } from "@/remotion/EconomicGamesIntro";
import {
  VIDEO_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultIntroProps,
} from "@/remotion/constants";
import { GreeceVideo } from "@/remotion/greece/GreeceVideo";
import { GREECE_DURATION_IN_FRAMES, GREECE_FPS } from "@/remotion/greece/script";

type Clip = "intro" | "greece";

export default function Home() {
  const [clip, setClip] = useState<Clip>("greece");

  // The same component the Remotion Studio renders — previewed live in the
  // browser via <Player>. No mp4 render, scrubbing/play works on mobile.
  const introProps = useMemo(() => defaultIntroProps, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 16,
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Economic Games — náhled</h1>
      <p style={{ fontSize: 14, opacity: 0.7, textAlign: "center" }}>
        Živý Remotion náhled bez renderu. Funguje i na mobilu.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <Tab active={clip === "greece"} onClick={() => setClip("greece")}>
          🇬🇷 Greece
        </Tab>
        <Tab active={clip === "intro"} onClick={() => setClip("intro")}>
          Intro
        </Tab>
      </div>

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
        {clip === "greece" ? (
          <Player
            key="greece"
            component={GreeceVideo}
            durationInFrames={GREECE_DURATION_IN_FRAMES}
            fps={GREECE_FPS}
            compositionWidth={VIDEO_WIDTH}
            compositionHeight={VIDEO_HEIGHT}
            style={{ width: "100%", height: "100%" }}
            controls
            loop
            autoPlay
            acknowledgeRemotionLicense
          />
        ) : (
          <Player
            key="intro"
            component={EconomicGamesIntro}
            inputProps={introProps}
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
        )}
      </div>

      {clip === "greece" ? (
        <p style={{ fontSize: 12, opacity: 0.55, textAlign: "center", maxWidth: 520 }}>
          Střih je odvozený z délky narrace. Voiceover (naklonovaný hlas) stačí
          později vložit do <code>public/greece/voiceover.mp3</code> — sedne na střih.
        </p>
      ) : null}
    </main>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: 999,
        border: active ? "1px solid #38bdf8" : "1px solid rgba(148,163,184,0.4)",
        background: active ? "rgba(56,189,248,0.15)" : "transparent",
        color: active ? "#38bdf8" : "inherit",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
