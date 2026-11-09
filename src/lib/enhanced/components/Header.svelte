<script lang="ts">
  // Step 2.1 (docs/figma-enhanced-step2.md): the designer's header, floating as on /blueprint/ 452c7d0, with the
  // Legacy Blueprint mega menu. Corrected to the placement map (2026-11-08): every menu group that fits beside MENU
  // gets a trigger and a panel; the menu itself shows each page's photograph (Menu.svelte). Behaviour: interactions.js.
  import { booking, route } from '#lib/enhanced/site.ts';
  import { thumb, groups } from '#lib/enhanced/navigation.ts';

  type Props = {
    edition: 'figma-enhanced';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
  };

  let { edition, page, base = '' }: Props = $props();

  function asset(path: string) {
    if (/^(?:https?:)?\/\//.test(path)) return path;
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  // Four of the six groups fit beside MENU at the widest; the rank decides from which width each one shows
  // (header.css). Take the whole property and Plan your visit live in the menu.
  const shown = groups.slice(0, 4);
</script>

<header class="site-header" data-header data-theme={page.photo ? 'dark' : 'light'}>
  <div class="header-inner">
    <div class="header-start">
      <button type="button" class="menu-toggle" data-menu-open aria-expanded="false" aria-haspopup="dialog" aria-controls="site-menu">
        <span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>MENU</span>
      </button>
      <nav class="header-nav" aria-label="Main navigation">
        {#each shown as group, rank (group.id)}
          <button type="button" class="nav-trigger" data-mega-trigger data-rank={rank + 1} aria-expanded="false" aria-controls={`mega-${group.id}`}>
            <span>{group.title}</span>
            <svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.3" /></svg>
          </button>
        {/each}
      </nav>
    </div>
    <a class="brand" href={route(edition, '', base)} aria-label="Vessyl home">
      <img class="logo-light" src={asset('/brand/logo-white.svg')} width="210" height="39" alt="" />
      <img class="logo-copper" src={asset('/brand/logo-copper.svg')} width="210" height="39" alt="" />
    </a>
    <div class="header-actions">
      <button type="button" class="language-trigger" data-language-trigger aria-label="Language: English">
        <span>EN | ES</span>
      </button>
      <a class="nav-book" href={booking} target="_blank" rel="noopener noreferrer">CHECK AVAILABILITY</a>
    </div>
  </div>
  {#each shown as group (group.id)}
    <nav id={`mega-${group.id}`} class="mega" data-mega data-open="false" aria-label={group.title} data-lenis-prevent inert>
      <div class="mega-cards" style={`--count: ${group.items.length}`}>
        {#each group.items as item (item.index)}
          <a class="mega-card" href={route(edition, item.slug, base)}>
            <span class="mega-image"><img data-src={asset(thumb(item.index))} alt="" decoding="async" /></span>
            <span class="mega-label">{item.name}</span>
          </a>
        {/each}
      </div>
      {#if group.overview}
        <a class="mega-overview" href={route(edition, group.overview.slug, base)}>
          <span>Overview</span>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10 10 2M2 2h8v8" fill="none" stroke="currentColor" stroke-width="1.3" /></svg>
        </a>
      {/if}
    </nav>
  {/each}
  <span class="header-progress" aria-hidden="true"></span>
</header>
