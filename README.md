# Task Master

Interactive React + TypeScript demo: browse a location hierarchy and explore SVG floor plans with shared UI state.

## What it does

1. **Description** tab — assignment brief + demo video  
2. **Implementation** tab — working app:
   - Hierarchical location tree (Country → City → Building)
   - Click Building A–D to render the matching SVG (`floor1`–`floor_plan`)
   - **Rotate 180°** toggle
   - **10 random colors** applied instantly to all known locations on the plan
   - **Shape filters** (circle / rectangle / star) mapped by SVG id
   - Color, rotation, and filters **persist** when switching buildings

## Live demo

https://kuttenajith.github.io/task-master/

## Run locally

```bash
npm install
npm start
```

```bash
npm test -- --watchAll=false
npm run build
npm run deploy   # publishes build/ to GitHub Pages (gh-pages branch)
```

## Project layout

```
src/
  components/     # tree, controls, floorplan viewer, implementation shell
  constants/      # location ids + shape map
  data/           # location hierarchy
  hooks/          # shared floorplan UI state
  utils/          # color helpers + palette
  assets/         # SVG floor plans + demo video
```

Personal project — not related to any work monorepo.
