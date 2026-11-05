(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Mobile menu
  var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
    });
  }

  // Nav background, back-to-top, hero parallax
  var nav = document.getElementById('nav'), toTop = document.getElementById('toTop'), hero = document.getElementById('hero');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 800);
    if (hero && !reduce && y < window.innerHeight * 1.2) hero.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // Reveal on scroll with a small stagger inside lists and grids
  var items = document.querySelectorAll('.reveal');
  items.forEach(function (el) {
    var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [];
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 4) * 90 + 'ms';
  });
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (i) { i.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    items.forEach(function (i) { io.observe(i); });
  }

  // Count-up numbers
  function countUp(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    if (reduce) { el.textContent = end; return; }
    var t0 = null, dur = 1300;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); } });
    }, { threshold: .6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // Red spotlight following the cursor on project cards
  if (finePointer && !reduce) {
    document.querySelectorAll('.proj').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // Contact form: Formspree, or open the mail app if the endpoint is not configured
  var form = document.getElementById('contactForm'), status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      if (d.get('_gotcha')) return;
      if (!d.get('name') || !d.get('email') || !d.get('message')) { status.className = 'form-status err'; status.textContent = 'Please fill in all fields.'; return; }
      if (form.action.indexOf('YOUR_FORM_ID') > -1) {
        window.location.href = 'mailto:dinhtanphuc47@gmail.com?subject=' + encodeURIComponent('Message from ' + d.get('name')) + '&body=' + encodeURIComponent(d.get('message') + '\n\n- ' + d.get('name') + ' (' + d.get('email') + ')');
        return;
      }
      status.className = 'form-status'; status.textContent = 'Sending...';
      fetch(form.action, { method: 'POST', body: d, headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); status.className = 'form-status ok'; status.textContent = 'Thanks! Your message has been sent.'; form.reset(); })
        .catch(function () { status.className = 'form-status err'; status.textContent = 'Could not send. Please email me directly.'; });
    });
  }
})();
