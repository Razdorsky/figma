<script lang="ts">
  // The designer's menu. Placement map, 2026-11-08: the mega menu's photographs reach every group here, since only
  // four groups fit in the header. On wide screens the photograph of the page under the pointer or focus shows beside
  // the lists (interactions.js, previewMenu); it starts on the page you are on.
  import { booking, route } from '#lib/enhanced/site.ts';
  import { thumb, groups } from '#lib/enhanced/navigation.ts';

  type Props = {
    edition: 'figma-enhanced';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
  };

  let { edition, page, base = '' }: Props = $props();

  const asset = (path: string) => `${base.replace(/\/$/, '')}${path}`;
</script>

<dialog class="site-menu" id="site-menu" aria-label="Explore The Vessyl" data-lenis-prevent>
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
  <div class="menu-body">
    <div class="menu-columns">
      {#each groups as group (group.id)}
        <section class="menu-column">
          <h2>{group.title}</h2>
          {#each group.overview ? [group.overview, ...group.items] : group.items as item (item.index)}
            <a href={route(edition, item.slug, base)} data-cover={asset(thumb(item.index))}>{item.name}</a>
          {/each}
        </section>
      {/each}
    </div>
    <figure class="menu-preview" aria-hidden="true" data-cover={asset(thumb(page.index))} data-name={page.name}>
      <span class="menu-preview-image"><img src={asset(thumb(page.index))} alt="" loading="lazy" decoding="async" /></span>
      <figcaption>{page.name}</figcaption>
    </figure>
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
