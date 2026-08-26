# Changelog

All notable changes to Nexus are documented here. This file follows the
spirit of [Keep a Changelog](https://keepachangelog.com/), and Nexus follows
[Semantic Versioning](https://semver.org/): `v1.0.x` = bugfix, `v1.x.0` =
feature, `vX.0.0` = major overhaul.

Nexus was developed privately through an extended internal beta before its
public debut. This changelog starts at that public debut and will be kept
current with every release going forward. It intentionally doesn't dump the
full internal development history (hundreds of incremental dev builds); if
you want that level of detail for a specific change, ask on
[Discord](https://discord.gg/8UKt8s5FbW).

> **A note on what's actually downloadable right now:** this file lists
> every real, committed change, but not every entry below has been packaged
> into a tagged [Release](../../releases) yet. That happens after a final
> round of hands-on testing on each batch. **v10.12.5 is the newest version
> you can actually download today.** Entries above v10.12.5 describe real
> changes already in our source tree, not vaporware, just not released yet.
> See [Known Issues](docs/KNOWN_ISSUES.md) for what's still open in the
> v10.12.5 build specifically.

## [10.15.0] — 2026-08-26: Live-testing bug list, plus a real data-corruption fix caught by our own audit

A large batch of fixes from live testing, worked through with our usual
research-then-fix method and an independent adversarial review of the
changes before shipping. Some highlights:

Color tags saved correctly all along but only showed up in Grid view, not
List view (the default). Fixed. Secure Notes' Markdown preview toggle threw
an error on the second click, and the Delete button could be pushed
off-screen by an overflowing toolbar with no way to reach it. Both fixed.

The adversarial review caught something worth calling out on its own: a
pre-existing bug (not introduced by this batch) where opening Advanced
Settings silently reset your Lock Screen Style back to "Default" every
time, regardless of what you'd actually chosen. Fixed.

Also: the video and audio players now explain clearly when a file can't be
decoded (usually a missing codec, not a broken file) and offer to open it
in your system's default player instead. An unsupported audio file used to
fail with no error at all. Setup now asks what to call you (optional) and
greets you by name and time of day. Four themes that existed in the app but
had no way to select them (Ocean, Slate, Emerald, Coral) are now in the
Appearance panel. Borders across every theme were hard to see and are now
brighter. The brand mark has a subtle animation on the About page and lock
screen instead of sitting static.

Streamer Mode's Print Screen exclusion was independently re-verified with a
real capture test rather than re-guessed at. The underlying mechanism and
its coverage across every window in the app both check out.

Full detail on all of it, including what was investigated and found to
already be working correctly, is in the project's internal release notes.

## [10.14.4] — 2026-08-26: Print Screen's real, complete root cause

The previous release fixed a real bug (a clipboard-protection feature
wiping out unrelated content, including screenshots). It turned out not to
be the whole story. The actual complete cause: the global "Show Nexus"
hotkey could get stuck bound to a bare, unmodified key, including Print
Screen itself, silently claiming it system-wide and blocking Windows' own
screenshot handling entirely. Fixed at the source, and self-healing: an
existing bad configuration corrects itself automatically on next launch.

Also added: launching Nexus while it's already running now brings the
existing instance to the foreground directly, instead of showing a
dead-end "already running" message with no way back in short of ending
the process.

## [10.14.3] — 2026-08-26: Print Screen fixed (real root cause), key display fidelity

More issues found in the same live-testing session:

- Pasting a license key now shows back exactly what you pasted, including
  a legacy-format key's old prefix — the previous fix stopped it from
  losing characters, but it was still silently rewriting what was
  displayed.
- **Root-caused and fixed "Print Screen does nothing."** Not a Streamer
  Mode bug — a clipboard-protection feature was, in some cases, wiping out
  a screenshot within about two seconds of it being taken, if you'd
  recently copied something else from Nexus (a password, anything from
  your vault). It no longer touches clipboard content that isn't its own.
- Closed a related gap found during that investigation: the global
  "Show Nexus" hotkey could previously be set to a single key with no
  modifier. Now requires Ctrl, Shift, or Alt, same as any standard custom
  hotkey.

## [10.14.2] — 2026-08-26 — Real bugs found in early live-testing

Found within minutes of live-testing v10.14.1 starting. Two real, confirmed
fixes:

- Pasting a full license key (one still using the old "NXBT-" prefix format)
  could silently lose characters and fail to activate, even for a genuinely
  valid key. Typing a key by hand, or pasting a newer-format key, was never
  affected.
- Uninstalling Nexus now checks whether it's still running first, and the
  "remove Nexus.exe" step during uninstall has been replaced with a
  mechanism that's actually confirmed to work — the previous one relied on
  a Windows privilege a normal (non-admin) install doesn't have, so it had
  likely never actually cleaned up the exe file despite always reporting
  success.

## [10.14.1] — 2026-08-26 — Security hardening + accessibility round 2

A focused hardening pass, the last of a multi-session security audit before
real-machine testing begins. Highlights:

- Fixed a timing side-channel that let anyone determine whether a decoy
  password was configured, just by timing a single unlock attempt.
- The vault master password no longer sits as a plain string in memory for
  the whole time your vault is unlocked — it's now kept somewhere Windows
  won't page to disk, and is properly wiped on lock.
- The settings file (cfg.dat) no longer shares one encryption key across
  every install of Nexus ever shipped — each install now gets its own,
  generated automatically, no action needed.
- Fixed a real bug where Panic Wipe (Ctrl+Shift+W), triggered from a decoy
  session, could destroy your real vault instead of doing nothing.
- Fixed a gap where hovering over a honeypot bait file (vs. opening it)
  didn't trigger the intrusion alert.
- Hardened a video-preview temp file that was leaving decrypted bytes in a
  shared, unmanaged location.
- Removed a whole dead, unreachable window that carried a weaker lock path
  than the one actually in use.
- More accessibility fixes: the main window now has a proper title and
  correct keyboard tab order, and roughly a dozen more icon-only buttons
  across the app now have real screen-reader names.

See [Known Issues](docs/KNOWN_ISSUES.md) — none of this is live-tested yet,
so it's not in a tagged release until that happens.

## [10.14.0] — 2026-08-25 — License activation cleanup

The activation screen no longer shows a beta-specific category label —
it just asks for your license key. Also moved the revoked-key list from
a hardcoded value in our own source code to a real exported file, so
revoking a key no longer requires editing source code by hand. Fixed a
stale line in LICENSE that still claimed zero network calls of any
kind, inconsistent with PRIVACY.md/SECURITY.md's already-correct
disclosure of the update checker. No change to how existing license
keys validate.

## [10.13.2] — 2026-08-25 — Accessibility: screen-reader labels, contrast audit

Icon-only buttons across the app — window close/minimize/maximize
controls, the audio player's transport buttons, toolbar icons — now
have real accessible names for screen readers like Narrator. Also ran
a real, computed WCAG contrast check across every theme rather than
eyeballing it; body text passes comfortably everywhere, and two themes
(Slate, Midnight) have a couple of small-text spots that are marginally
under the strictest guideline — flagged for a closer look, not changed
blind. One known gap disclosed rather than hidden: Secure Notes'
formatting toolbar isn't currently keyboard-reachable via Tab, a
pre-existing limitation this pass didn't fix (needs live testing to fix
safely without breaking the editor's existing click behavior).

## [10.13.1] — 2026-08-25 — Portable-mode fix (a regression in the previous release, caught before it mattered)

We run an independent, adversarial review pass on our own changes
before calling them done — a second pass that's told nothing about what
the first pass concluded and tries to find what's actually wrong. This
time it found a real one: v10.13.0 claimed portable mode no longer
writes a registry entry on the host PC. It still did — one line of the
fix was sitting outside the check that was supposed to guard it, so it
ran unconditionally regardless of portable mode. Now genuinely fixed
and re-verified. Also fixed: a minor resource-handling issue in the new
tray icon code from the same release (low real-world impact, cleaned up
anyway). No other functional changes.

## [10.13.0] — 2026-08-25 — Official brand identity

Nexus now uses its real, official logo — everywhere. A generic padlock
placeholder and a plain diamond glyph had been standing in for the
actual mark since the very first release; this release replaces every
instance of it with the real thing: the app icon, the system tray icon,
the lock screen, splash screen, About screen, every window's title bar,
and the banner on this README.

While wiring it in, we also found and fixed a real pre-existing bug: the
system tray icon has never actually been able to load from the file it
was looking for (that file was never present in a real published
build), so it silently showed a hand-drawn fallback the whole time
regardless of what was in that file. It now pulls the icon straight
from the app itself, which can't fail the same way.

No functional/security changes in this release — purely visual identity.

## [10.12.9] — 2026-08-25 — Uninstaller correctness pass + auto-updater hardening

Last release introduced Nexus's first real uninstaller (app + registry +
cached files, with vault data as a separate opt-in). This release is a
dedicated correctness pass on it, plus hardening for the auto-updater so
it can't leave clutter behind across versions. No new features — just
things that needed to actually work right, found by re-checking rather
than assuming the first version was correct.

**Portable mode no longer leaves a trace on the host PC.** Running with
`--portable`, or straight off a USB stick, used to still copy Nexus into
this computer's AppData folder and register it in Apps & Features —
exactly what portable mode is supposed to prevent. Both are now skipped
for a portable run, and vault-data deletion during uninstall now looks in
the right (portable) location instead of the normal install path.

**Uninstall no longer reports false success.** The step that schedules
Nexus's own exe for removal only worked if it happened to be running from
one specific folder. Since Nexus has no installer, plenty of people run
it from wherever they put it — that step was silently doing nothing for
them while still showing a checkmark. Fixed to work regardless of where
Nexus is running from.

**Auto-updater no longer accumulates old downloads.** If an update you'd
downloaded got superseded by a newer release before you restarted to
apply it, or a download dropped partway through, the leftover file used
to sit in the update cache indefinitely. Both cases are now cleaned up
automatically.

We also re-verified (not just re-asserted) that the update checker is
still the only network call Nexus makes, and re-traced that every vault
format we've ever shipped still decrypts correctly.

**Honesty note, same as every release in this series:** compiles clean,
not live-tested — we don't currently have a way to test full GUI flows
outside of Atharva's own machine.

## [10.12.8] — 2026-08-25 — Decoy mode hardened: the two most serious fixes yet

The most important release in this audit series. Two findings stand
above everything else we've fixed so far:

**A decoy-password holder could have permanently locked you out of your
own vault.** Changing your password from Settings had no check for decoy
mode at all — someone using your decoy password could change "the"
password and lock the real owner out, or generate a new recovery phrase
and see the real words on screen. Both now refuse outright in decoy mode.

**Factory Reset didn't wipe anything, and our emergency Panic Wipe
skipped the database.** Factory Reset ran its full confirmation flow,
password included, then silently did nothing. Panic Wipe (the
no-confirmation emergency hotkey) never included the database file, so
credentials, journal entries, contacts, and bookmarks would have survived
it. Both fixed and now share one corrected wipe path.

We also root-caused the decoy-mode data leak from our previous release —
a stale in-memory list that wasn't cleared on lock — fixed it at the
source, and found the same issue in two more places (the intruder log
and a security scan) that use an unrelated encryption scheme and needed
their own fix.

**Honesty note:** everything here compiles clean, but we were not able to
live-test the two most severe fixes before shipping. We attempted to —
automated keyboard input in our environment turned out to affect a real,
live desktop session in an unpredictable way, so we stopped rather than
risk it. Treat this release as fixed-in-code, pending our own hands-on
verification, the same way we've disclosed every release in this series.

### Also fixed
- The un-hide hotkey for stealth mode now requires your password —
  previously it was instant with zero check, for anyone with keyboard
  access to your unlocked session.
- A timing bug meant our "hardware-bound" machine ID never actually used
  your hardware — always silently fell back to a much weaker value.
- Secure delete can now report whether the real 3-pass wipe succeeded,
  instead of failures being invisible to every caller.
- Two more real data-loss windows closed in file import.
- Crash logs saved to your Desktop no longer include real file names.

Full technical detail is more than fits here; ask on Discord if you want
the complete writeup.

## [10.12.7] — 2026-08-24 — Deeper audit: 17 more real fixes

Continued the same audit pass that produced 10.12.6, going further into
parts of the app we hadn't checked yet: memory handling, Windows Hello
convenience-unlock, multi-vault/decoy isolation, backups, file
self-destruct, and the core encrypt/decrypt integrity path. Found and
fixed 17 more real issues. As with 10.12.6, we'd rather list what was
actually wrong than round it up to "security hardening."

**Honesty note on verification:** every fix here compiled clean and was
traced through source carefully, but — unlike 10.12.6's anti-tamper fix —
none of this batch has been exercised against a real running vault yet.
That's coming before we'd call any of it fully proven.

### Worth explaining plainly

**Windows Hello convenience-unlock was storing your master password in a
form any other program running as you could read — no fingerprint or PIN
needed.** The stored credential was protected with Windows' standard
per-user encryption but with no additional binding material, so the
exact same one-line unlock call available to us was available to
anything else running in your Windows session. We've added binding
material that closes this off against generic credential-theft
techniques. We want to be direct about the rest: this is a known
limitation of the underlying Windows encryption primitive, not something
we can fully close in an app like this without a much larger rebuild of
that feature — full detail on what is and isn't protected is in our
internal audit notes, and if you use Hello unlock and want the specifics
before trusting it, ask on Discord.

**Decoy/hidden vault names were visible in plain sight, no password
needed.** Creating a new vault used to name its storage folder after the
vault itself. Anyone who could browse your app-data folder — not hack
it, just browse it — could see the name of a "hidden" vault before ever
entering a password, defeating the point of having one. Folder names are
now unrelated to the vault's name.

**File self-destruct (expiry) silently didn't work for most users.**
Setting or extending a file's expiry date had no real effect on the
database backend most vaults actually use — the app would even confirm
"expiry set" while doing nothing. Fixed.

**Locking the vault could silently fail — and then silently keep failing.**
If any single step in the lock sequence hit an error, the vault could stay
open with no visible sign, and every later lock attempt in that session
would then also silently do nothing. This is very likely why two of
10.12.6's own fixes (anti-tamper and remote-session detection) correctly
caught their trigger condition in testing but didn't visibly lock the
vault — same underlying bug. Every step in the lock sequence is now
independently guarded, and a failure now shows a clear warning instead of
disappearing.

**A file that failed its integrity check could still open normally.**
Nexus authenticates every file's encryption tag on decrypt — that's the
whole point of using AES-GCM instead of a mode without authentication. Two
of the decrypt code paths were discarding that check's result instead of
acting on it, so a corrupted or tampered file could still open as if
nothing were wrong. Now refused with a clear error instead.

### Also fixed
- The vault's derived encryption key was held in ordinary, unprotected
  memory for as long as it stayed unlocked, instead of the memory-locked
  storage we already use for other session keys.
- The anti-keylogger shield now covers the password-reveal ("show
  password") view and the password-change/duress-password dialogs — it
  previously only covered the main lock screen.
- Backups now securely wipe the brief plaintext staging file they create,
  instead of an ordinary delete.
- Exported vault bundles now require a real password (8+ characters,
  previously unenforced) since they're specifically meant to leave the
  machine, and now tell you if any files failed to export instead of
  going silent about it.
- The error log no longer keeps writing to the wrong vault's file after
  switching vaults without restarting the app.
- The vault integrity seal (shown on the Security page) used the same
  class of weak key our activity log's tamper-evidence had in 10.12.6 —
  found in a file we hadn't re-checked yet. Fixed the same way.
- Picking or creating a vault from Settings' "Manage Vaults" dialog used
  to close the dialog and do nothing with your choice. Fixed.
- A couple of session-key handling and small crypto-hygiene gaps closed
  along the way.
- Corrected a piece of internal documentation that overstated what our
  clipboard-monitoring feature can detect (it can react to being
  overwritten, not to being read — no API exists for the latter). No
  behavior change, just an accuracy fix to how we described it.

Full technical detail — every finding, what was broken, alternatives
considered, exact fix, verification status — is more than fits here; ask
on Discord if you want it.

## [10.12.6] — 2026-08-23 — Security claims audit: 7 real fixes

We ran a full internal audit against every security and privacy claim we
make — not prompted by a specific report this time, just checking our own
work before we'd stand behind these claims to a skeptical user. Found and
fixed 7 real issues, three of them meaningful enough that we want to be
upfront about them rather than bury them in a bullet list.

### The three worth explaining plainly

**Decoy vault didn't actually work.** You could set a decoy password in
Settings, but entering it at the lock screen was treated as simply wrong
— it wouldn't open a decoy vault, and repeated use could even trigger the
same lockout as a real intrusion attempt. Fixed, with equal-time
verification so response speed can't reveal which password type was
entered — that timing signal would defeat the whole point of a decoy.

**Activity log tamper-evidence used a key that wasn't actually secret.**
The HMAC chain protecting the activity log from silent tampering was
keyed from device hardware identifiers — readable locally by anyone with
access to the machine, which is exactly the attacker this feature exists
to catch. Now derived from your vault password instead.

**Anti-tamper detection had a real gap that could let it silently stop
running.** A shared internal flag could cause the periodic security sweep
(debugger detection, process injection checks, and more) to skip itself
indefinitely under the wrong timing. Fixed and confirmed working with a
live test.

### Also fixed
- Vault database saves could intermittently fail to persist silently — a
  real reliability issue we're not comfortable leaving unaddressed.
- Remote-access session detection now recognizes common remote-access
  tools directly, not just Windows Remote Desktop.
- Background trace-cleanup for thumbnail cache now falls back to a
  scheduled cleanup when Windows has the file locked, instead of quietly
  not happening.
- Security status indicators in the app now reflect verified, current
  state rather than just "is a background check enabled."

Full technical detail on each — including how each fix was verified — is
more than fits here; ask on Discord if you want it.

## [10.12.5] — 2026-08-23 — Streamer Mode fix, verified

10.12.4's fix didn't fully hold up in real testing — thank you for
reporting it. Root-caused further and replaced the underlying technique
with a stronger, more direct one, rather than patching the same idea
again. Our previous "verify it worked" check was reading a value that
would always report success regardless of whether the fix actually took
effect — it wasn't proof of anything. This release replaces that with a
real forced window-surface rebuild, and this time it was confirmed with
an actual live repro (toggle on, confirm hidden; toggle off, confirm
visible again — repeated twice) before shipping, not just reasoned about.

### Fixed
- Screen-capture visibility restoration now uses a stronger technique for
  forcing Windows to actually release capture protection when Streamer
  Mode is turned off — verified working with a live test, not just code
  review.

## [10.12.4] — 2026-08-23 — Streamer Mode capture policy is now self-verifying

Follow-up to 10.12.3: rather than just trust that the previous fix's
workaround reliably works, Nexus now checks.

### Added
- Every screen-capture visibility change is now read back from Windows
  and automatically retried if it doesn't match what was requested —
  self-correcting instead of assume-and-hope. Persistent mismatches are
  logged for diagnosability.

## [10.12.3] — 2026-08-23 — Streamer Mode "off" didn't reliably mean off

A real, reported bug: turning Streamer Mode off didn't reliably restore
screenshot capability. Traced to two settings-save races that could let a
stale "still on" value silently reload right after toggling off, plus a
documented Windows quirk where reversing screen-capture exclusion doesn't
always take effect from a single API call without extra prompting. Both
closed.

### Fixed
- Two race conditions around how the Streamer Mode setting gets saved and
  re-read, either of which could silently re-enable capture protection
  moments after you turned it off.
- Reversing screen-capture exclusion now also forces a window-surface
  refresh, working around a known Windows limitation where the plain API
  call alone doesn't always take effect for every capture method.

## [10.12.2] — 2026-08-23 — Auto-updater durability hardening

A few fixes to the in-app updater aimed at long-term reliability rather
than any specific bug report — the kind of thing that only bites months
from now if left alone.

### Fixed
- The updater's version comparison only understood plain `X.Y.Z` release
  tags. Any future tag using a suffix (a release candidate or beta
  channel, for instance) would have silently stopped update checks from
  working on every installed copy, with no way to tell why. Fixed to
  tolerate suffixes.
- Large downloads (the app is 180MB+) could get misreported as failed on
  slower connections due to a generic short network timeout. Raised to a
  realistic ceiling.
- Update-check failures are now logged locally for diagnosability, while
  staying just as silent to the user as before — no new UI, no new nags.

## [10.12.1] — 2026-08-23 — Discord community moved

Our Discord server finished a full rebrand — new name (Northbyte Studios,
was Obsidian Labs) and a rebuilt server. This release just points every
in-app and documentation link at the new invite; nothing functional
changed.

### Fixed
- Discord invite updated everywhere it appears — in the app (About,
  Activation, EULA, and elsewhere) and across this repo's documentation.
  The old invite is retired.
- Two small changelog inaccuracies from the previous entry corrected: a
  dead link to an internal-only audit report writeup, and this file's own
  v10.12.0 date (was one day off).

## [10.12.0] — 2026-07-30 — Vault encryption corrected to real AES-256-GCM

We've said "AES-256-GCM" since our very first release. An internal review
caught that this wasn't quite true: the actual cipher was AES-256-CBC paired
with a plain SHA-256 hash standing in for integrity checking — not an
authenticated cipher, and not tamper-evident the way GCM implies. We're
correcting that now rather than let a security claim stand that wasn't fully
accurate.

### Fixed
- **Vault encryption is now genuinely AES-256-GCM**, keyed the same way as
  before (Argon2id from your master password). Every file you save from this
  version onward is encrypted with real, authenticated AES-256-GCM.
- **Nothing in your existing vault is affected.** Files already saved under
  the previous method keep opening exactly as they do today — there's no
  re-import, no migration step, no waiting. They'll transparently move to the
  new method the next time you save or edit them.
- **Create-new-vault flow fixed.** Creating a new vault from the vault
  switcher used to drop you on the unlock screen prompting for a password
  you hadn't set yet — you'd have to restart the app to reach the setup
  wizard. Now the setup wizard opens directly after you create a new vault.

### Added
- **In-app updates.** Settings → Updates shows the current version, a
  "Check for updates" button, and a full download / verify / install flow.
  Three modes: Off, Notify (default), or Automatic. Restarting to install
  is always a manual confirm — Nexus will never close your vault silently
  to update.

### Why we're telling you this instead of quietly fixing it
Because we'd rather you hear about a real gap between what we said and what
we shipped from us than find it yourselves. Practical risk during the affected
period was limited — this is an offline, local-file app, so exploiting the
gap required someone already having write access to your vault files, at
which point they have significant access regardless. But "limited risk" isn't
the same as "no gap," and we're not going to pretend otherwise.

## [10.11.0] — 2026-07-29 — Theme consistency pass

A pass through every screen against all 12 themes. Nexus has supported 12
color themes for a while, but a long tail of UI elements (buttons, banners,
the scrollbar, a few theme-picker previews) stayed hardcoded to purple
regardless of which theme was actually active. This release fixes that,
adds a proper theme-aware "warning" color, and adds a visible keyboard-focus
indicator that was previously missing app-wide.

### Fixed
- Theme consistency across dozens of UI elements — Settings' primary button,
  the app-wide scrollbar, lock-screen and auto-lock warning banners, file
  selection highlighting, and the video/PDF viewer chrome now all follow
  your active theme instead of staying purple.
- Three separate theme-picker previews (Settings, first-run setup, and a
  third one inside the Settings dialog) could show the wrong swatch color
  once you'd already picked a different theme. Fixed in all three.
- No visible focus indicator when navigating by keyboard (Tab key) — added
  to every button app-wide and the main sidebar navigation.
- Icon buttons in the title bar (Minimize/Maximize/Settings) could lose
  contrast on hover/press on lighter themes. Fixed.
- The Factory Reset button now visually signals it's a destructive action
  (red border), not just red text.

### Added
- A theme-aware "warning" color used consistently for amber/caution UI
  (previously scattered as fixed hex values in several places).

## [10.10.0] — 2026-07-22 — Whole-app security & data-integrity audit

A full-app audit covering data integrity, security, and resource handling —
not a single-feature pass. Short version below (the full internal technical
writeup isn't published separately — ask on Discord if you want more detail
on a specific fix).

### Fixed
- **Password change could silently corrupt the vault.** Two separate bugs in
  the same code path: files added after unlocking could be skipped when
  changing your password (left permanently unreadable under the old
  password), and the vault's file index wasn't being re-keyed to the new
  password at all — meaning the *next* time you unlocked, the entire index
  could be silently wiped. Both fixed. Your encrypted files were never at
  risk of being unreadable in the affected scenario beyond what's described
  above, but this was a serious bug and deserves real-world testing before
  anyone relies on it — see the audit report.
- **Honeypot bait files stopped actually working.** Marking a file as a
  honeypot, or creating a bait file, silently failed to save in the current
  storage format — the intrusion-alert feature looked like it was on but
  never actually triggered. Fixed.
- **Zero Trace was missing vault-related shortcuts.** A parsing bug meant the
  Recent Items cleanup could systematically miss `.lnk` shortcuts pointing
  into your vault instead of catching them. Fixed.
- **Several silent failure points made diagnosable.** A handful of places
  (secure file deletion, vault-profile saving, credential storage, sandboxed
  app launching) could fail without any log trail, which would have made a
  real problem much harder to track down. All now logged; one path that
  could have caused actual data loss (a failed vault-profile save during
  migration) is now guarded so it can't destroy the only copy of your data.
- **Minor resource leaks cleaned up** in the anti-tamper scanner and the
  sandboxed app launcher — neither was user-visible, but both were genuine
  defects.
- Plus the two smaller items already disclosed as known-but-unfixed in the
  v10.9.2 Streamer Mode audit (a mislabeled log entry, an audio-player
  initialization-order inconsistency) — now fixed too.

## [10.9.2] — 2026-07-21 — Trust & stability fixes

### Fixed
- **Minimize no longer hides the whole app.** Minimizing Nexus — including
  just clicking its own taskbar icon while it's focused — previously sent
  it fully into the system tray, disappearing from both the taskbar and
  Alt-Tab with no on-screen explanation. Minimize now behaves like every
  other Windows app. Tray mode is still available, opt-in, from Settings.
- **Tray notifications actually show now.** When Nexus does hide to the
  tray (Stealth Mode, or with tray mode turned back on), the notification
  telling you how to bring it back now actually appears instead of only
  being visible if you happened to hover the tray icon.
- **Lockout warnings restored.** Wrong-password lockouts now tell you
  exactly what's happening — 30 sec / 5 min / 1 hour / permanent — the
  moment it happens, instead of jumping straight from a generic warning
  to a silent countdown.
- **"Create New Vault" fixed.** Creating an additional vault profile threw
  an error every time due to an internal formatting bug.
- **Streamer Mode hardened.** A dedicated audit found several dialogs
  (including recovery-phrase and password screens) that stayed visible to
  screen capture even with Streamer Mode on. All now correctly hidden, and
  the protection is more resilient after minimizing/restoring a window or
  switching monitors.

## [10.9.1] — 2026-07-20 — First public beta release

This is Nexus's first public tag. Current state, honestly:

### Included
- Full encrypted vault: files, folders, list/grid views, drag-and-drop
  import, color tags, pinning, per-file expiry (TTL).
- Personal data section: Credentials manager (with TOTP), Journal,
  Bookmarks, Contacts — all encrypted inside the vault.
- Smart Collections: auto-grouped live views (Recent, Large Files, Images,
  Documents, Audio, Video, Expiring Soon, Tagged), click-through into a
  filtered Vault Files view.
- Zero-Trace Launcher: sandboxed app launching with session cleanup.
- Security: anti-tamper checks, clipboard guard, Streamer Mode
  (screen-capture protection), honeypot bait files, HMAC-chained
  tamper-evident activity log.
- Recovery: recovery phrase + machine-bound bypass path.
- Multi-vault support with decoy vaults.
- Visible error handling — unhandled errors now surface an on-screen
  message and write details to `nexus_crash.log` instead of failing
  silently.

### Known gaps at launch
See [Known Issues](docs/KNOWN_ISSUES.md) for the current list — most notably,
a full visual pass on the light/white theme hasn't been completed yet,
Settings has no export/import for your preferences, and a couple of the
media viewers (image "fill" mode, audio waveform) are still basic.

### Not included (by design, for now)
- Code signing (Windows SmartScreen will warn on first run — see
  [Getting Started](docs/GETTING_STARTED.md)).
- Any cloud, sync, or account system.
- macOS/Linux/mobile builds.

---

Each release from here on gets its own dated entry above this line, newest
first.
