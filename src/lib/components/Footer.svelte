<script lang="ts">
  import { bookingFor, pages, route } from '#lib/site.ts';
  import { tr, msg, other, type Locale } from '#lib/i18n.ts';

  type Props = {
    edition: 'blueprint' | 'figma';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  // Footer labels from the frames; the designer's pages 14–18 supply five of the six destinations.
  const propertyLinks: [string, string | null][] = [
    [msg('The Dome'), 'the-frequency-dome'],
    [msg('The Hearth'), 'the-harmonic-hearth'],
    [msg('Sound and movement'), 'sound-and-movement'],
    [msg('Horses and land'), 'horses-and-the-land'],
    [msg('The studio'), 'the-recording-studio'],
    [msg('The gallery'), null]
  ];
  // The frames' footer writes one page name differently from the page itself.
  const footerNames: Record<string, string> = { 'rates-and-offers': msg('Rates and Offers') };
  // The designer's pages 27–28 supply the first two destinations.
  const visitLinks: [string, string | null][] = [
    [msg('Getting here'), 'getting-here'],
    [msg('Things to do in Arenal'), 'things-to-do-around-here'],
    [msg('When to visit'), null],
    [msg('FAQ'), null],
    [msg('Policies'), null]
  ];
  const contactLinks = [msg('WhatsApp Contact'), msg('Phone Contact'), msg('Address Info')];
</script>

{#snippet languageButton()}
  <!-- The designer's EN | ES: a link to this page in the other language (docs/figma-spanish.md). -->
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

{#snippet pending(label: string)}
  <button type="button" data-pending-link={label}>{tr(locale, label)}</button>
{/snippet}

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <a class="brand" href={route(edition, '', base, locale)}>
        <img src={`${base.replace(/\/$/, '')}/brand/logo-white.svg`} width="200" height="38" alt="VESSYL" />
      </a>
      <div class="header-actions">
        {@render languageButton()}
        <a class="nav-book" href={bookingFor(locale)} target="_blank" rel="noopener noreferrer">{tr(locale, 'CHECK AVAILABILITY')}</a>
      </div>
    </div>
    <div class="footer-columns">
      <section class="footer-group">
        <h2><a href={route(edition, 'where-you-sleep', base, locale)}>{tr(locale, 'Stay')}</a></h2>
        {#each pages.slice(2, 6) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, footerNames[item.slug] ?? item.name)}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'experiences', base, locale)}>{tr(locale, 'Experiences')}</a></h2>
        {#each pages.slice(7, 13) as item (item.index)}
          <a href={route(edition, item.slug, base, locale)}>{tr(locale, item.name)}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2>{tr(locale, 'The Property')}</h2>
        {#each propertyLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base, locale)}>{tr(locale, label)}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'arenal', base, locale)}>{tr(locale, 'Plan your visit')}</a></h2>
        {#each visitLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base, locale)}>{tr(locale, label)}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2>{tr(locale, 'Contact')}</h2>
        {#each contactLinks as label (label)}{@render pending(label)}{/each}
      </section>
    </div>
    <div class="footer-bottom">
      <p>© The Vessyl 2026 • La Fortuna, Costa Rica</p>
      <p>{@render pending(msg('Privacy'))} • {@render pending(msg('Terms & Conditions'))}</p>
    </div>
  </div>
</footer>
