// Figma PR interactions (docs/figma-pr-system.md, "Mechanics"). The frozen edition's controller (menu, gallery,
// newsletter, placeholders) with the PR edition's own mechanics: the sticky header, the booking bar, the clips, the
// pictures that settle on scroll, the opening that eases off, and the centre-focus gallery carousel.
// One delegated controller survives SvelteKit page changes. Abort on unmount.
let resetPendingMenu = () => {};
export function closeOverlays() {
  resetPendingMenu();
  document.querySelectorAll('.preview-toast').forEach(toast => toast.hidden = true);
  document.querySelectorAll('[data-menu-open]').forEach(button => button.setAttribute('aria-expanded','false'));
  document.querySelectorAll('dialog').forEach(dialog => {dialog.classList.remove('closing');if(dialog.open)dialog.close();});
  document.querySelectorAll('.nav-group[open]').forEach(group => group.open = false);
}

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Clips: play while a fifth is on screen, in a visible tab, without reduced motion; the ones further down load a
// screen and a half ahead (as in Figma Enhanced, docs/figma-enhanced-speed.md).
let clipObserver, clipApproach;
function syncClip(video) {
  const paused = video.closest('section')?.querySelector(':scope > .pr-film-toggle')?.getAttribute('aria-pressed') === 'true';
  if (video.dataset.visible === 'true' && !document.hidden && !reducedMotion() && !paused) video.play().catch(() => {});
  else video.pause();
}
function setupClips() {
  clipObserver?.disconnect(); clipApproach?.disconnect();
  const clips = [...document.querySelectorAll('.current-page video[data-loop]')];
  clipObserver = new IntersectionObserver(entries => {for (const e of entries) {e.target.dataset.visible = String(e.isIntersecting && e.intersectionRatio >= 0.2);syncClip(e.target);}}, {threshold: [0, 0.2]});
  clipApproach = new IntersectionObserver(entries => {for (const e of entries) if (e.isIntersecting) {clipApproach.unobserve(e.target);e.target.preload = 'auto';}}, {rootMargin: '150% 0px 150% 0px'});
  for (const video of clips) {
    video.muted = true;
    clipObserver.observe(video);
    if (video.preload !== 'auto') clipApproach.observe(video);
    // The opening clip can be paused.
    const box = video.closest('[data-part="hero-image"]');
    if (box && !box.parentElement.querySelector('.pr-film-toggle')) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'pr-film-toggle'; button.setAttribute('aria-pressed', 'false'); button.setAttribute('aria-label', 'Pause the video');
      button.innerHTML = '<svg class="icon-pause" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 2h3v10H3zM8 2h3v10H8z"/></svg><svg class="icon-play" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z"/></svg>';
      box.parentElement.append(button);
    }
  }
}

// ---- Pictures settle from 110% to 100% as they come up the screen (Four Seasons); the opening eases off.
const settle = {items: [], frame: 0, hero: null};
// A callout picture smaller than the panel (the Vessyl mark, the founder's square portrait) stands whole on the green
// of its callout instead of being enlarged and cut.
function markGraphics() {
  document.querySelectorAll('.current-page [data-role="callout"] figure > img').forEach(img => {
    const w = Number(img.getAttribute('width') || 0);
    if (w && w < 900) img.closest('figure').setAttribute('data-pr-graphic', '');
  });
}
function setupSettle() {
  settle.items = reducedMotion() ? [] : [...document.querySelectorAll('.current-page > section:not([data-role="photo-hero"]):not([data-pr-hero]) figure:not(.pr-carousel-slide)')].filter(f => !f.closest('[data-role="map"], [data-role="logos"]'));
  settle.items.forEach(f => f.setAttribute('data-pr-zoom', ''));
  settle.hero = document.querySelector('.current-page > section:is([data-role="photo-hero"], [data-pr-hero]):first-child');
  updateSettle();
}
function updateSettle() {
  settle.frame = 0;
  const vh = innerHeight;
  for (const f of settle.items) {
    const r = f.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
    f.style.setProperty('--z', (1.1 - 0.1 * p).toFixed(4));
  }
  if (settle.hero && !reducedMotion()) {
    const h = settle.hero.offsetHeight || 1;
    settle.hero.style.setProperty('--hero-p', Math.min(1, Math.max(0, scrollY / h)).toFixed(4));
  }
}

// ---- Gallery: Rosewood's centre-focus carousel, made of the page's own photographs (no photograph is added).
function setupCarousels() {
  document.querySelectorAll('.current-page > section[data-role="gallery"]:not([data-pr-carousel])').forEach(section => {
    const seen = new Set();
    const photos = [...document.querySelectorAll('.current-page img')].filter(img => {
      const src = img.getAttribute('src') || '';
      if (!/\/media\/[0-9a-f]{20}\.webp$/.test(src) || seen.has(src) || img.closest('.pr-carousel')) return false;
      seen.add(src); return true;
    });
    if (photos.length < 3) return;
    section.setAttribute('data-pr-carousel', '');
    section.setAttribute('data-gallery', section.getAttribute('data-gallery') || '1');
    const wrap = document.createElement('div'); wrap.className = 'pr-carousel';
    const track = document.createElement('div'); track.className = 'pr-carousel-track'; track.tabIndex = 0; track.setAttribute('role', 'region'); track.setAttribute('aria-label', 'Photographs');
    photos.forEach((img, i) => {
      const fig = document.createElement('figure'); fig.className = 'pr-carousel-slide';
      const copy = document.createElement('img'); copy.src = img.getAttribute('src'); copy.alt = img.alt; copy.loading = 'lazy'; copy.decoding = 'async'; copy.setAttribute('data-gallery-image', '');
      fig.append(copy); track.append(fig);
    });
    const bar = document.createElement('div'); bar.className = 'pr-carousel-bar';
    bar.innerHTML = '<button type="button" class="pr-carousel-arrow" data-step="-1" aria-label="Previous photograph"><svg viewBox="0 0 16 16"><path d="M10 3 5 8l5 5"/></svg></button><span class="pr-carousel-line" aria-hidden="true"><i></i></span><button type="button" class="pr-carousel-arrow" data-step="1" aria-label="Next photograph"><svg viewBox="0 0 16 16"><path d="m6 3 5 5-5 5"/></svg></button>';
    wrap.append(track, bar); section.append(wrap);
    const slides = [...track.children];
    const line = bar.querySelector('.pr-carousel-line');
    line.style.setProperty('--w', `${100 / slides.length}%`);
    const current = () => {const mid = track.getBoundingClientRect().left + track.clientWidth / 2;let best = 0, d = Infinity;slides.forEach((s, i) => {const r = s.getBoundingClientRect();const dd = Math.abs(r.left + r.width / 2 - mid);if (dd < d) {d = dd;best = i;}});return best;};
    const mark = () => {const i = current();slides.forEach((s, k) => s.toggleAttribute('data-current', k === i));line.style.setProperty('--x', `${(100 / slides.length) * i}%`);};
    let t = 0; track.addEventListener('scroll', () => {cancelAnimationFrame(t);t = requestAnimationFrame(mark);}, {passive: true});
    const go = i => {const s = slides[Math.max(0, Math.min(slides.length - 1, i))];track.scrollTo({left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: reducedMotion() ? 'auto' : 'smooth'});};
    bar.addEventListener('click', e => {const b = e.target.closest('[data-step]');if (b) go(current() + Number(b.dataset.step));});
    track.addEventListener('keydown', e => {if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault();go(current() + (e.key === 'ArrowRight' ? 1 : -1));}});
    requestAnimationFrame(() => {go(Math.floor(slides.length / 2));mark();});
  });
}

// ---- Header: the utility row leaves on scroll and the navigation row stays (CSS sticky); the wordmark joins it.
function updateHeader() {
  const header = document.querySelector('[data-pr-header]');
  if (!header) return;
  const utility = header.querySelector('.pr-utility');
  const h = utility && getComputedStyle(utility).display !== 'none' ? utility.offsetHeight : 0;
  header.toggleAttribute('data-stuck', scrollY > h - 1 && h > 0);
}

export function enhancePage() {
  setupClips();
  setupCarousels();
  markGraphics();
  setupSettle();
  updateHeader();
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
  const hover = matchMedia('(hover:hover) and (pointer:fine)');
  const timeouts = new Set();
  const later = (fn, ms) => {const id = setTimeout(() => {timeouts.delete(id);fn();}, ms);timeouts.add(id);return id;};
  const on = (name, fn, options = {}) => document.addEventListener(name, fn, {...options, signal});
  let opener, galleryOpener, images = [], active = 0, toastTimer, menuCloseTimer, touchX = 0;
  const menu = () => document.querySelector('#site-menu');
  const gallery = () => document.querySelector('.gallery-dialog');

  resetPendingMenu=()=>{clearTimeout(menuCloseTimer);menuCloseTimer=undefined;menu()?.classList.remove('closing');};
  // Owner's request, 2026-11-07: page text cannot be selected or copied (see also figma.css).
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
  }
  on('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (!target.closest('.nav-group')) document.querySelectorAll('.nav-group').forEach(group => group.open = false);
    const open = target.closest('[data-menu-open]');
    if (open) {resetPendingMenu();opener=open;const dialog=menu();if(dialog&&!dialog.open){dialog.showModal();dialog.scrollTop=0;open.setAttribute('aria-expanded','true');dialog.querySelector('[data-menu-close]')?.focus();}return;}
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
    const summary = target.closest('.nav-group summary');
    if(summary)document.querySelectorAll('.nav-group').forEach(group=>{if(group!==summary.closest('details'))group.open=false;});
    if (summary && hover.matches && event.detail > 0) {event.preventDefault();summary.closest('details').open = true;}
  });
  on('toggle',event=>{const group=event.target;if(group instanceof HTMLDetailsElement&&group.matches('.nav-group')&&group.open)document.querySelectorAll('.nav-group').forEach(other=>{if(other!==group)other.open=false;});},{capture:true});
  on('cancel', event => {if (event.target === menu()) {event.preventDefault();closeMenu();}}, {capture:true});
  on('close', event => {if (event.target === gallery()) galleryOpener?.focus();}, {capture:true});
  on('keydown', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (gallery()?.open && ['ArrowLeft','ArrowRight'].includes(event.key)) {event.preventDefault();show(active + (event.key === 'ArrowLeft' ? -1 : 1));return;}
    if (event.key === 'Escape' && target?.closest('.nav-group')) {const group = target.closest('.nav-group');group.open = false;group.querySelector('summary').focus();return;}
    if (['Enter',' '].includes(event.key) && target?.matches('img[data-gallery-image]')) {event.preventDefault();openGallery(target.closest('[data-gallery]'), target.currentSrc || target.src, target);}
  });
  on('pointerover', event => {
    if (!hover.matches) return;
    const target = event.target instanceof Element ? event.target : null;
    const group = target?.closest('.nav-group');
    if (group && !group.contains(event.relatedTarget)) {
      document.querySelectorAll('.nav-group').forEach(other => other.open = other === group);
    }
  });
  on('pointerout', event => {
    if (!hover.matches) return;
    const group = event.target instanceof Element ? event.target.closest('.nav-group') : null;
    if (group && !group.contains(event.relatedTarget)) later(() => {if (!group.matches(':hover') && !group.contains(document.activeElement)) group.open = false;}, 180);
  });
  on('focusout', event => {
    const group = event.target instanceof Element ? event.target.closest('.nav-group') : null;
    if (group) later(() => {if (!group.matches(':hover') && !group.contains(document.activeElement)) group.open = false;}, 0);
  });
  // Scroll: settle pictures, ease the opening, the header's stuck state.
  let scrollFrame = 0;
  addEventListener('scroll', () => {if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {scrollFrame = 0;updateSettle();updateHeader();});}, {passive: true, signal});
  addEventListener('resize', () => {updateSettle();updateHeader();}, {passive: true, signal});
  on('visibilitychange', () => document.querySelectorAll('.current-page video[data-loop]').forEach(syncClip));
  // Booking bar (Four Seasons): the reserve button opens it; dates and guests open Orbe's results for them.
  const bookingForm = () => document.querySelector('[data-booking]');
  const toggleBooking = force => {
    const form = bookingForm(), button = document.querySelector('[data-booking-open]');
    if (!form || !button) return;
    const open = force ?? form.hidden;
    form.hidden = !open; button.setAttribute('aria-expanded', String(open));
    if (open) {
      const today = new Date(), iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      const inField = form.elements.checkin, outField = form.elements.checkout;
      inField.min = iso(today); outField.min = iso(new Date(today.getTime() + 86400000));
      if (!inField.value) inField.value = iso(today);
      if (!outField.value) outField.value = iso(new Date(today.getTime() + 2 * 86400000));
      inField.focus();
    }
  };
  on('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest('[data-booking-open]')) {toggleBooking();return;}
    const film = target.closest('.pr-film-toggle');
    if (film) {
      const pressed = film.getAttribute('aria-pressed') !== 'true';
      film.setAttribute('aria-pressed', String(pressed)); film.setAttribute('aria-label', pressed ? 'Play the video' : 'Pause the video');
      film.parentElement.querySelectorAll('video[data-loop]').forEach(syncClip);
    }
  });
  on('keydown', event => {if (event.key === 'Escape' && !bookingForm()?.hidden) {toggleBooking(false);document.querySelector('[data-booking-open]')?.focus();}});
  // Mega panels load their pictures only when they open.
  on('toggle', event => {const group = event.target;if (group instanceof HTMLDetailsElement && group.open) group.querySelectorAll('img[data-src]').forEach(img => {img.src = img.dataset.src;img.removeAttribute('data-src');});}, {capture: true});
  on('touchstart', event => {if (event.target.closest('.gallery-stage')) touchX = event.changedTouches[0].clientX;}, {passive:true});
  on('touchend', event => {if (event.target.closest('.gallery-stage')) {const dx = event.changedTouches[0].clientX - touchX;if (Math.abs(dx) > 45) show(active + (dx < 0 ? 1 : -1));}}, {passive:true});
  enhancePage();
  return () => {controller.abort();timeouts.forEach(clearTimeout);resetPendingMenu=()=>{};};
}
