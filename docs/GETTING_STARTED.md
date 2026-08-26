# Getting Started

## Requirements

- Windows 10 or 11 (64-bit). Nexus is a native WPF/.NET 8 application and is
  Windows-only. There is no macOS, Linux, or mobile version.
- A beta license key. See [Activation](ACTIVATION.md) if you don't have one
  yet.

## 1. Download

Grab the latest `Nexus.exe` from the [Releases](../../../releases) page.
Every release ships with a SHA-256 hash. We recommend verifying it before
running the file. See [SECURITY.md](../SECURITY.md) for how.

## 2. The Windows SmartScreen warning

**You will very likely see a blue "Windows protected your PC" screen the
first time you run Nexus.exe.** This is expected, and here's exactly why:

Nexus is not currently code-signed. Code-signing certificates cost money on
an ongoing basis, and Nexus is a free beta built by one person, so for now,
Windows has no signed publisher identity to trust, and SmartScreen flags any
unsigned executable regardless of what it actually does.

This is not a sign that something is wrong with the file. To proceed:

1. On the SmartScreen dialog, click **"More info"**.
2. Click **"Run anyway"**.

If you'd rather not take our word for it, verify the SHA-256 hash against
the one published with the release first (see [SECURITY.md](../SECURITY.md)).
That confirms you have the exact file we published, unmodified.

## 3. First run and activation

1. Launch `Nexus.exe`.
2. Accept the [license agreement](../LICENSE) (you'll need to scroll to the
   bottom to enable "I Agree").
3. Enter the license key you received via Discord or email. See
   [Activation](ACTIVATION.md) for details on the key format and what
   activation does (and doesn't) do.
4. Set your master password. **Write this down somewhere safe.** See the
   warning below.
5. You'll be given a recovery phrase during setup. Store it somewhere
   secure and offline (not in the vault it's protecting, obviously).

## Before you rely on it: the no-recovery warning

Nexus has no cloud, no account, and no server-side password reset. If you
lose your master password **and** your recovery phrase, your vault is
unrecoverable, by design, the same way the encryption that protects it
from anyone else also means we can't unlock it for you.

Don't put anything in your vault you can't afford to lose until you've
confirmed your recovery phrase is stored somewhere durable.

## Next steps

- [Known Issues](KNOWN_ISSUES.md): what's still rough during the beta.
- [Troubleshooting](TROUBLESHOOTING.md): if something doesn't work.
- [Discord](https://discord.gg/8UKt8s5FbW): beta community and fastest
  support channel.
