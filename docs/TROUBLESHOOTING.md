# Troubleshooting

## "Windows protected your PC" on launch

This is expected. Nexus isn't code-signed yet. Click **More info** →
**Run anyway**. Full explanation in [Getting Started](GETTING_STARTED.md).
If you want to verify the file is genuine first, check its SHA-256 hash
against [SECURITY.md](../SECURITY.md).

## Nexus won't start / closes immediately

1. Confirm you're on Windows 10 or 11 (64-bit). Nexus doesn't run on
   Windows 7/8 or on non-Windows systems.
2. Check for a `nexus_startup.log` file on your **Desktop**. Nexus writes a
   step-by-step trace there as it starts up; if it crashes silently, the
   **last line** in that file tells us where it died. Attach this file when
   you report the issue.
3. Also check your Desktop for `nexus_crash.log`, which captures unhandled
   crash details if one occurred.
4. Report it via [Discord](https://discord.gg/8UKt8s5FbW) or
   [open an issue](../../../issues/new/choose), and include both log files
   if present. They only ever contain local diagnostic info; nothing is
   sent anywhere automatically.

## License key won't activate

- Double-check you typed the key exactly as sent. It's easy to mistake
  similar-looking characters.
- Make sure you're not trying to reuse a key on a second machine. Keys are
  machine-bound (see [Activation](ACTIVATION.md)).
- If it still won't activate, contact us with the key and we'll check it
  from our end.

## I forgot my master password

Nexus has two recovery paths:

1. **Recovery phrase**: the phrase you were shown during setup. If you
   saved it, use it from the lock screen to set a new master password.
   **Important:** this resets your password, it does not decrypt your old
   files. Anything added to the vault before you use it stays encrypted
   under the old password and will no longer appear. There's no way
   around this, since your files are encrypted directly with a key
   derived from your password, not a separately recoverable master key.
   The app's own recovery dialog states this plainly before you confirm,
   since it's an irreversible step.
2. **Machine bypass**: a fallback tied to your specific device, available
   through Northbyte Studios if you've lost your recovery phrase too. Has
   the same limitation as above: it resets your password, it doesn't
   recover files encrypted under the old one.

If you've lost **both** your master password and your recovery phrase,
there is currently no way for us to recover your vault. This is a direct
consequence of the vault being genuinely encrypted rather than "encrypted
but recoverable." We know this is a hard limitation, and it's why
[Getting Started](GETTING_STARTED.md) stresses saving your recovery phrase
before you rely on the vault for anything important.

## Vault seems to be missing files / won't unlock

- Confirm you're unlocking the correct vault if you've set up more than
  one. Nexus supports multiple vaults, including decoy vaults, and it's
  easy to end up on the wrong one.
- Don't manually move or rename anything inside Nexus's data folders
  outside the app. The storage layout isn't meant to be edited by hand.
- If a scan reports integrity issues, don't panic. Reach out with details
  before doing anything destructive (like reinstalling) so we can help
  diagnose first.

## Streamer Mode / screenshots not behaving as expected

Streamer Mode is meant to hide vault content from screen capture and
screenshot tools when enabled. If it's not behaving as documented:

1. Confirm the toggle state in Settings.
2. Check `nexus_startup.log` on your Desktop for the line showing the
   resolved Streamer Mode state at startup.
3. Report what you're seeing, along with that log line, via
   [Discord](https://discord.gg/8UKt8s5FbW) or a
   [GitHub issue](../../../issues/new/choose). This area has had a lot of
   attention recently and we want to know if anything's still off.

## Still stuck?

- [Known Issues](KNOWN_ISSUES.md): check if it's already a known gap.
- [Discord](https://discord.gg/8UKt8s5FbW): fastest response.
- atharva.patil.cg@gmail.com: if you'd rather not use Discord.
