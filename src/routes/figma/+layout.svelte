<script lang="ts">
  // Figma edition shell — frozen. Was the root layout before the editions were separated.
  import {onMount, type Snippet} from 'svelte';
  import {afterNavigate, beforeNavigate, onNavigate} from '$app/navigation';
  import {page} from '$app/state';
  import {canvas, pages, parseSlug} from '#lib/site.ts';
  import {installInteractions, enhancePage, closeOverlays} from '#lib/interactions.js';
  import '../../shared.css';
  import '../../figma.css';

  let {children}: {children:Snippet} = $props();
  onMount(installInteractions);
  beforeNavigate(() => closeOverlays());
  afterNavigate(() => {
    const edition = 'figma';
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

{@render children()}
<div class="preview-toast" role="status" hidden></div>
