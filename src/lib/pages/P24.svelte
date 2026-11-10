<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  import Newsletter from '#lib/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'blueprint' | 'figma'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="884:9224" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/698de65973782acf1018.webp" alt={tr(locale, "A company at a long table")} loading="eager" decoding="async" fetchpriority="high" width="2400" height="1800"></figure><div data-part="hero-copy"><p data-node-id="I884:9224;756:1065" data-part="eyebrow">{tr(locale, "Groups and offsites")}</p>
<h1 data-node-id="I884:9224;756:1066" class="c-heading" data-part="heading">{tr(locale, "For companies that have had enough of hotel ballrooms")}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="884:9225" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I884:9225;756:1501" data-part="eyebrow">{tr(locale, "Groups")}</p>
<p data-node-id="I884:9225;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "The Hearth seats [x]. The Dome holds [x] sitting on the floor. There is wifi that works, [x] Mbps, and a studio you can record in. There is also no road noise, no lobby, and nowhere for anyone to slip off to, which is either the point or the problem depending on your team.")}</p></div>
<div data-part="rate"><p data-node-id="I884:9225;756:1469" data-part="eyebrow">{tr(locale, "What it costs")}</p>
<h2 data-node-id="I884:9225;756:1470" class="c-heading" data-part="heading">{tr(locale, "[x] per person per night")}</h2>
<p data-node-id="I884:9225;756:1493" data-part="paragraph">{tr(locale, "Full property, meals included. Minimums as for buyouts.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:9225;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Enquire about a group booking — destination not supplied")}>{tr(locale, "Enquire about a group booking")}</button></div></div></section>
<section data-name="included" data-node-id="884:9226" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">{tr(locale, "the hearth seats")}</p>
<p data-part="paragraph">{tr(locale, "[x]")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "wifi")}</p>
<p data-part="paragraph">{tr(locale, "[x]")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "the dome holds")}</p>
<p data-part="paragraph">{tr(locale, "[x] on the floor")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "studio")}</p>
<p data-part="paragraph">{tr(locale, "You can record in it")}</p></div><div data-part="fact"><p data-part="eyebrow">{tr(locale, "typical stay")}</p>
<p data-part="paragraph">{tr(locale, "Two to four nights")}</p></div></div></section>
<section data-name="Hero text only" data-node-id="884:9227" data-role="text-hero"><div data-part="copy"><p data-node-id="I884:9227;764:945" data-part="eyebrow">{tr(locale, "What works here")}</p>
<h2 data-node-id="I884:9227;764:946" class="c-heading" data-part="heading">{tr(locale, "Small groups, whole teams, and the meeting nobody can take a call during")}</h2></div></section>
<section data-name="Card Grid" data-node-id="884:9228" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/c8e7a63f6a9d3455b6a5.webp" alt={tr(locale, "Small leadership groups")} loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "Small leadership groups")}</h3>
<p data-part="paragraph">{tr(locale, "[x] to [x] people, two to four nights.")}</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/ddbb64fa02c3c4d81b0f.webp" alt={tr(locale, "Teams of up to [x]")} loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "Teams of up to [x]")}</h3>
<p data-part="paragraph">{tr(locale, "With everyone on property.")}</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/fb2fb92538ca4c2ce0c1.webp" alt={tr(locale, "Board meetings")} loading="lazy" decoding="async" width="2400" height="1350"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "Board meetings")}</h3>
<p data-part="paragraph">{#if locale === 'es'}{tr(locale, "When you want the thing nobody can take a call during.")}{:else}When you want the thing nobody{' '}<br data-frame-break>can take a call during.{/if}</p></div></article></div></section>
<section data-name="Section - 50/50 image text" data-node-id="884:9229" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/4ad66969f390a0230045.webp" alt={tr(locale, "Two people working at a laptop")} loading="lazy" decoding="async" width="2400" height="1600"></figure>
<div data-part="copy"><p data-node-id="" data-part="eyebrow">{tr(locale, "Work, or the opposite of work")}</p>
<h2 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "We can build the days around work, or around the opposite of work, or split them. Tell us which.")}</h2>
<p data-part="paragraph">{tr(locale, "Company, dates, headcount, and whether the days are built around work, the opposite of work, or split.")}</p>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Enquire about a group booking — destination not supplied")}>{tr(locale, "Enquire about a group booking")}</button></div></div></section>
<section data-name="Galery slider" data-node-id="884:9230" data-role="gallery" data-gallery="1" aria-label={tr(locale, "Groups and offsites gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/af02d341fc274ea152ee.webp" alt={tr(locale, "Groups and offsites")} loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1350"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open Groups and offsites gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></figure></section>
<Newsletter pageIndex={24} {locale} />

