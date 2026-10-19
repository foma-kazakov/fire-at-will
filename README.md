# Fire at Will

A tower defense game in a single HTML file. Place towers beside the road and stop the enemies before they reach your base, across an island campaign of 7 regions.

## Play

Open `fire-at-will.html` in any modern browser. Nothing to install or build. Pick Computer (landscape) or Phone (portrait) at the start.

**Play the latest version:** https://claude.ai/artifact/8ZMpPXyeUvv2EYFnQmjZVX

## Desktop apps

Downloadable apps for Windows, Mac and Linux are on the [desktop release](https://github.com/foma-kazakov/fire-at-will/releases/tag/desktop). They are rebuilt automatically from `fire-at-will.html` every time it changes on `main` (workflow `.github/workflows/desktop.yml`). The wrapper (Electron) lives in `desktop/`; to try it locally, run `npm install` and `npm start` in that folder.

The apps are not code-signed, so Windows and Mac warn the first time they open:
- **Windows:** "Windows protected your PC" → More info → Run anyway.
- **Mac:** right-click the app → Open → Open, or System Settings → Privacy & Security → Open Anyway. If it says the app "is damaged", run `xattr -cr "/Applications/Fire at Will.app"` in Terminal.

Progress in a desktop app is saved inside that app, separately from the browser version.

## Repository

| Path | What it is |
|---|---|
| `fire-at-will.html` | The whole game: HTML, CSS and JavaScript |
| `desktop/` | Electron wrapper that turns the HTML file into Windows, Mac and Linux apps |
| `docs/game-design.md` | Design knowledge base: levels, towers, powers, enemies, achievements, codes, testing tools, history and ideas |
| `CLAUDE.md` | Working rules for editing the game |
