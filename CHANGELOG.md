# Changelog

All notable changes to ASCII SLAYER are documented here. Each entry
corresponds to a tagged [GitHub Release](https://github.com/Balfik/ascii-slayer/releases) —
the release marked **Latest** is always what's live on the
[played link](https://balfik.github.io/ascii-slayer/).

## [0.49] — Critical input fix, upcoming zones preview, castle icon

### Fixed
- **Critical**: typing into the username/password fields silently
  dropped letters — w, a, s, d, e, t and space specifically, and typing
  was essentially unusable on mobile. Cause: the game's global keyboard
  handler for movement/jump/interact called preventDefault() on those
  keys unconditionally, anywhere on the page, including inside text
  fields. Invisible before 0.47 since the game had no text inputs at
  all. Now skipped entirely while a text field has focus (Escape still
  closes modals as before).

### Added
- The World Map now previews the next 5 not-yet-unlocked zones (name +
  recommended level, locked icon) below the ones you've already opened,
  so there's always visibility into what's ahead — previously a new
  character only saw the starting zone with no indication more existed.
- The castle construction site in town now has a 🏰 icon on its
  always-visible label, matching the icon-prefixed style used
  everywhere else in the game, so it reads clearly as a building to
  walk up to and interact with.

## [0.48] — Fix: login/password fields instantly lost focus

### Fixed
- In the Cloud Save panel, clicking into the username or password field
  immediately lost focus — typing was only possible while holding the
  mouse button down. Cause: a long-standing, unconditional "unstick the
  cursor" handler (fixing a real, separate hover-cursor bug) blurred
  whatever element had focus on every mouse-button release anywhere on
  the page. That was harmless before 0.47 since the game had no text
  inputs at all — losing focus off a button is invisible. Fixed by never
  blurring an INPUT or TEXTAREA; buttons still get the original fix.

## [0.47] — Cloud save (username + password, no email)

### Added
- Link a username and password to your progress from the new "☁️ Cloud
  save" button (next to save/load-to-file), then sign in with the same
  credentials on another device to pull down what you did there. No
  email involved — which also means a forgotten password can't be
  recovered; the game says so up front. Auto-saves to the cloud every 5
  minutes while signed in, plus a manual "save now" button. Loading a
  cloud save always asks for confirmation first, since it replaces
  local progress.

## [0.46] — Fix: freezing at very high levels

### Fixed
- Reported at level ~5000: the game would occasionally freeze the
  browser tab, and once left 2000 skill points unspent all at once. The
  cause: gaining XP re-ran a heavy stat-recalculation on every single
  level inside the level-up loop instead of once after it. A single
  large XP gain (most commonly offline progress, which can pay out up
  to 8 hours at once) can be worth hundreds or thousands of levels at
  high level — meaning hundreds or thousands of expensive recalculations
  back to back on the main thread. Fixed to recalculate once, after all
  levels are applied, matching the pattern already used correctly
  elsewhere (bulk skill purchases). Also throttled the log panel's
  re-render so very high attack speeds (many kills per frame) don't
  rebuild its DOM on every single kill.

## [0.45] — Fix: service worker could serve a stale cached page

### Fixed
- The service worker's "network first" strategy from 0.44 didn't
  actually guarantee fresh content: a plain `fetch()` inside a service
  worker doesn't bypass the browser's regular HTTP cache, so it could
  silently return an old cached copy of the page instead of reaching
  the network. Found immediately after shipping 0.44 via live testing.
  Fixed by forcing `cache: 'no-store'` on every request the service
  worker makes.

## [0.44] — Cosmetic themes, nearby rank, installable (PWA)

### Added
- **Cosmetic themes** — 4 color palettes, unlocked by real long-term
  milestones: Terminal (default), Blood (defeat the Guardian of
  Eternity), Arcane (100% Bestiary), Crystal (100/100 achievements).
  Switch them from the Character sheet.
- **Nearby rank** on the leaderboard — if you're not in the top 50, a
  new section shows your exact rank plus the 3 closest players above
  and below you, so mid-pack players get something to chase too.
- **Installable (PWA)** — the game can now be installed on desktop or
  mobile like a native app, with offline support for the last version
  you played. Online play always gets the newest version first — the
  offline cache is purely a fallback.

## [0.43] — Code cleanup

No player-facing changes. Trimmed development-process notes out of the
source's code comments (kept internally instead), so the shipped file
reads as documentation rather than a dev diary.

## [0.42] — Favicon, meta description, Open Graph card

### Added
- A proper `<meta name="description">`, a favicon (an inline terminal-
  cursor icon matching the game's own palette and font — no extra file,
  the game stays a single HTML file), and Open Graph / Twitter Card tags
  with a dedicated 1200×630 preview image. Links to the game shared on
  Telegram, Discord, or social media now show a real title, description,
  and image instead of a bare URL.

## [0.41] — Player counter now reads from our own database

### Changed
- The footer's player counter used to go through a free third-party
  badge service that had no "read without incrementing" option, so the
  number shown was permanently frozen from whatever it happened to be
  the very first time each individual browser opened the page — two
  devices could show completely different, both stale, numbers forever.
  It now queries our own leaderboard database directly (a lightweight
  row-count query, refreshed on every load and every 5 minutes while
  the game stays open), so it reflects the real, current count instead
  of a permanent snapshot from one random moment.

## [0.40] — Fix: cursor flickering on every level-up

### Fixed
- With a modal open (most noticeably the Skill Tree), the mouse cursor
  would visibly flicker to a "wait" spinner every time you leveled up,
  because the tree re-renders itself live so newly-affordable skills
  unlock immediately — and that harmless background re-render was
  wrongly treated the same as a real click removing a button under the
  cursor (a separate, legitimate fix for a stuck-hover bug). Background
  re-renders no longer touch the cursor; only actual clicks do.

## [0.39] — Fix: log filters were still losing rare messages

### Fixed
- The log's category filters (added in 0.37) correctly hid/showed rows,
  but the underlying log buffer was still a single shared list capped at
  a fixed size — so a burst of a spammy category (e.g. kills) could push
  a rare message (a level-up, an achievement) out of the buffer entirely,
  even while that category was toggled on and should have stayed visible.
  Each category now keeps its own capped buffer, so one category can no
  longer evict another's entries.

## [0.38] — Fix: offline-progress screen showed raw HTML tags

### Fixed
- A regression from 0.37's security hardening: the "while you were
  away" screen briefly showed literal `<b>` tags instead of bolding the
  elapsed time. Fixed with a narrow, explicit exception rather than
  rolling back the fix that closed the injection vector.

## [0.37] — Log filters, security hardening

### Added
- The log panel now has six category filter toggles (combat/kills, loot,
  achievements, quests, bosses, other) so it doesn't flood with kill
  spam at high speed — turn off what you don't want to see.

### Security
- Imported save files are now validated before use: an inventory item
  with an unrecognized rarity is dropped, and item names are always
  HTML-escaped wherever they're displayed. Previously, a hand-edited and
  shared save file could have injected arbitrary script into another
  player's browser when they imported it. Found and fixed proactively;
  no evidence this was ever exploited.

## [0.36] — Shorter cooldowns, colorful leaderboard

### Changed
- Boss and Gauntlet cooldowns are now half as long across the board.
- The Prestige tree now shows the total effect of each skill you've
  leveled, not just its per-level description.

### Added
- The activity feed now colors nicknames and item names (by real
  rarity — legendary gold, demonic red, and so on), matching the color
  language used everywhere else in the game.

### Fixed
- Rerolling your nickname on the title screen before hitting Continue
  didn't actually stick — the old saved nickname silently won out.
- The activity feed's underlying data is now stored as structured
  fields validated server-side, rather than a pre-built string — this
  also closes a theoretical stored-XSS gap in how feed messages were
  written.

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
