# Fire at Will: DLC files

A DLC is one JSON file with extra levels. The game reads it on its **DLC** screen (main menu → DLC).

## Where DLC files go

- **Desktop app (Windows, Mac, Linux):** the DLC folder is `Documents/Fire at Will/DLC`. The app makes it on first launch, with a README inside. Every `.json` or `.fawdlc` file in it appears on the DLC screen by itself, even while the game is running. The DLC screen shows the folder's path and has an **Open DLC folder** button. Dropping a file on the DLC screen copies it into this folder. To remove a DLC, delete its file from the folder.
- **Browser and the Automator Mac wrapper:** a web page can't watch a folder, so drop the file on the DLC screen (or tap the drop zone to choose it). The game keeps it in the browser under `fireAtWill.dlc`, and each card has a **Remove** link.

DLC levels never touch campaign progress (`fireAtWill.progress`). They give no gems or achievements; the game only remembers which DLC levels you have beaten (a ✓ on the level button), also in `fireAtWill.dlc`. The player's own units and powers are used.

## Format

```json
{
  "fireAtWillDLC": 1,
  "id": "spider-kingdom",
  "name": "Spider Kingdom",
  "author": "foma",
  "version": "1.0",
  "description": "Short text shown on the DLC card.",
  "levels": [
    {
      "name": "Silk Gate",
      "region": "forest",
      "startGold": 500,
      "lives": 20,
      "hpMul": 1.4,
      "waves": [
        [["grunt", 10, 560]],
        [["grunt", 10, 500], ["runner", 5, 360]]
      ],
      "code": { "...": "the sandbox level code" }
    }
  ]
}
```

| Field | Needed | Meaning |
|---|---|---|
| `fireAtWillDLC` | yes | Always `1`. Marks the file as a DLC. |
| `id` | yes | Unique name for the pack. Two files with the same id count as one (the DLC folder wins). |
| `name` | yes | Shown on the DLC card. |
| `author`, `version`, `description` | no | Shown on the card (version is stored for later). |
| `levels` | yes | One or more levels, played in any order. |

Each level:

| Field | Default | Meaning |
|---|---|---|
| `code` | needed | The sandbox's "Copy level code" JSON, as an object or as a string. Computer, Large and Huge maps get a phone layout by turning the map on its side, like the bonus levels. |
| `name` | `Level N` | Level name (stays English). |
| `region` | `fields` | Look of a region: `fields`, `forest`, `desert`, `mountain`, `jungle`, `hell`, `kingdom`. The map's own grass and road colours from the code are kept. |
| `startGold` | 400 | Gold at the start. |
| `lives` | 20 | Lives. |
| `hpMul`, `speedMul` | 1 | Enemy health and speed multipliers (campaign Dark Forest levels are about 1.6–2.2 health). |
| `waves` | sandbox waves | A list of waves; each wave is a list of `[enemy, count, gap in ms]` groups (or `{"type","count","gap"}`). Enemies: `grunt`, `runner`, `gunner`, `thief`, `husker`, `brute`, `rat`, `tumor`, `tumorling`, `drowned`, `spider`, `bigspider`, `grassmer`. |
| `sewerWave`, `lakeWave` | auto | Wave when rats leave sewers / tumorlings leave lakes (0 = never). Only filled in by themselves when `waves` is left out. |
| `spiders`, `bigSpiderWave` | auto | `{"wave": 5, "count": 9}` for spiders from dens, and the wave of the big spider. |

A DLC is data only: it can add levels built from the game's existing towers, enemies and map pieces, but not new units or code. A file the game can't read shows as a card with the reason (for example "Level 2 has no road from a spawn to a base.").

An example pack is in [dlc/example-pack.json](../dlc/example-pack.json).
