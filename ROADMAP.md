# Roadmap

Nexus is built by a solo developer. This roadmap is directional, not a
promise with dates. Priorities can and will shift based on beta feedback.

## Now: Public Beta

Nexus is in active public beta. `v10.9.1` was the first public tag; the
current line has continued through security and stability work. See the
[Changelog](CHANGELOG.md) for what shipped when. Immediate focus:

- Continue closing beta feedback quickly. Stability and correctness fixes
  take priority over new features throughout the beta.
- Complete the remaining verification items tracked in
  [Known Issues](docs/KNOWN_ISSUES.md).
- Grow the tester base gradually via Discord rather than pushing for scale
  before the feedback loop is well-tuned.

## Next

- Work through beta feedback and stability issues as they come in. This is
  the priority over new features until the beta feels solid.
- Continue closing gaps between the current UI and the intended design
  across any screens not yet re-verified.
- Evaluate code signing once there's a sustainable path to afford an EV
  certificate. This removes the SmartScreen warning at first run.

## Later: Paid Version

- Introduce a paid tier once the beta period concludes, per the terms in the
  [License](LICENSE). Beta testers will be notified via Discord before any
  change takes effect, with preferential terms considered for early
  supporters at Northbyte Studios' discretion.
- Server-side license verification returns at this stage (the current
  offline verification is intentionally minimal-trust, appropriate for a
  free beta; see
  [Known limitations](SECURITY.md#known-limitations-disclosed-not-hidden)
  in our security policy).

## Not currently planned

- Cloud sync or any server-hosted component. Nexus's whole value
  proposition is staying offline, and this isn't likely to change.
- macOS, Linux, or mobile builds. Windows-only for the foreseeable future.

## Feedback shapes this list

If there's a feature you want, or a workflow that's painful, tell us:
[Discord](https://discord.gg/8UKt8s5FbW) or atharva.patil.cg@gmail.com.
