<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  import Newsletter from '#lib/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'blueprint' | 'figma'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero Section" data-node-id="884:8988" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/d9f40ebd73fab0a92370.webp" alt={tr(locale, "A group lying on mats in the Dome")} loading="eager" decoding="async" fetchpriority="high" width="2400" height="1629"></figure><div data-part="hero-copy"><p data-node-id="I884:8988;756:1065" data-part="eyebrow">{tr(locale, "Retreats")}</p>
<h1 data-node-id="I884:8988;756:1066" class="c-heading" data-part="heading">{tr(locale, "Bring your people, use our dome")}</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="884:8989" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I884:8989;756:1501" data-part="eyebrow">{tr(locale, "make your Retreats")}</p>
<p data-node-id="I884:8989;756:1467" data-part="paragraph" class="current-lede">{tr(locale, "Facilitators run retreats here because the Dome does something a hotel conference room cannot, and because the property is small enough that the group is not sharing it with strangers.")}</p></div>
<div data-part="rate"><p data-node-id="I884:8989;756:1469" data-part="eyebrow">{tr(locale, "What it costs")}</p>
<h2 data-node-id="I884:8989;756:1470" class="c-heading" data-part="heading">{tr(locale, "[x] per person per night")}</h2>
<p data-node-id="I884:8989;756:1493" data-part="paragraph">{tr(locale, "For the full property, all meals included, with a [x]-night minimum and a [x]-person minimum. Deposit is [x] percent at booking, balance [x] days out.")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8989;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Enquire about a retreat — destination not supplied")}>{tr(locale, "Enquire about a retreat")}</button></div></div></section>
<section data-name="Hero text only" data-node-id="884:8990" data-role="text-hero"><div data-part="copy"><p data-node-id="I884:8990;764:945" data-part="eyebrow">{tr(locale, "What you get")}</p>
<h2 data-node-id="I884:8990;764:946" class="c-heading" data-part="heading">{tr(locale, "The Dome on your schedule, and everything around it")}</h2></div></section>
<section data-name="3 col info" data-node-id="884:8991" data-role="facts"><div data-part="facts"><div data-part="fact"><h3 data-node-id="I884:8991;0" class="c-heading" data-part="heading">{tr(locale, "The Dome")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "For your sessions, on your schedule.")}</p></div><div data-part="fact"><h3 data-node-id="I884:8991;1" class="c-heading" data-part="heading">{tr(locale, "Fourteen units")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "Sleeping [x].")}</p></div><div data-part="fact"><h3 data-node-id="I884:8991;2" class="c-heading" data-part="heading">{tr(locale, "The Hearth")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "For meals and for the parts of a retreat that happen around a fire rather than in a room.")}</p></div></div></section>
<section data-name="3 col info" data-node-id="884:8992" data-role="facts"><div data-part="facts"><div data-part="fact"><h3 data-node-id="I884:8992;0" class="c-heading" data-part="heading">{tr(locale, "The kitchen")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "Working to your plan, including however you want to handle fasting, dietary protocols or late meals.")}</p></div><div data-part="fact"><h3 data-node-id="I884:8992;1" class="c-heading" data-part="heading">{tr(locale, "Our facilitators")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "Available if you want them and out of the way if you do not.")}</p></div><div data-part="fact"><h3 data-node-id="I884:8992;2" class="c-heading" data-part="heading">{tr(locale, "Airport transfers")}</h3>
<p data-part="paragraph" class="current-lede">{tr(locale, "From Liberia or San José, arranged.")}</p></div></div></section>
<section data-name="Galery slider" data-node-id="884:8993" data-role="gallery" data-gallery="1" aria-label={tr(locale, "Retreats gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/c772a2b9229d783c42f1.webp" alt={tr(locale, "Retreats")} loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1800"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open Retreats gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></figure></section>
<section data-name="Section - 50/50 text image" data-node-id="884:8994" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">{tr(locale, "What we need from you")}</p>
<h2 data-node-id="" class="c-heading" data-part="heading">{tr(locale, "Dates, headcount, and what your days look like")}</h2>
<p data-part="paragraph">{tr(locale, "Whether you are bringing your own facilitators or using ours. Whether you need the recording studio. Whether anything in your programme involves [x], because there are some things we host and some things we do not, and we will tell you straight away rather than three months in.")}</p>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Enquire about a retreat — destination not supplied")}>{tr(locale, "Enquire about a retreat")}</button><button data-name="Link arrow button" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "Button — destination not supplied")}>{tr(locale, "Button")}</button></div></div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/9772fed083830cf825f9.webp" alt={tr(locale, "Arenal Volcano above the rainforest")} loading="lazy" decoding="async" width="1024" height="1536"></figure></section>
<section data-name="Hero text only" data-node-id="884:8995" data-role="text-hero"><div data-part="copy"><p data-node-id="I884:8995;764:945" data-part="eyebrow">{tr(locale, "Retreats already on the calendar")}</p>
<h2 data-node-id="I884:8995;764:946" class="c-heading" data-part="heading">{tr(locale, "Open retreats")}</h2>
<p data-node-id="I884:8995;764:948" data-part="paragraph" class="current-lede">{tr(locale, "Some retreats here are open to anyone who wants to join, not just to a facilitator's existing group. Those are listed with dates, prices and who is running them.")}</p></div></section>
<section data-name="Table" data-node-id="884:8996" data-role="events"><article data-part="event"><p data-node-id="I884:8996;814:10245" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="I884:8996;814:10246" data-part="paragraph">{tr(locale, "[Retreat name]")}</p>
<p data-node-id="I884:8996;814:10247" data-part="paragraph">{tr(locale, "[Who is running it, one line]")}</p>
<p data-node-id="I884:8996;814:10248" data-part="paragraph">{tr(locale, "[Price]")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8996;814:10259" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "details — destination not supplied")}>{tr(locale, "details")}</button></div></article>
<article data-part="event"><p data-node-id="I884:8996;814:10263" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="I884:8996;814:10264" data-part="paragraph">{tr(locale, "[Retreat name]")}</p>
<p data-node-id="I884:8996;814:10265" data-part="paragraph">{tr(locale, "[Who is running it, one line]")}</p>
<p data-node-id="I884:8996;814:10266" data-part="paragraph">{tr(locale, "[Price]")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8996;814:10267" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "details — destination not supplied")}>{tr(locale, "details")}</button></div></article></section>
<Newsletter pageIndex={23} {locale} />

