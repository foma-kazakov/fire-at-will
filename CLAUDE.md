# Working on Fire at Will

Game design, content tables and history live in [docs/game-design.md](docs/game-design.md).

**Play the latest version:** https://claude.ai/artifact/8ZMpPXyeUvv2EYFnQmjZVX (always mirrors `fire-at-will.html` on `main`).

Older online version, made in a separate claude.ai chat: https://claude.ai/artifact/9wd3etuB5Yn7EexjCooeJg (version 82 as of 19 Oct 2026; no longer updated from this repo).

## How to work on this project

- **One file.** The whole game is the single file `fire-at-will.html`: HTML, CSS and JavaScript, with no external code except Google Fonts (Bungee, Russo One, Rubik). Always edit that file and hand back the full updated file, or update the published artifact.
- **Refresh the play link.** After every change to `fire-at-will.html` lands on `main`, republish it to https://claude.ai/artifact/8ZMpPXyeUvv2EYFnQmjZVX: read that artifact first (Artifact tool, `action: "read"`), then publish the repo file with `url` set to that link. Never publish without `url`, which would make a new link.
- **Desktop apps rebuild themselves.** `desktop/` wraps `fire-at-will.html` with Electron, and `.github/workflows/desktop.yml` rebuilds the Windows, Mac and Linux apps onto the `desktop` release whenever the HTML changes on `main`. Don't copy the game into `desktop/`; the build takes it from the repo root. The apps also **update themselves**: on launch they download the newest `fire-at-will.html` from `UPDATE_URL` in `desktop/main.js` (raw file on `main`) and play it from the next start; Settings has "Check for updates". Only the game file updates this way, so changes to `desktop/` itself still need a fresh download.
- **DLC.** Level packs are JSON files described in [docs/dlc.md](docs/dlc.md). The desktop app's `preload.js` gives the game its DLC folder; in a browser the game falls back to files dropped on the DLC screen.
- **Send the link.** Share the play link with every update.
- **Don't mention conversation limits.**
- **Protect saved progress.** Testing must never touch saved progress. Progress is stored in the browser under `fireAtWill.progress`, and sandbox maps under `fireAtWill.sandbox`.
- **Keep Russian complete.** The game must stay fully translated into Russian. Every new piece of text needs a Russian entry in the `I18N.ru` table. Only the game name and level names stay in English.
- **Check before handing it over.** Test both layouts, computer (landscape) and phone (portrait).
- **The user designs, Claude builds.** The user often sends level maps as sandbox "level code" (JSON). Claude turns them into real levels and picks the balance (gold, waves), then reports the choices so the user can tweak them.
- **About the user.** He's Russian, went to school in Dubai, and chats in English. He also has a Mac app wrapper for the game made with Automator; to update it, he replaces the HTML file inside.
