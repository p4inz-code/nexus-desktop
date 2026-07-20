# Known Issues

Honest, current list of things we know aren't finished or verified yet.
We'd rather tell you upfront than have you discover them and wonder if
something's wrong on your end.

## Not yet verified on real hardware

These are implemented but haven't been confirmed working end-to-end on an
actual Windows machine yet — they're flagged internally, not silently
assumed fine:

- **Light/white theme.** A full visual pass on the white theme hasn't been
  done. Some screens may look inconsistent or have contrast issues in that
  theme. Dark theme is the primary, verified experience for now.
- **Forgot Password flow end-to-end.** The recovery phrase path and the
  machine-bypass path exist and have been built, but haven't been tested
  together in one full run-through.
- **Streamer Mode / screenshot behavior.** This has had significant work
  this cycle, but final confirmation that screenshots behave correctly with
  Streamer Mode off needs a real-machine check.

## Not yet fully audited against the intended design

Several core areas (Vault Files, the Personal section, Security/Settings
headers, Launcher, Activity Log, Smart Collections) have been rebuilt and
checked against the design spec. A number of other screens — first-run
setup flow, the media/file viewers, the Settings deep-dive panels, Vault
Health, Secure Notes, and the Media Browser — have not yet had the same
pass. They should work; they just haven't been re-verified against the
current design.

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
