# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FigbuildBadge is an interactive badge customizer for FigBuild 2026, exported from a Figma Make file. Users design custom lanyards and badge decorations with borders, cord colors, backgrounds, stickers (drag-and-drop), and freehand drawing (Canvas API).

**Figma source:** https://www.figma.com/design/Em5nhy5Yqpa5lZyktgzc6I/Customizable-Peel-able-Badge

## Build & Dev Commands

All commands run from `Customizable Peel-able Badge 2/`:

```bash
cd "Customizable Peel-able Badge 2"
npm install        # Install dependencies
npm run dev        # Start Vite dev server
npm run build      # Production build (vite build)
```

No test runner or linter is configured.

## Architecture

### Tech Stack
- **React 18 + TypeScript** with Vite 6.3 (ES modules)
- **Styling:** Tailwind CSS 4 + Emotion (for MUI)
- **Components:** Radix UI primitives wrapped as shadcn/ui (`src/app/components/ui/`)
- **Drag-and-drop:** react-dnd
- **Drawing:** HTML5 Canvas API
- **Animations:** motion library + CSS keyframes

### Key Entry Points
- `index.html` → `src/main.tsx` → `src/app/App.tsx`
- `App.tsx` (~1,300 lines) is the single main component containing all application state and sub-components defined inline

### Source Layout
- `src/app/App.tsx` — Main component with all state, UI logic, and inline sub-components (BadgePreview, BorderSelector, CordsPanel, BackgroundPanel, DrawTools, StickersPanel, WelcomeScreen)
- `src/app/components/ui/` — ~50 shadcn/ui wrapper components
- `src/imports/` — Figma-exported components: SVG path definitions (`svg-*.ts`), lanyard components, badge canvas, PNG assets
- `src/styles/` — CSS: `index.css` (entry), `tailwind.css`, `theme.css` (OkLch color tokens, custom animations), `fonts.css`

### Vite Config
- Path alias: `@` → `./src`
- Custom Figma asset resolver plugin maps `figma:asset/` imports to `src/assets/`
- SVG and CSV files supported as raw imports

### Core Types
```typescript
type BorderStyle = 'none' | 'dashed' | 'wiggly' | 'solid';
type CordColor = 'black' | 'periwinkle' | 'blue';
type Background = 'swag' | 'creative' | 'playful';
type DrawSize = 'small' | 'medium' | 'large';
interface PlacedSticker { id, type, x, y, rotation, pronounText? }
```

### Responsive Design
- **Desktop (lg+):** 3-column layout with controls left/middle, badge preview right. Scale 0.65–1.0x.
- **Mobile (<lg):** Vertical layout with tabbed interface (background, cord, stickers, draw). Scale 0.565x.

### Important Patterns
- All badge state lives in App.tsx via React hooks (useState/useRef) — no external state management
- Stickers use react-dnd `DraggableSticker`/`DraggablePronounSticker` components with a drop target on `BadgePreview`
- Drawing uses Canvas API with undo/clear support via `DrawPath[]` state
- Sticker rolls use CSS animations (`roll-expand`/`roll-collapse`) defined in `theme.css`
- The `src/imports/` directory contains auto-generated Figma exports — avoid manual edits to these files
