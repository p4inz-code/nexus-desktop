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
