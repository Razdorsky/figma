<script lang="ts">
  import { bookingFor, pages, photo, route } from '#lib/site.ts';
  import { tr, msg, other, type Locale } from '#lib/i18n.ts';

  type Props = {
    edition: 'blueprint' | 'figma';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  function asset(path: string) {
    if (/^(?:https?:)?\/\//.test(path)) return path;
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
</script>

{#snippet languageButton()}
  <!-- The designer's EN | ES: a link to this page in the other language; the current one is underlined
       (docs/figma-spanish.md). -->
  <a class="language-trigger" data-language-trigger data-sveltekit-reload href={route(edition, page.slug, base, other(locale))} hreflang={other(locale)} aria-label={tr(locale, 'Language: English. Switch to Spanish')}>
    {#if edition === 'figma'}
      <span><span data-lang-current={locale === 'en' || undefined}>EN</span> | <span data-lang-current={locale === 'es' || undefined}>ES</span></span>
    {:else}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </svg>
      <span>{locale === 'es' ? 'ES' : 'EN'}</span>
    {/if}
  </a>
{/snippet}

{#snippet mega(list: typeof pages, title: string)}
  <details class="nav-group">
    <summary class="nav-trigger">{tr(locale, title)}</summary>
    <div class="mega-menu">
      <a class="mega-overview" href={route(edition, list[0].slug, base, locale)}><span>{tr(locale, 'Overview ↗')}</span></a>
      {#each list.slice(1) as item (item.index)}
        <a href={route(edition, item.slug, base, locale)}>
          <img src={asset(photo(item.index))} alt={tr(locale, item.name)} loading="lazy" />
          <span>{tr(locale, item.name)}</span>
        </a>
      {/each}
    </div>
  </details>
{/snippet}

<header class="site-header">
  <div class="header-inner">
    <button type="button" class="menu-toggle" data-menu-open aria-expanded="false" aria-haspopup="dialog" aria-controls="site-menu">
      <span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>{tr(locale, 'MENU')}</span>
    </button>
    <a class="brand" href={route(edition, '', base, locale)} aria-label={tr(locale, 'Vessyl home')}>
      <img
        src={asset(`/brand/${page.photo || edition === 'blueprint' ? 'logo-white.svg' : 'logo-copper.svg'}`)}
        width="210"
        height="39"
        alt="VESSYL"
      />
    </a>
    <nav class="desktop-navigation" aria-label={tr(locale, 'Main navigation')}>
      {@render mega(pages.slice(1, 6), msg('Stay'))}
      {@render mega([pages[6], ...pages.slice(7, 13)], msg('Experiences'))}
      <a href={route(edition, 'rates-and-offers', base, locale)}>{tr(locale, 'Rates & offers')}</a>
    </nav>
    <div class="header-actions">
      {@render languageButton()}
      <a class="nav-book" href={bookingFor(locale)} target="_blank" rel="noopener noreferrer">{tr(locale, 'CHECK AVAILABILITY')}</a>
    </div>
  </div>
</header>
