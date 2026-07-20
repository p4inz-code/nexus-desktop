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
