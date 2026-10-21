# Fire at Will: Game Design

Knowledge base for the game, extracted from the original design conversation (19 Oct 2026, artifact version 82).

## The game

A tower defense game. You place towers on grass tiles beside the road, and enemies walk the road toward your base. Each enemy that reaches the base costs a life.

- **Device choice:** at the start the player picks Computer (horizontal map) or Phone (vertical map). Every level has both layouts.
- **Main menu:** Play, Settings, Units, Powers, Encyclopedia, Achievements and DLC, plus a gem counter. A hidden **Testing** button appears after redeeming the code `TEST`.
- **Campaign map:** an island with 7 regions of 6 levels each. Only the levels listed below are built so far; unbuilt levels show an X.
- **Gems:** earned the first time you win a level (+5). Spent on units and slots.
- **No stars:** a level is simply beaten or not (beaten levels show a ✓ on the map). Star ratings were removed on 20 Oct 2026. Beating a level unlocks the next one.
- **Waves:** you can call the next wave early once 2/3 of the current wave is gone. Each wave pays a gold bonus when it's fully cleared. Otherwise the next wave starts by itself 4 seconds after a clear.
- **Map obstacles:** trees and webbed ruins block building and can be cleared for gold: trees 100, ruins 75, webs 25. Solid webs can't be removed.
- **Pause menu:** Resume, Settings, Shop ("coming soon"), and Save & Exit, which saves the run so you can continue it later from the main menu.
- **DLC:** extra level packs as JSON files, loaded on the DLC screen; the desktop app reads `Documents/Fire at Will/DLC` by itself. Format and details in [dlc.md](dlc.md). Added 21 Oct 2026.
- **Languages:** English, Russian (full), Spanish, Hindi, Chinese, French, Arabic and Ukrainian (the last six cover menu basics only).
- **Music:** generated in code. It starts on load, or on the first tap if the browser blocks sound.

### Regions, in order
1. **The Fields**
2. **Dark Forest**, plus 3 blue bonus levels that appear after level 12
3. **The Deserts**
4. **Cold Mountains**
5. **The Jungle**
6. **Scorched Depths**
7. **The Kingdom**

### Built levels
| # | Name | Waves | Start gold | Notes |
|---|------|-------|-----------|-------|
| 1 | First Steps | 5 | 220 | Tutorial |
| 2 | Quick Feet | 7 | 200 | |
| 3 | Open Ground | 10 | 190 | |
| 4 | Suppressing Fire | 8 | 210 | Unlocks Mender |
| 5 | Grassmer | 7 | 240 | Fields boss |
| 6 | Edge of the Wood | 8 | 340 | Unlocks Firework Station |
| 7 | Sewer Run | 10 | 360 | Sewers |
| 8 | The Fork | 13 | 400 | |
| 9 | Rotwood Thicket | 15 | 420 | Unlocks Scorchwood |
| 10 | The Foul Pool | 9 | 460 | Lake, tumorlings |
| 11 | The Webbed Trail | 12 | 480 | 9 spiders at wave 7, big spider at wave 12 |
| 12 | The Mire Crossing | 14 | 700 | Dark Forest boss: 4 spawns, lake spawn, the Drowned from wave 3 |
| B1 | Twin Dens | 12 | 560 | Bonus; 19×12; 2 spider dens, ruins |
| B2 | The Silk Warren | 14 | 1000 | Bonus; 25×16; 5 dens, 2 spider nests, egg sacs, 2 bases |
| B3 | The Queen's Lair | 15 | 900 | Bonus; 31×20; spider queen (decoration for now), lakes with lake spawns, silk bridge |

The bonus levels unlock in order, top → middle → bottom. In code their level indexes are 42, 43 and 44, and the bonus levels are built straight from their sandbox level codes.

### Towers (units)
| Tower | Cost | How you get it |
|---|---|---|
| Gunner | 50g | Start |
| Cannon | 100g | Start |
| Sniper | 150g | Start |
| Farm | 75g | "Make it Rain" achievement; max 5 per level |
| Grenade Throwers | 125g | "Smart Target" achievement |
| Time Machine | 500g | 200 gems |
| Steam Workshop | 70g | 30 gems; builds Robot, Tank and Tech Giant |
| Factory | 150g | 70 gems |
| Rocket Launcher | 125g | 55 gems |
| Scorchwood | 160g | Level 9 reward |
| Firework Station | 50g | Level 6 reward |
| Turret | 75g | "Smells Fire" achievement |
| Police Station | 175g | "Policeman" achievement |
| Mender | 120g | Level 4 reward |
| Fire Brazier | 120g | 40 gems; burns nearby webs, but not solid webs or web walls |
| Artillery | 180g | "Bombardment" achievement |

You start with 5 unit slots, which can be raised to 7 with gems.

### Powers
| Power | How you get it |
|---|---|
| Fire Rain | Buy (it also burns webs) |
| Heavy Force | Buy |
| Backup | Buy |
| Poison Lake | Buy |
| Arrow Rain | Achievement |
| Ice Age | Achievement |
| Lightning | Achievement |

You start with 2 power slots, which can be raised to 3 with gems.

### Enemies
| Enemy | HP | Notes |
|---|---|---|
| Grunt | 100 | |
| Runner | 70 | |
| Gunner | 140 | Shoots towers and disables them |
| Thief | 50 | Hides in bushes and steals a tower |
| Husker | 125 | Carries a shield |
| Brute Husker | 240 | Bigger shield |
| Rat | 75 | Comes out of sewers |
| Tumor | 250 | Infects nearby enemies when it dies |
| Tumorling | 60 | Comes out of lakes |
| Drowned | 150 | Slow; poisons your units for 5 seconds |
| Spider | 75 | Fast; leaves webs that drag down your units |
| Big Spider | 120 | Leaves webs |
| Grassmer | 2600 | Boss; sprouts grunts |

### Achievements
- **Make it Rain:** click the gray cloud on the main menu.
- **First shot, then what?:** destroy your first enemy.
- **Snipe, recharge:** kill an enemy with a single hit.
- **Bombardment:** get more than 3 units targeting the same enemy at once.
- **Policeman:** destroy 5 thieves in one level.
- **Smells Fire:** have more than 10 Gunners built in one level.
- **Smart Target:** damage more than 6 enemies with a single artillery shell.
- **Two "???" achievements** whose conditions aren't decided yet; they will unlock Ice Age and Lightning.

### Redeem codes (Settings → code box)
| Code | Effect |
|---|---|
| `GEMS` | +100 gems |
| `GEMS2` | +1000 gems |
| `TDH` | Unlock all units |
| `TBH` | Lock units back to the starting three |
| `AC` | Unlock all powers |
| `DC` | Lock all powers |
| `LVLS` | Unlock all levels |
| `LUSS` | +5000 gold at the start of every level |
| `BUSS` | Remove the LUSS bonus |
| `RESET` | Wipe all progress |
| `TEST` | Show the Testing menu |

---

## Testing menu
- **Test a level:** pick any built level with a slider and play it. Nothing is saved.
- **Sandbox:** a level editor.
  - **Map sizes:** Computer 19×12, Phone 10×18, Large 25×16 and Huge 31×20.
  - **Colours:** sliders for path and grass colour.
  - **Tools:** Path, Spawn, Base and Eraser, plus three tabs:
    - **Plains:** Tree, Lake, Bridge, Plains forest, Bush, Big bush.
    - **Dark Forest:** Forest, Lake spawn, Sewer.
    - **Spiders:** Web path, Webbed forest, Spider den, Spider nest, Spider queen (3×4), Web, Solid web, Web wall (1500 HP), Cocoon, Egg sacs, Silk bridge, Tunnel in/out, Webbed ruin, Bones.
  - **Level code:** "Copy level code" gives the JSON the user sends to Claude to turn a map into a real level.
- **Enemy tester:** one road, infinite gold, every tower and power. You can send any enemy, filter enemies by region, stop time, and use pick mode to drag enemies around.

---

## Design notes and history
- **Visuals:** recently got a big polish.
  - **Battlefield:** muzzle flashes, explosions, floating "+gold" numbers, screen shake, fireflies, cloud shadows and a red flash when an enemy reaches the base.
  - **Menus:** tower icons on the build buttons, a wave banner, and a win screen with a trophy and confetti.
- **Roads:** clean edges, with no grass blobs or blades over them; inside corners are shaded smoothly.
- **Campaign map:**
  - **Sea:** animated sea with foam, sailboats and a compass.
  - **Regions:** each has its own details (windmill, dunes and oasis, lava cracks, fog, snow, river from a spring to a lake).
  - **Names:** region names are written across each region in one size, kept clear of levels.
  - **Level buttons:** coin-style; boss levels have spiked rims, and a bouncing arrow marks your next level.
  - **Route:** each region's levels are scattered over its land in a zig-zag (hand-placed in `FLOW_NODES`; the Dark Forest keeps its loop around its bonus levels), joined by twisting trails that swing side to side (`twistPath`). The dotted trail between levels is semi-transparent (45% opacity) so the land shows through. Region order goes Fields → Forest → Deserts → Mountains → Jungle → Depths → Kingdom.
- **User dislikes:** things that "look AI": rivers that end nowhere, floating parts, labels scattered at random. Keep the art coherent and logical.
- **Money:** discussed. No in-game store, since a single HTML file with no server can't take payments safely. Ideas for later: itch.io (pay what you want), a Ko-fi support button, or web portals like CrazyGames or Poki. Any payout account needs an adult account holder.

## Ideas waiting for later
- **Spider enemies (details to come from the user):**
  - Spiderling
  - Weaver
  - Trapdoor spider
  - Jumping spider
  - Venom spitter
  - Wolf spider mother
  - Spider queen boss that spawns spiderlings from her mouth (she faces the road)
- **Big bush:** intended to spawn enemies later; it has no use yet.
- **The "big spider kingdom" level:** the user is building it in the sandbox.
- **Remaining regions:** Deserts, Mountains, Jungle, Depths and Kingdom levels aren't built yet.
- **Achievements:** conditions for the two "???" ones.
- **Shop:** in the pause menu, currently "coming soon".
- **Other projects (separate):** **Last Stand**, a spin-off tower defense, and **Fire at Will: Hold 'Em**, a multiplayer tower defense inspired by Kingdom Rush Battles.
