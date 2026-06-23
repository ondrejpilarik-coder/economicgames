// ─────────────────────────────────────────────────────────────
// GREECE — "Average wage (PPS)" segment.
//
// The video is cut WITHOUT the voiceover audio baked in. Every block's
// on-screen length is derived from its narration word count at a fixed
// speaking rate (+ a short trailing pause). So when you later drop in your
// own cloned-voice MP3, the cut already lines up — because each block was
// sized to exactly the words it narrates, and the on-screen captions reveal
// word-by-word ("karaoke") across that same length.
//
// Getting a FRAME-PERFECT match once you have the real MP3 — two options:
//   1) Record/cut each block to the lengths printed by `logGreeceTimeline()`
//      (the sentence pauses then fall on the block boundaries), OR
//   2) Measure each block's clip and paste the seconds into `seconds:` below
//      — the whole timeline re-flows automatically, no other edits needed.
//
// Drop the finished track at:  public/greece/voiceover.mp3
// then set VOICEOVER_ENABLED = true.
// ─────────────────────────────────────────────────────────────

import { VIDEO_FPS } from "../constants";

export const GREECE_FPS = VIDEO_FPS;

// Flip to true once public/greece/voiceover.mp3 exists.
export const VOICEOVER_ENABLED = false;

// Timing model — tune these two numbers to taste, everything re-derives.
export const WORDS_PER_SECOND = 2.5; // ~150 wpm, calm documentary narration
export const TAIL_PAUSE_SECONDS = 0.7; // breath/pause baked after each block

export type BlockId = "hook" | "leak" | "reform" | "verdict";

export type GreeceBlock = {
  id: BlockId;
  kicker: string; // small label, top-left
  headline: string; // big on-screen title
  text: string; // full narration — also rendered as the karaoke caption
  seconds?: number; // optional manual override (set after measuring the MP3)
};

// The narration, verbatim from the voiceover script, split into 4 blocks.
export const GREECE_BLOCKS: GreeceBlock[] = [
  {
    id: "hook",
    kicker: "THE HOOK",
    headline: "Greece",
    text:
      "The cradle of European civilisation and a global shipping power — and yet here the paycheck buys the least in the whole field.",
  },
  {
    id: "leak",
    kicker: "WHERE THE WAGE LEAKS",
    headline: "Where does the Greek wage leak away?",
    text:
      "Where does the Greek wage leak away? High-value sectors are narrow here, so most work stays in cheaper services and the average hits a sector ceiling. Fewer people are in work than elsewhere, so the average leans on a thinner pool of employees and turns fragile. Greece does have one edge: output is spread across more regions, not just Athens.",
  },
  {
    id: "reform",
    kicker: "THE REFORMS",
    headline: "The moves point the right way — but only gently",
    text:
      "Greece's moves point the right way, but for now they press the gross average only gently. The government opened private universities — a contested reform whose payoff for wages is uncertain and years away. The Rebrain Greece programme lures experts back with a tax break; that helps indirectly. And Pfizer built a research hub in Thessaloniki — good for the economy, yet the domestic research base is thin, so it seeps into the average slowly.",
  },
  {
    id: "verdict",
    kicker: "THE VERDICT — DEAD LAST",
    headline: "Why does Greece finish dead last?",
    text:
      "Why does Greece finish dead last? The story was written by the crisis: austerity, internal devaluation, weakened unions and low-margin tourism crushed wages from the bottom up. In purchasing power the wage leaves around 1,800 a month, barely 57 percent of the field. In raw euros Greece sits a few rungs off the bottom; but once you measure what the wage actually buys, it drops all the way down. And no relief ahead either: wages here grow more slowly than in most of the field, so the country with the most room to catch up isn't catching up. Portugal repaired an equally weak floor without the same crisis blow, and so it stands higher.",
  },
];

export const countWords = (s: string): number => s.trim().split(/\s+/).length;

export const blockDurationInFrames = (b: GreeceBlock): number => {
  const seconds =
    b.seconds ?? countWords(b.text) / WORDS_PER_SECOND + TAIL_PAUSE_SECONDS;
  return Math.round(seconds * GREECE_FPS);
};

export type PlacedBlock = GreeceBlock & {
  index: number;
  from: number;
  durationInFrames: number;
};

// Lay the blocks back-to-back on the timeline.
export const GREECE_TIMELINE: PlacedBlock[] = (() => {
  let from = 0;
  return GREECE_BLOCKS.map((b, index) => {
    const durationInFrames = blockDurationInFrames(b);
    const placed: PlacedBlock = { ...b, index, from, durationInFrames };
    from += durationInFrames;
    return placed;
  });
})();

export const GREECE_DURATION_IN_FRAMES = GREECE_TIMELINE.reduce(
  (sum, b) => sum + b.durationInFrames,
  0
);

export const formatTimecode = (frame: number): string => {
  const totalSeconds = frame / GREECE_FPS;
  const m = Math.floor(totalSeconds / 60);
  const s = (totalSeconds % 60).toFixed(2).padStart(5, "0");
  return `${m}:${s}`;
};

// Handy when matching your MP3: prints each block's start/end + length.
export const logGreeceTimeline = (): void => {
  // eslint-disable-next-line no-console
  console.table(
    GREECE_TIMELINE.map((b) => ({
      block: `${b.index + 1}. ${b.kicker}`,
      words: countWords(b.text),
      start: formatTimecode(b.from),
      end: formatTimecode(b.from + b.durationInFrames),
      length: `${(b.durationInFrames / GREECE_FPS).toFixed(2)}s`,
      frames: b.durationInFrames,
    }))
  );
};

// ── Theme ─────────────────────────────────────────────────
export const GREECE_THEME = {
  bg: "#04111f",
  bgInner: "#0c2a4d",
  blue: "#0d5eaf", // Greek flag blue
  blueLight: "#3b82f6",
  accent: "#38bdf8",
  white: "#f8fafc",
  good: "#34d399",
  bad: "#f87171",
  warn: "#fbbf24",
  muted: "#94a3b8",
  font:
    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
} as const;
