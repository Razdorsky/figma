<script lang="ts">
  // Figma PR edition shell (owner, 2026-11-10): a copy of the frozen Figma edition in the design system of the PR
  // team's references. docs/figma-pr-system.md describes the system and every mechanic.
  import {onMount, type Snippet} from 'svelte';
  import {afterNavigate, beforeNavigate, onNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages, parseSlug} from '#lib/pr/site.ts';
  import {installInteractions, enhancePage, closeOverlays} from '#lib/pr/interactions.js';
  import '#lib/pr/styles/base.css';
  import '#lib/pr/styles/shell.css';
  import '#lib/pr/styles/sections.css';
  import '#lib/pr/styles/motion.css';
  import caps from '#lib/pr/fonts/archivo-normal.woff2?url';
  import display from '#lib/pr/fonts/libre-caslon-display-normal.woff2?url';
  import text from '#lib/pr/fonts/newsreader-normal.woff2?url';

  let {children}: {children:Snippet} = $props();
  onMount(installInteractions);
  beforeNavigate(() => closeOverlays());
  afterNavigate(() => {
    const edition = 'figma-pr';
    const {locale, slug} = parseSlug(page.params.slug);
    const item = pages.find(item => item.slug === slug);
    // Spanish pages (docs/figma-spanish.md): the document language follows the page.
    document.documentElement.lang = locale;
    document.body.dataset.edition = edition;
    document.body.dataset.page = item?.slug || 'home';
    document.body.dataset.heroTheme = item?.photo ? 'photo' : 'paper';
    document.documentElement.style.setProperty('--canvas', canvas(edition, item?.index || 0));
    enhancePage();
  });
  let activeTransition: ViewTransition | undefined;
  onNavigate(navigation => {
    activeTransition?.skipTransition();
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches || navigation.shallow) return;
    return new Promise<void>(resolve => {
      const transition = document.startViewTransition(async () => {resolve();await navigation.complete;});
      activeTransition = transition;
      void transition.ready.catch(() => {});
      void transition.finished.finally(() => {if(activeTransition === transition)activeTransition = undefined;}).catch(() => {});
    });
  });
</script>

<svelte:head>
  <link rel="preload" href={caps} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={display} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={text} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

{@render children()}
<div class="preview-toast" role="status" hidden></div>
