<script lang="ts">
  import { tr, type Locale } from '#lib/pr/i18n.ts';
  import Newsletter from '#lib/pr/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'figma-pr'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="814:7326" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape" data-film-box><img data-clip-frame src="{base}/bp/video/loop-evening.webp" alt={tr(locale, "For Two")} loading="eager" decoding="async" fetchpriority="high" width="1600" height="900"><video data-loop muted loop playsinline preload="auto" poster="{base}/bp/video/loop-evening.webp" aria-hidden="true" tabindex="-1"><source media="(max-width: 767px)" src="{base}/bp/video/loop-evening-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-evening.mp4" type="video/mp4"></video></figure><div data-part="hero-copy"><p data-node-id="I814:7326;756:1065" data-part="eyebrow">{tr(locale, "For two")}</p>
<h1 data-node-id="I814:7326;756:1066" class="c-heading" data-part="heading">{tr(locale, "An evening built for two people and nobody else")}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="814:7327" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I814:7327;756:1501" data-part="eyebrow">{tr(locale, "About the experience")}</p>
<p data-part="paragraph">{tr(locale, "A private session in the Dome, just the two of you and whoever is running it. Then dinner, [where and how it is set]. Then [inclusion].")}</p>
<p data-part="paragraph">{tr(locale, "It is not a spa package and there are no rose petals. It is a few hours where nobody needs anything from you, in a place where the loudest thing is the forest.")}</p></div>
<div data-part="rate"><p data-node-id="I814:7327;756:1469" data-part="eyebrow">{tr(locale, "price")}</p>
<h2 data-node-id="I814:7327;756:1470" class="c-heading" data-part="heading">{tr(locale, "[Price] for two")}</h2>
<p data-node-id="I814:7327;756:1493" data-part="paragraph">{tr(locale, "Dinner, the session and [inclusions] are included.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7327;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book for two — destination not supplied")}>{tr(locale, "book for two")}</button></div></div></section>
<section data-name="3 col info" data-node-id="803:3070" data-role="facts"><div data-part="facts"><div data-part="fact"><h3 data-node-id="803:3033" class="c-heading" data-part="heading">{tr(locale, "Dusk")}</h3>
<p data-node-id="803:3036" data-part="paragraph" class="current-lede">{tr(locale, "You arrive as the light goes.")}</p></div><div data-part="fact"><h3 data-node-id="803:3052" class="c-heading" data-part="heading">{tr(locale, "Dinner")}</h3>
<p data-node-id="803:3053" data-part="paragraph" class="current-lede">{tr(locale, "Dinner is included.")}</p></div><div data-part="fact"><h3 data-node-id="803:3055" class="c-heading" data-part="heading">{tr(locale, "The Dome")}</h3>
<p data-node-id="803:3056" data-part="paragraph" class="current-lede">{tr(locale, "A private session in the Dome, just the two of you.")}</p></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="814:7329" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/c9f36f747db728e9734c.webp" alt={tr(locale, "For Two")} loading="lazy" decoding="async" width="1600" height="2400"></figure>
<div data-part="copy"><p data-node-id="I814:7329;750:1885;748:551" data-part="eyebrow">{tr(locale, "just for two")}</p>
<h2 data-node-id="I814:7329;750:1885;748:552" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "A private session in the Dome,")}{:else}A private session{' '}<br data-frame-break>in the Dome,{/if}</h2>
<p data-part="paragraph">{tr(locale, "A private session in the Dome, just the two of you and whoever is running it. Then dinner, [where and how it is set]. Then [inclusion].")}</p></div></section>
<section data-name="Section - 50/50 text image" data-node-id="814:7330" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="I814:7330;748:575;748:551" data-part="eyebrow">{tr(locale, "the vessyl experience")}</p>
<h2 data-node-id="I814:7330;748:575;748:552" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "The loudest thing is the forest.")}{:else}The loudest thing{' '}<br data-frame-break>is the forest.{/if}</h2>
<p data-node-id="I814:7330;748:575;748:553" data-part="paragraph">{tr(locale, "It is not a spa package and there are no rose petals. It is a few hours where nobody needs anything from you, in a place where the loudest thing is the forest.")}</p></div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/1bf880cdd11cd773b398.webp" alt={tr(locale, "For Two")} loading="lazy" decoding="async" width="1897" height="2400"></figure></section>
<section data-name="Heading title" data-node-id="814:7331" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:7331;768:1391" class="c-heading" data-part="heading">{tr(locale, "If you are proposing, tell us when you book. We will not announce anything or bring out a cake. We will just make sure the room is right and that nobody walks through.")}</h2>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7331;805:3718;750:1257" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book for two — destination not supplied")}>{tr(locale, "book for two")}</button></div></div></section>
<section data-name="Price and offers" data-node-id="755:607" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Room Card" data-node-id="812:5263"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/90e7a43ef89cdaa5b7f6.webp" alt={tr(locale, "The Villas")} loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="I812:5263;750:2528" class="c-heading" data-part="heading">{tr(locale, "The Villas")}</h3>
<p data-node-id="I812:5263;764:1128" data-part="highlight">{tr(locale, "From [rate] a night")}</p>
<p data-node-id="I812:5263;750:2529" data-part="paragraph">{tr(locale, "Sleeps [x]. Walls, a door that shuts, the most space and the most shelter when it rains.")}</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5263;750:2535" class="current-action" data-part="action" href="{base}/{edition}/{lp}villas/">{tr(locale, "See the villas")}</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="812:5355"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/38bd44acd09f7a1caa67.webp" alt={tr(locale, "The Treehouse")} loading="lazy" decoding="async" width="1800" height="2400"></figure><div data-part="copy"><h3 data-node-id="I812:5355;750:2528" class="c-heading" data-part="heading">{tr(locale, "The Treehouse")}</h3>
<p data-node-id="I812:5355;764:1128" data-part="highlight">{tr(locale, "From [rate] a night")}</p>
<p data-node-id="I812:5355;750:2529" data-part="paragraph">{tr(locale, "Sleeps [x]. One unit, built up into the canopy. It books out first, every season.")}</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5355;750:2535" class="current-action" data-part="action" href="{base}/{edition}/{lp}treehouse/">{tr(locale, "See the treehouse")}</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="812:5639"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/1cf43cba02fcc0f90ae8.webp" alt={tr(locale, "Glamping Tents")} loading="lazy" decoding="async" width="2400" height="1410"></figure><div data-part="copy"><h3 data-node-id="I812:5639;750:2528" class="c-heading" data-part="heading">{tr(locale, "Glamping Tents")}</h3>
<p data-node-id="I812:5639;764:1128" data-part="highlight">{tr(locale, "From [rate] a night")}</p>
<p data-node-id="I812:5639;750:2529" data-part="paragraph">{tr(locale, "Sleeps [x]. Canvas, a real bed, a private bathroom, forest on three sides.")}</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5639;750:2535" class="current-action" data-part="action" href="{base}/{edition}/{lp}glamping-tents/">{tr(locale, "See the glamping tents")}</a></div></div></article></div></section>
<Newsletter pageIndex={11} {locale} />
