<script lang="ts">
  // Figma PR menu (docs/figma-pr-system.md, "Menu"): the frame's menu, on paper, in Rosewood's type — capital group
  // headings and serif links.
  import { booking, pages, route } from '#lib/pr/site.ts';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
  };

  let { edition, base = '' }: Props = $props();
</script>

<dialog class="site-menu pr-menu" id="site-menu" aria-label="Explore The Vessyl">
  <div class="menu-top">
    <a href={route(edition, '', base)}>
      <img src={`${base.replace(/\/$/, '')}/brand/logo-dark.svg`} alt="VESSYL" width="220" height="41" />
    </a>
    <button type="button" class="icon-button" data-menu-close aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>
  </div>
  <div class="menu-columns">
    <section class="menu-column">
      <h2>Where you sleep</h2>
      {#each pages.slice(1, 6) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
    <section class="menu-column">
      <h2>Experiences</h2>
      {#each pages.slice(6, 13) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
    <section class="menu-column">
      <h2>The Property</h2>
      {#each pages.slice(13, 18) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
    <section class="menu-column">
      <h2>Eating here</h2>
      {#each pages.slice(18, 21) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
    <section class="menu-column">
      <h2>Take the whole property</h2>
      {#each pages.slice(21, 25) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
    <section class="menu-column">
      <h2>Plan your visit</h2>
      {#each pages.slice(25, 28) as item (item.index)}
        <a href={route(edition, item.slug, base)}>{item.name}</a>
      {/each}
    </section>
  </div>
  <div class="menu-footer">
    <a class="nav-book" href={booking} target="_blank" rel="noopener noreferrer">CHECK AVAILABILITY ↗</a>
    <button type="button" class="language-trigger" data-language-trigger aria-label="Language: English">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </svg>
      <span>EN</span>
    </button>
  </div>
  <div class="preview-toast dialog-toast" role="status" hidden></div>
</dialog>
