// One delegated controller survives SvelteKit page changes. Abort on unmount.
import es from './content/es.json';

// Spanish pages (docs/figma-spanish.md): interface words follow the document language. The literals of say() are in
// the coverage check (scripts/spanish-strings.mjs).
const say = text => (document.documentElement.lang === 'es' ? es[text] ?? text : text);
let resetPendingMenu = () => {};
export function closeOverlays() {
  resetPendingMenu();
  document.querySelectorAll('.preview-toast').forEach(toast => toast.hidden = true);
  document.querySelectorAll('[data-menu-open]').forEach(button => button.setAttribute('aria-expanded','false'));
  document.querySelectorAll('dialog').forEach(dialog => {dialog.classList.remove('closing');if(dialog.open)dialog.close();});
  document.querySelectorAll('.nav-group[open]').forEach(group => group.open = false);
}

export function enhancePage() {
  document.querySelectorAll('[data-gallery] img[data-gallery-image]').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-haspopup','dialog');
    img.setAttribute('aria-controls','photo-gallery');
    img.setAttribute('aria-label', say('Open photo gallery'));
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
      button.type = 'button';button.dataset.galleryIndex = String(index);button.setAttribute('aria-label', `${say('View photo')} ${index + 1}`);
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
    if (target.closest('[data-pending-link]')) {event.preventDefault();notify(say('This destination is still a placeholder in the supplied design.'));return;}
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
  on('touchstart', event => {if (event.target.closest('.gallery-stage')) touchX = event.changedTouches[0].clientX;}, {passive:true});
  on('touchend', event => {if (event.target.closest('.gallery-stage')) {const dx = event.changedTouches[0].clientX - touchX;if (Math.abs(dx) > 45) show(active + (dx < 0 ? 1 : -1));}}, {passive:true});
  enhancePage();
  return () => {controller.abort();timeouts.forEach(clearTimeout);resetPendingMenu=()=>{};};
}
