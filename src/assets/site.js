/* Progressive enhancements. The site works without this file. */
(function () {
    'use strict';

    /* Mode switcher: arrow keys move between modes, Enter/Space follow the link (native). */
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-mode-link]'));
    links.forEach(function (a, i) {
        a.addEventListener('keydown', function (e) {
            var next = null;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = links[(i + 1) % links.length];
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = links[(i - 1 + links.length) % links.length];
            if (e.key === 'Home') next = links[0];
            if (e.key === 'End') next = links[links.length - 1];
            if (next) { e.preventDefault(); next.focus(); }
        });
    });

    /* Copy agents.md to clipboard (agents page). */
    var copyBtn = document.querySelector('[data-copy-agents]');
    if (copyBtn) {
        var status = document.querySelector('[data-copy-status]');
        copyBtn.addEventListener('click', function () {
            fetch('/agents.md').then(function (r) { return r.text(); }).then(function (text) {
                return navigator.clipboard.writeText(text);
            }).then(function () {
                if (status) status.textContent = 'Copied agents.md to clipboard.';
            }).catch(function () {
                if (status) status.textContent = 'Could not copy. Open /agents.md and copy manually.';
            });
        });
    }
})();
