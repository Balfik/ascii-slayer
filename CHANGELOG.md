# Changelog

All notable changes to ASCII SLAYER are documented here. Each entry
corresponds to a tagged [GitHub Release](https://github.com/Balfik/ascii-slayer/releases) —
the release marked **Latest** is always what's live on the
[played link](https://balfik.github.io/ascii-slayer/).

## [0.35] — Public leaderboard

### Added
- **Nicknames.** Auto-generated only (no free-text entry, by design) with
  a reroll button on the title screen.
- **Leaderboard** (new "🌍 Leaderboard" button) — the top 50 players by
  level, plus a live activity feed of milestones ("X reached level 100!",
  boss kills, +10 enchants, Prestiges, a finished Castle, defeating the
  final boss) that updates in real time while the screen is open.
- Backed by a small Postgres database with row-level security: everyone
  can read the board, but each player can only ever write their own row —
  enforced server-side, not just trusted from the client.

## [0.34] — Version number, modal scroll lock

### Added
- The current version number now shows in the footer.

### Fixed
- Opening a modal (Achievements, Bestiary, Quest Board, etc.) on a long
  page, or on mobile, could let you scroll the page underneath it instead
  of the modal's own content — especially disruptive on touch devices.
  The background now stays put while any modal is open; only the modal
  itself scrolls. Closing it restores normal scrolling immediately.

## [0.33] — Mobile controls, player counter, quest board fix

### Added
- **Mobile/touch controls.** On touch devices, an on-screen D-pad (town
  movement), an interact button (context-sensitive, appears near a
  building) and a jump button now overlay the game view — no keyboard
  needed. Desktop/mouse play is unaffected.
- **Player counter.** A rough "how many people have played" count now
  shows in the footer.

### Fixed
- The Quest Board's "Turn in" button could occasionally fail to respond
  if you opened the board mid-run (rather than through the board's own
  building in town) — a background quest-progress update could replace
  the button out from under your click at just the wrong moment. It no
  longer touches the board's layout while a click is in flight.

## [0.32] — First public release

This is the first version published outside of local development, bundling
everything built so far into one release. Future entries will track
individual changes going forward.

### Core loop
- Endless ASCII runner: auto-fighting, jump timing over monsters and pits,
  floating combat text, combo streaks with a gold bonus.
- Four base upgrades (attack, run speed, attack speed, luck) plus "max buy"
  buttons everywhere gold/crystals are spent.
- Rarity tiers from common up to a boss-exclusive **demonic** tier, item
  sets that grant a bonus once you own every piece of a rarity, and
  per-item enchanting in the Forge.
- Offline progress: earnings while the game was closed are paid out (with
  a summary) on your next visit.

### Town & progression
- A walkable town hub (WASD + E) with the Forge, Shop, Quest Board, Boss
  Portal, World Map, and the Castle Grounds.
- Quest board with daily bonus quests, login streaks, and an Automation
  skill branch that can auto-accept and auto-turn-in quests for you.
- A full Skill Tree (five branches: Combat, Speed, Luck, Explorer,
  Automation) with linear costs so leveling stays meaningful into the
  thousands.
- Prestige: reset your run for permanent Prestige Points and its own
  Prestige skill tree; five unique Relics and demonic gear persist through
  every Prestige.
- World Map: pin your farming difficulty to any unlocked region while your
  distance and level keep climbing naturally; the frontier scales forever
  past the last named biome ("The End of All, Lv. N...").

### The Castle
- A 20-stage castle you physically build, piece by piece, out of gold,
  wood, stone, iron, crystals, and souls — it's visible growing in its own
  corner of town as you build, and every stage grants a small permanent
  character bonus that survives Prestige and save/load.

### Bosses & the ending
- Eight scaling bosses (level 50 through 1200) plus an endless Gauntlet
  wave-survival mode, both with their own reward curves — and relic odds
  in the Gauntlet that improve the longer you last.
- A locked final boss, the Guardian of Eternity, unlocked only once the
  Castle is fully built and every relic is collected. Defeating it for the
  first time unlocks a one-time celebration ending (fireworks over the
  finished castle) — the game keeps going afterward, purely for the fun of it.

### Extra systems
- Bestiary (monsters, bosses, personal records, milestone tracks) and 100
  achievements spanning every system in the game.
- An original synthwave/retrowave soundtrack, streamed from
  [ascii-slayer-music](https://github.com/Balfik/ascii-slayer-music), with
  in-game music/SFX controls.
- Full Ukrainian/English localization, switchable at any time.
- Autosave to `localStorage`, plus manual export/import to a save file.
