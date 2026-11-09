<script lang="ts">
  // The designer's menu. Placement map, 2026-11-08: the mega menu's photographs reach every group here, since only
  // four groups fit in the header. On wide screens the photograph of the page under the pointer or focus shows beside
  // the lists (interactions.js, previewMenu); it starts on the page you are on.
  import { bookingFor, route } from '#lib/enhanced/site.ts';
  import { tr, other, type Locale } from '#lib/enhanced/i18n.ts';
  import { thumb, groups } from '#lib/enhanced/navigation.ts';

  type Props = {
    edition: 'figma-enhanced';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  const asset = (path: string) => `${base.replace(/\/$/, '')}${path}`;
</script>

<dialog class="site-menu" id="site-menu" aria-label={tr(locale, 'Explore The Vessyl')} data-lenis-prevent>
  <div class="menu-top">
    <a href={route(edition, '', base, locale)}>
      <img src={`${base.replace(/\/$/, '')}/brand/logo-dark.svg`} alt="VESSYL" width="220" height="41" />
    </a>
    <button type="button" class="icon-button" data-menu-close aria-label={tr(locale, 'Close menu')}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>
  </div>
  <div class="menu-body">
    <div class="menu-columns">
      {#each groups as group (group.id)}
        <section class="menu-column">
          <h2>{tr(locale, group.title)}</h2>
          {#each group.overview ? [group.overview, ...group.items] : group.items as item (item.index)}
            <a href={route(edition, item.slug, base, locale)} data-cover={asset(thumb(item.index))}>{tr(locale, item.name)}</a>
          {/each}
        </section>
      {/each}
    </div>
    <figure class="menu-preview" aria-hidden="true" data-cover={asset(thumb(page.index))} data-name={tr(locale, page.name)}>
      <span class="menu-preview-image"><img src={asset(thumb(page.index))} alt="" loading="lazy" decoding="async" /></span>
      <figcaption>{tr(locale, page.name)}</figcaption>
    </figure>
  </div>
  <div class="menu-footer">
    <a class="nav-book" href={bookingFor(locale)} target="_blank" rel="noopener noreferrer">{tr(locale, 'CHECK AVAILABILITY')} ↗</a>
    <a class="language-trigger" data-language-trigger data-sveltekit-reload href={route(edition, page.slug, base, other(locale))} hreflang={other(locale)} aria-label={tr(locale, 'Language: English. Switch to Spanish')}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </svg>
      <span>{locale === 'es' ? 'ES' : 'EN'}</span>
    </a>
  </div>
  <div class="preview-toast dialog-toast" role="status" hidden></div>
</dialog>
