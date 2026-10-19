/* Progressive enhancements. Content stays visible until this file finishes initializing. */
(function () {
    'use strict';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;

    /* Reveal on scroll, with a safety net if the observer never fires. */
    var els = document.querySelectorAll('.rv');
    var revealVisible = function () { els.forEach(function (el) { if (!el.classList.contains('in')) { var r = el.getBoundingClientRect(); if (r.top < innerHeight * 0.95 && r.bottom > 0) el.classList.add('in'); } }); };
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        els.forEach(function (el) { io.observe(el); });
        setTimeout(revealVisible, 1200);
        addEventListener('scroll', revealVisible, { passive: true });
    } else { els.forEach(function (el) { el.classList.add('in'); }); }

    /* Thesis: words light up as the reader scrolls. */
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

    /* FAQ: one open at a time. */
    var items = document.querySelectorAll('details.q');
    items.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; }); }); });

    /* Nav shadow. */
    var nav = document.querySelector('.nav');
    if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 10); }, { passive: true });

    /* Eye in the headline follows the cursor and blinks (fine pointers only). */
    var eye = document.querySelector('[data-eye]');
    if (eye && !reduce && fine) {
        addEventListener('pointermove', function (e) {
            var r = eye.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, m = Math.min(r.width * 0.18, d);
            eye.style.setProperty('--ex', (dx / d * m) + 'px'); eye.style.setProperty('--ey', (dy / d * m) + 'px');
        }, { passive: true });
        (function blink() { setTimeout(function () { eye.classList.add('blink'); setTimeout(function () { eye.classList.remove('blink'); blink(); }, 140); }, 2600 + Math.random() * 3000); })();
    }

    /* Count-up for the check: the markup already holds the final numbers. */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window && !reduce) {
        var cio = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
                if (!e.isIntersecting) return; cio.unobserve(e.target);
                var c = e.target, to = +c.getAttribute('data-count'), t0 = performance.now();
                (function step(t) { var p = Math.min(1, (t - t0) / 900); p = 1 - Math.pow(1 - p, 3); c.textContent = Math.round(to * p); if (p < 1) requestAnimationFrame(step); else c.textContent = to; })(t0);
            });
        }, { threshold: 0.1 });
        counters.forEach(function (c) { cio.observe(c); });
    }

    // Enable animation styles only after their observers and fallbacks are installed.
    // A missing script or an initialization error leaves the original content visible.
    revealVisible();
    document.documentElement.classList.add('js');
})();

/* Newsletter form: post JSON to the API; without JS the form still posts (the API answers with JSON). */
(function () {
    document.querySelectorAll('[data-subscribe]').forEach(function (f) {
    if (!window.fetch) return;
    var st = f.querySelector('.sub-status'), btn = f.querySelector('button');
    f.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = f.elements.email.value.trim(); if (!email) return;
        btn.disabled = true; st.textContent = 'Sending…';
        fetch(f.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, role: document.body.classList.contains('mode-investors') ? 'investor' : 'founder', source: 'site:' + (document.body.className.match(/mode-(\w+)/) || [,'home'])[1], website: f.elements.website.value }) })
            .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
            .then(function (x) { st.textContent = x.ok ? 'Subscribed. Thank you.' : (x.j.detail && x.j.detail[0] && x.j.detail[0].msg) || x.j.detail || 'Could not subscribe. Write to hey@agenticbuilders.ai.'; if (x.ok) f.reset(); })
            .catch(function () { st.textContent = 'Could not reach the server. Write to hey@agenticbuilders.ai.'; })
            .then(function () { btn.disabled = false; });
    });
    });
})();
