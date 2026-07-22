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
[Discord](https://discord.gg/XFF5nV53ZJ).

## [10.10.0] — 2026-07-22 — Whole-app security & data-integrity audit

A full-app audit covering data integrity, security, and resource handling —
not a single-feature pass. Full technical writeup in `AUDIT_REPORT_v10.10.0.md`
for anyone who wants it; short version below.

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
