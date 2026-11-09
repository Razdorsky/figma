<script lang="ts">
  // Figma PR header (docs/figma-pr-system.md, "Header"): Rosewood's tiers on paper — a utility row with the wordmark in
  // the middle, then the navigation row that sticks, ending in the green reserve button. The words are the frame's
  // header and menu words. The booking panel is Four Seasons' booking bar: dates and guests open Orbe's results.
  import { booking, bookingFor, pages, photo, route } from '#lib/pr/site.ts';

  type Props = {
    edition: 'figma-pr';
    page: { index: number; slug: string; name: string; photo: boolean };
    base?: string;
  };

  let { edition, page, base = '' }: Props = $props();

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
    if (!checkIn || !checkOut || checkOut <= checkIn) { note = 'Choose a check-out date after the check-in date.'; return; }
    note = '';
    window.open(bookingFor(checkIn, checkOut, Number(data.get('adults') || 2)), '_blank', 'noopener');
  }
  // The frame's two menus: Stay (pages 2–6) and Experiences (pages 7–13).
  const groups = [
    { id: 'stay', title: 'Stay', list: pages.slice(1, 6) },
    { id: 'experiences', title: 'Experiences', list: [pages[6], ...pages.slice(7, 13)] }
  ];
</script>

<header class="site-header pr-header" data-pr-header>
  <div class="pr-utility">
    <button type="button" class="pr-utility-link language-trigger" data-language-trigger aria-label="Language: English"><span>EN | ES</span></button>
    <a class="pr-brand" href={route(edition, '', base)} aria-label="Vessyl home">
      <img src={asset('/brand/logo-dark.svg')} width="210" height="39" alt="VESSYL" />
    </a>
    <a class="pr-utility-link" href={booking} target="_blank" rel="noopener noreferrer">CHECK AVAILABILITY</a>
  </div>
  <div class="pr-nav-row">
    <button type="button" class="pr-menu-toggle menu-toggle" data-menu-open aria-expanded="false" aria-haspopup="dialog" aria-controls="site-menu">
      <span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="pr-menu-label">MENU</span>
    </button>
    <a class="pr-brand pr-brand-compact" href={route(edition, '', base)} aria-label="Vessyl home">
      <img src={asset('/brand/logo-dark.svg')} width="150" height="28" alt="VESSYL" />
    </a>
    <nav class="pr-nav" aria-label="Main navigation">
      {#each groups as group (group.id)}
        <details class="nav-group pr-nav-group">
          <summary class="nav-trigger">{group.title}</summary>
          <div class="mega-menu pr-mega">
            <a class="mega-overview" href={route(edition, group.list[0].slug, base)}><span>Overview ↗</span></a>
            <div class="pr-mega-cards">
              {#each group.list.slice(1) as item (item.index)}
                <a class="pr-mega-card" href={route(edition, item.slug, base)}>
                  <span class="pr-mega-image"><img data-src={asset(photo(item.index))} alt={item.name} decoding="async" /></span>
                  <span class="pr-mega-name">{item.name}</span>
                </a>
              {/each}
            </div>
          </div>
        </details>
      {/each}
      <a class="pr-nav-link" href={route(edition, 'rates-and-offers', base)}>Rates &amp; offers</a>
    </nav>
    <button type="button" class="pr-reserve" data-booking-open aria-expanded="false" aria-controls="pr-booking">CHECK AVAILABILITY</button>
  </div>
  <form class="pr-booking" id="pr-booking" data-booking hidden onsubmit={submitBooking}>
    <label class="pr-field"><span>Check in</span><input type="date" name="checkin" required /></label>
    <label class="pr-field"><span>Check out</span><input type="date" name="checkout" required /></label>
    <label class="pr-field"><span>Guests</span>
      <select name="adults">
        <option value="1">1 Adult</option>
        <option value="2" selected>2 Adults</option>
        <option value="3">3 Adults</option>
        <option value="4">4 Adults</option>
      </select>
    </label>
    <button type="submit" class="pr-button">CHECK AVAILABILITY</button>
    <p class="pr-booking-note" aria-live="polite">{note}</p>
  </form>
</header>
