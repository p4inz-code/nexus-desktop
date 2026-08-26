# Known Issues

Honest, current list of things we know aren't finished or verified yet.
We'd rather tell you upfront than have you discover them and wonder if
something's wrong on your end.

## Awaiting real-machine confirmation from recent releases

These landed in recent releases and passed static review, but haven't been
independently confirmed end-to-end on a Windows machine outside development.
Flagging them so nobody assumes they're rock-solid until real-world use
proves it:

- **Password change** — v10.10.0 fixed two data-integrity bugs in this path
  (a newly-added file could be skipped, and the file index wasn't being
  re-keyed to the new password). Deserves real testing before anyone relies
  on it in anger — change your password with a small vault first if you're
  going to do it.
- **Vault encryption format upgrade** — v10.12.0 moved to real AES-256-GCM.
  Files saved with older versions still open (backward-compatible by design),
  but the round-trip on the new format hasn't been exercised at scale yet.
- **Forgot Password end-to-end** — recovery phrase and machine-bypass paths
  both work individually; the full end-to-end run-through together hasn't
  been formally exercised yet.

## Not yet fully audited against the intended design

Several core areas (Vault Files, Personal, Security/Settings headers,
Launcher, Activity Log, Smart Collections, plus the theme-consistency pass
that shipped in v10.11.0) have been rebuilt and checked. A few screens —
some media viewers and the deeper Settings panels — haven't had the same
pass yet. They work; they just haven't been re-verified against the current
design.

## Real bugs, already fixed in source, not in the current download yet

The build currently available on [Releases](../../../releases) is **v10.12.5**.
Several real bugs were found and fixed after that in our own audits, but
haven't been packaged into a new tagged release yet — that happens after a
final round of hands-on testing. Until then, anyone running v10.12.5 should
know these are real, not hypothetical:

- **Factory Reset and Panic Wipe (Ctrl+Shift+W) don't fully wipe your vault.**
  Factory Reset runs its confirmation flow but doesn't actually clear
  everything, and Panic Wipe never touches the main database file at all —
  so credentials, journal entries, and other data can survive a "reset."
  If you need to actually destroy vault data on v10.12.5, manually delete the
  vault folder afterward rather than trusting either feature alone.
- **Decoy password isn't fully isolated from the real vault.** On v10.12.5, a
  decoy password can be used to change the real password (locking the real
  owner out) or to generate a real recovery phrase. If you use decoy mode for
  plausible deniability, treat it as not yet safe against a technical user on
  this specific version.
- **Windows Hello convenience-unlock stores your master password with a
  weaker barrier than intended** — another process running as the same
  Windows user could potentially recover it. If you use Hello unlock,
  updating to the next release (once tagged) is worth doing sooner rather
  than later.
- **A failed Anti-Tamper or lock trigger can silently not lock the vault**,
  due to a missing error handler in the lock sequence — the screen may stay
  unlocked when it should have locked.
- **Portable mode still leaves some trace on the host PC** — an Add/Remove
  Programs entry can get registered even when running from a USB drive,
  contrary to what portable mode is supposed to guarantee.

All of the above are fixed in source and compiled clean; none have had a
real-machine functional re-test yet, which is why they're not tagged as a
release. Full technical detail lives in this repo's internal audit history
(not published) — ask if you want the complete list.

## By design, not a bug

- **Windows SmartScreen warning on first run** — Nexus isn't code-signed
  yet. See [Getting Started](GETTING_STARTED.md) for what to do.
- **No password recovery beyond the recovery phrase / bypass path** — this
  is the trade-off of true offline encryption. There's no "reset password"
  email because there's no server to send one from.
- **No self-service license transfer to a new machine** — see
  [Activation](ACTIVATION.md).

## Reporting something new

If you hit something not listed here, please [open an issue](../../../issues/new/choose)
— that's exactly what the beta is for.
