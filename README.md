
<p align="center">
  <img src="https://raw.githubusercontent.com/p4inz-code/nexus-desktop/main/assets/banner.png" alt="Nexus Desktop Banner" width="100%">
</p>

# Nexus

![Platform](https://img.shields.io/badge/platform-Windows-0078D6?logo=windows&logoColor=white)
![Status](https://img.shields.io/badge/status-Public%20Beta-orange)
![License](https://img.shields.io/badge/license-Proprietary-lightgrey)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/XFF5nV53ZJ)

**An offline-first, encrypted file vault for Windows.**

Nexus keeps your files, notes, credentials, and personal data behind strong local encryption — no cloud, no account, no telemetry. Everything happens on your machine.

> **Status: Public Beta.** Nexus is under active development by a solo developer. Expect rough edges, and please [report anything that breaks](#support--feedback).

---

## What Nexus does

- **Encrypted vault** — import files and folders into an AES-256-GCM encrypted vault with a master password (Argon2id key derivation). List and grid views, drag-and-drop import, color tags, pinning, and per-file expiry (TTL).
- **Personal data, encrypted alongside your files** — a credentials manager (with TOTP support), a journal, bookmarks, and a contacts list, all stored inside the same encrypted vault.
- **Smart Collections** — auto-grouped views of your vault (recent items, large files, images, documents, audio, video, items expiring soon, and color-tagged items) so you don't have to dig through folders.
- **Zero-Trace Launcher** — launch other apps in a sandboxed session from inside Nexus; temp files and traces from that session are wiped when it closes.
- **Security layer** — anti-tamper checks, clipboard guard, screen-capture protection ("Streamer Mode"), honeypot bait files with intruder logging, and a tamper-evident activity log (HMAC-chained, so silent edits or deletions are detectable).
- **Recovery** — a recovery phrase and a machine-bound bypass path for account recovery if you lose your master password. **There is no cloud password reset** — if you lose both, your vault is unrecoverable by design.
- **Multiple vaults** — switch between separate encrypted vaults, with decoy-vault support for plausible deniability.

Nexus is a native Windows desktop application, built with WPF and .NET 8.

## What Nexus does *not* do

Being upfront about this matters more to us than it looks impressive:

- No cloud sync, no server component, no account system.
- No telemetry, no analytics, no crash reporting sent anywhere.
- No code signing yet. Windows SmartScreen **will** show a warning on first run — see [Getting Started](docs/GETTING_STARTED.md) for what that means and how to proceed safely.
- No mobile or macOS/Linux version. Windows only.

## Download

Grab the latest build from the [Releases](../../releases) page. You'll also need a license key — see [Getting a beta key](#getting-a-beta-key) below and [Getting Started](docs/GETTING_STARTED.md) for setup.

Every release ships with a SHA-256 hash of the executable. Verify it before running — see [SECURITY.md](SECURITY.md).

## Getting a beta key

Nexus is free during the public beta. License keys are issued manually — there's no self-serve purchase flow yet. To request access:

- Discord: [discord.gg/XFF5nV53ZJ](https://discord.gg/XFF5nV53ZJ)
- Email: atharva.patil.cg@gmail.com

The first 20–30 active beta testers may receive a complimentary lifetime license, at Northbyte Studios' sole discretion. This isn't a formal program with guaranteed terms — just our way of thanking early testers.

## Security model

- **AES-256-GCM** for vault encryption, **Argon2id** for master-password key derivation.
- Fully offline — encryption and license verification both happen locally, with zero network calls.
- No account, no server-side anything.

Nexus is closed-source. This repository hosts release binaries, documentation, and issue tracking — not the application source.

See [SECURITY.md](SECURITY.md) for vulnerability reporting and [PRIVACY.md](PRIVACY.md) for our full data-handling policy.

## Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [Activation & License Keys](docs/ACTIVATION.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Known Issues](docs/KNOWN_ISSUES.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)

## Support & feedback

- Bugs and feature requests: [open an issue](../../issues/new/choose)
- Everything else: [Discord](https://discord.gg/XFF5nV53ZJ) or atharva.patil.cg@gmail.com
- See [SUPPORT.md](SUPPORT.md) for details

## License

Nexus is proprietary software. See [LICENSE](LICENSE) for the full end-user license agreement.

---

Built by [Northbyte Studios](https://discord.gg/XFF5nV53ZJ).
