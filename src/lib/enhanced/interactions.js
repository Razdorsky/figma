// One delegated controller survives SvelteKit page changes. Abort on unmount.
import Lenis from 'lenis';
import {base as siteBase} from './site.ts';
import heroes from './heroes.json';

// Step 2.2: wheel scrolling glides as on /blueprint/ 452c7d0 (docs/figma-enhanced-step2.md). Touch stays native,
// and there is no Lenis for visitors who prefer reduced motion.
let lenis;
export const smooth = () => lenis;
let resetPendingMenu = () => {};
export function closeOverlays() {
  resetPendingMenu();
  document.querySelectorAll('.preview-toast').forEach(toast => toast.hidden = true);
  document.querySelectorAll('[data-menu-open]').forEach(button => button.setAttribute('aria-expanded','false'));
  document.querySelectorAll('dialog').forEach(dialog => {dialog.classList.remove('closing');if(dialog.open)dialog.close();});
  closeMegas();
}

// Step 2.1: the Legacy mega menu panels under the header (components/Header.svelte).
function closeMegas(focusTrigger = false) {
  document.querySelectorAll('[data-mega][data-open="true"]').forEach(panel => {
    panel.dataset.open = 'false';
    panel.inert = true;
    const trigger = document.querySelector(`[data-mega-trigger][aria-controls="${panel.id}"]`);
    trigger?.setAttribute('aria-expanded', 'false');
    if (focusTrigger) trigger?.focus();
  });
  updateHeader();
}
// Prewarming: a mega panel's photographs (640px copies) load when its trigger is pointed at, focused or opened, not
// with the page; until then the panel is out of sight and costs nothing.
function warmMega(trigger) {
  const panel = document.getElementById(trigger?.getAttribute('aria-controls') || '');
  panel?.querySelectorAll('img[data-src]').forEach(img => {img.src = img.dataset.src;img.removeAttribute('data-src');});
}
function openMega(trigger, focusFirst) {
  const panel = document.getElementById(trigger.getAttribute('aria-controls') || '');
  if (!panel) return;
  warmMega(trigger);
  closeMegas();
  panel.dataset.open = 'true';
  panel.inert = false;
  trigger.setAttribute('aria-expanded', 'true');
  trigger.closest('[data-header]')?.classList.remove('is-away');
  updateHeader();
  if (focusFirst) panel.querySelector('a')?.focus();
}

// Step 2.1: the header floats, takes the tone of the section under it, steps away while you read downwards and
// returns on the way up, and shows reading progress (as on /blueprint/ 452c7d0).
// Step 2.3 (docs/figma-enhanced-step2.md): films. Silent loops play only while on screen, in a visible tab and
// without reduced motion. The Home film plays from the start with sound when asked (Legacy reference 12), and
// then only the visitor's own taps play it.
let filmObserver;
function syncVideo(video) {
  const shot = video.closest('[data-armed] [data-shot]');
  if (shot && !shot.hasAttribute('data-current')) {video.pause();return;}
  const visible = video.dataset.visible === 'true' && !document.hidden;
  if (!visible) {video.pause();return;}
  if (video.dataset.activated === 'true' || 'still' in video.dataset) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
  else video.play().catch(() => {});
}
function setupFilms() {
  filmObserver?.disconnect();
  filmObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.dataset.visible = String(entry.isIntersecting && entry.intersectionRatio >= 0.15);
      syncVideo(entry.target);
    }
  }, {threshold: [0, 0.15]});
  document.querySelectorAll('.current-page video[data-loop], .current-page video[data-film], .current-page video[data-still]').forEach(video => {video.muted = true;filmObserver.observe(video);});
  setupArch();
}
// Placement map, 2026-11-08: every loop cut from footage with sound sits in a [data-film-box] with a button. A box
// with data-start and data-end plays that scene of the source film with sound, the sound fading in and out, then
// returns to the silent loop; a box without them plays the whole film (the arches, Take the whole property). One
// film sounds at a time.
const filmVideo = box => box?.querySelector('video[data-full]');
function filmControls(box) {
  const video = filmVideo(box);
  const toggle = box.querySelector('[data-film-toggle]');
  const mute = box.querySelector('[data-film-mute]');
  if (!video || !toggle || !mute) return;
  toggle.dataset.paused = String(video.paused);
  toggle.setAttribute('aria-label', video.paused ? 'Play the film' : 'Pause the film');
  mute.dataset.muted = String(video.muted);
  mute.setAttribute('aria-label', video.muted ? 'Turn the sound on' : 'Mute the film');
}
function fadeVolume(video, to, ms) {
  cancelAnimationFrame(video._fade || 0);
  const from = video.volume, start = performance.now();
  const step = now => {
    // A frame's timestamp can precede `start`, and a fade may have no time left: keep both inside 0..1.
    const t = ms > 0 ? Math.min(1, Math.max(0, (now - start) / ms)) : 1;
    video.volume = Math.min(1, Math.max(0, from + (to - from) * t));
    video._fade = t < 1 ? requestAnimationFrame(step) : 0;
  };
  video._fade = requestAnimationFrame(step);
}
function endScene(box, focus = false) {
  const video = filmVideo(box);
  if (!video || video.dataset.activated !== 'true') return;
  cancelAnimationFrame(video._fade || 0);
  video.pause();
  video.dataset.activated = 'false';
  video.removeAttribute('data-photo');
  video.muted = true;
  video.volume = 1;
  video.loop = true;
  video.setAttribute('aria-hidden', 'true');
  if (video.dataset.loopSrc) video.src = video.dataset.loopSrc; else video.removeAttribute('src');
  video.load();
  syncVideo(video);
  const button = box.querySelector('[data-film-play]');
  if (button) button.hidden = false;
  const controls = box.querySelector('[data-film-controls]');
  if (controls) controls.hidden = true;
  if (focus) button?.focus();
}
function playFilm(button) {
  const box = button.closest('[data-film-box]');
  const video = filmVideo(box);
  if (!box || !video?.dataset.full) return;
  document.querySelectorAll('.current-page [data-film-box]').forEach(other => {
    const playing = filmVideo(other);
    if (other === box || playing?.dataset.activated !== 'true') return;
    if (playing.dataset.end) endScene(other); else playing.pause();
  });
  const start = Number(video.dataset.start || 0), scene = Boolean(video.dataset.end);
  video.dataset.loopSrc = video.currentSrc || video.querySelector('source:not([media])')?.src || '';
  video.dataset.activated = 'true';
  video.querySelectorAll('source').forEach(source => source.remove());
  // play() runs inside the tap itself, which iOS Safari requires for sound; the scene's start travels in the
  // address as a media fragment (#t=), with a seek as the fallback once the film's length is known.
  video.preload = 'auto';
  video.src = video.dataset.full + (start ? `#t=${start}` : '');
  video.loop = false;
  video.muted = false;
  video.volume = scene ? 0 : 1;
  video.removeAttribute('aria-hidden');
  video.addEventListener('loadedmetadata', () => {if (start && Math.abs(video.currentTime - start) > 1) video.currentTime = start;}, {once: true});
  video.play().then(() => {if (scene) fadeVolume(video, 1, 700);}).catch(() => {});
  button.hidden = true;
  const controls = box.querySelector('[data-film-controls]');
  if (controls) controls.hidden = false;
  filmControls(box);
  controls?.querySelector('[data-film-toggle]')?.focus();
}
// A scene ends at data-end: the sound fades over its last 0.9s, then the silent loop comes back.
// data-photo-after: from that moment the photograph shows again while the sound plays on (the founder's last words
// run over the reel's closing logo, which his portrait frame would crop).
function sceneTime(video) {
  const end = Number(video.dataset.end);
  if (!end || video.dataset.activated !== 'true') return;
  if (video.dataset.photoAfter) video.toggleAttribute('data-photo', video.currentTime >= Number(video.dataset.photoAfter));
  if (video.currentTime >= end) {endScene(video.closest('[data-film-box]'), video.closest('[data-film-box]')?.contains(document.activeElement));return;}
  if (video.currentTime >= end - 0.9 && !video._fading) {video._fading = true;fadeVolume(video, 0, Math.max(0, (end - video.currentTime) * 1000));}
  if (video.currentTime < end - 0.9) video._fading = false;
}

// Step 2.4 (docs/figma-enhanced-step2.md): the drifting gallery, as on /blueprint/ 452c7d0. From 900px, while a run
// crosses the screen, each card moves from (depth - 1) to (1 - depth) times 35% of the screen's height: the nearer
// cards (1.2) rise past the heading, the farther ones (0.8) sink, and Lenis gives the motion its inertia. Each
// photograph opens from its mask once, when its top passes 92% of the screen. Reduced motion keeps both still.
let driftObserver;
function setupDrift() {
  driftObserver?.disconnect();
  const drifts = document.querySelectorAll('.current-page [data-drift]');
  if (drifts.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    driftObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.closest('[data-part="card"]')?.setAttribute('data-revealed', '');
        driftObserver.unobserve(entry.target);
      }
    }, {rootMargin: '0px 0px -8% 0px'});
    drifts.forEach(drift => {
      drift.setAttribute('data-armed', '');
      drift.querySelectorAll('[data-part="card"]:not([data-revealed]) > [data-part="media"]').forEach(media => driftObserver.observe(media));
    });
  }
  updateDrift();
}
function updateDrift() {
  const moving = matchMedia('(min-width: 900px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vh = innerHeight;
  document.querySelectorAll('.current-page [data-drift]').forEach(drift => {
    const cards = drift.querySelectorAll('[data-depth]');
    if (!moving) {cards.forEach(card => card.style.removeProperty('--drift'));return;}
    const box = drift.getBoundingClientRect();
    if (box.bottom < -vh || box.top > 2 * vh) return;
    const progress = Math.min(1, Math.max(0, (vh - box.top) / (box.height + vh)));
    cards.forEach(card => card.style.setProperty('--drift', `${((Number(card.dataset.depth) - 1) * vh * 0.35 * (1 - 2 * progress)).toFixed(1)}px`));
  });
}

// Step 2.5 (docs/figma-enhanced-step2.md): the arch over a full-screen photograph, as on /blueprint/ 452c7d0. --g on
// each pair follows how far the rising block covers the photograph it rises over: 0 while it only meets it, 1 once
// it covers 60%. It follows with the same short lag as the Home arch (the reference's scrub 0.6). Reduced motion
// leaves the pairs still and square.
const rise = {pairs: [], frame: 0};
function setupRise() {
  cancelAnimationFrame(rise.frame);
  rise.frame = 0;
  const pairs = [...document.querySelectorAll('.current-page > [data-rise]')];
  pairs.forEach(el => {el.style.removeProperty('--g');el.removeAttribute('data-rising');});
  rise.pairs = matchMedia('(prefers-reduced-motion: reduce)').matches ? [] : pairs.map(el => {
    el.setAttribute('data-rising', '');
    return {el, photo: el.firstElementChild, panel: el.querySelector(':scope > [data-rise-panel]'), g: 0, target: 0};
  });
  updateRise(true);
}
function updateRise(jump = false) {
  if (!rise.pairs.length) return;
  for (const pair of rise.pairs) {
    const photo = pair.photo.getBoundingClientRect();
    const covered = photo.bottom - pair.panel.getBoundingClientRect().top;
    pair.target = Math.min(1, Math.max(0, covered / (photo.height * 0.6)));
    if (jump) pair.g = pair.target;
  }
  const step = () => {
    let moving = false;
    for (const pair of rise.pairs) {
      pair.g += (pair.target - pair.g) * 0.16;
      if (Math.abs(pair.target - pair.g) < 0.001) pair.g = pair.target; else moving = true;
      pair.el.style.setProperty('--g', pair.g.toFixed(4));
    }
    rise.frame = moving ? requestAnimationFrame(step) : 0;
  };
  if (jump) step(); else if (!rise.frame) rise.frame = requestAnimationFrame(step);
}

// Step 2.6 (docs/figma-enhanced-step2.md): the next-page block's picture opens from the arch as it comes into view,
// as on /blueprint/ 452c7d0: --g goes from 0, when its top meets the foot of the screen, to 1, when its middle reaches
// 62% of the screen's height, with the same short lag as the other arches. Reduced motion leaves it open.
const next = {el: null, media: null, g: 1, target: 1, frame: 0};
function setupNext() {
  cancelAnimationFrame(next.frame);
  next.frame = 0;
  next.el = document.querySelector('.current-page > [data-next]');
  next.media = next.el?.querySelector('[data-next-media]') || null;
  if (!next.el || !next.media || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    next.el?.style.removeProperty('--g');
    next.el = next.media = null;
    return;
  }
  updateNext(true);
}
function updateNext(jump = false) {
  if (!next.el?.isConnected) return;
  const box = next.media.getBoundingClientRect();
  const vh = innerHeight;
  const end = vh * 0.62 - box.height / 2;
  next.target = Math.min(1, Math.max(0, (vh - box.top) / (vh - end)));
  if (jump) next.g = next.target;
  const step = () => {
    next.g += (next.target - next.g) * 0.16;
    if (Math.abs(next.target - next.g) < 0.001) next.g = next.target;
    next.el.style.setProperty('--g', next.g.toFixed(4));
    next.frame = next.g !== next.target ? requestAnimationFrame(step) : 0;
  };
  if (jump) step(); else if (!next.frame) next.frame = requestAnimationFrame(step);
}

// Step 2.7 (docs/figma-enhanced-step2.md): the rail, /blueprint/ 452c7d0 reference 4. From 1024px, without reduced
// motion, the band holds the screen for as long as its cards take to pass, and the page's scroll moves them sideways
// with the same short lag as the arches. A card reached with the keyboard brings the page to where it is in view.
const rail = {items: [], frame: 0};
function setupRail() {
  cancelAnimationFrame(rail.frame);
  rail.frame = 0;
  const moving = matchMedia('(min-width: 1024px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  rail.items = [...document.querySelectorAll('.current-page > [data-rail]')].map(el => {
    const track = el.querySelector('[data-rail-track]');
    el.toggleAttribute('data-armed', moving && !!track);
    if (!moving || !track) {el.style.removeProperty('--travel');track?.style.removeProperty('--x');return null;}
    const travel = Math.max(0, Math.ceil(track.scrollWidth - el.clientWidth));
    el.style.setProperty('--travel', `${travel}px`);
    return {el, track, travel, x: 0, target: 0};
  }).filter(Boolean);
  updateRail(true);
}
function updateRail(jump = false) {
  if (!rail.items.length) return;
  for (const item of rail.items) {
    const progress = item.travel > 0 ? Math.min(1, Math.max(0, -item.el.getBoundingClientRect().top / item.travel)) : 0;
    item.target = -progress * item.travel;
    if (jump) item.x = item.target;
  }
  const step = () => {
    let moving = false;
    for (const item of rail.items) {
      item.x += (item.target - item.x) * 0.16;
      if (Math.abs(item.target - item.x) < 0.5) item.x = item.target; else moving = true;
      item.track.style.setProperty('--x', `${item.x.toFixed(1)}px`);
    }
    rail.frame = moving ? requestAnimationFrame(step) : 0;
  };
  if (jump) step(); else if (!rail.frame) rail.frame = requestAnimationFrame(step);
}
function railFocus(target) {
  const item = rail.items.find(item => item.el.contains(target));
  const card = target.closest?.('[data-part="card"]');
  if (!item || !card || !item.travel) return;
  // Where the card will stand once the rail has followed the current scroll.
  const now = Math.min(1, Math.max(0, -item.el.getBoundingClientRect().top / item.travel));
  const left = card.offsetLeft - now * item.travel;
  if (left >= 0 && left + card.offsetWidth <= innerWidth) return;
  const progress = Math.min(1, Math.max(0, (card.offsetLeft - parseFloat(getComputedStyle(item.track).paddingLeft)) / item.travel));
  const top = scrollY + item.el.getBoundingClientRect().top + progress * item.travel;
  if (lenis) lenis.scrollTo(top, {immediate: true, force: true}); else scrollTo(0, top);
  updateRail(true);
}

// Step 2.7: text and photograph that change together, /blueprint/ 452c7d0 reference 6, reworked so that every change
// is a clear moment. The block holds the screen; each step owns an equal stretch of the scroll. At each threshold the
// new picture opens in the circle like an iris and the step's words rise line by line (change.css); scrolling back
// runs it the other way. Without motion, or on a screen under 600px tall, the steps are listed instead.
const change = {items: [], width: 0, height: 0};
function splitLines(el) {
  const text = el.dataset.text ?? (el.dataset.text = el.textContent.replace(/\s+/g, ' ').trim());
  el.textContent = '';
  const words = text.split(' ').map((word, i) => {
    const span = document.createElement('span');
    span.textContent = (i ? ' ' : '') + word;
    el.append(span);
    return span;
  });
  const lines = [];
  for (const word of words) {
    const top = word.offsetTop;
    if (!lines.length || Math.abs(lines[lines.length - 1].top - top) > 2) lines.push({top, text: ''});
    lines[lines.length - 1].text += word.textContent;
  }
  el.textContent = '';
  return lines.map(line => {
    const outer = document.createElement('span');
    const inner = document.createElement('span');
    outer.className = 'line';
    inner.textContent = line.text.trim();
    outer.append(inner);
    el.append(outer, ' ');
    return inner;
  });
}
// The designer's numbered labels ("1. Heat"): the number and the word each rise through a mask of their own, so the
// number visibly turns over at every step (change.css).
function splitLabel(el) {
  const text = el.dataset.text ?? (el.dataset.text = el.textContent.replace(/\s+/g, ' ').trim());
  const match = text.match(/^(\d+\.)\s+(.+)$/);
  if (!match) return splitLines(el);
  el.textContent = '';
  return [['num', match[1]], ['word', match[2]]].map(([kind, part], i) => {
    const outer = document.createElement('span');
    const inner = document.createElement('span');
    outer.className = `line ${kind}`;
    inner.textContent = part;
    outer.append(inner);
    el.append(...(i ? [' ', outer] : [outer]));
    return inner;
  });
}
function unsplit(el) {
  if (el.dataset.text !== undefined) el.textContent = el.dataset.text;
}
function setupChange(force = false) {
  const armed = !matchMedia('(prefers-reduced-motion: reduce)').matches && innerHeight >= 600;
  const resplit = force || innerWidth !== change.width || innerHeight !== change.height;
  change.width = innerWidth;
  change.height = innerHeight;
  change.items = [...document.querySelectorAll('.current-page > [data-change]')].map(el => {
    const states = [...el.querySelectorAll('[data-state]')];
    const shots = [...el.querySelectorAll('[data-shot]')];
    el.toggleAttribute('data-armed', armed);
    if (resplit || !armed) states.forEach(state => {
      const parts = [...state.children];
      if (!armed) {parts.forEach(unsplit);return;}
      let i = 0;
      parts.forEach(part => (part.matches('[data-part="eyebrow"]') ? splitLabel(part) : splitLines(part)).forEach(line => line.style.setProperty('--i', String(i++))));
    });
    // The held screen must show the whole of its longest step; where it cannot, the steps are listed.
    const stage = el.querySelector(':scope > section');
    const fits = () => {
      const boxes = [...stage.children].map(child => child.getBoundingClientRect());
      const style = getComputedStyle(stage);
      const need = Math.max(...boxes.map(box => box.bottom)) - Math.min(...boxes.map(box => box.top)) + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      return need <= stage.clientHeight + 1;
    };
    if (armed && stage && !fits()) {
      el.removeAttribute('data-armed');
      states.forEach(state => [...state.children].forEach(unsplit));
    }
    return {el, states, shots, index: -1};
  });
  updateChange(true);
}
function showChange(item, index, jump) {
  const previous = item.index;
  item.index = index;
  item.el.dataset.dir = previous > index ? 'back' : 'forward';
  if (jump) {
    item.el.setAttribute('data-instant', '');
    requestAnimationFrame(() => requestAnimationFrame(() => item.el.removeAttribute('data-instant')));
  } else {
    // The incoming picture and words return to their starting place first (closed iris, zoomed in, below the mask),
    // even when they were the ones just under the last step, so every change has the same impact.
    for (const node of [item.states[index], item.shots[index]]) {
      node.removeAttribute('data-current');
      node.removeAttribute('data-previous');
      void node.offsetWidth;
    }
  }
  for (const list of [item.states, item.shots]) list.forEach((node, i) => {
    node.toggleAttribute('data-current', i === index);
    node.toggleAttribute('data-previous', !jump && i === previous && previous !== index);
  });
  // A scene playing with sound in a picture that is leaving ends, and its loop returns (step 2.8).
  item.shots.forEach((shot, i) => {if (i !== index && shot.matches('[data-film-box]')) endScene(shot);});
  item.shots.forEach(shot => {const video = shot.querySelector('video');if (video) syncVideo(video);});
}
function updateChange(jump = false) {
  for (const item of change.items) {
    if (!item.el.hasAttribute('data-armed')) {
      item.states.concat(item.shots).forEach(node => {node.removeAttribute('data-current');node.removeAttribute('data-previous');});
      item.index = -1;
      continue;
    }
    const box = item.el.getBoundingClientRect();
    const span = box.height - innerHeight;
    const progress = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
    const index = Math.min(item.states.length - 1, Math.floor(progress * item.states.length));
    item.el.style.setProperty('--cp', progress.toFixed(3));
    // The first step enters with the same iris and rise as the others once the block is half on screen; a page that
    // opens further down sets its step at once.
    if (item.index < 0 && box.top > innerHeight * 0.5) continue;
    if (index !== item.index) showChange(item, index, jump);
  }
}

// Step 2.8 (docs/figma-enhanced-step2.md): the photo portals arrive once, when a fifth of the frame is on screen: the
// frame rises as it appears and the picture comes in from 130% (portal.css). Reduced motion leaves them standing.
let portalObserver;
function setupPortals() {
  portalObserver?.disconnect();
  const portals = document.querySelectorAll('.current-page [data-portal]:not([data-arrived])');
  if (!portals.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  portalObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute('data-arrived', '');
      portalObserver.unobserve(entry.target);
    }
  }, {threshold: 0.2});
  portals.forEach(portal => {
    const box = portal.getBoundingClientRect();
    // A portal already passed when the page opens (Back, a restored scroll) stands as it is.
    if (box.bottom < 0) {portal.setAttribute('data-arrived', '');return;}
    portal.setAttribute('data-armed', '');
    portalObserver.observe(portal);
  });
}

// Moderate prewarming (owner, 2026-11-09): the first picture of a page (its photograph, or the first frame of its
// clip) loads quietly when a link to it is pointed at,
// touched or focused, so the page transition shows it at once; once a page has settled, the page its next-page block
// leads to is warmed the same way. Films are never fetched ahead. heroes.json lists the pictures.
const warmed = new Set();
function warmPage(href) {
  let url;
  try {url = new URL(href, location.href);} catch {return;}
  if (url.origin !== location.origin) return;
  const match = url.pathname.match(/\/figma-enhanced\/(.*?)\/?$/);
  const list = match ? heroes[match[1]] : null;
  if (!list) return;
  for (const path of list) {
    const src = siteBase.replace(/\/$/, '') + path;
    if (warmed.has(src)) continue;
    warmed.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.src = src;
  }
}
function warmNext() {
  const link = document.querySelector('.current-page [data-next] a');
  if (!link) return;
  const go = () => warmPage(link.href);
  if ('requestIdleCallback' in window) requestIdleCallback(go, {timeout: 4000}); else setTimeout(go, 2500);
}

// The Home arch (/blueprint/ 452c7d0): it opens with the scroll through its 185svh block, following the page
// with a short lag (scrub), on screens from 900px and without reduced motion.
const arch = {el: null, target: 0, current: 0, frame: 0};
function setupArch() {
  cancelAnimationFrame(arch.frame);
  arch.frame = 0;
  arch.el = document.querySelector('.current-page > [data-hero="arch"]');
  arch.current = arch.target = 0;
  if (!arch.el) return;
  const opens = !matchMedia('(prefers-reduced-motion: reduce)').matches && innerWidth >= 900;
  arch.el.classList.toggle('is-opening', opens);
  if (!opens) {arch.el.style.removeProperty('--open');delete arch.el.dataset.open;return;}
  updateArch(true);
}
function updateArch(jump = false) {
  const el = arch.el;
  if (!el?.isConnected || !el.classList.contains('is-opening')) return;
  const box = el.getBoundingClientRect();
  const span = box.height - innerHeight;
  arch.target = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
  if (jump) arch.current = arch.target;
  const step = () => {
    arch.current += (arch.target - arch.current) * 0.16;
    if (Math.abs(arch.target - arch.current) < 0.001) arch.current = arch.target;
    el.style.setProperty('--open', arch.current.toFixed(4));
    const open = String(arch.current > 0.55);
    if (el.dataset.open !== open) {el.dataset.open = open;updateHeader();}
    arch.frame = arch.current !== arch.target ? requestAnimationFrame(step) : 0;
  };
  if (!arch.frame) arch.frame = requestAnimationFrame(step);
}

const DARK = '[data-role="photo-hero"], [data-role="overlay"], [data-role="gallery"], [data-role="map"], [data-rail-band], .site-newsletter, .site-footer';
let lastY = 0;
let refreshHeader = () => {};
function toneUnder(header) {
  if (header.querySelector('[data-mega][data-open="true"]')) return 'dark';
  const y = header.offsetHeight / 2;
  // The last match is the one on top: a rising block covers the photograph it rises over (step 2.5).
  const sections = document.querySelectorAll('.current-page > section, .current-page > [data-drift], .current-page > [data-rise] > :is(section, [data-drift]), .current-page > :is([data-rail], [data-change]) > section, .site-footer');
  let under = null;
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= y && box.bottom > y) under = section;
  }
  if (!under) return header.dataset.theme || 'light';
  if (under.matches('[data-hero="arch"]')) return under.dataset.open === 'true' ? 'dark' : 'light';
  return under.matches(DARK) ? 'dark' : 'light';
}
function updateHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const y = scrollY;
  header.classList.toggle('is-scrolled', y > 40);
  const busy = document.querySelector('#site-menu[open]') || header.querySelector('[data-mega][data-open="true"]') || header.contains(document.activeElement);
  if (!busy && y > 320 && y > lastY + 2) header.classList.add('is-away');
  if (busy || y <= 320 || y < lastY - 2) header.classList.remove('is-away');
  lastY = y;
  const max = document.documentElement.scrollHeight - innerHeight;
  header.style.setProperty('--progress', max > 0 ? String(Math.min(1, Math.max(0, y / max))) : '0');
  header.dataset.theme = toneUnder(header);
}

// Card rows that scroll sideways on phones (styles/system.css) take keyboard focus when nothing inside them can.
function markRails() {
  document.querySelectorAll('.current-page [data-part="card-grid"]').forEach(rail => {
    const scrolls = rail.scrollWidth > rail.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(rail).overflowX);
    if (scrolls && !rail.querySelector('a[href], button, input, [tabindex]')) {
      rail.tabIndex = 0;
      rail.setAttribute('role', 'region');
      rail.setAttribute('aria-label', (rail.closest('section')?.querySelector('h2')?.textContent.trim() || 'Cards') + ', scrolls sideways');
    } else if (rail.hasAttribute('tabindex')) {
      rail.removeAttribute('tabindex'); rail.removeAttribute('role'); rail.removeAttribute('aria-label');
    }
  });
}

export function enhancePage() {
  markRails();
  setupFilms();
  setupDrift();
  setupRise();
  setupNext();
  setupRail();
  setupChange(true);
  setupPortals();
  if (document.readyState === 'complete') warmNext(); else addEventListener('load', warmNext, {once: true});
  refreshHeader();
  document.querySelectorAll('[data-gallery] img[data-gallery-image]').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-haspopup','dialog');
    img.setAttribute('aria-controls','photo-gallery');
    img.setAttribute('aria-label', 'Open photo gallery');
  });
  document.querySelectorAll('[data-gallery-open]').forEach(button=>{button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','photo-gallery');});
  document.querySelectorAll('a[href]').forEach(link => {
    const url=new URL(link.href,location.href);
    if(!url.hash&&url.origin===location.origin&&url.pathname.replace(/\/$/,'')===location.pathname.replace(/\/$/,''))link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
}

export function installInteractions() {
  const controller = new AbortController();
  const {signal} = controller;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const timeouts = new Set();
  const later = (fn, ms) => {const id = setTimeout(() => {timeouts.delete(id);fn();}, ms);timeouts.add(id);return id;};
  const on = (name, fn, options = {}) => document.addEventListener(name, fn, {...options, signal});
  let opener, galleryOpener, images = [], active = 0, toastTimer, menuCloseTimer, touchX = 0;
  const menu = () => document.querySelector('#site-menu');
  const gallery = () => document.querySelector('.gallery-dialog');

  if (!reduced.matches) lenis = new Lenis({lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true, autoRaf: true, stopInertiaOnNavigate: true});
  // The opening mark (components/Intro.svelte): it leaves when the fonts are in and the page's first picture is decoded,
  // not before the mark has played and held a moment (2.1s from the start of the load) and not after 3s; the page scrolls only then.
  const root = document.documentElement;
  if (root.dataset.intro === 'on') {
    lenis?.stop();
    const slug = location.pathname.match(/\/figma-enhanced\/(.*?)\/?$/)?.[1] ?? '';
    const pictures = (heroes[slug] || []).map(path => {const img = new Image();img.src = siteBase.replace(/\/$/, '') + path;return img.decode().catch(() => {});});
    const ready = Promise.all([document.fonts?.ready, ...pictures]).catch(() => {});
    const cap = new Promise(resolve => setTimeout(resolve, Math.max(0, 3000 - performance.now())));
    Promise.race([ready, cap]).then(() => {
      setTimeout(() => {
        // The head script lifts the mark by itself at 3.6s, in case this script came late or not at all.
        if (root.dataset.intro === 'on') root.dataset.intro = 'leaving';
        setTimeout(() => {root.dataset.intro = 'done';lenis?.start();}, 800);
      }, Math.max(0, 2100 - performance.now()));
    });
  }
  let railFrame = 0, headerFrame = 0;
  addEventListener('resize', () => {cancelAnimationFrame(railFrame);railFrame = requestAnimationFrame(() => {markRails();setupArch();updateDrift();updateRise();updateNext();setupRail();setupChange();updateHeader();});}, {signal});
  addEventListener('scroll', () => {if (!headerFrame) headerFrame = requestAnimationFrame(() => {headerFrame = 0;updateArch();updateDrift();updateRise();updateNext();updateRail();updateChange();updateHeader();});}, {passive:true, signal});
  on('visibilitychange', () => document.querySelectorAll('.current-page video[data-loop], .current-page video[data-film], .current-page video[data-still]').forEach(syncVideo));
  for (const name of ['play', 'pause', 'ended', 'volumechange']) on(name, event => {
    const box = event.target instanceof HTMLVideoElement ? event.target.closest('[data-film-box]') : null;
    if (box) filmControls(box);
  }, {capture:true});
  on('timeupdate', event => {if (event.target instanceof HTMLVideoElement && event.target.dataset.end) sceneTime(event.target);}, {capture:true});
  on('ended', event => {if (event.target instanceof HTMLVideoElement && event.target.dataset.end) endScene(event.target.closest('[data-film-box]'));}, {capture:true});
  refreshHeader = () => {lastY = scrollY;document.querySelector('[data-header]')?.classList.remove('is-away');updateHeader();};
  on('focusin', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-header]')) document.querySelector('[data-header]')?.classList.remove('is-away');
    if (target && !target.closest('[data-mega], [data-mega-trigger]')) closeMegas();
    // The browser brings the focused card into view after this event; the rail settles on the next frame.
    if (target?.closest('[data-rail][data-armed]')) requestAnimationFrame(() => railFocus(target));
  });
  // Prewarming on intent: a link's page picture, and a mega panel's photographs from its trigger.
  const intent = event => {
    const target = event.target instanceof Element ? event.target : null;
    const trigger = target?.closest('[data-mega-trigger]');
    if (trigger) warmMega(trigger);
    const link = target?.closest('a[href]');
    if (link) warmPage(link.href);
  };
  on('pointerover', intent);
  on('focusin', intent);
  on('touchstart', intent, {passive: true});
  resetPendingMenu=()=>{clearTimeout(menuCloseTimer);menuCloseTimer=undefined;menu()?.classList.remove('closing');};
  // Placement map, 2026-11-08: on wide screens the menu shows the photograph of the page under the pointer or focus
  // (Menu.svelte). The new photograph is decoded first, then crossfades in; a later hover wins.
  let previewWanted = '';
  function previewMenu(src, name) {
    const figure = menu()?.querySelector('.menu-preview');
    const frame = figure?.querySelector('.menu-preview-image');
    if (!frame || !src || !figure.offsetParent || previewWanted === src) return;
    previewWanted = src;
    const current = frame.querySelector('img:not(.is-leaving)');
    if (current?.getAttribute('src') === src) {figure.querySelector('figcaption').textContent = name;return;}
    const next = new Image();
    next.alt = '';next.className = 'is-coming';next.src = src;
    next.decode().catch(() => {}).then(() => {
      if (previewWanted !== src || !frame.isConnected) return;
      frame.append(next);
      void next.offsetWidth;
      next.classList.remove('is-coming');
      frame.querySelectorAll('img').forEach(img => {if (img !== next) img.classList.add('is-leaving');});
      later(() => frame.querySelectorAll('img.is-leaving').forEach(img => img.remove()), 480);
      figure.querySelector('figcaption').textContent = name;
    });
  }
  const previewFrom = event => {const link = event.target instanceof Element ? event.target.closest('.site-menu .menu-column a[data-cover]') : null;if (link) previewMenu(link.dataset.cover, link.textContent.trim());};
  on('pointerover', previewFrom);
  on('focusin', previewFrom);
  // Owner's request, 2026-11-07: page text cannot be selected or copied (see also styles/shell-edition.css).
  // Form fields stay editable: their text can be selected, copied, cut and pasted.
  const editable = target => target instanceof Element && !!target.closest('input, textarea, [contenteditable=""], [contenteditable="true"]');
  for (const name of ['selectstart', 'copy', 'cut']) on(name, event => {if (!editable(event.target)) event.preventDefault();}, {capture:true});
  function notify(message) {
    document.querySelectorAll('.preview-toast').forEach(item=>item.hidden=true);
    const toast = menu()?.open ? menu().querySelector('.dialog-toast') : document.querySelector('.preview-toast:not(.dialog-toast)');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = later(() => toast.hidden = true, 5000);
  }
  function closeMenu() {
    const dialog = menu();
    if (!dialog?.open || dialog.classList.contains('closing')) return;
    const finish = () => {menuCloseTimer=undefined;dialog.close();dialog.classList.remove('closing');dialog.querySelectorAll('.preview-toast').forEach(toast=>toast.hidden=true);opener?.setAttribute('aria-expanded','false');if(opener?.isConnected)opener.focus();};
    if (reduced.matches) finish();
    else {dialog.classList.add('closing');menuCloseTimer=later(finish, 300);}
  }
  function show(index) {
    const dialog = gallery();
    if (!dialog || !images.length) return;
    active = (index + images.length) % images.length;
    const photo = dialog.querySelector('.gallery-stage img');
    photo.src = images[active].src;
    photo.alt = images[active].alt;
    dialog.querySelector('.gallery-count').textContent = `${active + 1} / ${images.length}`;
    dialog.querySelectorAll('.gallery-arrow,.gallery-edge').forEach(button => button.hidden = images.length < 2);
    dialog.querySelector('.gallery-thumbnails').hidden = images.length < 2;
    dialog.querySelectorAll('[data-gallery-index]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.galleryIndex) === active)));
  }
  function openGallery(group, selected, trigger) {
    const dialog = gallery();
    if (!dialog || !group) return;
    images = [...group.querySelectorAll('img[data-gallery-image]')].map(img => ({src:img.currentSrc || img.src, alt:img.alt})).filter((entry,index,all) => all.findIndex(other => other.src === entry.src) === index);
    if (!images.length) return;
    galleryOpener = trigger;
    dialog.querySelector('.gallery-thumbnails').replaceChildren(...images.map((entry,index) => {
      const button = document.createElement('button');
      button.type = 'button';button.dataset.galleryIndex = String(index);button.setAttribute('aria-label', `View photo ${index + 1}`);
      const image = new Image();image.src = entry.src;image.alt = '';button.append(image);
      return button;
    }));
    show(Math.max(0, images.findIndex(image => image.src === selected)));
    dialog.showModal();
    lenis?.stop();
  }
  on('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const filmPlay = target.closest('[data-film-play]');
    if (filmPlay) {playFilm(filmPlay);return;}
    const filmToggle = target.closest('[data-film-toggle]');
    if (filmToggle) {
      const video = filmVideo(filmToggle.closest('[data-film-box]'));
      if (video?.paused) {if (video.ended) video.currentTime = 0;video.play().catch(() => {});} else video?.pause();
      return;
    }
    const filmMute = target.closest('[data-film-mute]');
    if (filmMute) {const video = filmVideo(filmMute.closest('[data-film-box]'));if (video) {cancelAnimationFrame(video._fade || 0);if (video.volume === 0) video.volume = 1;video.muted = !video.muted;}return;}
    const megaTrigger = target.closest('[data-mega-trigger]');
    if (megaTrigger) {if (megaTrigger.getAttribute('aria-expanded') === 'true') closeMegas(); else openMega(megaTrigger, false);return;}
    if (!target.closest('[data-mega]')) closeMegas();
    const open = target.closest('[data-menu-open]');
    if (open) {resetPendingMenu();opener=open;const dialog=menu();if(dialog&&!dialog.open){dialog.showModal();lenis?.stop();dialog.scrollTop=0;open.setAttribute('aria-expanded','true');dialog.querySelector('[data-menu-close]')?.focus();const figure=dialog.querySelector('.menu-preview');if(figure){previewWanted='';previewMenu(figure.dataset.cover,figure.dataset.name);}}return;}
    if(target===menu()){const box=target.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom){closeMenu();return;}}
    if (target.closest('[data-menu-close]')) {closeMenu();return;}
    if (target.closest('[data-language-trigger]')) {notify('This preview is in English. Localized page copy has not been supplied yet.');return;}
    if (target.closest('[data-pending-link]')) {event.preventDefault();notify('This destination is still a placeholder in the supplied design.');return;}
    if (target.closest('.gallery-close')) {gallery()?.close();return;}
    if (target.closest('.gallery-prev,.gallery-edge.left')) {show(active - 1);return;}
    if (target.closest('.gallery-next,.gallery-edge.right')) {show(active + 1);return;}
    const thumbnail = target.closest('[data-gallery-index]');
    if (thumbnail) {show(Number(thumbnail.dataset.galleryIndex));return;}
    const galleryTrigger = target.closest('[data-gallery-open],img[data-gallery-image]');
    if (galleryTrigger) {openGallery(galleryTrigger.closest('[data-gallery]'), galleryTrigger.currentSrc || galleryTrigger.src, galleryTrigger);return;}
  });
  on('cancel', event => {if (event.target === menu()) {event.preventDefault();closeMenu();}}, {capture:true});
  on('close', event => {
    if (event.target === gallery()) galleryOpener?.focus();
    if (!document.querySelector('dialog[open]')) lenis?.start();
  }, {capture:true});
  on('keydown', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (gallery()?.open && ['ArrowLeft','ArrowRight'].includes(event.key)) {event.preventDefault();show(active + (event.key === 'ArrowLeft' ? -1 : 1));return;}
    // Mega menu keys, as in the Legacy Blueprint: Arrow Down (or Tab on an open trigger) enters the panel, Escape
    // closes it and returns to the trigger, Shift+Tab from the first card goes back, Tab from Overview moves on.
    const megaTrigger = target?.closest('[data-mega-trigger]');
    if (megaTrigger && (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey && megaTrigger.getAttribute('aria-expanded') === 'true'))) {event.preventDefault();openMega(megaTrigger, true);return;}
    if (event.key === 'Escape' && document.querySelector('[data-mega][data-open="true"]')) {event.preventDefault();closeMegas(true);return;}
    const panel = target?.closest('[data-mega]');
    if (panel && event.key === 'Tab') {
      const links = [...panel.querySelectorAll('a')];
      const trigger = document.querySelector(`[data-mega-trigger][aria-controls="${panel.id}"]`);
      if (event.shiftKey && target === links[0]) {event.preventDefault();trigger?.focus();return;}
      if (!event.shiftKey && target === links.at(-1)) {
        event.preventDefault();
        const triggers = [...document.querySelectorAll('[data-mega-trigger]')].filter(button => button.offsetParent);
        const next = triggers[triggers.indexOf(trigger) + 1] || document.querySelector('[data-header] .brand');
        closeMegas();next?.focus();return;
      }
    }
    if (['Enter',' '].includes(event.key) && target?.matches('img[data-gallery-image]')) {event.preventDefault();openGallery(target.closest('[data-gallery]'), target.currentSrc || target.src, target);}
  });
  on('touchstart', event => {if (event.target.closest('.gallery-stage')) touchX = event.changedTouches[0].clientX;}, {passive:true});
  on('touchend', event => {if (event.target.closest('.gallery-stage')) {const dx = event.changedTouches[0].clientX - touchX;if (Math.abs(dx) > 45) show(active + (dx < 0 ? 1 : -1));}}, {passive:true});
  enhancePage();
  return () => {controller.abort();timeouts.forEach(clearTimeout);cancelAnimationFrame(headerFrame);cancelAnimationFrame(arch.frame);cancelAnimationFrame(rise.frame);filmObserver?.disconnect();driftObserver?.disconnect();lenis?.destroy();lenis=undefined;resetPendingMenu=()=>{};refreshHeader=()=>{};};
}
