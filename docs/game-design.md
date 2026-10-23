# Fire at Will: Game Design

Knowledge base for the game, extracted from the original design conversation (19 Oct 2026, artifact version 82).

## The game

A tower defense game. You place towers on grass tiles beside the road, and enemies walk the road toward your base. Each enemy that reaches the base costs a life.

- **Device choice:** at the start the player picks Computer (horizontal map) or Phone (vertical map). Every level has both layouts.
- **Main menu:** Play, Settings, Units, Powers, Encyclopedia, Achievements and DLC, plus a gem counter. Testing is not in the game: it is the separate **Fire at Will Testing** app (see below).
- **Campaign map:** an island with 7 regions of 6 levels each. Only the levels listed below are built so far; unbuilt levels show an X.
- **Gems:** earned the first time you win a level (+5). Spent on units and slots.
- **No stars:** a level is simply beaten or not (beaten levels show a ✓ on the map). Star ratings were removed on 20 Oct 2026. Beating a level unlocks the next one.
- **Waves:** you can call the next wave early once 2/3 of the current wave is gone. Each wave pays a gold bonus when it's fully cleared. Otherwise the next wave starts by itself 4 seconds after a clear.
- **Halloween island (added 22 Oct 2026):** a separate dead-land island west of the Dark Forest (in the phone layout it sits above). Three locations on its trail: **The Graveyard** (3 levels), **Pumpkin Farm** (4) and **Ashen Wastes** (2, the 9th is a boss; ash and coal ground with thin magma cracks and lava waterfalls into the sea). **Wretched Woodland** (darker grass, horror-movie trees) holds 2 extra level spots shown as faint "?" marks; they'll appear once a certain level is cleared (rule still to come, hook `wretchedOpen()`). None of the island's levels are playable yet: the user will send new tiles and build them. Location names are placeholders. The island is Halloween DLC: it only appears once [dlc/halloween.json](../dlc/halloween.json) (`"map": "halloween"`) is dropped on the DLC screen or put in the desktop DLC folder (`halloweenOn()`). Data: `ISLE_REGIONS`, `ISLE_COAST`, `WRETCHED_SLOTS`; island levels aren't in `LEVELS` yet, so saved progress is untouched.
- **Glowshroom Valley (Shroomed DLC, added 22 Oct 2026):** a small night island off the bottom-right corner of the campaign map (bottom-right in the phone layout too; the map grows to make room). Dark blue grass `#1B2B52`, a slightly lighter path `#455C92`, a moonlit beach, drifting glowing spores. Trees are big white glowshrooms with glowing light-blue spots of different sizes, 3 looks (`glowcap`, `glowshelf`, `glowtwin` in `TREE_KINDS`/`SHROOM_CAPS`). 5 level spots (X, not built) plus 1 extra "?" spot (`SHROOM_SLOT`, hook `shroomExtraOpen()`). Any map on the valley grass plays at night (`drawNight`: darkened land, the mushrooms' spots glow through), in the game and the sandbox, and its random trees grow as glowshrooms. Sandbox gets a "Glowshroom Valley" tab (Glowshroom tool) and the valley colours on the sliders; slider colours only show for installed DLCs. Gated by [dlc/shroomed.json](../dlc/shroomed.json) (`"map": "shroomed"`, `shroomedOn()`). Data: `SHROOM_REGIONS`, `SHROOM_COAST`. Valley blocks (sandbox "Glowshroom Valley" tab, 22 Oct 2026): **Glowshroom path** (road decor, little glowing fungi along the sides and sometimes the middle; `shroomPaths`), **Glowshroom house** (2×2 giant mushroom, door at the foot of the stem, lit windows in the cap, blocks building; `shroomHouses`), **Fungi corpse** (1 tile, a fallen knight with shield, sword and plumed helm overgrown with glowshrooms, 2 looks, blocks building; `corpses`). **Glowshroom forest** is still to come (details from the user). Valley enemies (22 Oct 2026, region `glowshroom`): **Fungling** 50 HP, speed 1.7, reward 5; swarms of 5–8 pop out of a random glowshroom house door or glowshroom-path tile once a third of each wave is out (`funglingWave`). **Glowshroom Warrior** 120 HP, speed 0.95, reward 14, hits units ×1.5; on death a spore burst deals 35 to your units within 1.5 tiles and poisons them 3 s. **Glowshroom Abomination** 400 HP, speed 0.45, reward 28; when one of your units is 0.5–2.5 tiles ahead of it on its line it stops and throws a glowshroom every second (4 damage + 5 s poison). Numbers beyond the HP were Claude's picks.
- **Graveyard level 1, Restless Graves (22 Oct 2026, map by the user):** the first playable Halloween island level. Island levels live in `ISLE_DEFS` and get `LEVELS` slots after every other level (`ISLE_IDX`, all 9 reserved; Restless Graves is index 45) so saved progress never shifts; `TEST_SLOT` now sits after them. The island's first level opens as soon as the Halloween DLC is installed, each next one when the one before is beaten. Balance (Claude's picks): 450 gold, 20 lives, hp ×1.6, speed ×1.05, 10 waves of zombies, skeletons, zombie grunts, skeleton knights from wave 5 and gravediggers on waves 7 and 10; the 14 graves let out a zombie each on the last wave. **Graveyard trees:** dead tree (with a crow), weeping willow, cypress (`GRAVE_KINDS`); on graveyard grass ordinary trees draw as these (oak to dead tree, apple to willow, birch to cypress; `treeKindHere`), and random sandbox trees there are graveyard ones.
- **Graveyard level 2, Mourners' Crossing (23 Oct 2026, map by the user):** large map, 3 spawns, 2 bases, a walled graveyard that sends the dead out all game, 2 abandoned houses and 27 graves (27 zombies on the last wave). Opens after Restless Graves. Balance (Claude's picks): 600 gold, 20 lives, hp ×1.75, speed ×1.05, 12 waves building to skeleton knights and gravediggers. Unlocks Footmen.
- **Sandbox spawns and spawner routes (23 Oct 2026):** any number of Spawns can be placed (the old cap was 4). With routes shown, every other spawner (graves, open graves, bones, jack o' lanterns, sewers, graveyards, crypts, abandoned houses, glowshroom houses and paths, egg sacs) draws a lilac dashed route: straight to the closest bit of road, then along it to a base, the same way the game sends them (`roadFrom`).
- **More Glowshroom Valley blocks (23 Oct 2026, picked by the user):** **Glow pool** (1 tile on grass, blocks building; works like a well: from wave 2, every 9 s, 2–3 funglings crawl out and walk to the nearest road; route shown in the sandbox; `glowPools`). **Puffball** (1 tile on grass, blocks building; when a tower shoots an enemy within about a tile of it, it bursts and blinds (disables) the towers on the 8 tiles around it for 4 s, then regrows in 30 s; `puffballs`). **Mycelium path** (road tile of glowing roots; enemies on it heal 5 HP/s up to full; `myceliums`). Numbers are Claude's picks.
- **Flatcap Golem (23 Oct 2026, designed by the user):** Glowshroom Valley enemy, 300 HP (user), speed 0.75, reward 30 (Claude's picks). When a Backup soldier or the Heavy Force tank comes within 1.6 tiles it digs in (`burrows`, `under`), stops, and the running units pass over it without fighting; it surfaces about 0.75 s after they have gone. Towers still hit it while it's dug in. No natural spawner yet.
- **Fixes (23 Oct 2026):** glowshroom paths are pure decor again (no fungling swarms from them, no route shown; swarms come only from glowshroom houses). The sandbox has one **Forest** block (Plains tab) that takes the look of the grass it grows on (`forestLook`: dark pines on dark grass, leafy on light grass; old webbed forests stay webbed); the Plains forest and Webbed forest tools are gone. Backup soldiers, Heavy Force and alchemists each pick a road at random among the roads they could take, weighted towards roads with more enemies (`pickRoute`: weight 1 + 3 × enemies on that road), instead of always the first route.
- **Glowshroom Valley levels (23 Oct 2026):** the valley's 5 levels sit after the island levels in `LEVELS` (`SHROOM_DEFS` / `SHROOM_IDX`, `shroom:true`, each opens once the one before it is beaten and the Shroomed DLC is in), so progress keys never shift; the hidden test slot moved after them. Level 1 **Glowcap Hollow** (foma's map): 450 gold, 20 lives, hpMul 1.5, 10 waves. Funglings and Warriors first, the Abomination from wave 6, Flatcap Golems from wave 8. Levels 2 to 5 and the extra spot are still waiting for foma's maps.
- **Location ground details (22 Oct 2026):** graves draw one of 5 markers picked by their spot (rounded headstone, ringed stone cross, obelisk, crooked wooden cross, broken slab); the Enemy tester has a DLC folder per installed DLC (Halloween, Glowshroom Valley). every DLC location has its own small ground details and ambience, picked by grass colour (`groundRegion`, `drawGroundBit`): Graveyard has bones, half-buried skulls, dead grass and headstone chips, with low mist; Pumpkin Farm has hay, autumn leaves, baby pumpkins on vines and corn kernels, with leaves tumbling down; Ashen Wastes has glowing cracks, coal, ash heaps and charred twigs, with rising embers and ash flakes; Wretched Woodland has thorn brambles, sickly toadstools, black leaves and clawing roots, with pale green will-o'-wisps; Glowshroom Valley has little glowing fungi (they light up at night, `groundGlows`), blue moss, puffballs and moonlit stones, with blue spores. The fungling has no face (eerie, not funny) and the abomination's glowshrooms grow out of its body on stalks, some forked.
- **Halloween map pieces (sandbox "Halloween" tab, only with the Halloween DLC installed; added 22 Oct 2026):**
  - **Grave** (1 tile): lets out one zombie when the last wave starts, then shows an open hole.
  - **Graveyard** (2×2): must have one whole side against 2 road tiles; its open gate sits in the middle of that side. Tap it again in the sandbox to turn the gate to another side that touches the road. From the first wave on it never stops: a zombie or skeleton every 5–11 s (they don't hold up the win, like spider nests).
  - **Crypt** (1×2): skeletons only, from the dark door on its right end (bottom end in the phone layout), one every 9–18 s, never stopping.
  - **Bones** (changed from decor): work like a sewer, 5 skeletons once on wave 3 (`bonesWave`); 5 random looks like trees. They move from the Spiders tab to the Halloween tab when the DLC is installed.
  - **Abandoned house** (2×2, anywhere off the road, door at the bottom): stays shut (boarded door, which cracks the wave before) until one random wave between wave 2 and the last; 1.5–6 s into that wave the door bursts and 3–7 zombie grunts pour out, counting toward that wave. Each house breaks only once; the break wave is kept when a run is saved.
  - **Crypt door** (fixed 22 Oct 2026): the doorway sits in the crypt's right end wall, drawn at an angle, not on the right of its front. Stood upright in the phone layout, that end faces down.
- **Halloween colours in the sandbox:** with the Halloween DLC installed, the Path and Grass sliders also offer The Graveyard, Pumpkin Farm, Ashen Wastes and Wretched Woodland colours (added at the end of the lists, so old maps keep their colours).
- **Pumpkin Farm grass** (22 Oct 2026, the user's colour): ochre #8B611F (sampled from the user's picture) with soft darker blotches, a fine dotted weave and wisps of dry straw, with pumpkin vines (leaves, curling tendrils, the odd little pumpkin) creeping over it and stopping at the road. Maps using the old olive #6A6237 draw the same way.
- **No deep grasses** (22 Oct 2026): the sandbox Grass slider no longer has the "(deep)" variants. Maps or codes that use a deep colour load with that area's normal grass (`undeep()`).
- **Pumpkin Farm pieces (sandbox "Pumpkin Farm" tab, Halloween DLC only; added 22 Oct 2026):**
  - **Pumpkin** (1 tile, 3 random looks): blocks building and can't be cleared in a game (the sandbox eraser removes it).
  - **Jack o' lantern** (1 tile): blocks building while asleep. Its face lights up the wave before its random wave (wave 2 to the last); 1.5–6 s into that wave roots push it out of the ground (about 1 s) and it walks to the road as a Jack o' Lantern enemy, counting toward that wave. The tile is free afterwards. The wave is kept when a run is saved.
  - **Thorny path** (road tile): road tangled in spiky roots. Any of your units standing on it (Firework soldiers, Backup, machines, tanks) loses 6 health a second and flashes red; enemies are not hurt.
  - **Corn rows** (road or grass, drag to plant; user's design 22 Oct 2026): tall thick corn. Enemies on a corn tile are hidden: not drawn, no health bar, and no tower (including rockets and the Scorchwood) can target them; splash and powers still hit them. The stalks sway harder while enemies push through. On grass it blocks building.
  - **Well** (grass, 1 tile): works like a small lake. From `wellWave` (default 3), every 12 s during a wave one well lets 1–2 tumorlings climb out and walk to the nearest road tile that reaches a base (a lake sends 2–4 every 7 s). Like lake creatures, they don't hold up the end of a wave. Blocks building.
  - **Barn** (2 tall × 3 long, the user's "2x3"): its big door is on its right gable end wall, seen at an angle. Stood upright in the phone layout, the door end faces down. Does nothing yet; it is for upcoming enemies.
  - **Candle shrine** (grass, 1 tile; user's design): towers on the 8 tiles around it reload 20% faster (their cooldown ticks 1.2× as fast). Blocks building.
  - **Open grave** (grass, 1 tile; user's design): every wave, once half of that wave's enemies are out, a hand reaches up and a zombie climbs out (counted in the wave). Blocks building.
  - Graveyard mix: zombie 42%, skeleton 38%, skeleton knight 15%, gravedigger 5%. Crypt mix: skeleton 80%, skeleton knight 20%.
- **Halloween enemies (designed by the user, 22 Oct 2026; balance by Claude):**
  - **Zombie**: 120 hp, grunt speed (1.0), 12 gold. Its bite infects a standing unit (firework-station soldiers, Backup soldiers; not machines or tanks): the unit turns green and rises as a zombie 2.5 s later.
  - **Skeleton**: 125 hp, speed 1.0, 13 gold, knife on its belt. Stops for about 0.4 s to throw a knife at a tower within 150 px (not farms or menders), stunning it for 1.5 s; 2.5 s recharge.
  - **Skeleton knight**: 250 hp, speed 0.85, 24 gold, deals double damage to units.
  - **Jack o' Lantern** (enemy, Claude's stats): 200 hp, speed 0.9, 18 gold, a pumpkin head on a body of roots; no special ability yet.
  - **Gravedigger** (user's design, Claude's stats): 280 hp, speed 0.55, 26 gold. Every 6 s (first after 3 s) it stops for 0.75 s and digs a grave on the road where it stands, 3 at most, never right next to another road grave. A road grave has 500 hp and blocks Backup soldiers and the Heavy Force tank like a web wall (each loses what the other had: 3 soldiers × 250 break one grave, the 1000 hp tank breaks two). Enemies walk over it. On the last wave every road grave lets out one zombie 2 s after the wave starts (or 2 s after it is dug), counted in the wave. Road graves are not kept in a mid-level save.
  - **Pumpkin bomber** (user's design, Claude's stats): 90 hp, speed 1.5, 14 gold, a carved pumpkin with a fizzing fuse that rolls along the road. When a tower is within 2.2 tiles it veers off the road straight at it and blows up: that tower is knocked out for 10 s and towers within 1.3 tiles for 4 s. Towers aren't destroyed (they have no health). If the tower is sold first, it goes back to the road. No natural spawner yet; used in level waves.
  - **Zombie grunt**: pours out of an abandoned house when its door breaks; a grunt (100 hp, 1.0, 11 gold) that looks infected and bites like a zombie.
- **Map obstacles:** trees and webbed ruins block building and can be cleared for gold: trees 100, ruins 75, webs 25. Solid webs can't be removed.
- **Pause menu:** Resume, Settings, Shop ("coming soon"), and Save & Exit, which saves the run so you can continue it later from the main menu.
- **DLC:** extra level packs as JSON files, loaded on the DLC screen; the desktop app reads `Documents/Fire at Will/DLC` by itself. Format and details in [dlc.md](dlc.md). Added 21 Oct 2026.
- **Languages:** English, Russian (full), Spanish, Hindi, Chinese, French, Arabic and Ukrainian (the last six cover menu basics only).
- **Music:** generated in code. It starts on load, or on the first tap if the browser blocks sound. The Testing app has its own two tracks: a calm electric-piano "lab" groove on its screens and a faster E-minor synth drive in test battles.

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
| 12 | The Mire Crossing | 14 | 700 | Dark Forest boss: 4 spawns, lake spawn, the Drowned from wave 3. Unlocks Triple Gunner |
| B1 | Twin Dens | 12 | 560 | Bonus; 19×12; 2 spider dens, ruins |
| B2 | The Silk Warren | 14 | 1000 | Bonus; 25×16; 5 dens, 2 spider nests, egg sacs, 2 bases |
| B3 | The Queen's Lair | 15 | 900 | Bonus; 31×20; spider queen (decoration for now), lakes with lake spawns, silk bridge |

The bonus levels unlock in order, top → middle → bottom. In code their level indexes are 42, 43 and 44, and the bonus levels are built straight from their sandbox level codes.

### Towers (units)
| Tower | Cost | How you get it |
|---|---|---|
| Gunner | 50g | Start |
| Triple Gunner | 140g | Level 12 reward (The Mire Crossing) |
| Footmen | 130g | Halloween island reward (Graveyard 2, Mourners' Crossing) |
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

**Triple Gunner** (23 Oct 2026, designed by the user): three gunners in one nest on one tile, each with the Gunner's stats (8 damage, range 100, same fire rate) and its own aim and reload. Barrel 1 shoots the enemy furthest along the road, barrel 2 the next one, barrel 3 the third; when fewer enemies than barrels are in range, the spare barrels wrap round to the front ones instead of sitting idle (`updateTriple`). Cost 140g (Claude's pick: a small discount on three Gunners). Players who had already beaten The Mire Crossing get it when the game loads.

**Footmen** (23 Oct 2026, designed by the user): a 1x1 stone house that sends footmen out of its door to posts on the nearest road (within 2.2 tiles), side by side along it, up to 3 at a time. They walk out, stand guard and fight whatever reaches them, holding it in place like Firework soldiers. Claude's picks (`FOOTMAN` in the code): 200 HP each, 14 damage per strike (0.6 s), shields cut damage taken by 20%, the first three come out quickly and a fallen one is replaced after 6 s; cost 130g. Zombie bites still turn them. Dots on the roof show how many are out. Players who had already beaten Mourners' Crossing get it when the game loads.

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
| `TEST` | Says Testing is its own app now |

---

## Fire at Will Testing (separate app)
A separate app with its own play link and desktop builds: `fire-at-will-testing.html`, made from `fire-at-will.html` by `scripts/make-testing.js` (it switches `TESTING_APP` on). Its home screen is the Testing screen (Test a level, Sandbox, Enemy tester, DLC) plus Settings. Every DLC in `dlc/` is built into it (it can still take dropped DLC files), and it saves under `fireAtWillTesting.progress`, so it never touches the game's progress.
- **Test a level:** pick any built level with a slider and play it. Nothing is saved.
- **Sandbox:** a level editor.
  - **Description button** (added 22 Oct 2026): turn it on, then tap any block on the map or any tool button to see its size, where it can go and what it does (English and Russian). The texts live in `BLOCK_INFO` in `fire-at-will.html`, one entry per block in top-first order; every new sandbox block needs an entry there.
  - **Waves control** (added 22 Oct 2026): a Scratch-style screen for the sandbox map's waves. Each wave is a stack of **Enemy** blocks (enemy, count, one every N seconds) and **Cooldown** blocks (wait N seconds before the next group); drag to add, reorder or delete (drop outside), tap a palette block to add it to the last wave, duplicate or delete whole waves. Every block shows its exact start and end second. Saved with the sandbox map and in the level code as `waveScript` (a list of waves, each a list of `{"type","count","every"}` or `{"wait"}`); levels and DLC levels built from that code play those waves with exact timing (`exactWaves`, `waveTimeline`). Without it the sandbox uses its 8 default waves.
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

### Testing menu side panel (2026-10-22)
The Testing app's main menu has a panel on the right (below on phones): language (English/Русский), theme, Encyclopedia and Notes.
- Themes: **Classic** (the blueprint look), **Metal** (steel and rust, from the first Last Stand's "Ironfront" theme), **Sunset** (the dusk sky of the first Fire at Will Hold 'Em). Stored in `fireAtWillTesting.theme`.
- **Notes**: a list of notes for ideas and level codes, stored in `fireAtWillTesting.notes` (never in progress). The desktop app keeps them across self-updates; in a browser a warning comes first, and "Save as file" downloads them as text.
- **Devlog** (Testing app): foma posts entries (owner login), anyone comments with a nickname. Stored in foma's Supabase project; `DEVLOG_URL`/`DEVLOG_KEY` in the HTML are the public project URL and anon key (safe to publish). Row-level security there (setup SQL in project files, devlog/supabase-setup.sql) lets only a signed-in user post or delete; sign-ups are switched off so foma is the only user.
