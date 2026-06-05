# Maddox Minerals

A modernized web remake of [Murphy's Minerals](https://www.myabandonware.com/game/murphy-s-minerals-1nc) (MECC, 1990) — an educational mineralogy game originally for Apple II.

**Live**: [minerals.jacobpaine.com](https://minerals.jacobpaine.com)

## What it is

Three game modes built around ~40 real minerals with accurate geological data:

**Tool Shed** — A 10-round identification lab. Use six tools (hardness tester, streak plate, luster meter, magnet, cleavage gauge, density scale) to narrow down an unknown mineral. Fewer tools used = higher efficiency bonus. High scores saved locally.

**Mineral Shop** — Pick a mining location, then dig through an 8×8 canvas grid to uncover minerals. Identify what you find and sell it at the shop counter. Battery charges decrease with each dig (harder locations cost fewer charges per find).

**Reference** — Searchable encyclopedia of all minerals with photos, properties, and educational details. Filter by luster, rarity, hardness, or magnetic properties.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- No external game engine — canvas managed with custom hooks

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc + vite build
```

## Deployment

GitHub Actions deploys to GitHub Pages on push to `main`. The live site is served at `minerals.jacobpaine.com` via a custom domain (AWS Route 53 CNAME → `jacobpaine.github.io`). SPA routing is handled by `public/404.html`.

## Project structure

```
src/
  components/
    HomeScreen/      # Animated sparkle canvas landing page
    ToolShed/        # Mineral ID lab
    MineralShop/     # Mining grid + shop counter
    Reference/       # Encyclopedia
  data/
    minerals.ts      # ~40 mineral entries
    locations.ts     # 3 mining locations
  hooks/
    useCanvas.ts     # Canvas ref + ResizeObserver + animation loop
    useGameLoop.ts   # requestAnimationFrame hook
  types/
    mineral.ts       # Shared TypeScript types
  utils/
    mineralUtils.ts  # Scoring, hints, localStorage high scores
```
