# Economic Games

Remotion video projekt s živým náhledem v prohlížeči (Next.js + `@remotion/player`)
— editace kompozic **bez renderu**, náhled dostupný i z mobilu.

## Jak to funguje

- `src/remotion/` — Remotion kompozice (zdroj pravdy: kód videa).
- `src/app/` — Next.js stránka, která stejnou kompozici přehrává živě přes `<Player>`.
- Sdílené metadata (`constants.ts`) drží Studio i web náhled v synchronizaci.

## Příkazy

```bash
npm install
npm run dev        # Next.js náhled (Player) → http://localhost:3000
npm run studio     # Remotion Studio (lokálně) → http://localhost:3001
npm run render     # vyrenderuje mp4 do out/video.mp4
```

## Náhled na mobilu

Lokální `localhost` z cloud kontejneru není z telefonu dostupný. Pro náhled
z mobilu nasaď tento Next.js projekt na Vercel — `npm run dev` stránka
(`/`) přehraje video živě bez renderu, stačí otevřít veřejnou URL na telefonu.

## Deploy na Vercel

1. Naimportuj repo na https://vercel.com/new
2. Framework preset: **Next.js** (detekuje se automaticky)
3. Build command: `next build`, output: default
4. Deploy → dostaneš `https://<projekt>.vercel.app`, otevři na mobilu.
