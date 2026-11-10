/* Nexus site script. Copy buttons and the download checker. Nothing is sent anywhere. */
(function () {
  'use strict';
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.querySelector(b.getAttribute('data-copy'));
      if (!t || !navigator.clipboard) return;
      var label = b.textContent;
      navigator.clipboard.writeText(t.textContent.trim()).then(function () {
        b.textContent = 'Copied';
        setTimeout(function () { b.textContent = label; }, 1500);
      });
    });
  });

  var file = document.getElementById('hash-file');
  var expected = document.getElementById('hash-expected');
  var out = document.getElementById('hash-out');
  if (!file || !expected || !out || !window.crypto || !crypto.subtle) return;

  var actual = '';
  function say(text, cls) { out.textContent = text; out.className = 'callout ' + (cls || ''); }
  function clean(s) { var m = String(s).toLowerCase().match(/[0-9a-f]{64}/); return m ? m[0] : ''; }
  function compare() {
    if (!actual) return;
    var want = clean(expected.value);
    if (!want) { say('Your file hashes to ' + actual + '. Paste the hash from the release page to compare.'); return; }
    if (want === actual) say('Match. This is the file that was published.', 'hash-ok');
    else say('No match. Do not run this file. Download it again from the Releases page.', 'hash-bad');
  }
  file.addEventListener('change', function () {
    var f = file.files && file.files[0];
    if (!f) return;
    say('Hashing ' + f.name + ' in your browser. A large file can take a few seconds.');
    f.arrayBuffer().then(function (buf) { return crypto.subtle.digest('SHA-256', buf); }).then(function (d) {
      actual = Array.prototype.map.call(new Uint8Array(d), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
      compare();
    }).catch(function () { say('Your browser could not read that file.', 'hash-bad'); });
  });
  expected.addEventListener('input', compare);
})();
