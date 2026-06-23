# Greece — voiceover slot

The Greece segment (`GreeceWageStory`) is cut **without** audio. The visual
timing is derived from the narration word counts, so a voiceover you add later
lines up with the cut.

## Adding your cloned-voice MP3

1. Export the finished narration as **`voiceover.mp3`** and place it in this
   folder (`public/greece/voiceover.mp3`).
2. In `src/remotion/greece/script.ts` set `VOICEOVER_ENABLED = true`.
3. Preview at `/` (Greece tab) or in Remotion Studio (`npm run studio`).

## Making it frame-perfect

The default block lengths assume ~150 wpm (`WORDS_PER_SECOND = 2.5`). To match
your actual delivery exactly, either:

- **Record to the timeline** — call `logGreeceTimeline()` (from `script.ts`) to
  print each block's start/end/length and cut your narration to those, **or**
- **Re-flow to your audio** — measure each block's clip length and paste the
  seconds into the matching block's `seconds:` field in `GREECE_BLOCKS`. The
  whole timeline recomputes automatically.

One continuous MP3 is expected (block boundaries fall on sentence pauses). If
you'd rather drop one clip per block instead, split the `<Audio>` in
`GreeceVideo.tsx` into per-`Sequence` clips.
