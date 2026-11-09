<script lang="ts">
  import { tr, type Locale } from '#lib/enhanced/i18n.ts';
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'figma-enhanced'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero text only" data-node-id="814:10150" data-role="photo-hero" data-hero="arch"><div data-part="arch-stage"><div data-part="hero-copy"><p data-node-id="I814:10150;764:945" data-part="eyebrow">{tr(locale, "The Vessyl Presents")}</p>
<h1 data-node-id="I814:10150;764:946" class="c-heading" data-part="heading">{tr(locale, "Whoever is playing, in the best room we have")}</h1>
<p data-node-id="I814:10150;764:948" data-part="paragraph" class="current-lede">{tr(locale, "Musicians, films, talks, and nights that do not have a name yet. The Dome is a good room, so people say yes to playing in it, and the audience is [x] people sitting on the floor rather than four hundred standing in the dark.")}</p></div><div data-part="arch" data-film-box style="--fx: 46"><div data-part="arch-media" role="img" aria-label={tr(locale, "A violinist playing in the Dome under blue light")}><video data-film muted loop playsinline preload="auto" poster="{base}/bp/video/loop-presents.webp" data-full="{base}/bp/video/film-events.mp4" aria-hidden="true" tabindex="-1"><source media="(max-width: 767px)" src="{base}/bp/video/loop-presents-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-presents.mp4" type="video/mp4"></video></div><button type="button" class="film-play" data-film-play aria-label={tr(locale, "Watch the Vessyl events film from the start, with sound")}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor"/></svg><span>{tr(locale, "Watch the film")}</span></button><div class="film-controls" data-film-controls hidden><button type="button" data-film-toggle aria-label={tr(locale, "Pause the film")}><svg class="icon-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor"/></svg><svg class="icon-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor"/></svg></button><button type="button" data-film-mute aria-label={tr(locale, "Mute the film")}><svg class="icon-sound" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" stroke-width="1.2"/></svg><svg class="icon-muted" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 6l3.5 4M14.5 6L11 10" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></button></div></div></div></section>
<section data-name="Table" data-node-id="862:15584" data-role="events"><h2 data-node-id="814:10234" class="c-heading" data-part="heading">{tr(locale, "What is coming up")}</h2>
<article data-part="event"><p data-node-id="814:10245" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10246" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10247" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10248" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10259" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10263" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10264" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10265" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10266" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10267" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10270" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10271" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10272" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10273" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10274" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10277" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10278" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10279" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10280" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10281" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article></section>
<Next pageIndex={13} {locale} />
<Newsletter pageIndex={13} {locale} />
<section data-name="Heading title" data-node-id="814:9962" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:9962;768:1391" class="c-heading" data-part="heading">{tr(locale, "If you make something and you want to make it here, write to [address]. We have [what we can offer: the room, the system, somewhere to sleep], and we are interested.")}</h2></div></section>
<section data-name="Galery slider" data-node-id="814:10383" data-role="gallery" data-gallery="1" aria-label={tr(locale, "The Vessyl Presents gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/df44479df6d2cfd7b1f9.webp" srcset="{base}/enhanced/photos/df44479df6d2cfd7b1f9-800.webp 800w, {base}/enhanced/photos/df44479df6d2cfd7b1f9-1200.webp 1200w, {base}/enhanced/photos/df44479df6d2cfd7b1f9-1600.webp 1600w, {base}/media/df44479df6d2cfd7b1f9.webp 2400w" sizes="(max-width: 767px) 113vw, 100vw" alt={tr(locale, "A musician playing a handpan by lamplight")} loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1600"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open The Vessyl Presents gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button></figure></section>
