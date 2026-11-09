// Figma Enhanced — speed, stage 2 (docs/figma-enhanced-speed.md): clips first.
// Inlined in the head of every page (src/routes/figma-enhanced/+layout.svelte), so it acts while the page is still
// being read, before the page script arrives. Kept small and old-fashioned on purpose.
(function () {
  var doc = document;
  var clips = 'video[data-loop], video[data-film]';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var held = [], open = false, timer = 0, reader = null;
  // A held picture has no address, and a browser would print its description in the empty box; keep it unseen, as a
  // lazy picture that has not arrived yet.
  var quiet = doc.createElement('style');
  quiet.textContent = 'img[data-held-src]{color:transparent}';
  doc.head.appendChild(quiet);
  function onScreen(el) {
    var box = el.getBoundingClientRect();
    return box.width > 0 && box.bottom > 0 && box.top < innerHeight;
  }
  // What waits for the first clip: the pictures that load lazily. They all lie below the first screen, and a lazy
  // picture is asked for only after layout, so taking its address away as it is read stops it in time. (A video's
  // poster is asked for the moment it is read, so the stills of clips further down are lazy pictures instead.)
  function hold(el) {
    if (open || el.nodeType !== 1) return;
    if (el.tagName === 'IMG' && el.getAttribute('loading') === 'lazy' && el.getAttribute('src')) {
      el.setAttribute('data-held-src', el.getAttribute('src'));
      el.removeAttribute('src');
      held.push(el);
    }
  }
  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    hold(root);
    var inner = root.querySelectorAll('img[loading="lazy"]');
    for (var i = 0; i < inner.length; i++) hold(inner[i]);
  }
  function release() {
    if (open) return;
    open = true;
    clearTimeout(timer);
    if (reader) { reader.disconnect(); reader = null; }
    for (var i = 0; i < held.length; i++) {
      var el = held[i], src = el.getAttribute('data-held-src');
      if (src) { el.setAttribute('src', src); el.removeAttribute('data-held-src'); }
    }
    held = [];
    doc.dispatchEvent(new CustomEvent('vessyl:first-clip'));
  }
  // The page's first clip is the one on the first screen. Everything held is given back when it moves; at once when
  // the first screen has no clip or under reduced motion (clips stand still there); and in any case after 4s.
  function settle() {
    var list = doc.querySelectorAll(clips), first = null;
    for (var i = 0; i < list.length && !first; i++) if (onScreen(list[i])) first = list[i];
    if (!first || reduce.matches) release();
  }
  function begin(root) {
    open = false;
    held = [];
    clearTimeout(timer);
    timer = setTimeout(release, 4000);
    scan(root);
  }
  doc.addEventListener('playing', function (e) {
    var v = e.target;
    if (!open && v.matches && v.matches(clips) && onScreen(v)) release();
  }, true);
  // Until the page script arrives, a clip on screen starts the moment it can play (then interactions.js, syncVideo,
  // takes over: on screen, visible tab, no reduced motion).
  doc.addEventListener('canplay', function (e) {
    var v = e.target;
    if (window.vessylClips.app || reduce.matches || doc.hidden || !v.matches || !v.matches(clips)) return;
    if (!onScreen(v)) return;
    var started = v.play();
    if (started && started.catch) started.catch(function () {});
  }, true);
  window.vessylClips = {
    app: false,
    isOpen: function () { return open; },
    // A navigation inside the site: the new page goes through the same (called by interactions.js).
    page: function (root) { begin(root); settle(); },
    release: release
  };
  // The first load: hold while the page is read.
  begin(null);
  reader = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var added = records[i].addedNodes;
      for (var j = 0; j < added.length; j++) scan(added[j]);
    }
  });
  reader.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () {
    if (reader) { reader.disconnect(); reader = null; }
    settle();
  }, { once: true });
})();
