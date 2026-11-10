<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  import Newsletter from '#lib/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'blueprint' | 'figma'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="944:7744" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/21ac2d49d2ab56699e04.webp" alt={tr(locale, "Arenal Volcano above the rainforest")} loading="eager" decoding="async" fetchpriority="high" width="2400" height="1668"></figure><div data-part="hero-copy"><p data-node-id="I944:7744;756:1065" data-part="eyebrow">{tr(locale, "Plan your visit")}</p>
<h1 data-node-id="I944:7744;756:1066" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "Where you actually are")}{:else}Where you{' '}<br data-frame-break>actually are{/if}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="944:7745" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I944:7745;756:1501" data-part="eyebrow">{tr(locale, "Arenal")}</p>
<p data-node-id="I944:7745;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "The property sits on a ridge above a river outside La Fortuna, in the Arenal area of northern Costa Rica. The volcano is [x] minutes away. The town is [x] minutes down the hill, and it has a bank, a supermarket, a hospital and about forty tour operators.")}</p>
<p data-part="paragraph" class="current-lede">{tr(locale, "You are [x] hours from San José and [x] hours from Liberia.")}</p>
<p data-part="paragraph" class="current-lede">{tr(locale, "What that means in practice: you are far enough out that there is no traffic noise and the birds wake you up, and close enough in that you can be at a hot spring or on a hanging bridge within half an hour of deciding to.")}</p></div>
<div data-part="rate"><p data-node-id="I944:7745;756:1469" data-part="eyebrow">{tr(locale, "Getting here")}</p>
<h2 data-node-id="I944:7745;756:1470" class="c-heading" data-part="heading">{tr(locale, "[x] hours from Liberia")}</h2>
<p data-node-id="I944:7745;756:1493" data-part="paragraph">{tr(locale, "[x] hours from San José, or fly Sansa into La Fortuna. We will send a driver.")}</p>
<div data-part="actions"><a data-name="CTA" data-node-id="I944:7745;756:1490" class="current-action" data-part="action" href="{base}/{edition}/{lp}getting-here/">{tr(locale, "Getting here")}</a></div></div></section>
<section data-name="included" data-node-id="944:7746" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">{tr(locale, "the volcano")}</p>
<p data-part="paragraph">{tr(locale, "[x] minutes")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "la fortuna")}</p>
<p data-part="paragraph">{tr(locale, "[x] minutes")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "liberia (LIR)")}</p>
<p data-part="paragraph">{tr(locale, "[x] minutes")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "san josé (sjo)")}</p>
<p data-part="paragraph">{tr(locale, "[x] minutes")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "hot springs")}</p>
<p data-part="paragraph">{tr(locale, "[x] minutes")}</p></div></div></section>
<section data-name="Galery slider" data-node-id="944:7747" data-role="gallery" data-gallery="1" aria-label={tr(locale, "Arenal gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/86c4e0468e78057c7107.webp" alt={tr(locale, "Arenal")} loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1350"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open Arenal gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></figure></section>
<section data-name="Hero text only" data-node-id="944:7748" data-role="text-hero"><div data-part="copy"><p data-node-id="I944:7748;764:945" data-part="eyebrow">{tr(locale, "How to get here, what there is to do, when to come")}</p>
<h2 data-node-id="I944:7748;764:946" class="c-heading" data-part="heading">{tr(locale, "A volcano, a lake, hot springs, waterfalls and a town at the foot of all of it")}</h2>
<p data-node-id="I944:7748;764:948" data-part="paragraph" class="current-lede">{tr(locale, "Booking here directly is always the cheapest way to stay, and it is the only way to add an experience or a table at dinner to the same reservation.")}</p></div></section>
<section data-name="Card Grid" data-node-id="944:7749" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/bc1c3e7f217cc52b0c86.webp" alt={tr(locale, "Getting here")} loading="lazy" decoding="async" width="1854" height="2400"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading"><a href="{base}/{edition}/{lp}getting-here/">{tr(locale, "Getting here")}</a></h3>
<p data-part="paragraph">{tr(locale, "Three hours by car from San José, two and a half from Liberia, or fly Sansa into La Fortuna. Directions and transfers.")}</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/25e06da67fc835171d54.webp" alt={tr(locale, "Things to do around here")} loading="lazy" decoding="async" width="1350" height="2400"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading"><a href="{base}/{edition}/{lp}things-to-do-around-here/">{tr(locale, "Things to do around here")}</a></h3>
<p data-part="paragraph">{tr(locale, "What is worth your time near La Fortuna, what is a tourist trap, and how long each one takes.")}</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/a32b1d05d2deb9142826.webp" alt={tr(locale, "When to come")} loading="lazy" decoding="async" width="2400" height="1350"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "When to come")}</h3>
<p data-part="paragraph">{tr(locale, "Month by month in Arenal: rain, heat, crowds and rates.")}</p></div></article></div></section>
<Newsletter pageIndex={26} {locale} />

