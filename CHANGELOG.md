# Changelog

All notable changes to ASCII SLAYER are documented here. Each entry
corresponds to a tagged [GitHub Release](https://github.com/Balfik/ascii-slayer/releases) —
the release marked **Latest** is always what's live on the
[played link](https://balfik.github.io/ascii-slayer/).

## [0.91] — Companions to 300, weekend boss cooldowns, more milestones

### Added
- Companions can now be leveled up to 300 (was 200) — levels 200-300
  also cost boss souls on top of the usual gold and crystals.
- Weekends now also halve boss and Gauntlet cooldowns, on top of the
  existing gold/XP/boss-soul bonus.
- Bestiary milestone tracks (distance, kills, bosses, quests, gold
  earned) extended much further.

### Changed
- Demonic (red) item drops now always appear in the activity feed,
  including repeat drops of an item you already own (previously only
  the first time). Legendary (orange) items are unchanged.
- Enchanting a demonic item past +10 now reports every single level
  in the activity feed (+11, +12, +13, ...), not just every 10th.
  Legendary items are unchanged.

## [0.90] — Minor fixes

### Changed
- Cloud save accounts now require an 8-character password (was 6).
  Existing accounts are unaffected.

## [0.89] — Leaderboard now starts at level 100

### Changed
- The public leaderboard and activity feed only show characters that
  have reached level 100. Below that, your character still exists and
  keeps its progress — it just shows "Not ranked yet" instead of a
  rank until it qualifies.

## [0.88] — Leaderboard protection

### Added
- New accounts now go through an invisible bot check before their
  first sync, to stop scripted fake accounts from flooding the public
  leaderboard.

### Changed
- Internal-only: admins can now hide a cheater's account from the
  leaderboard and activity feed.

### Fixed
- Cleaned up a batch of fake accounts with inflated stats that briefly
  appeared on the public leaderboard.

## [0.86] — A beam of your own, and more impact effects

### Added
- The player character now fires their own animated three-strand beam
  during boss fights and the Gauntlet, alongside the companions'
  beams.
- A small particle burst plays wherever a companion's beam lands.
- Regular road combat hits now throw a few sparks on impact.

### Changed
- Internal-only: the admin Telegram notification for a new player now
  includes their referrer, language, and timezone when available.

## [0.85] — Minor fixes

## [0.84] — Minor fixes

## [0.83] — Admin notifications now arrive instantly

### Changed
- Internal-only: the admin Telegram notification for a new player now
  fires the moment the player joins, instead of waiting for a
  scheduled check every few minutes.

## [0.82] — Admin notifications for new players

### Added
- An admin-only Telegram notification fires for each genuinely new
  player joining the public leaderboard.

### Changed
- Internal-only: a couple of test/debug accounts used during
  development are now excluded from the public leaderboard, activity
  feed, and player count everywhere they could appear.

## [0.81] — Fixed the jump button, the New Game warning, and relic events actually reaching the feed

### Fixed
- The jump button on mobile lost its styling in v0.80 (showed as a
  plain unstyled circle) — restored.
- The New Game warning added in v0.80 was rendering behind the title
  screen, making it look like nothing happened until you clicked
  Continue. It now shows up front and center right away.
- Relics were still never showing up in the event feed even after
  v0.80's fix — turns out the database was silently rejecting every
  single one for an unrelated reason. Fixed at the source; relics now
  post correctly.
- The event feed could show a blank row (just a timestamp, no text)
  for an event type your browser tab hadn't loaded support for yet —
  such rows are now skipped instead of showing empty.

### Known issue
- The public leaderboard has a hard ceiling on tracked level for very
  long-running characters; a fix is planned but needs a database-side
  change, not a client update.

## [0.80] — Leaderboard integrity, a livelier event feed, and a reworked mobile town

### Fixed
- The public leaderboard could show a lower level for a player than
  what was already recorded, if that character synced from a device
  or session with older local progress — the leaderboard now always
  keeps the higher value instead of letting a stale sync overwrite it.
- Rare, exciting events (finding a relic, winning a demonic item,
  Prestige, finishing the Castle, beating the game) almost never
  actually reached the public event feed — they were consistently
  losing a race against the server's spam limit to more common events
  fired in the same moment (like a boss kill). Events are now queued
  and spaced out client-side so nothing gets silently dropped anymore.
- On mobile, the WASD/E hint text below the town view stayed visible
  even though touch controls already cover that role.
- "New Game" used to delete your save with only the browser's plain
  confirmation popup, which was easy to tap through by accident on
  mobile. It's now a proper in-game warning that explains exactly
  what will be lost, with a clear Cancel option.
- Removed the double-tap-to-zoom and accidental text-selection
  highlight that could trigger on mobile during quick taps or drags.

### Added
- The event feed now reports a few more kinds of moments: finding a
  new legendary item, unlocking a companion, completing a full item
  set, and hitting a new personal distance record.

### Changed
- The town view on mobile is taller and the tiles read larger and
  clearer. Since the whole town (including the Castle) no longer fits
  comfortably in one screen at that size, it's now split into two
  connected views — walk right past the buildings to reach the
  Castle's own area, and left again to come back to the rest of town.

## [0.79] — Castle rebuilt to match the original design exactly

### Fixed
- The login streak calendar could show your current streak count
  correctly while leaving every day unmarked with a flame — accounts
  that already had a streak going before the calendar existed now
  backfill their history correctly on next login.
- The Castle has been rebuilt from scratch to precisely match its
  intended design — twin towers, banners, gate, and full brickwork —
  instead of the earlier approximation. The Castle plot in town is
  wider to fit the full silhouette, and every alignment issue found
  along the way (towers looking crooked, the level label drifting off
  to one side) has been fixed so it now renders cleanly and
  symmetrically at every level, from the first stone to full Lv.20.

## [0.78] — Login streak calendar, redesigned Castle, fixed Forge overflow

### Added
- A calendar for your login streak: a new "🔥 Streak" button opens a
  month view with every day you logged in marked, current streak
  count, and month navigation.
- The streak now grants a standing bonus (not just a one-time daily
  gift) — attack, gold, and drop chance all scale up the longer your
  current streak runs, up to a cap. Miss a day and it resets.
- Weekends: Saturdays and Sundays always give ×2 gold, XP, and boss
  souls, marked right on the calendar — independent of your streak.

### Fixed
- The Forge could show "Infinity$" as an enchant cost at extreme
  enchant levels — the exponential cost formula genuinely overflowed
  JavaScript's number range. Costs now stay finite at any level.

### Changed
- The Castle model got a full redesign: a symmetric structure with
  twin towers, crenellations, a gate, and banners that genuinely
  builds up floor by floor as you invest in it, instead of the old
  shape that didn't read clearly as a castle.
- Fireworks over town now play permanently once you've completed the
  game, instead of only for a short burst right after.
- The Castle plot's ground tile is darker, less bright.

## [0.76] — Fixed a visual glitch, relic color, companions up to Lv.200

### Fixed
- Critical: the boss/Gauntlet result screen could visually blend with
  the previous frame (fight text and result text overlapping into a
  mess). The new decorative background painted with a semi-transparent
  gradient instead of clearing the canvas first, so old pixels bled
  through frame after frame. Fixed by clearing before drawing it.
- Relic names in the leaderboard feed now show in their proper purple,
  matching how relics are colored everywhere else.

### Changed
- Companions can now be leveled up to 200 (was 100). Levels 101-200
  cost both gold and crystals, with a steeper price increase than the
  first 100 levels.

## [0.75] — Companions join boss fights, mobile controls repositioned, and more

### Added
- Battle Fury now works during boss fights and the Gauntlet too, not just
  on the road — and while it's active, a glowing border pulses around
  the whole game window so it's obvious it's running, not just a number
  on the button.
- In boss fights and the Gauntlet, all of your unlocked companions show
  up together (not just the one active on the road) and fire colorful
  beams at the target — a fun payoff for having them, on top of the
  usual road behavior.
- Boss/Gauntlet screens got an actual background: a soft themed glow
  plus drifting embers, instead of solid black.
- Wake Lock: the screen no longer dims/sleeps while playing on mobile,
  the same way a video player keeps it awake.
- A new Library tab, "Quests", telling the story behind each of the
  5 quest types on the board.

### Changed
- On mobile, the jump button no longer sits on top of the character —
  it moved below the game window, jump on the left and Battle Fury on
  the right. The keyboard-oriented hint text is hidden there too, since
  the buttons speak for themselves.
- The jump button is hidden entirely during boss fights and the
  Gauntlet on mobile, since there's nothing to jump over there.

## [0.74] — Battle Fury skill, moved skill, Library float layout, fixed Forge prices

### Added
- A new skill, "Prolonged Fury" (end of the Combat branch): increases
  Battle Fury's duration and shortens its cooldown per level.

### Changed
- "Flight over the Abyss" (auto-ignore pits) moved from the Runner
  branch to the Automation branch, where it fits by theme. Already
  bought levels are unaffected.
- The Library's image and text now behave like a normal floated
  layout: text wraps beside the portrait and only drops to full width
  once it runs past the image's height, instead of staying squeezed
  into a narrow column the whole way down with empty space beside it.

### Fixed
- The Forge showed a wall of raw scientific notation for enchant
  costs at extreme enchant levels (a side effect of `Number.toFixed()`
  itself falling back to unrounded notation past a certain magnitude).
  Costs now format cleanly at any scale.

## [0.73] — Companions: from one fixed bonus to a full system

### Added
- Companions are now a real choice instead of a single always-on
  perk: three spirits, each with a role, each leveled separately with
  gold, only one accompanying you at a time.
  - **Blade Spirit** (defeat your first boss) — fights alongside you,
    striking your target every 5 seconds.
  - **Hoarder Spirit** (defeat 5 bosses, new) — passive: bonus gold
    and drop chance.
  - **Hunter Spirit** (defeat 20 bosses, new) — passive: bonus XP and
    pickup radius.
- A new Companions screen to pick your active companion and spend
  gold leveling any of them up.
- All three documented in the Library under a new Companions tab,
  with their own icon and lore — locked ones show what unlocks them.
- Existing saves keep their companion exactly as before (nothing
  lost, nothing to redo).

## [0.72] — Golden Glyph and Battle Fury

### Added
- **Golden Glyph**: a rare glowing star occasionally flies above the road.
  Jump at just the right moment to grab it (running past without jumping
  is fine too, no penalty) for an instant burst of gold, sometimes a few
  crystals, and 20 seconds of double gold from every source.
- **Battle Fury**: the first ability you trigger yourself — a button
  (or the Q key) doubles your attack for 10 seconds, then a 60-second
  cooldown. Always visible during a run, on both desktop and mobile.
- Both are now documented in the Library, under a new "Mechanics" tab,
  with their own icon and a full explanation of what they do.

## [0.71] — Run window 50% taller; fixed the overflowing fight-status line

### Changed
- The mobile run window's overall height is up another 50% from 0.70,
  addressing the height it lost as a side effect of that version's
  entity-spacing fix. The row spacing and font-size multipliers that
  fix stabilized are left untouched, so entities stay right next to the
  road and glyphs stay legible — only the sky/margin above and below
  the action grew.

### Fixed
- The fight-status line shown during a run-mode encounter (target
  name — hp/maxHp and its bar) could overflow the screen width on
  mobile with a long target name, getting silently clipped. It now
  uses a smaller font and a shorter bar on narrow screens, with an
  ellipsis fallback for anything still too long.

## [0.70] — Mobile run screen: entities back next to the road

### Fixed
- After 0.69, the player (background sky/mountains now correct) reported
  the player, monsters, and coins were floating in the middle of empty
  sky, disconnected from the road below. The spacing *between* the
  game's three action rows was tied to the same large multiplier as the
  sky/margins above them, so that gap had grown to nearly the height of
  the whole sky. Split it into its own, much smaller multiplier — the
  sky above the road stays just as tall, but the action rows themselves
  now sit close together right above the ground, matching how they look
  on desktop.
- Bumped the mobile font size a bit further, since it was requested
  again — slightly past the theoretical zero-overlap ceiling, so two
  entities landing in adjacent columns may touch occasionally, but
  nowhere near the severe overlap from before 0.69.

## [0.69] — Mobile run screen: proper scale, no more overlapping glyphs

### Fixed
- The taller mobile run window (0.65/0.67) scaled its font size by the
  same factor as the window's height, which made glyphs wide enough to
  overlap their neighbors — coins, monsters, and numbers all crowded
  together. Text now uses its own, much more modest scale, sized to fit
  the row's actual on-screen width instead of growing with the window's
  height.
- The decorative background (sun/moon, clouds, mountains, trees, the
  end-game lava cracks) previously stayed pinned at their old, small
  desktop sizes and positions, looking lost in the taller canvas's extra
  sky. They now scale up together with the window height, filling the
  same proportion of the screen as they do on desktop.

## [0.68] — More leaderboard activity; the stat bar no longer scrolls, anywhere

### Added
- The leaderboard's live activity feed now reports finding a relic, and
  winning a demonic item from a boss (first time only, not duplicates).
- Enchanting a legendary or demonic item now posts to the feed at every
  new +10 milestone (10, 20, 30, ...), not just once at +10 for any
  rarity as before.
- Level milestones in the feed used to stop at 10,000 — they now keep
  going every 1,000 levels indefinitely past that.

### Fixed
- The first stat row (level, title, XP bar, and all six resources) still
  needed horizontal scrolling to see everything, even on desktop. Split
  into two rows — level/XP bar, then resources — so neither ever needs
  to scroll.

## [0.67] — Library polish: real gear icons, a Relics category, an even taller mobile run window

### Changed
- Gear icons previously reused just 4 generic shapes based on the
  item's stat (sword/wing/lightning/gem) — fair feedback that it looked
  random and lazy. Redrawn as 18 fully unique icons keyed to each item's
  actual name: the wing-named items look like wings (not boots, even
  though they mechanically boost speed), the crown-named ones look like
  crowns (including the speed one), and the six different swords each
  have a distinct blade and hilt.
- Added a Relics category to the Library (5 pages) with the same
  unique-icon-plus-history treatment as Gear, including new lore text
  for each relic instead of just its mechanical effect description.
- The mobile run window is another 50% taller on top of 0.65's increase.
- Stat numbers still shifted slightly as large values changed length
  (on both mobile and desktop) — short stats (gold, crystals, souls,
  wood, stone, iron) now reserve a stable minimum width, and longer
  composite lines (level, XP bar, ATK/SPD/A.SPD, distance) get their own
  full row on mobile so they never compete for wrapping space.
- Fixed a wording typo in the Guardian of Eternity's lore entry.

## [0.66] — NEW: the Library — the game's lore (world, Castle, monsters, bosses, gear)

### Added
- A new Library feature: a book-style modal with category tabs up top,
  a portrait on the left, description/history on the right, and page
  navigation at the bottom — one monster, boss, item, or lore page per
  "page" of the book. Reachable from the main menu (a new button) and as
  a walk-up building in town's bottom-left corner, using the same [E]
  interaction as the Forge, Shop, Quest Board, and the rest.
- Five categories: **World** (2 pages — who you are, what's going on,
  why "The End of All"), **Castle** (why it was destroyed, why it's
  being rebuilt), **Monsters** (5 pages, one per monster type, portrait
  = its glyph in a colored frame), **Bosses** (9 pages, portrait = the
  existing hand-drawn ASCII art already used for boss fights), and
  **Gear** (18 pages — every weapon and armor piece in the game, each
  with a small vector icon tinted by rarity and a short, deliberately
  funny history).
- Fully localized (Ukrainian/English) like the rest of the game.

## [0.65] — Mobile layout: no more scrolling stat bars, a taller run window, left-aligned menu

### Changed
- The stat bars (level/gold/... and distance/ATK/SPD) used to require
  horizontal scrolling on narrow screens to see everything. They now
  wrap onto multiple lines instead, with slightly smaller text — nothing
  is hidden behind a scrollbar anymore.
- The run window used to become a sliver just a few pixels tall on
  narrow screens, since it scales to the container's full width at a
  fixed, very wide desktop aspect ratio. It's now noticeably taller on
  mobile, with correspondingly bigger glyphs, HP bars, and text —
  desktop is unaffected.
- The bottom button menu no longer centers its buttons on mobile; they
  now align left, row by row, instead of looking scattered.

## [0.64] — World Map: browse much further ahead, jump straight to a zone

### Changed
- The "Next 100" button was disabling itself only 5 tiers past your
  current progress — a leftover limit from before pagination existed.
  Raised that lookahead to 100,000 tiers, so you can now page far ahead
  and pick a much later zone on purpose.
- Added a "Jump to zone #" field next to the pagination controls, so
  reaching a distant zone doesn't mean clicking "Next 100" over and
  over — type the number (or press Enter) and the map jumps straight to
  that page.

## [0.63] — World Map: paginated 100 zones at a time

### Changed
- The World Map used to list every zone from 0 up to your current
  frontier in one long scrollable modal — thousands of rows deep into
  the game. It's now paginated 100 zones per page, with Previous/Next
  buttons and a "Zones X–Y" label. Opening the map always lands on the
  page containing your current zone, so it stays out of your way early
  and still gets you straight to the frontier later.

## [0.62] — Skill Tree: the complete fix (not just clicks, hover too)

### Fixed
- 0.61 only gave the Skill Tree the "wait until the button is released"
  guard (the click-race fix from 0.60) — the player reported every
  button there still flickered on hover. That guard only engages on an
  actual mouse-button press; plain hovering never triggers it, so
  leveling up kept rebuilding the whole tree under a perfectly still
  cursor.
- Leveling up doesn't actually change any skill node (a node's level and
  lock state depend on skills already learned and Prestige count, not
  character level) — the only real changes are the skill points counter
  and, as a result, whether a given button is now affordable. Fixed by
  updating just that counter's text and toggling each existing button's
  disabled state in place, without rebuilding anything. A full rebuild
  still happens for the cases that actually change nodes: buying a
  skill, and the Auto-Strategist automation.
- Verified live: a level-1 character with heavy attack, hovering a node
  button while real combat pushed it through four level-ups in three
  seconds — the exact same button stayed in the DOM the entire time, and
  clicking it afterward still worked normally.

## [0.61] — The real "buttons keep running away" bug (hover, not clicks) — and three more spots with the same flaw

### Fixed
- After 0.60 shipped, the player said it was still happening, then gave
  the key detail: they weren't clicking at all, just hovering — the
  button highlights, then flickers as if the cursor had been lifted and
  put back down. A console script (event + mutation logging) they ran
  at my request showed the exact pattern: every ~400ms the board's DOM
  changed, and a fresh `pointerover`/`mouseover` fired on the very same
  button moments later, with no `pointerout` in between — proof the
  browser was re-detecting hover because the element itself had been
  replaced under a perfectly still cursor.
- The cause: routine quest-progress ticking (which needs no automation
  skill at all — just an ever-present daily quest of a matching type
  while running) was rebuilding the *entire* Quest Board, buttons
  included, every ~400ms just to update one progress bar's number.
  Fixed by patching only that number's text node directly; a full
  rebuild now only happens for genuine structural changes (a quest
  completing and its claim button appearing).
- The player then noticed the same flicker in the Skill Tree, and rightly
  pushed back on framing this as an "automation" bug — it isn't, there.
  Leveling up (from ordinary play, no automation skill required) forces
  a full Skill Tree redraw on every level, which at high speed can
  happen several times a second. Found and fixed the same flaw in two
  more places while at it: the Forge (from the Auto-Enchant skill) and
  the always-visible Upgrades panel (from the Auto-Train skill) — both
  of those *do* involve automation. All three now defer their redraw
  until the player releases whatever they're holding, the same guard
  already proven on the Quest Board.

## [0.60] — The actual fix for the Quest Board's click-eaten bug

### Fixed
- 0.59's fix (guarding four more functions with the existing "don't touch
  the DOM while a button is held" check) turned out to be necessary but
  not sufficient — the player reported it was still happening. The real
  cause: the guard's own deferred re-render fired synchronously the
  instant `pointerup` fired, which is *before* the browser dispatches
  the subsequent `click` event in the same interaction. That re-render
  replaces the Quest Board's content, detaching the exact button just
  released — so when `click` tries to fire and bubble up to the shared
  delegated handler, its target is no longer in the document and the
  event never arrives. The click silently does nothing, every time a
  background update (quest progress ticking, or the Auto-Quests skill)
  happened to touch the board while a button was held.
- Fixed by deferring that re-render past the current event loop turn
  (`setTimeout(..., 0)`), so `click` is always fully handled first.
  Verified with an isolated reproduction of just the event mechanism
  (synchronous replace loses the click, deferred replace keeps it), and
  live in the game: holding a board button through a background update
  and releasing it now reliably performs the button's action.

## [0.59] — Gauntlet reward bug, guaranteed relic at wave 80, quest-board click fix

### Fixed
- Gauntlet rewards weren't just low, they were actually missing a whole
  multiplier: `awardKill()` and boss rewards both scale gold by the
  player's full gold-multiplier stack (skills, Prestige, Castle, combo,
  day/night) and XP by the farming XP bonus, but the Gauntlet's reward
  function never applied either. On a very late-game character where
  that multiplier stack is enormous, this made Gauntlet rewards fall
  further and further behind the rest of the game's economy the longer
  you played — reported directly after a 102-wave clear paid out a
  trivial amount next to hundreds of billions of banked gold. Both
  multipliers are now applied, matching every other reward source.
- The Quest Board's "click gets eaten" bug (a button's DOM node getting
  replaced out from under a held-down click) had a guard for one
  specific trigger, but four other functions that also refresh the
  board — accepting/turning in quests, including the ones the
  Auto-Quests skill calls once a second — each had their own unguarded
  refresh call that bypassed it entirely. All four now go through the
  same shared guard, so a background refresh from automation can no
  longer swap out a button while it's being clicked. Verified live with
  a MutationObserver: zero DOM changes while a button is held down
  through an automation tick, exactly one deferred refresh right after
  release.

### Changed
- Long Gauntlet runs now guarantee a relic (if any remain unclaimed) from
  wave 80 onward, instead of only ever rolling the percentage chance.

## [0.58] — Three small fixes: upgrade panel, skill tree text, relic odds

### Fixed
- The "Auto-upgrade for gold" toggle (from the "Auto-Trainer" automation
  skill) only showed up in the always-visible Upgrades panel by
  accident, whenever something else happened to refresh that panel
  later (like manually buying an upgrade) — learning the skill itself
  didn't refresh it. It now appears immediately the moment the skill is
  bought.
- The Skill Tree's intro line claimed every skill "has up to 9,999
  levels — a long, gradual climb", which isn't true for the one-level
  automation skills. Removed that sentence.

### Changed
- Relic drop chance from defeating a boss vs. clearing a Gauntlet run
  used to share one flat 5%. Split into two separate rates: 10% for
  bosses, 15% for a full Gauntlet clear (a longer, harder run earns
  better odds) — updated after feedback that a long stretch of boss
  kills and Gauntlet runs produced zero relics.

## [0.57] — Temporary speed cap (2000) while the deeper cause is tracked down

### Changed
- New console data showed frames still running slow constantly (80-125ms),
  but this time every automation step measured near-zero — the 0.55 and
  0.56 fixes genuinely removed the two causes they targeted, but a third
  one remains, hidden in fields the game's own diagnostics don't expand
  by default. Rather than keep guessing at point fixes, effective run
  speed is now capped at 2000 (`MAX_EFFECTIVE_SPEED`), applied once in
  stat recalculation after every skill/item/prestige/castle bonus is
  totaled. Speed drives how much distance is covered per frame, which
  drives how many entities can be reached and processed in that same
  frame — capping it directly bounds that per-frame cost regardless of
  where exactly the remaining slowdown turns out to live.
- This is a stopgap, not a root-cause fix, and is expected to stay in
  place for now.

## [0.56] — Second contributor to the lag: redundant saves in quest automation

### Fixed
- After 0.55 shipped, the player sent new console output showing the same
  slowdown pattern (frames up to 837ms) — but this time with a new
  detail: the quest-automation step itself measured 339ms and 41ms in
  specific frames, instead of the flat 0ms seen in every earlier sample.
  0.55's fix was correct, but not the only cause.
- The real bug: turning in or accepting a quest (the same functions used
  by the player's own quest-log/board clicks, dating back to v0.35) each
  unconditionally writes a full save to `localStorage` (a synchronous
  `JSON.stringify` of the entire game state) and refreshes the HUD. The
  "Auto-Quests" skill's once-per-second automation tick calls these same
  functions in a loop — once per completed active quest, once for the
  daily, once per newly-accepted board quest — so a single tick could
  fire several full saves back to back. On a very late-game save (a huge
  inventory built up over thousands of levels) that's real, measurable
  work, and it's exactly the same anti-pattern already fixed for the
  three automation skills added in 0.51/0.52 — it had just never been
  audited on this older, pre-existing quest-automation path.
- Fixed: turning in / accepting a quest no longer force-saves or
  force-refreshes the HUD when triggered by automation (the existing
  5-second autosave and the main loop's own per-frame HUD update already
  cover both) — only a direct player click still saves immediately, same
  as before.
- Measured: a single save costs roughly 2-7ms on a 4,000-item inventory
  and 27-47ms on 50,000 items (scales close to linearly) — several of
  those stacking in one automation tick on a much larger real inventory
  lines up well with the reported 300ms+ spikes. Verified live with a
  crafted save (huge inventory, several quests ready to turn in, several
  more to auto-accept) running the automation every second for multiple
  ticks with no slowdown and no console warnings.

## [0.55] — Found and fixed the actual cause of the freezing

### Fixed
- The player sent console output from 0.54's diagnostics: frames kept
  getting slower (80ms up to 618ms), every automation measured near
  zero, and the browser eventually had to be force-closed. That pointed
  straight at entity processing during the run.
- The real bug: at high speed, the player can pass multiple monsters
  that each need more than one hit within the very same frame. The
  encounter logic unconditionally overwrote the single "current fight"
  reference for each one in turn — leaving every monster but the last
  permanently stuck in a "fighting" state that nothing ever resolved or
  removed, since movement (and therefore its on-screen position) had
  stopped advancing. Every such moment leaked a few entities forever; at
  high speed this happens often, so the entity list grew without bound
  over a play session — exactly matching the reported pattern of
  gradually worsening frames ending in a full hang.
- Fixed: if the player is already fighting something else that frame, a
  newly-reached monster is simply left alone and reconsidered next
  frame once the current fight ends, instead of hijacking the fight
  slot. Verified with an isolated reproduction (15 monsters reached in
  one frame: 14 permanently leaked before the fix, 0 after) and a live
  ~30-second test built specifically to trigger the bug (attack too low
  to one-shot monsters, extreme speed) — no slowdown, no console
  warnings, normal combat and progress throughout.

## [0.54] — Performance diagnostics (no gameplay change)

### Added
- Reported: the browser hung again at an extreme level — this time
  while standing still in town with the Boss Portal open, not while
  running/fighting, so the previous fix (the kill sound) can't be the
  cause here. Tried reproducing with several plausible scenarios
  (skills still actively leveling rather than already maxed, a huge
  gold/skill-point surplus, standing idle in town) without success.
  Rather than keep guessing and risk another regression like 0.52's,
  added lightweight always-on timing diagnostics: if a single game-loop
  tick takes longer than 80ms, a detailed breakdown (time spent in each
  automation, the mode-specific update, HUD refresh, entity count) is
  logged to the browser console. No behavior change — purely
  observability, so the next occurrence can be diagnosed with real data
  instead of speculation.

## [0.53] — Revert 0.52's spawn cap, fix the real cause of the lag

### Fixed
- Reported right after 0.52: monsters and items disappeared from view
  entirely at very high levels — only pits remained visible. The spawn
  cap added in 0.52 was based on a wrong assumption: at extreme attack
  power, every monster within a single frame's movement is genuinely,
  legitimately killed that same frame (not discarded unseen) — capping
  spawns was directly cutting real kills and rewards. Reverted that cap
  entirely.
- The actual cause of the severe lag: the kill sound effect generated a
  brand new noise buffer (a few thousand random samples) on every single
  kill. At the kill rates extreme characters reach, that's millions of
  random-number calls and megabytes of garbage every second — far
  heavier than the number of on-screen entities itself. The noise buffer
  is now generated once and reused, and the sound is throttled to at
  most one play per ~30ms (well beyond what's audible as distinct hits
  anyway).

Verified with a live stress test ~37x more extreme than the reported
character: monsters and pickups are visible again, and the game stayed
essentially fully responsive (a 3-second wait measured at 3002ms, vs
3523ms in the previous, far less extreme test before this fix).

## [0.52] — Optimization: severe lag with automation at extreme levels

### Fixed
- Reported at level ~11,600 with very high stats: enabling the new
  automation skills made the game hang and lag horribly (already heavy
  without them). Two causes found:
  1. All three automation skills (Auto-Smith/Auto-Trainer/
     Auto-Strategist) were forcing a full save every second they acted —
     no other frequent game event does this (even 60 kills/sec rely on
     the existing periodic autosave). Removed; also removed a redundant
     HUD update each was calling on top of the one the main loop already
     does every frame regardless.
  2. Independent of automation: at extreme run speed, the monster/coin/
     pit/wood spawn horizon can jump hundreds of tiles in a single
     frame, which uncapped could spawn thousands of entities per second
     — almost all of them passed and discarded before ever being seen.
     Capped at 8 new entities per type per frame (unnoticeable at normal
     speed, where this was already 0-1 per frame). Measured ~7,400
     entities/sec before the cap vs ~2,400/sec after, at the reported
     character's actual speed.

## [0.51] — Three new automation skills

### Added
- **Auto-Smith** (50 skill points): automatically enchants items at the
  Forge using gold — never touches demonic items (those cost souls).
- **Auto-Trainer** (50 skill points): automatically upgrades attack /
  run speed / attack speed using gold — never touches Luck (that costs
  crystals).
- **Auto-Strategist** (100 skill points): automatically spends free
  skill points across the whole skill tree, branch by branch, top to
  bottom.

Each unlocks its own on/off switch once learned (off by default even
after learning, same as the existing boss auto-retreat toggle) — in
the Forge, the Upgrades panel, and the Skill Tree respectively.

## [0.50] — Zones never lock, castle icon on the door tile, modal fix

### Changed
- World Map zones no longer lock at all. The "recommended level" shown
  was always a friendlier, divided-by-10 number, while the actual
  unlock check used the real (10x higher) threshold — so a level-29
  character could still see a zone as locked despite being well past
  its displayed recommended level. Rather than fix the mismatch,
  removed the lock entirely: every zone (all named biomes plus a
  handful of endless ones ahead) is always selectable, with the level
  warning kept purely as a heads-up, not a gate.

### Fixed
- The castle construction site in town now has its 🏰 icon drawn right
  on the door tile itself — the same treatment every other building
  (Forge, Shop, Quest Board, etc.) already had — instead of only a
  distant label above a growing, hard-to-read construction sketch.
- The Cloud Save panel could occasionally close itself while typing,
  especially on mobile: the "click outside closes the modal" handler
  only checked where the click's release landed, and a mobile keyboard
  animating into view can shift the page between press and release,
  making a stationary tap register on the backdrop instead of the
  field. Now requires both the press and the click to land on the
  backdrop itself.

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
