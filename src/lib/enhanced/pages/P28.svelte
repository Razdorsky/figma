<script lang="ts">
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '' }: { edition: 'figma-enhanced'; base?: string } = $props();
</script>

<div class="rise" data-rise><section data-name="Hero Section" data-node-id="965:7713" data-role="photo-hero" data-hero-text="glass"><figure data-part="hero-image" data-aspect="landscape"><img src="{base}/media/c497476865b545968151.webp" alt="Guests sitting on boulders in a rocky river" loading="eager" decoding="async" fetchpriority="high" width="2400" height="1350"></figure><div data-part="hero-copy"><p data-node-id="I965:7713;756:1065" data-part="eyebrow">Plan your visit</p>
<h1 data-node-id="I965:7713;756:1066" class="c-heading" data-part="heading">What is worth leaving the property for</h1></div></section>
<section data-name="Description and info 60/40" data-rise-panel data-node-id="965:7714" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I965:7714;756:1501" data-part="eyebrow">Around here</p>
<p data-node-id="I965:7714;756:1467" data-part="paragraph" class="current-lede">Most of what people come to Arenal for is within an hour of us. We will book any of it for you at the Hearth, usually with a day of notice, and we are not taking a cut that changes what we recommend.</p></div>
<div data-part="rate"><p data-node-id="I965:7714;756:1469" data-part="eyebrow">Ask us</p>
<h2 data-node-id="I965:7714;756:1470" class="c-heading" data-part="heading">We book it for you</h2>
<p data-node-id="I965:7714;756:1493" data-part="paragraph">At the Hearth, usually with a day of notice.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I965:7714;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Ask us to book any of this — destination not supplied">Ask us to book any of this</button></div></div></section></div>
<section data-name="Section - 50/50 image text" data-node-id="965:7715" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/9772fed083830cf825f9.webp" alt="Arenal Volcano above the rainforest and the infinity pool" loading="lazy" decoding="async" width="1024" height="1536"></figure>
<div data-part="copy"><p data-node-id="" data-part="eyebrow">The volcano</p>
<h2 data-node-id="" class="c-heading" data-part="heading">A very large, very symmetrical mountain</h2>
<p data-part="paragraph">Arenal National Park, [x] minutes away, [x] entry. Trails across old lava flows with the cone above you. Two to three hours walking, not difficult. Go in the morning, because the summit is usually clouded over by midday and clear more often in the dry season.</p>
<p data-part="paragraph">The volcano has not had a major eruption since 2010. You are not going to see lava. You are going to see a very large, very symmetrical mountain, and on a clear morning that is enough.</p></div></section>
<section data-name="included" data-node-id="965:7716" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">Distance</p>
<p data-part="paragraph">[x] minutes</p></div><div data-part="fact"><p data-part="eyebrow">Entry</p>
<p data-part="paragraph">[x]</p></div><div data-part="fact"><p data-part="eyebrow">time</p>
<p data-part="paragraph">Two to three hours walking</p></div><div data-part="fact"><p data-part="eyebrow">best</p>
<p data-part="paragraph">Morning, dry season</p></div></div></section>
<section data-name="Section - 50/50 text image" data-node-id="965:7717" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">Hot springs</p>
<h2 data-node-id="" class="c-heading" data-part="heading">The reason half the hotels exist</h2>
<p data-part="paragraph">The geothermal water in this valley is the reason half the hotels exist. There are [x] commercial hot spring complexes within [x] minutes, ranging from [x] a day to [x].</p>
<p data-part="paragraph">There is also a free river where the hot water comes out, under the bridge on the road to Tabacón. Locals use it. It is not supervised, there are no facilities, and it is better than some of the places charging fifty dollars.</p>
<p data-part="paragraph">Ask at the Hearth which one suits you, because they are genuinely different and the expensive one is not automatically the right one.</p></div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/50ec394cef65e5d3d539.webp" alt="Warm water falling into a pool below Arenal Volcano" loading="lazy" decoding="async" width="1350" height="2400"></figure></section>
<section data-name="Hero text only" data-node-id="965:7718" data-role="text-hero"><div data-part="copy"><p data-node-id="I965:7718;764:945" data-part="eyebrow">Waterfalls, bridges and the lake</p>
<h2 data-node-id="I965:7718;764:946" class="c-heading" data-part="heading">Within an hour of us</h2></div></section>
<section data-name="Card Grid" data-node-id="965:7719" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/c497476865b545968151.webp" alt="Guests sitting on boulders in a rocky river" loading="lazy" decoding="async" width="2400" height="1350"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">Waterfalls</h3>
<p data-part="paragraph">Río Fortuna waterfall, [x] minutes, [x] entry. [x] steps down and the same number back up. The pool at the bottom is cold and you can swim in it.</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/599096fe56d9da52fcc3.webp" alt="Horses tied up in the shade of the forest" loading="lazy" decoding="async" width="2400" height="1350"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">Hanging bridges and canopy</h3>
<p data-part="paragraph">[x] minutes away, [x]. A loop of suspension bridges through the canopy at the height where the birds are. Good for people who do not want to zip line. Zip lines, canyoning and rappelling are all within [x] minutes and all operated by companies we can vouch for. Prices from [x].</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/11358b370ad895b42644.webp" alt="The pool and the main house among the trees, with the Dome beyond" loading="lazy" decoding="async" width="2400" height="1798"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">Lake Arenal</h3>
<p data-part="paragraph">[x] minutes. Windsurfing, kitesurfing, fishing, and a boat crossing that takes you toward Monteverde in a fraction of the driving time.</p></div></article></div></section>
<section data-name="Card Grid" data-node-id="965:7720" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/cc3ea7fd527421b6cf57.webp" alt="Red ginger flowers among green leaves" loading="lazy" decoding="async" width="2400" height="1351"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">Caves</h3>
<p data-part="paragraph">Venado Caves, [x] minutes, [x]. You get wet and muddy and it is not for anyone who dislikes tight spaces.</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/a93767addb691181b87a.webp" alt="A small yellow-breasted bird at the edge of the water" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">Wildlife</h3>
<p data-part="paragraph">Sloths, in the reserve [x] minutes away. Also, frequently, in the trees on the way down our own drive.</p></div></article>
<article data-part="card" data-name="Cards"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/26874a87bf5f3df49257.webp" alt="Guests sitting in a circle in the covered arena with the horses" loading="lazy" decoding="async" width="2400" height="1800"></figure><div data-part="copy"><h3 data-node-id="" class="c-heading" data-part="heading">La Fortuna town</h3>
<p data-part="paragraph">[x] minutes. A square with a church, a supermarket, a bank with an ATM that works, a pharmacy, a hospital, and places to eat that cost a third of what the hotels charge. Worth an afternoon.</p></div></article></div></section>
<section data-name="Callout" data-node-id="965:7721" data-role="callout"><div data-part="callout-panel"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/96aad99ec0ad155dbaa5.webp" alt="A member of the team at the Hearth" loading="lazy" decoding="async" width="1800" height="2400"></figure><div data-part="copy"><p data-node-id="I965:7721;748:405" data-part="eyebrow">We will book any of this for you</p>
<h2 data-node-id="I965:7721;748:406" class="c-heading" data-part="heading">At the Hearth, usually with a day of notice, and we are not taking a cut that changes what we recommend.</h2>
<div data-part="actions"><button data-name="CTA" data-node-id="I965:7721;748:407" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Ask us to book any of this — destination not supplied">Ask us to book any of this</button></div></div></div></section>
<Next pageIndex={28} />
<Newsletter pageIndex={28} />

