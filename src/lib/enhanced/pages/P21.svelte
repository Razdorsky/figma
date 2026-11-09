<script lang="ts">
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '' }: { edition: 'figma-enhanced'; base?: string } = $props();
</script>

<div class="rise" data-rise><section data-name="Hero Section" data-node-id="884:8531" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/9203238de1f599aa3053.webp" srcset="{base}/enhanced/photos/9203238de1f599aa3053-800.webp 800w, {base}/enhanced/photos/9203238de1f599aa3053-1200.webp 1200w, {base}/enhanced/photos/9203238de1f599aa3053-1600.webp 1600w, {base}/media/9203238de1f599aa3053.webp 2400w" sizes="(max-width: 599px) 319vw, (max-width: 767px) 191vw, (max-width: 1023px) 121vw, 100vw" alt="The candlelit table at Moloka" loading="eager" decoding="async" fetchpriority="high" width="2400" height="1603"></figure><div data-part="hero-copy"><p data-node-id="I884:8531;756:1065" data-part="eyebrow">Eating here · Moloka</p>
<h1 data-node-id="I884:8531;756:1066" class="c-heading" data-part="heading">[x] seats,{' '}[x] nights a week</h1></div></section>
<section data-name="Description and info 60/40" data-rise-panel data-node-id="884:8532" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I884:8532;756:1501" data-part="eyebrow">The smaller room</p>
<p data-node-id="I884:8532;756:1467" data-part="paragraph" class="current-lede">Moloka is the smaller room. [x] seats, [x] nights a week, and the cook does something more deliberate with it than the long table allows.</p>
<p data-part="paragraph" class="current-lede">It fills up. If you want to eat here, say so when you book your room.</p></div>
<div data-part="rate"><p data-node-id="I884:8532;756:1469" data-part="eyebrow">Reservations</p>
<h2 data-node-id="I884:8532;756:1470" class="c-heading" data-part="heading">[x] seats</h2>
<p data-node-id="I884:8532;756:1493" data-part="paragraph">[x] nights a week. It fills up, so say so when you book your room.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8532;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Reserve a table at Moloka — destination not supplied">Reserve a table at Moloka</button></div></div></section></div>
<section data-name="included" data-node-id="884:8533" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">seats</p>
<p data-part="paragraph">[x]</p></div><div data-part="fact"><p data-part="eyebrow">nights</p>
<p data-part="paragraph">[x] a week</p></div><div data-part="fact"><p data-part="eyebrow">courses</p>
<p data-part="paragraph">[x]</p></div><div data-part="fact"><p data-part="eyebrow">for guests</p>
<p data-part="paragraph">[Included or charged separately]</p></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="884:8534" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/9772fed083830cf825f9.webp" srcset="{base}/enhanced/photos/9772fed083830cf825f9-800.webp 800w, {base}/media/9772fed083830cf825f9.webp 1024w" sizes="(max-width: 767px) 89vw, (max-width: 1919px) 44vw, 824px" alt="Arenal Volcano above the rainforest and the infinity pool" loading="lazy" decoding="async" width="1024" height="1536"></figure>
<div data-part="copy"><p data-node-id="" data-part="eyebrow">The format</p>
<h2 data-node-id="" class="c-heading" data-part="heading">Something more deliberate</h2>
<p data-part="paragraph">The cook does something more deliberate with it than the long table allows. [Format, cuisine and courses to be confirmed.]</p>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Reserve a table at Moloka — destination not supplied">Reserve a table at Moloka</button></div></div></section>
<section data-name="Galery slider" data-node-id="884:8535" data-role="gallery" data-gallery="1" aria-label="Moloka gallery"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/ddd3291674ff5c228219.webp" srcset="{base}/enhanced/photos/ddd3291674ff5c228219-800.webp 800w, {base}/enhanced/photos/ddd3291674ff5c228219-1200.webp 1200w, {base}/enhanced/photos/ddd3291674ff5c228219-1600.webp 1600w, {base}/media/ddd3291674ff5c228219.webp 1800w" sizes="100vw" alt="A dinner menu on a plate in violet light" loading="lazy" decoding="async" data-gallery-image="" width="1800" height="2400"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label="Open Moloka gallery"></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button></figure></section>
<section data-name="Section - 50/50 text image" data-node-id="884:8536" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">The other room</p>
<h2 data-node-id="" class="c-heading" data-part="heading">El Rancho is the main room and most dinners happen there.</h2>
</div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/3e390fdd0c298aaed49e.webp" srcset="{base}/enhanced/photos/3e390fdd0c298aaed49e-800.webp 800w, {base}/enhanced/photos/3e390fdd0c298aaed49e-1200.webp 1200w, {base}/enhanced/photos/3e390fdd0c298aaed49e-1600.webp 1600w, {base}/media/3e390fdd0c298aaed49e.webp 1800w" sizes="(max-width: 767px) 89vw, (max-width: 1919px) 44vw, 824px" alt="El Rancho's tables, open to Arenal Volcano" loading="lazy" decoding="async" width="1800" height="2400"></figure></section>
<Next pageIndex={21} />
<Newsletter pageIndex={21} />

