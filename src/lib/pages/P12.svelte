<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  import Newsletter from '#lib/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'blueprint' | 'figma'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="814:7307" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/ea5d3eb36b2031e294f0.webp" alt={tr(locale, "Horses and the River")} loading="eager" decoding="async" fetchpriority="high" width="2400" height="1458"></figure><div data-part="hero-copy"><p data-node-id="I814:7307;756:1065" data-part="eyebrow">{tr(locale, "Horses and the River")}</p>
<h1 data-node-id="I814:7307;756:1066" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "[x] hours on the land, at the two hours that are worth getting up for")}{:else}[x] hours on the land, at the two hours{' '}<br data-frame-break>that are worth getting up for{/if}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="814:7308" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I814:7308;756:1501" data-part="eyebrow">{tr(locale, "About the ride")}</p>
<p data-node-id="I814:7308;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "You ride out from the stables across the property and down toward the river. [What the route covers: the pasture, the forest edge, the water crossing, the view back up to the Dome.] [Name], who has worked this land for [x] years, rides with you and will tell you what you are looking at if you ask.")}</p></div>
<div data-part="rate"><p data-node-id="I814:7308;756:1469" data-part="eyebrow">{tr(locale, "price")}</p>
<h2 data-node-id="I814:7308;756:1470" class="c-heading" data-part="heading">{tr(locale, "[price] a person")}</h2>
<p data-node-id="I814:7308;756:1493" data-part="paragraph">{tr(locale, "[price] for guests staying with us.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7308;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book a ride — destination not supplied")}>{tr(locale, "book a ride")}</button></div></div></section>
<section data-name="included" data-node-id="814:7309" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-node-id="I814:7309;804:3094" data-part="eyebrow">{tr(locale, "riders")}</p>
<p data-node-id="I814:7309;804:3095" data-part="paragraph">{tr(locale, "[x] maximum")}</p></div><div data-part="fact"><p data-node-id="I814:7309;804:3155" data-part="eyebrow">{tr(locale, "duration")}</p>
<p data-node-id="I814:7309;804:3156" data-part="paragraph">{tr(locale, "[X] hours")}</p></div><div data-part="fact"><p data-node-id="I814:7309;804:3161" data-part="eyebrow">{tr(locale, "first light")}</p>
<p data-node-id="I814:7309;804:3162" data-part="paragraph">{tr(locale, "[Time]")}</p></div><div data-part="fact"><p data-node-id="I814:7309;804:3164" data-part="eyebrow">{tr(locale, "late afternoon")}</p>
<p data-node-id="I814:7309;804:3165" data-part="paragraph">{tr(locale, "[Time]")}</p></div><div data-part="fact"><p data-node-id="I814:7309;804:3167" data-part="eyebrow">{tr(locale, "weight limit")}</p>
<p data-node-id="I814:7309;804:3168" data-part="paragraph">{tr(locale, "[X]")}</p></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="814:7310" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/bb39a8510ce86bcd65fd.webp" alt={tr(locale, "Horses and the River")} loading="lazy" decoding="async" width="2400" height="1350"></figure>
<div data-part="copy"><p data-node-id="I814:7310;750:1885;748:551" data-part="eyebrow">{tr(locale, "our horses")}</p>
<h2 data-node-id="I814:7310;750:1885;748:552" class="c-heading" data-part="heading">{tr(locale, "A bond.")}</h2>
<p data-part="paragraph">{tr(locale, "The horses are [description: breed, temperament, how they are kept]. Beginners are fine. If you have never been on a horse, say so when you book and we will put you on [the horse] and keep the pace slow.")}</p></div></section>
<section data-name="Heading title" data-node-id="814:7311" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:7311;768:1391" class="c-heading" data-part="heading">{tr(locale, "Long trousers and closed shoes. Helmets are here. If it has rained hard, [what changes about the route].")}</h2>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7311;805:3718;750:1257" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book a ride — destination not supplied")}>{tr(locale, "book a ride")}</button></div></div></section>
<section data-name="Galery slider" data-node-id="814:7312" data-role="gallery" data-gallery="1" aria-label={tr(locale, "Horses and the River gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/55161e7692315fc7eac4.webp" alt={tr(locale, "Horses and the River")} loading="lazy" decoding="async" data-gallery-image="" width="1800" height="2400">{#if edition === 'figma'}<button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open Horses and the River gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>{:else}<button type="button" data-gallery-open="" data-part="gallery-open" aria-label={tr(locale, "Open Horses and the River gallery")}>{tr(locale, "View gallery")}</button>{/if}</figure></section>
<Newsletter pageIndex={12} {locale} />
