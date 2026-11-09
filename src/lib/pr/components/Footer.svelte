<script lang="ts">
  // Figma PR footer (docs/figma-pr-system.md, "Footer"): Rosewood's footer — capital headings over serif links, the
  // Vessyl symbol in the middle, a small capital legal line and the green band at the foot. Words from the frame.
  import { booking, pages, route } from '#lib/pr/site.ts';
  import symbol from '#lib/pr/assets/symbol.svg?raw';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
  };

  let { edition, base = '' }: Props = $props();

  // Footer labels from the frames; the designer's pages 14–18 supply five of the six destinations.
  const propertyLinks: [string, string | null][] = [
    ['The Dome', 'the-frequency-dome'],
    ['The Hearth', 'the-harmonic-hearth'],
    ['Sound and movement', 'sound-and-movement'],
    ['Horses and land', 'horses-and-the-land'],
    ['The studio', 'the-recording-studio'],
    ['The gallery', null]
  ];
  // The frames' footer writes one page name differently from the page itself.
  const footerNames: Record<string, string> = { 'rates-and-offers': 'Rates and Offers' };
  // The designer's pages 27–28 supply the first two destinations.
  const visitLinks: [string, string | null][] = [
    ['Getting here', 'getting-here'],
    ['Things to do in Arenal', 'things-to-do-around-here'],
    ['When to visit', null],
    ['FAQ', null],
    ['Policies', null]
  ];
  const contactLinks = ['WhatsApp Contact', 'Phone Contact', 'Address Info'];
</script>

{#snippet languageButton()}
  <button type="button" class="language-trigger" data-language-trigger aria-label="Language: English">
    <span>EN | ES</span>
  </button>
{/snippet}

{#snippet pending(label: string)}
  <button type="button" data-pending-link={label}>{label}</button>
{/snippet}

<footer class="site-footer pr-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <a class="brand" href={route(edition, '', base)}>
        <img src={`${base.replace(/\/$/, '')}/brand/logo-dark.svg`} width="200" height="38" alt="VESSYL" />
      </a>
      <div class="header-actions">
        {@render languageButton()}
        <a class="nav-book" href={booking} target="_blank" rel="noopener noreferrer">CHECK AVAILABILITY</a>
      </div>
    </div>
    <div class="footer-columns">
      <section class="footer-group">
        <h2><a href={route(edition, 'where-you-sleep', base)}>Stay</a></h2>
        {#each pages.slice(2, 6) as item (item.index)}
          <a href={route(edition, item.slug, base)}>{footerNames[item.slug] ?? item.name}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'experiences', base)}>Experiences</a></h2>
        {#each pages.slice(7, 13) as item (item.index)}
          <a href={route(edition, item.slug, base)}>{item.name}</a>
        {/each}
      </section>
      <section class="footer-group">
        <h2>The Property</h2>
        {#each propertyLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base)}>{label}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2><a href={route(edition, 'arenal', base)}>Plan your visit</a></h2>
        {#each visitLinks as [label, slug] (label)}{#if slug}<a href={route(edition, slug, base)}>{label}</a>{:else}{@render pending(label)}{/if}{/each}
      </section>
      <section class="footer-group">
        <h2>Contact</h2>
        {#each contactLinks as label (label)}{@render pending(label)}{/each}
      </section>
    </div>
    <div class="footer-bottom">
      <span class="pr-symbol" aria-hidden="true">{@html symbol}</span>
      <p>©The Vessyl 2026 • La Fortuna, Costa Rica</p>
      <p>{@render pending('Privacy')} • {@render pending('Terms & Conditions')}</p>
    </div>
  </div>
  <div class="pr-footer-band" aria-hidden="true"></div>
</footer>
