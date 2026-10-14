/* Draft pages A/B: reveal on scroll, scroll-lit thesis, FAQ single-open. Page works without JS. */
(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var els = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        els.forEach(function (el) { io.observe(el); });
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
