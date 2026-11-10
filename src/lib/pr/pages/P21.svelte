<script lang="ts">
  import { tr, type Locale } from '#lib/pr/i18n.ts';
  import Newsletter from '#lib/pr/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'figma-pr'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="884:8531" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/9203238de1f599aa3053.webp" alt={tr(locale, "The candlelit table at Moloka")} loading="eager" decoding="async" fetchpriority="high" width="2400" height="1603"></figure><div data-part="hero-copy"><p data-node-id="I884:8531;756:1065" data-part="eyebrow">{tr(locale, "Eating here · Moloka")}</p>
<h1 data-node-id="I884:8531;756:1066" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "[x] seats, [x] nights a week")}{:else}[x] seats,{' '}<br data-frame-break>[x] nights a week{/if}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="884:8532" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I884:8532;756:1501" data-part="eyebrow">{tr(locale, "The smaller room")}</p>
<p data-node-id="I884:8532;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "Moloka is the smaller room. [x] seats, [x] nights a week, and the cook does something more deliberate with it than the long table allows.")}</p>
<p data-part="paragraph" class="current-lede">{tr(locale, "It fills up. If you want to eat here, say so when you book your room.")}</p></div>
<div data-part="rate"><p data-node-id="I884:8532;756:1469" data-part="eyebrow">{tr(locale, "Reservations")}</p>
<h2 data-node-id="I884:8532;756:1470" class="c-heading" data-part="heading">{tr(locale, "[x] seats")}</h2>
<p data-node-id="I884:8532;756:1493" data-part="paragraph">{tr(locale, "[x] nights a week. It fills up, so say so when you book your room.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8532;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Reserve a table at Moloka — destination not supplied")}>{tr(locale, "Reserve a table at Moloka")}</button></div></div></section>
<section data-name="included" data-node-id="884:8533" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">{tr(locale, "seats")}</p>
<p data-part="paragraph">{tr(locale, "[x]")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "nights")}</p>
<p data-part="paragraph">{tr(locale, "[x] a week")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "courses")}</p>
<p data-part="paragraph">{tr(locale, "[x]")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "for guests")}</p>
<p data-part="paragraph">{tr(locale, "[Included or charged separately]")}</p></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="884:8534" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/9772fed083830cf825f9.webp" alt={tr(locale, "Arenal Volcano above the rainforest")} loading="lazy" decoding="async" width="1024" height="1536"></figure>
<div data-part="copy"><p data-node-id="" data-part="eyebrow">{tr(locale, "The format")}</p>
<h2 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "Something more deliberate")}</h2>
<p data-part="paragraph">{tr(locale, "The cook does something more deliberate with it than the long table allows. [Format, cuisine and courses to be confirmed.]")}</p>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Reserve a table at Moloka — destination not supplied")}>{tr(locale, "Reserve a table at Moloka")}</button></div></div></section>
<section data-name="Galery slider" data-node-id="884:8535" data-role="gallery" data-gallery="1" aria-label={tr(locale, "Moloka gallery")}><figure data-part="media" data-aspect="portrait"><img src="{base}/media/ddd3291674ff5c228219.webp" alt={tr(locale, "Moloka")} loading="lazy" decoding="async" data-gallery-image="" width="1800" height="2400"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open Moloka gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></figure></section>
<section data-name="Section - 50/50 text image" data-node-id="884:8536" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">{tr(locale, "The other room")}</p>
<h2 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "El Rancho is the main room and most dinners happen there.")}</h2>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "button — destination not supplied")}>{tr(locale, "button")}</button><button data-name="Link arrow button" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Button — destination not supplied")}>{tr(locale, "Button")}</button></div></div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/3e390fdd0c298aaed49e.webp" alt={tr(locale, "El Rancho open to the volcano")} loading="lazy" decoding="async" width="1800" height="2400"></figure></section>
<Newsletter pageIndex={21} {locale} />

