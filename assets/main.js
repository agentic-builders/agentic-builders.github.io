/* Agentic Builders — progressive enhancements.
   Everything here is optional: the page is fully readable without JS. */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Nav: shadow on scroll + active section highlight */
    var nav = document.querySelector('.nav');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

    function onScroll() {
        if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
        var y = window.scrollY + window.innerHeight * 0.35;
        var current = null;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= y) current = sections[i];
        }
        navLinks.forEach(function (a) {
            a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Marquee: duplicate track content so the loop is seamless */
    var track = document.querySelector('.marquee-track');
    if (track && !reduceMotion) {
        var items = Array.prototype.slice.call(track.children);
        items.forEach(function (el) {
            var clone = el.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.setAttribute('tabindex', '-1');
            track.appendChild(clone);
        });
    }

    /* Scroll reveal */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* Thesis: words light up as the reader scrolls */
    var scrub = document.querySelector('[data-scrub]');
    if (scrub) {
        var words = scrub.textContent.trim().split(/\s+/);
        scrub.textContent = '';
        var spans = words.map(function (w, i) {
            var s = document.createElement('span');
            s.className = 'sw';
            s.textContent = w;
            scrub.appendChild(s);
            if (i < words.length - 1) scrub.appendChild(document.createTextNode(' '));
            return s;
        });
        if (reduceMotion) {
            spans.forEach(function (s) { s.classList.add('on'); });
        } else {
            var ticking = false;
            var updateScrub = function () {
                ticking = false;
                var rect = scrub.getBoundingClientRect();
                var vh = window.innerHeight;
                /* progress 0 → 1 while the block travels from 85% to 35% of the viewport */
                var start = vh * 0.85, end = vh * 0.35;
                var p = (start - rect.top) / (start - end + rect.height * 0.6);
                p = Math.max(0, Math.min(1, p));
                var lit = Math.round(p * spans.length);
                for (var i = 0; i < spans.length; i++) spans[i].classList.toggle('on', i < lit);
            };
            var requestScrub = function () {
                if (!ticking) { ticking = true; window.requestAnimationFrame(updateScrub); }
            };
            window.addEventListener('scroll', requestScrub, { passive: true });
            window.addEventListener('resize', requestScrub);
            updateScrub();
        }
    }

    /* Cards: spotlight follows the pointer (fine pointers only) */
    if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
        document.querySelectorAll('.card').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
                card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
            });
        });
    }

    /* FAQ: only one item open at a time */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (!item.open) return;
            faqItems.forEach(function (other) { if (other !== item && other.open) other.open = false; });
        });
    });
})();
