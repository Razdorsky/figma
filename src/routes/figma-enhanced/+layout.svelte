<script lang="ts">
  // Figma Enhanced edition shell. Started as a copy of the frozen Figma edition (2026-11-07).
  import {onMount, type Snippet} from 'svelte';
  import {afterNavigate, beforeNavigate, onNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages} from '#lib/enhanced/site.ts';
  import {installInteractions, enhancePage, closeOverlays, smooth} from '#lib/enhanced/interactions.js';
  import 'lenis/dist/lenis.css';
  import '#lib/enhanced/styles/shell.css';
  import '#lib/enhanced/styles/shell-edition.css';
  import '#lib/enhanced/styles/tokens.css';
  import '#lib/enhanced/styles/system.css';
  import '#lib/enhanced/styles/closing.css';
  import '#lib/enhanced/styles/focus.css';
  import '#lib/enhanced/styles/header.css';
  import '#lib/enhanced/styles/motion.css';
  import '#lib/enhanced/styles/films.css';
  import '#lib/enhanced/styles/drift.css';
  import '#lib/enhanced/styles/rise.css';
  import '#lib/enhanced/styles/next.css';
  import '#lib/enhanced/styles/rail.css';
  import '#lib/enhanced/styles/change.css';
  import '#lib/enhanced/styles/portal.css';
  import '#lib/enhanced/styles/atlas.css';
  import '#lib/enhanced/styles/intro.css';
  import Intro from '#lib/enhanced/components/Intro.svelte';
  // Moderate prewarming: the fonts of the first screen load with the page (the same files the stylesheets name).
  import garamond from '../../assets/fonts/eb-garamond-latin-wght-normal.woff2?url';
  import roboto400 from '#lib/enhanced/fonts/roboto-400.woff2?url';
  import roboto500 from '#lib/enhanced/fonts/roboto-500.woff2?url';

  let {children}: {children:Snippet} = $props();
  onMount(installInteractions);
  // Step 2.2: any glide still running stops when a navigation starts (Back right after a wheel included).
  beforeNavigate(() => {closeOverlays();smooth()?.stop();});
  afterNavigate(() => {
    // Moderate prewarming: SvelteKit fetches a page's data while its link is pointed at.
    document.body.setAttribute('data-sveltekit-preload-data', 'hover');
    const edition = 'figma-enhanced';
    const item = pages.find(item => item.slug === (page.params.slug || '').replace(/^\/|\/$/g,''));
    document.body.dataset.edition = edition;
    document.body.dataset.page = item?.slug || 'home';
    document.body.dataset.heroTheme = item?.photo ? 'photo' : 'paper';
    document.documentElement.style.setProperty('--canvas', canvas(edition, item?.index || 0));
    // Step 2.2: Lenis follows the position SvelteKit chose, so it never scrolls the new page back.
    const lenis = smooth();
    if (lenis && !document.querySelector('dialog[open]')) lenis.start();
    lenis?.resize();
    lenis?.scrollTo(window.scrollY, {immediate: true, force: true});
    enhancePage();
  });

  // Step 2.2 (docs/figma-enhanced-step2.md): the Legacy Blueprint page transition. The page dissolves; when the
  // departing opening is on screen, the openings travel together and the new photograph settles from 110%.
  const opening = () => document.querySelector<HTMLElement>('.current-page > section:first-child, .current-page > [data-rise]:first-child > section:first-child');
  const onScreen = (element: Element | null, share: number) => {
    const box = element?.getBoundingClientRect();
    return !!box && box.top > -innerHeight * 0.25 && box.bottom > innerHeight * share;
  };
  async function photoReady() {
    const image = document.querySelector<HTMLImageElement>('.current-page > [data-role="photo-hero"]:first-child [data-part="hero-image"] img, .current-page > [data-rise]:first-child > [data-role="photo-hero"]:first-child [data-part="hero-image"] img');
    if (!image) return null;
    await Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 400))]);
    return image.complete && image.naturalWidth ? image : null;
  }
  // Step 2.6: a navigation to the page the next-page block leads to, while its picture is on screen, carries the
  // picture into that page's opening (motion.css, vt-next); a page that opens on text receives it as a dissolve.
  const door = () => document.querySelector<HTMLElement>('.current-page [data-next-media]');
  const throughDoor = (to: URL | undefined) => {
    const media = door();
    const link = media?.closest('a');
    if (!media || !link || !to || to.pathname !== new URL(link.href).pathname) return false;
    const box = media.getBoundingClientRect();
    return Math.min(box.bottom, innerHeight) - Math.max(box.top, 0) > box.height * 0.3;
  };
  const arrivingPicture = () => document.querySelector('.current-page > [data-rise]:first-child > [data-role="photo-hero"]:first-child > [data-part="hero-image"], .current-page > [data-hero="arch"]:first-child [data-part="arch-media"]');
  let activeTransition: ViewTransition | undefined;
  onNavigate(navigation => {
    activeTransition?.skipTransition();
    const root = document.documentElement;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches || navigation.shallow
      || navigation.from?.url.pathname === navigation.to?.url.pathname) {
      delete root.dataset.vt;
      return;
    }
    const header = document.querySelector('[data-header]');
    const viaDoor = throughDoor(navigation.to?.url);
    root.dataset.vt = viaDoor ? 'next' : onScreen(opening(), 0.4) ? 'hero' : 'dissolve';
    root.dataset.vtHeader = header && !header.classList.contains('is-away') ? 'shared' : 'none';
    let arriving: HTMLImageElement | null = null;
    return new Promise<void>(resolveNavigation => {
      const transition = document.startViewTransition(async () => {
        resolveNavigation();
        await navigation.complete;
        if (viaDoor) {
          const grows = scrollY < 2 && !!arrivingPicture();
          if (grows) await photoReady();
          root.dataset.vt = grows ? 'next-in' : 'dissolve';
          return;
        }
        // The new page is in: its opening joins the transition when the page starts at the top.
        arriving = scrollY < 2 ? await photoReady() : null;
        root.dataset.vt = scrollY < 2 ? 'hero' : 'dissolve';
      });
      activeTransition = transition;
      transition.ready.then(() => {
        if (!arriving) return;
        // The build may write the token in seconds (".8s"), so read its unit.
        const token = getComputedStyle(root).getPropertyValue('--vt-scene').trim();
        const time = (parseFloat(token) * (token.endsWith('ms') ? 1 : 1000)) || 800;
        arriving.animate([{scale: 1.1}, {scale: 1}], {duration: time, easing: 'cubic-bezier(0.4, 0, 0.2, 1)'});
      }).catch(() => {});
      transition.finished.finally(() => {
        if (activeTransition !== transition) return;
        activeTransition = undefined;
        delete root.dataset.vt;
        delete root.dataset.vtHeader;
      }).catch(() => {});
    });
  });
</script>

<svelte:head>
  <link rel="preload" href={garamond} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={roboto400} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={roboto500} as="font" type="font/woff2" crossorigin="anonymous" />
  {@html `<script>try{if(!sessionStorage.getItem('vessyl:intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.dataset.intro='on';sessionStorage.setItem('vessyl:intro','1');setTimeout(function(){if(d.dataset.intro==='on'){d.dataset.intro='leaving';setTimeout(function(){d.dataset.intro='done'},800)}},3600)}}catch(e){}</script>`}
</svelte:head>

<Intro />
{@render children()}
<div class="preview-toast" role="status" hidden></div>
