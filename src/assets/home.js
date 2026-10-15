/* Draft pages A/B: reveal on scroll, scroll-lit thesis, FAQ single-open. Page works without JS. */
(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var els = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        els.forEach(function (el) { io.observe(el); });
        /* Safety net: if the observer never fires (hidden tab, odd embeds), reveal what is on screen. */
        setTimeout(function () { els.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); }); }, 1200);
        addEventListener('scroll', function () { els.forEach(function (el) { if (!el.classList.contains('in')) { var r = el.getBoundingClientRect(); if (r.top < innerHeight * 0.95) el.classList.add('in'); } }); }, { passive: true });
    } else { els.forEach(function (el) { el.classList.add('in'); }); }

    var el = document.querySelector('[data-scrub]');
    if (el) {
        var words = el.textContent.trim().split(/\s+/); el.textContent = '';
        var spans = words.map(function (w, i) { var s = document.createElement('span'); s.className = 'sw'; s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')); return s; });
        if (reduce) spans.forEach(function (s) { s.classList.add('on'); });
        else {
            var t = false;
            var upd = function () { t = false; var r = el.getBoundingClientRect(), vh = innerHeight; var p = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (vh * 0.45 + r.height * 0.5))); var lit = Math.round(p * spans.length); spans.forEach(function (s, i) { s.classList.toggle('on', i < lit); }); };
            addEventListener('scroll', function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
        }
    }

    var items = document.querySelectorAll('details.q');
    items.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; }); }); });

    var nav = document.querySelector('.nav');
    addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 10); }, { passive: true });
})();

/* Draft C extras: eye follows cursor + blinks, typing status, count-up. */
(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var eye = document.querySelector('[data-eye]');
    if (eye && !reduce && window.matchMedia('(pointer: fine)').matches) {
        addEventListener('pointermove', function (e) {
            var r = eye.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, m = Math.min(r.width * 0.18, d);
            eye.style.setProperty('--ex', (dx / d * m) + 'px'); eye.style.setProperty('--ey', (dy / d * m) + 'px');
        }, { passive: true });
        (function blink() { setTimeout(function () { eye.classList.add('blink'); setTimeout(function () { eye.classList.remove('blink'); blink(); }, 140); }, 2600 + Math.random() * 3000); })();
    }
    var ty = document.querySelector('[data-type]');
    if (ty && !reduce) {
        var lines = JSON.parse(ty.getAttribute('data-type')), i = 0;
        (function next() {
            i = (i + 1) % lines.length; var s = lines[i], k = 0; ty.textContent = '';
            var iv = setInterval(function () { ty.textContent = s.slice(0, ++k); if (k >= s.length) { clearInterval(iv); setTimeout(next, 2800); } }, 38);
        })();
    }
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
                if (!e.isIntersecting) return; io.unobserve(e.target);
                var el = e.target, to = +el.getAttribute('data-count'), t0 = performance.now();
                (function step(t) { var p = Math.min(1, (t - t0) / 900); p = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * p); if (p < 1) requestAnimationFrame(step); })(t0);
            });
        }, { threshold: 0.1 });
        setTimeout(function () { counters.forEach(function (c) { if (c.textContent === "0") c.textContent = c.getAttribute("data-count"); }); }, 4000);
        counters.forEach(function (c) { io.observe(c); });
    } else { counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); }); }
})();

/* Agents page: light syntax colouring for the JSON block. */
(function () {
    var el = document.querySelector('[data-json]'); if (!el) return;
    var esc = function (t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    el.innerHTML = esc(el.textContent).replace(/("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null|\d+)\b/g, function (m, str, colon, lit) {
        if (str) return colon ? '<span class="k">' + str + '</span>' + colon : '<span class="s">' + str + '</span>';
        return '<span class="l">' + lit + '</span>';
    });
})();

/* Agents page: copy the raw text. */
(function () {
    var btn = document.querySelector('[data-copy-agents]'); if (!btn) return;
    var status = document.querySelector('[data-copy-status]');
    btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        var pre = document.getElementById('agents-md');
        var text = pre.textContent.split('\n').slice(2).join('\n');
        navigator.clipboard.writeText(text).then(function () { if (status) status.textContent = '— copied'; },
            function () { if (status) status.textContent = '— could not copy, open /agents.md'; });
    });
})();
