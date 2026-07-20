<!--
Template for a GitHub Release body. Copy this into the release description
when publishing a new tag, fill in the blanks, delete sections that don't
apply, and delete this comment block.

Keep it user-facing: what changed and why it matters to someone using the
app, not internal implementation detail. Save the deep technical notes for
your own private dev log.
-->

# Nexus vX.Y.Z

_One-line summary of what this release is about._

## SHA-256

```
<paste the output of: certutil -hashfile Nexus.exe SHA256>
```

## What's new

- _User-facing feature or improvement._
- _Another one._

## Fixed

- _Bug fix, described from the user's point of view (what was broken, what
  now works)._

## Known issues in this release

- _Anything you're shipping with known gaps — be upfront, same as
  [KNOWN_ISSUES.md](KNOWN_ISSUES.md)._

## Upgrading

_Anything a user needs to do or know before upgrading — e.g. "no action
needed, just replace the exe" or specific migration steps if the vault
format changed._

## Full changelog

See [CHANGELOG.md](../CHANGELOG.md) for the complete version history.

---

**Verify before you run it.** This release is not code-signed. Check the
SHA-256 hash above against your download before running — see
[SECURITY.md](../SECURITY.md).
