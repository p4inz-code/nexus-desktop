# Security Policy

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**
Report privately instead:

- Email: atharva.patil.cg@gmail.com
- Discord: [discord.gg/8UKt8s5FbW](https://discord.gg/8UKt8s5FbW) (direct
  message, not a public channel)

Include as much detail as you can: what you found, how to reproduce it, and
its potential impact. We aim to acknowledge reports within 48 hours.

Nexus is closed-source and has no bug bounty program at this time. We can't
offer payment for reports, but we will credit you (if you'd like) once a fix
ships, and we take every report seriously. This is an encrypted vault
application, and getting the security model right matters more than moving
fast.

## Supported versions

Nexus is in public beta. Only the latest published release receives
security fixes. There is no long-term-support branch during the beta
period.

## Our security model

- **Encryption:** AES-256-GCM for vault contents.
- **Key derivation:** Argon2id from your master password.
- **Network:** one real exception, the update checker, which talks to
  GitHub directly (on by default, no Northbyte server involved, disable
  anytime in Settings). Everything else (encryption, decryption,
  license-key verification) happens entirely on your device with no
  network call at all.
- **Telemetry:** none. No analytics, no crash reporting, no phone-home of
  any kind.
- **Account:** none required. There is no server holding your data or your
  password.

We deliberately don't publish specific benchmark numbers, certifications, or
audit claims we haven't actually obtained. If you see a security claim
about Nexus that isn't listed above, treat it as unverified and ask us.

## Verifying a release

Nexus is **not currently code-signed**. This is a known limitation, not an
oversight. See [Known Issues](docs/KNOWN_ISSUES.md) for why, and
[Getting Started](docs/GETTING_STARTED.md) for what the resulting Windows
SmartScreen warning means and how to proceed safely.

Because there's no code-signing certificate to vouch for the binary,
**verify the SHA-256 hash** published alongside every release on the
[Releases](../../releases) page before running it:

```
certutil -hashfile Nexus.exe SHA256
```

Compare the output against the hash in the release notes. If it doesn't
match, don't run the file, and let us know.

## Known limitations (disclosed, not hidden)

- No code signing (see above).
- License-key verification during the free beta is intentionally
  lightweight (no server round-trip, since there's no server). It exists
  to prevent casual key sharing, not to resist a determined attacker. This
  is proportionate to a free beta with nothing to steal; proper
  server-backed verification is planned for the paid version (see
  [Roadmap](ROADMAP.md)).
- There is no cloud backup or server-side password reset. The 24-word
  recovery phrase generated at setup can get you back into a locked-out
  app, but it does not fully recover your data: recovering resets the
  login gate, and files added before the recovery no longer appear in the
  vault afterward (the app discloses this at the moment of recovery). If
  you lose both your master password and your recovery phrase, there is no
  way back in at all. This is a deliberate trade-off of an offline-only
  design, not a bug.
