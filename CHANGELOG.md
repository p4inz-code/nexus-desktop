# Changelog

All notable changes to Nexus are documented here. This file follows the
spirit of [Keep a Changelog](https://keepachangelog.com/), and Nexus follows
[Semantic Versioning](https://semver.org/): `v1.0.x` = bugfix, `v1.x.0` =
feature, `vX.0.0` = major overhaul.

Nexus was developed privately through an extended internal beta before its
public debut — this changelog starts at that public debut and will be kept
current with every release going forward. It intentionally doesn't dump the
full internal development history (hundreds of incremental dev builds); if
you want that level of detail for a specific change, ask on
[Discord](https://discord.gg/8UKt8s5FbW).

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
