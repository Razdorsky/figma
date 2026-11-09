<script lang="ts">
  import { tr, type Locale } from '#lib/enhanced/i18n.ts';
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'figma-enhanced'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<div class="rise" data-rise><section data-name="Hero Section" data-node-id="814:7317" data-role="photo-hero" data-hero-text="glass"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/217d8eafeb5342a6cc73.webp" srcset="{base}/enhanced/photos/217d8eafeb5342a6cc73-800.webp 800w, {base}/enhanced/photos/217d8eafeb5342a6cc73-1200.webp 1200w, {base}/enhanced/photos/217d8eafeb5342a6cc73-1600.webp 1600w, {base}/media/217d8eafeb5342a6cc73.webp 1800w" sizes="(max-width: 599px) 160vw, 100vw" alt={tr(locale, "A long candlelit table under hanging lanterns")} loading="eager" decoding="async" fetchpriority="high" width="1800" height="2400"></figure><div data-part="hero-copy"><p data-node-id="I814:7317;756:1065" data-part="eyebrow">{tr(locale, "Arenal After Dark")}</p>
<h1 data-node-id="I814:7317;756:1066" class="c-heading" data-part="heading">{tr(locale, "The valley is better at night, and almost nobody sees it")}</h1></div></section>
<section data-name="Description and info 60/40" data-rise-panel data-node-id="814:7318" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I814:7318;756:1501" data-part="eyebrow">{tr(locale, "enjoy the evening")}</p>
<p data-node-id="I814:7318;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "You arrive as the light goes. [Inclusion: a walk, a drink, the land at dusk.] You eat what the kitchen cooked that day, at the long table. Then the Dome, lit from inside, and [what happens there that evening].")}</p></div>
<div data-part="rate"><p data-node-id="I814:7318;756:1469" data-part="eyebrow">{tr(locale, "price")}</p>
<h2 data-node-id="I814:7318;756:1470" class="c-heading" data-part="heading">{tr(locale, "[Price] a person")}</h2>
<p data-node-id="I814:7318;756:1493" data-part="paragraph">{tr(locale, "Transport from La Fortuna, [price] return, if you would rather not drive the road back down in the dark. We recommend this.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7318;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book an evening — destination not supplied")}>{tr(locale, "book an evening")}</button></div></div></section></div>
<section data-name="included" data-node-id="804:3169" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-node-id="804:3094" data-part="eyebrow">{tr(locale, "when")}</p>
<p data-node-id="804:3095" data-part="paragraph">{tr(locale, "[Start] to [end], [days]")}</p></div><div data-part="fact"><p data-node-id="804:3155" data-part="eyebrow">{tr(locale, "people")}</p>
<p data-node-id="804:3156" data-part="paragraph">{tr(locale, "[X]")}</p></div><div data-part="fact"><p data-node-id="804:3161" data-part="eyebrow">{tr(locale, "included")}</p>
<p data-part="paragraph">{tr(locale, "Dinner and [inclusions]")}</p></div><div data-part="fact"><p data-node-id="804:3164" data-part="eyebrow">{tr(locale, "drinks")}</p>
<p data-node-id="804:3165" data-part="paragraph">{tr(locale, "[Included or extra]")}</p></div><div data-part="fact"><p data-node-id="804:3167" data-part="eyebrow">{tr(locale, "transportation")}</p>
<p data-node-id="804:3168" data-part="paragraph">{tr(locale, "[Price] return from La Fortuna")}</p></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="814:7320" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-portal="arch" data-aspect="portrait"><img src="{base}/media/46c02cfc7ce0c5cd9c65.webp" srcset="{base}/enhanced/photos/46c02cfc7ce0c5cd9c65-800.webp 800w, {base}/enhanced/photos/46c02cfc7ce0c5cd9c65-1200.webp 1200w, {base}/enhanced/photos/46c02cfc7ce0c5cd9c65-1600.webp 1600w, {base}/media/46c02cfc7ce0c5cd9c65.webp 2400w" sizes="(max-width: 767px) 178vw, (max-width: 1919px) 74vw, 1393px" alt={tr(locale, "The Dome at night, lights strung along the path on the hill")} loading="lazy" decoding="async" width="2400" height="1502"></figure>
<div data-part="copy"><p data-node-id="I814:7320;750:1885;748:551" data-part="eyebrow">{tr(locale, "The dome")}</p>
<h2 data-node-id="I814:7320;750:1885;748:552" class="c-heading" data-part="heading">{tr(locale, "Lit from inside")}</h2>
<p data-part="paragraph">{tr(locale, "On a clear night the volcano is black against the sky and the valley below is a scatter of lights. On a cloudy night you hear more than you see, and that is its own thing.")}</p></div></section>
<section data-name="Heading title" data-node-id="814:7321" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:7321;768:1391" class="c-heading" data-part="heading">{tr(locale, "Bring a layer. It drops [x] degrees once the sun goes.")}</h2>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7321;805:3718;750:1257" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book an evening — destination not supplied")}>{tr(locale, "book an evening")}</button></div></div></section>
<Next pageIndex={10} {locale} />
<Newsletter pageIndex={10} {locale} />
