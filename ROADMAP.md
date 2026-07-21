# Roadmap

Nexus is built by a solo developer. This roadmap is directional, not a
promise with dates — priorities can and will shift based on beta feedback.

## Now: Public Beta

- `v10.9.1` is the first public beta tag — feature set described in the
  [Changelog](CHANGELOG.md).
- Finish the remaining pre-launch verification pass (screenshot behavior,
  license bypass paths, light theme) — tracked in
  [Known Issues](docs/KNOWN_ISSUES.md).
- Onboard the first wave of beta testers via Discord and gather real-world
  bug reports before widening access.

## Next

- Work through beta feedback and stability issues as they come in — this is
  the priority over new features until the beta feels solid.
- Continue closing gaps between the current UI and the intended design
  across any screens not yet re-verified.
- Evaluate code signing once there's a sustainable path to afford an EV
  certificate — this removes the SmartScreen warning at first run.

## Later: Paid Version

- Introduce a paid tier once the beta period concludes, per the terms in the
  [License](LICENSE). Beta testers will be notified via Discord before any
  change takes effect, with preferential terms considered for early
  supporters at Northbyte Studios' discretion.
- Server-side license verification returns at this stage (the current
  offline verification is intentionally minimal-trust, appropriate for a
  free beta — see
  [Known limitations](SECURITY.md#known-limitations-disclosed-not-hidden)
  in our security policy).

## Not currently planned

- Cloud sync or any server-hosted component — Nexus's whole value
  proposition is staying offline. This isn't likely to change.
- macOS, Linux, or mobile builds. Windows-only for the foreseeable future.

## Feedback shapes this list

If there's a feature you want, or a workflow that's painful, tell us:
[Discord](https://discord.gg/XFF5nV53ZJ) or atharva.patil.cg@gmail.com.
