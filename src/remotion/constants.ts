// Shared video metadata so the Remotion Studio composition and the
// Next.js <Player> preview stay perfectly in sync.
export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_DURATION_IN_FRAMES = 150; // 5s

export type EconomicGamesIntroProps = {
  title: string;
  subtitle: string;
  accent: string;
};

export const defaultIntroProps: EconomicGamesIntroProps = {
  title: "Economic Games",
  subtitle: "Strategy · Markets · Incentives",
  accent: "#22d3ee",
};
