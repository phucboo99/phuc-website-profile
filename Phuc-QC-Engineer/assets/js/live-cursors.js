/* Live cursors: simulated collaborators (think Figma / Liveblocks / PartyKit presence cursors) who build the page by hand.
   Each person has one job: Designer drags out frames, Copywriter types a few words, Developer turns on a layout grid,
   Stylist picks a fill colour, Photo crops images.
   BUILD MODE (first visit, or "Replay build"): the page, header included, starts as dashed wireframes. The page scrolls down slowly and
   continuously while the crew works top to bottom: as the top part is finished the next parts are still being built. The real content appears
   in each finished frame. Any input skips the show.
   Pace is tuned by the constants just below. */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) { document.documentElement.classList.remove('lc-prebuild'); return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.classList.remove('lc-prebuild'); return; }

  /* ---- pace (build mode) ---- */
  var BLOCK_MS = [1900, 2600];     // how long one person spends on one block
  var SCROLL_MIN = 40;             // px/s: slowest drift while the crew keeps up (easy to read)
  var SCROLL_MAX = 230;            // px/s: catch-up speed when unfinished work is far down the screen
  var FRONTIER_Y = 0.2;            // the first unfinished block is kept about 20% from the top of the screen
  var WORK_ZONE = 0.8;             // people only start blocks in the top 80% of the screen

  var PEOPLE = [
    { name: 'Linh', role: 'Designer', color: '#f24e1e', job: 'frame',
      chips: ['Frame 12', 'Section / Hero', 'Card / Project', 'Auto layout · 24', 'Container 1200'] },
    { name: 'Minh', role: 'Copywriter', color: '#a259ff', job: 'type',
      lines: ['Quality is a team habit', 'Nearly 5 years of QA', "Let's build quality", 'Notes from real work'] },
    { name: 'An', role: 'Developer', color: '#1abcfe', job: 'grid' },
    { name: 'Mai', role: 'Stylist', color: '#0acf83', job: 'style', swatches: ['#e11d2e', '#0d9488', '#6366f1', '#f59e0b', '#0f172a'] },
    { name: 'Khoa', role: 'Photo', color: '#ffb020', job: 'crop' }
  ];
  var TARGETS = 'h1,h2,h3,.btn,.card,.vcard,.proj,.vrow,.step,.stat,.banner,.skills li,.posts a,.timeline > li,.post,.about-copy,.facts';
  // everything the crew "constructs", in document order: header first, then both designs' page blocks
  var BLOCKS = '.site-nav .status-line,.site-nav .loc,.site-nav .topbar-right,.site-nav .brand,.site-nav #menu > li,.nav .logo,.nav #menu > li,' +
    '.hero .badge,.hero h1,.hero p,.hero .btns,.hero .portrait,.hero-label,.hero-title.back,.hero-title.front,.hero-intro,.hero-actions,' +
    '.strip,.marquee,.stat,.eyebrow,.kicker,.title,.big,.huge,.lead,.sub,.about-grid > *,.about-copy,.card,.vcard,.vrow,.proj,.skills li,.emp-head,' +
    '.timeline > li,.subtitle-xp,.more-link,.step,.banner,.subhead,.posts li,.contact-box,.contact-grid > *,.all';
  // which kind of block suits which person
  var FIT = {
    type: function (el) {
      return el.matches('h1,h2,h3,p,.eyebrow,.kicker,.title,.big,.huge,.lead,.sub,.badge,.hero-label,.hero-intro,.more-link,.subhead,.subtitle-xp,.status-line,.loc,.brand,.logo,.hero-title,.all');
    },
    crop: function (el) { return !!el.querySelector('img') || el.matches('.portrait,.banner,.slide-img,.post,.marquee,.strip'); },
    grid: function (el) {
      return el.matches('.stat,.card,.vcard,.proj,.vrow,.skills li,.timeline > li,.emp-head,.step,.about-grid > *,.contact-grid > *,.facts,.about-copy,.posts li') && el.getBoundingClientRect().width >= 160;
    },
    style: function (el) { return el.matches('.btns,.hero-actions,.badge,.stat,.strip,.marquee,.contact-box,.step,.card,.btn,#menu > li,.topbar-right,.emp-head,.all,.facts,.brand,.logo'); },
    frame: function (el) { return el.getBoundingClientRect().width >= 100; }
  };
  var KEY = 'liveCursors', SEEN = 'lcBuilt';

  function enabled() { try { return localStorage.getItem(KEY) !== 'off'; } catch (e) { return true; } }
  function save(on) { try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) {} }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function isSticky(el) { return !!(el.closest && el.closest('.site-nav,.nav')); }
  function firstWords(text, n) {
    var w = text.replace(/\s+/g, ' ').trim().split(' ').slice(0, n).join(' ');
    return w.length > 26 ? w.slice(0, 26).trim() + '…' : w;
  }

  var ov = document.createElement('div'); ov.className = 'lc-ov'; ov.setAttribute('aria-hidden', 'true'); document.body.appendChild(ov);
  var layer = document.createElement('div'); layer.className = 'lc-layer'; layer.setAttribute('aria-hidden', 'true'); document.body.appendChild(layer);

  function mk(cls, html, color) {
    var d = document.createElement('div');
    d.className = cls; if (color) d.style.setProperty('--c', color); if (html) d.innerHTML = html;
    ov.appendChild(d); return d;
  }

  /* ---------------- build mode state ---------------- */
  var build = { active: false, blocks: [], built: 0 };
  var DEFAULT_MAX = window.innerWidth >= 1100 ? 3 : 2;
  var MAX_ACTIVE = DEFAULT_MAX;

  function materialize(el) {
    if (el.__lcBuilt) return;
    el.__lcBuilt = true;
    el.classList.remove('lc-b-hide');
    if (el.classList.contains('reveal')) el.classList.add('in');
    el.classList.add('lc-b-show');
    setTimeout(function () { el.classList.remove('lc-b-show'); }, 900);
    dropWire(el);
    build.built++;
    updateBar();
  }
  function dropWire(el) { if (el.__wire) { if (el.__wire.parentNode) el.__wire.parentNode.removeChild(el.__wire); el.__wire = null; } }
  function ensureWire(el) {
    if (!el.__wire) { var w = document.createElement('div'); w.className = 'lc-wire'; ov.insertBefore(w, ov.firstChild); el.__wire = w; }
    return el.__wire;
  }
  function fade(n, p) { n.style.opacity = p > .9 ? Math.max(0, (1 - p) / .1) : 1; }

  /* ---------------- jobs (what each person does by hand) ----------------
     anchor(rect, job) -> where the cursor goes first.  start(c, job) -> task with update(p, rect, job) and nodes.   */
  var JOBS = {
    // Designer: drags out a frame with resize handles and a size label
    frame: {
      dur: 4200, minW: 140, minH: 50,
      anchor: function (r) { return { x: clamp(r.left, 14, innerWidth - 14), y: clamp(r.top, 12, innerHeight - 40) }; },
      start: function (c) {
        var f = mk('lc-frame', '<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i><span class="sz"></span><span class="chip"></span>', c.p.color);
        var sz = f.querySelector('.sz'), chip = f.querySelector('.chip'); chip.textContent = pick(c.p.chips);
        return { nodes: [f],
          update: function (p, r) {
            var g = ease(clamp((p - .1) / .55, 0, 1)), w = Math.max(2, r.width * g), h = Math.max(2, r.height * g);
            f.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
            f.style.width = w + 'px'; f.style.height = h + 'px';
            sz.textContent = Math.round(w) + ' × ' + Math.round(h);
            chip.style.opacity = p > .3 ? 1 : 0;
            fade(f, p);
            c.tx = clamp(r.left + w, 14, innerWidth - 14); c.ty = clamp(r.top + h, 12, innerHeight - 40);
          } };
      }
    },
    // Copywriter: types a few words straight into the block itself (no extra layer), then the full text appears
    type: {
      dur: 4800, minW: 40, minH: 14,
      anchor: function (r) { return { x: clamp(r.left + 10, 14, innerWidth - 14), y: clamp(r.top + Math.min(r.height / 2, 16), 12, innerHeight - 40) }; },
      start: function (c, j) {
        var cs = getComputedStyle(j.el), fs = clamp(parseFloat(cs.fontSize) || 16, 12, 56);
        var words = j.text ? firstWords(j.text, 3) : pick(c.p.lines);
        // while the block is still a wireframe the typed words are visible text; on an existing block they are a selection highlight
        var n = mk(j.build ? 'lc-typed' : 'lc-sel', '<span class="t"></span><i class="caret"></i>', c.p.color);
        var t = n.querySelector('.t'), caret = n.querySelector('.caret');
        n.style.fontSize = fs + 'px'; n.style.fontWeight = cs.fontWeight; n.style.fontFamily = cs.fontFamily;
        n.style.lineHeight = cs.lineHeight === 'normal' ? '1.25' : cs.lineHeight; n.style.letterSpacing = cs.letterSpacing;
        n.style.textTransform = cs.textTransform; n.style.textAlign = cs.textAlign; n.style.padding = cs.padding;
        return { nodes: [n],
          update: function (p, r) {
            t.textContent = words.slice(0, Math.floor(clamp(p / .5, 0, 1) * words.length));
            n.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
            n.style.width = r.width + 'px'; n.style.height = r.height + 'px';
            n.style.opacity = j.build ? (p > .64 ? 0 : 1) : (p > .9 ? Math.max(0, (1 - p) / .1) : 1);
            var cr = caret.getBoundingClientRect();
            c.tx = clamp(cr.left + 3, 14, innerWidth - 14); c.ty = clamp(cr.top + cr.height / 2, 12, innerHeight - 40);
          } };
      }
    },
    // Developer: switches on a column layout grid over the element
    grid: {
      dur: 3800, minW: 160, minH: 50,
      anchor: function (r) { return { x: clamp(r.left + 8, 14, innerWidth - 14), y: clamp(r.top + 8, 12, innerHeight - 40) }; },
      start: function (c) {
        var cols = 4, html = '<span class="chip"></span><div class="cols">';
        for (var i = 0; i < cols; i++) html += '<i></i>';
        var g = mk('lc-grid', html + '</div>', c.p.color), kids = g.querySelectorAll('.cols i'), chip = g.querySelector('.chip');
        chip.textContent = 'Layout grid · ' + cols + ' columns · gutter 24';
        return { nodes: [g],
          update: function (p, r) {
            g.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
            g.style.width = r.width + 'px'; g.style.height = r.height + 'px';
            for (var k = 0; k < kids.length; k++) kids[k].style.opacity = clamp(p * 2.4 - k * .35, 0, 1);
            fade(g, p);
            c.tx = clamp(r.left + r.width * clamp(p / .6, 0, 1), 14, innerWidth - 14); c.ty = clamp(r.top + 10, 12, innerHeight - 40);
          } };
      }
    },
    // Stylist: selects the element and tries fill colours from a palette
    style: {
      dur: 4200, minW: 40, minH: 14,
      anchor: function (r) { return { x: r.left + Math.min(r.width / 2, 120), y: r.top + Math.min(r.height / 2, 40) }; },
      start: function (c) {
        var sw = c.p.swatches, sel = mk('lc-outline', '', c.p.color);
        var pal = mk('lc-palette', '<div class="sw">' + sw.map(function (h) { return '<i style="background:' + h + '"></i>'; }).join('') + '</div><span class="lbl"></span>', c.p.color);
        var dots = pal.querySelectorAll('.sw i'), lbl = pal.querySelector('.lbl');
        return { nodes: [sel, pal],
          update: function (p, r) {
            sel.style.transform = 'translate(' + (r.left - 3) + 'px,' + (r.top - 3) + 'px)';
            sel.style.width = (r.width + 6) + 'px'; sel.style.height = (r.height + 6) + 'px';
            var idx = Math.min(sw.length - 1, Math.floor(p / .17));
            for (var i = 0; i < dots.length; i++) dots[i].className = i === idx ? 'on' : '';
            lbl.textContent = 'Fill · ' + sw[idx];
            var px = clamp(r.left + 10, 10, innerWidth - 190), py = r.top - 62 > 8 ? r.top - 62 : r.bottom + 12;
            py = clamp(py, 8, innerHeight - 70);
            pal.style.transform = 'translate(' + px + 'px,' + py + 'px)';
            fade(sel, p); fade(pal, p);
            c.tx = px + 17 + idx * 28; c.ty = py + 17;
          } };
      }
    },
    // Photo: crops with a rule-of-thirds guide
    crop: {
      dur: 3800, minW: 80, minH: 50,
      anchor: function (r) { return { x: clamp(r.left + 6, 14, innerWidth - 14), y: clamp(r.top + 6, 12, innerHeight - 40) }; },
      start: function (c) {
        var b = mk('lc-crop', '<i class="v v1"></i><i class="v v2"></i><i class="hz h1"></i><i class="hz h2"></i><i class="k tl"></i><i class="k tr"></i><i class="k bl"></i><i class="k br"></i><span class="sz"></span>', c.p.color);
        var sz = b.querySelector('.sz');
        return { nodes: [b],
          update: function (p, r) {
            var g = ease(clamp(p / .6, 0, 1)), ix = r.width * .07 * g, iy = r.height * .1 * g;
            var w = Math.max(10, r.width - 2 * ix), h = Math.max(10, r.height - 2 * iy);
            b.style.transform = 'translate(' + (r.left + ix) + 'px,' + (r.top + iy) + 'px)';
            b.style.width = w + 'px'; b.style.height = h + 'px';
            sz.textContent = 'Crop · ' + Math.round(w) + ' × ' + Math.round(h);
            fade(b, p);
            c.tx = clamp(r.left + ix + w, 14, innerWidth - 14); c.ty = clamp(r.top + iy + h, 12, innerHeight - 40);
          } };
      }
    }
  };

  var count = window.innerWidth >= 1100 ? PEOPLE.length : 4;
  var cursors = PEOPLE.slice(0, count).map(function (p, i) {
    var el = document.createElement('div');
    el.className = 'lc'; el.style.setProperty('--c', p.color);
    el.innerHTML = '<span class="ping"></span>' +
      '<svg viewBox="0 0 24 24"><path d="M3 2l6.2 17.2 2.6-7 7-2.6L3 2z" fill="' + p.color + '" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>' +
      '<span class="tag">' + p.name + '<small> · ' + p.role + '</small></span>';
    layer.appendChild(el);
    return { el: el, ping: el.querySelector('.ping'), p: p,
      x: Math.random() < .5 ? -80 : innerWidth + 80, y: rnd(120, innerHeight - 80),
      vx: 0, vy: 0, tx: 0, ty: 0, speed: 1.4 + Math.random() * 1.0,
      state: 'idle', wait: 0.12 + i * 0.07, idleFor: 0, job: null, task: null, t0: 0, park: null };
  });

  function activeCount() { var n = 0; cursors.forEach(function (c) { if (c.state !== 'idle') n++; }); return n; }
  function parkSpot() {
    var left = Math.random() < .5;
    return { x: left ? rnd(14, 54) : rnd(innerWidth - 110, innerWidth - 44), y: rnd(130, Math.max(160, innerHeight - 130)) };
  }
  function visibleTargets(minW, minH) {
    var W = innerWidth, H = innerHeight, out = [], nodes = document.querySelectorAll(TARGETS);
    for (var i = 0; i < nodes.length && out.length < 60; i++) {
      var r = nodes[i].getBoundingClientRect();
      if (r.width >= minW && r.height >= minH && r.top > 100 && r.bottom < H - 24 && r.left >= 0 && r.right <= W) out.push(nodes[i]);
    }
    return out;
  }
  function makeJob(c, el, isBuild) {
    var def = JOBS[c.p.job], r = el.getBoundingClientRect();
    c.job = { el: el, def: def, build: !!isBuild, sticky: isSticky(el), dur: isBuild ? rnd(BLOCK_MS[0], BLOCK_MS[1]) : def.dur,
      text: (el.innerText || el.textContent || '').trim(),
      ox: rnd(12, Math.max(14, Math.min(r.width - 40, 220))), oy: rnd(8, Math.max(10, Math.min(r.height - 16, 80))) };
    c.state = 'travel'; c.park = null; c.idleFor = 0;
    var a = def.anchor(r, c.job); c.tx = a.x; c.ty = a.y;
  }
  function inWorkZone(b, r) { return isSticky(b) || (r.top < innerHeight * WORK_ZONE && r.bottom > 90); }
  function chooseJob(c) {
    var i, b, r;
    if (build.active) {
      // next unclaimed block in the work zone that suits this person
      var fit = FIT[c.p.job], fallback = null;
      for (i = 0; i < build.blocks.length; i++) {
        b = build.blocks[i];
        if (b.__lcBuilt || b.__claimed) continue;
        r = b.getBoundingClientRect();
        if (!inWorkZone(b, r)) continue;
        if (fit(b)) { b.__claimed = true; makeJob(c, b, true); return true; }
        if (!fallback) fallback = b;
      }
      if (fallback) { fallback.__claimed = true; makeJob(c, fallback, true); return true; }
      return false;
    }
    var def = JOBS[c.p.job], pool = visibleTargets(def.minW, def.minH);
    if (!pool.length) pool = visibleTargets(40, 16);
    if (!pool.length) return false;
    makeJob(c, pick(pool), false);
    return true;
  }

  function ping(c) { c.ping.classList.remove('go'); void c.ping.offsetWidth; c.ping.classList.add('go'); }
  function endTask(c) {
    if (c.task) c.task.nodes.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    if (c.job && c.job.build && !c.job.el.__lcBuilt) materialize(c.job.el);   // never leave a block hidden
    c.task = null; c.job = null; c.state = 'idle'; c.idleFor = 0;
    c.wait = build.active ? rnd(0, .1) : rnd(1.2, 3.2);
    c.park = build.active ? null : parkSpot();
  }
  function offscreen(r, sticky) { return !sticky && (r.bottom < 70 || r.top > innerHeight - 10 || r.right < 0 || r.left > innerWidth); }

  /* ---------------- build mode: bar, scroll, wireframes ---------------- */
  var bar = document.createElement('div');
  bar.className = 'lc-bar'; bar.style.display = 'none';
  bar.innerHTML = '<span class="dot"></span><span class="t1"></span><span class="sep">·</span><span class="t2"></span><span class="st">Building…</span><button type="button" class="skip">Skip ▸</button><i class="prog"></i>';
  document.body.appendChild(bar);
  var t1 = bar.querySelector('.t1'), t2 = bar.querySelector('.t2'), st = bar.querySelector('.st'), prog = bar.querySelector('.prog');
  function updateBar() {
    var total = build.blocks.length;
    t1.textContent = cursors.length + ' people';
    t2.textContent = build.built + ' / ' + total + ' layers';
    prog.style.width = (total ? Math.min(100, build.built / total * 100) : 0) + '%';
  }
  bar.querySelector('.skip').addEventListener('click', function (e) { e.stopPropagation(); finishBuild(false); });

  function collectBlocks() {
    var list = Array.prototype.slice.call(document.querySelectorAll(BLOCKS)).filter(function (el) {
      var r = el.getBoundingClientRect();
      return r.width >= 24 && r.height >= 12 && !el.closest('.lc-ov,.lc-layer,.lc-dock,.lc-bar,footer,.foot,.preview-flag');
    });
    return list.filter(function (el) { return !list.some(function (o) { return o !== el && o.contains(el); }); });
  }

  function startBuild() {
    if (build.active) return;
    build.blocks = collectBlocks();
    if (build.blocks.length < 3) { document.documentElement.classList.remove('lc-prebuild'); return; }
    build.active = true; build.built = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
    build.blocks.forEach(function (el) { el.__lcBuilt = false; el.__claimed = false; el.classList.add('lc-b-hide'); });
    document.documentElement.classList.remove('lc-prebuild');
    document.documentElement.classList.add('lc-building');
    cursors.forEach(function (c, i) { endTask(c); c.wait = .05 + i * .07; c.park = null; });
    MAX_ACTIVE = cursors.length;
    st.textContent = 'Building…'; bar.classList.remove('done'); bar.style.display = '';
    updateBar();
    if (!running) start();
  }

  function finishBuild(complete) {
    if (!build.active) return;
    build.active = false;
    build.blocks.forEach(function (el) {
      el.__lcBuilt = true; el.classList.remove('lc-b-hide'); if (el.classList.contains('reveal')) el.classList.add('in'); dropWire(el);
    });
    cursors.forEach(function (c) { endTask(c); });
    MAX_ACTIVE = DEFAULT_MAX;
    document.documentElement.classList.remove('lc-building', 'lc-prebuild');
    try { sessionStorage.setItem(SEEN, '1'); } catch (e) {}
    if (complete) {
      st.textContent = '✓ Build complete'; bar.classList.add('done'); t2.textContent = build.blocks.length + ' layers';
      prog.style.width = '100%';
      setTimeout(function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 1200);
      setTimeout(function () { if (!build.active) bar.style.display = 'none'; }, 4600);
    } else {
      bar.style.display = 'none';
    }
  }

  function buildTick(dt, now) {
    var H = innerHeight, pending = [], rects = [], i;
    for (i = 0; i < build.blocks.length; i++) if (!build.blocks[i].__lcBuilt) pending.push(build.blocks[i]);
    for (i = 0; i < pending.length; i++) rects.push(pending[i].getBoundingClientRect());     // read pass
    var frontier = -1;
    for (i = 0; i < pending.length; i++) {                                                   // write pass
      var el = pending[i], r = rects[i], sticky = isSticky(el);
      if (!sticky && r.bottom < 70 && !el.__claimed) { materialize(el); continue; }           // already above the screen: just show it
      if (frontier < 0 && !sticky) frontier = i;
      if (sticky ? r.bottom > 0 : (r.top < H + 40 && r.bottom > 60)) {
        var w = ensureWire(el);
        w.style.transform = 'translate(' + r.left + 'px,' + r.top + 'px)';
        w.style.width = r.width + 'px'; w.style.height = r.height + 'px';
      } else dropWire(el);
    }
    var cur = window.pageYOffset;
    if (frontier >= 0) {
      // keep the first unfinished block near the top; the further below it is, the faster the page catches up
      var gap = rects[frontier].top - Math.max(150, H * FRONTIER_Y);
      if (gap > 2) {
        var speed = clamp(SCROLL_MIN + gap * 0.8, SCROLL_MIN, SCROLL_MAX);
        window.scrollTo({ top: cur + Math.min(gap, speed * dt), behavior: 'instant' });
      }
    } else if (!pending.length || build.built >= build.blocks.length) {
      var busy = cursors.some(function (c) { return c.state === 'task' || c.state === 'travel'; });
      if (!busy) finishBuild(true);
    }
  }

  /* ---------------- main loop ---------------- */
  var running = false, last = 0;
  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    if (build.active) buildTick(dt, now);
    cursors.forEach(function (c) {
      if (c.state === 'idle') {
        c.wait -= dt; c.idleFor += dt;
        c.x += Math.sin(now / 420 + c.speed * 9) * 0.12; c.y += Math.cos(now / 510 + c.speed * 7) * 0.12;
        if (c.wait <= 0) {
          if (activeCount() >= MAX_ACTIVE) { c.wait = .8; if (!c.park && !build.active) c.park = parkSpot(); }
          else if (!chooseJob(c)) { c.wait = build.active ? .1 : .8; }
        }
        if (c.park) { c.tx = c.park.x; c.ty = c.park.y; }
      } else if (c.state === 'travel') {
        var r = c.job.el.getBoundingClientRect();
        if (offscreen(r, c.job.sticky)) { endTask(c); }
        else {
          var a = c.job.def.anchor(r, c.job); c.tx = a.x; c.ty = a.y;
          if (Math.abs(c.tx - c.x) < 16 && Math.abs(c.ty - c.y) < 16 && Math.abs(c.vx) + Math.abs(c.vy) < 260) {
            c.state = 'task'; c.t0 = now; c.task = c.job.def.start(c, c.job); ping(c);
          }
        }
      } else if (c.state === 'task') {
        var rr = c.job.el.getBoundingClientRect(), p = (now - c.t0) / c.job.dur;
        if (p >= 1 || offscreen(rr, c.job.sticky)) { endTask(c); }
        else {
          c.task.update(p, rr, c.job);
          if (c.job.build && p > .66) materialize(c.job.el);          // the finished frame fills with the real content
        }
      }
      if (c.state !== 'idle' || c.park) {
        var tight = c.state === 'task', fast = build.active;
        var k = (tight ? 16 : (fast ? 13 : 7)) * c.speed, damp = (tight ? 7.5 : 4.2) + c.speed;
        c.vx += ((c.tx - c.x) * k - c.vx * damp) * dt; c.vy += ((c.ty - c.y) * k - c.vy * damp) * dt;
        c.x += c.vx * dt; c.y += c.vy * dt;
      }
      c.el.style.transform = 'translate3d(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px,0)';
    });
    requestAnimationFrame(frame);
  }

  var scrollTick = false;
  window.addEventListener('scroll', function () {
    if (scrollTick || build.active) return; scrollTick = true;
    requestAnimationFrame(function () {
      scrollTick = false;
      cursors.forEach(function (c) { if (c.state === 'idle') c.wait = Math.min(c.wait, .25 + Math.random() * .6); });
    });
  }, { passive: true });

  // any user input ends the show immediately
  function skipOnInput(e) {
    if (!build.active) return;
    if (e.target && e.target.closest && e.target.closest('.lc-bar,.lc-dock')) return;
    if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta', 'Tab'].indexOf(e.key) > -1) return;
    finishBuild(false);
  }
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (t) { window.addEventListener(t, skipOnInput, { passive: true, capture: true }); });

  function clearAll() { cursors.forEach(function (c) { endTask(c); }); }
  function start() { if (running) return; running = true; layer.style.display = ''; ov.style.display = ''; last = performance.now(); requestAnimationFrame(frame); }
  function stop() { finishBuild(false); running = false; clearAll(); layer.style.display = 'none'; ov.style.display = 'none'; }

  /* ---------------- dock: toggle + replay ---------------- */
  var dock = document.createElement('div'); dock.className = 'lc-dock';
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'lc-toggle'; btn.setAttribute('aria-pressed', enabled() ? 'true' : 'false');
  btn.innerHTML = '<span class="dots">' + PEOPLE.slice(0, 4).map(function (p) { return '<i style="background:' + p.color + '"></i>'; }).join('') + '</span><span>Live cursors</span>';
  btn.addEventListener('click', function () {
    var on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false'); save(on);
    if (on) start(); else stop();
  });
  var replay = document.createElement('button');
  replay.type = 'button'; replay.className = 'lc-toggle lc-replay'; replay.innerHTML = '<span>Replay build</span>';
  replay.addEventListener('click', function () {
    if (btn.getAttribute('aria-pressed') !== 'true') { btn.setAttribute('aria-pressed', 'true'); save(true); }
    start(); startBuild();
  });
  dock.appendChild(btn); dock.appendChild(replay); document.body.appendChild(dock);

  document.addEventListener('visibilitychange', function () { if (document.hidden) { running = false; } else if (btn.getAttribute('aria-pressed') === 'true') { start(); } });

  /* ---------------- boot ---------------- */
  var qs = location.search, force = /[?&]build=1/.test(qs), off = /[?&]build=0/.test(qs), seen = false;
  try { seen = !!sessionStorage.getItem(SEEN); } catch (e) {}
  if (enabled()) {
    start();
    if (!off && (force || (!seen && window.pageYOffset < 40 && !location.hash))) setTimeout(startBuild, force ? 150 : 450);
    else document.documentElement.classList.remove('lc-prebuild');
  } else {
    stop(); document.documentElement.classList.remove('lc-prebuild');
  }
})();
