<script lang="ts">
  // Figma PR header (docs/figma-pr-system.md, "Header"): Rosewood's tiers on paper — a utility row with the wordmark in
  // the middle, then the navigation row that sticks, ending in the green reserve button. The words are the frame's
  // header and menu words. The booking panel is Four Seasons' booking bar: dates and guests open Orbe's results.
  import { bookingPage, bookingFor, pages, photo, route } from '#lib/pr/site.ts';
  import { tr, msg, other, type Locale } from '#lib/pr/i18n.ts';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
    locale?: Locale;
  };

  let { edition, page, base = '', locale = 'en' }: Props = $props();

  function asset(path: string) {
    if (/^(?:https?:)?\/\//.test(path)) return path;
    return `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  // The booking bar opens Orbe's results for the chosen dates and guests in a new tab.
  let note = $state('');
  function submitBooking(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const checkIn = String(data.get('checkin') || ''), checkOut = String(data.get('checkout') || '');
    if (!checkIn || !checkOut || checkOut <= checkIn) { note = tr(locale, 'Choose a check-out date after the check-in date.'); return; }
    note = '';
    window.open(bookingFor(checkIn, checkOut, Number(data.get('adults') || 2), locale), '_blank', 'noopener');
  }
  // The frame's two menus: Stay (pages 2–6) and Experiences (pages 7–13).
  const groups = [
    { id: 'stay', title: msg('Stay'), list: pages.slice(1, 6) },
    { id: 'experiences', title: msg('Experiences'), list: [pages[6], ...pages.slice(7, 13)] }
  ];
</script>

<header class="site-header pr-header" data-pr-header>
  <div class="pr-utility">
    <!-- The designer's EN | ES: a link to this page in the other language; the current one is underlined
         (docs/figma-spanish.md). -->
    <a class="pr-utility-link language-trigger" data-language-trigger data-sveltekit-reload href={route(edition, page.slug, base, other(locale))} hreflang={other(locale)} aria-label={tr(locale, 'Language: English. Switch to Spanish')}><span><span data-lang-current={locale === 'en' || undefined}>EN</span> | <span data-lang-current={locale === 'es' || undefined}>ES</span></span></a>
    <a class="pr-brand" href={route(edition, '', base, locale)} aria-label={tr(locale, 'Vessyl home')}>
      <img src={asset('/brand/logo-dark.svg')} width="210" height="39" alt="VESSYL" />
    </a>
    <a class="pr-utility-link" href={bookingPage(locale)} target="_blank" rel="noopener noreferrer">{tr(locale, 'CHECK AVAILABILITY')}</a>
  </div>
  <div class="pr-nav-row">
    <button type="button" class="pr-menu-toggle menu-toggle" data-menu-open aria-expanded="false" aria-haspopup="dialog" aria-controls="site-menu">
      <span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="pr-menu-label">{tr(locale, 'MENU')}</span>
    </button>
    <a class="pr-brand pr-brand-compact" href={route(edition, '', base, locale)} aria-label={tr(locale, 'Vessyl home')}>
      <img src={asset('/brand/logo-dark.svg')} width="150" height="28" alt="VESSYL" />
    </a>
    <nav class="pr-nav" aria-label={tr(locale, 'Main navigation')}>
      {#each groups as group (group.id)}
        <details class="nav-group pr-nav-group">
          <summary class="nav-trigger">{tr(locale, group.title)}</summary>
          <div class="mega-menu pr-mega">
            <a class="mega-overview" href={route(edition, group.list[0].slug, base, locale)}><span>{tr(locale, 'Overview ↗')}</span></a>
            <div class="pr-mega-cards">
              {#each group.list.slice(1) as item (item.index)}
                <a class="pr-mega-card" href={route(edition, item.slug, base, locale)}>
                  <span class="pr-mega-image"><img data-src={asset(photo(item.index))} alt={tr(locale, item.name)} decoding="async" /></span>
                  <span class="pr-mega-name">{tr(locale, item.name)}</span>
                </a>
              {/each}
            </div>
          </div>
        </details>
      {/each}
      <a class="pr-nav-link" href={route(edition, 'rates-and-offers', base, locale)}>{tr(locale, 'Rates & offers')}</a>
    </nav>
    <button type="button" class="pr-reserve" data-booking-open aria-expanded="false" aria-controls="pr-booking">{tr(locale, 'CHECK AVAILABILITY')}</button>
  </div>
  <form class="pr-booking" id="pr-booking" data-booking hidden onsubmit={submitBooking}>
    <label class="pr-field"><span>{tr(locale, 'Check in')}</span><input type="date" name="checkin" required /></label>
    <label class="pr-field"><span>{tr(locale, 'Check out')}</span><input type="date" name="checkout" required /></label>
    <label class="pr-field"><span>{tr(locale, 'Guests')}</span>
      <select name="adults">
        <option value="1">{tr(locale, '1 Adult')}</option>
        <option value="2" selected>{tr(locale, '2 Adults')}</option>
        <option value="3">{tr(locale, '3 Adults')}</option>
        <option value="4">{tr(locale, '4 Adults')}</option>
      </select>
    </label>
    <button type="submit" class="pr-button">{tr(locale, 'CHECK AVAILABILITY')}</button>
    <p class="pr-booking-note" aria-live="polite">{note}</p>
  </form>
</header>
