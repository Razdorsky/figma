<script lang="ts">
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '' }: { edition: 'figma-enhanced'; base?: string } = $props();
</script>

<section data-name="Hero text only" data-node-id="965:7506" data-role="text-hero"><div data-part="copy"><p data-node-id="I965:7506;764:945" data-part="eyebrow">Plan your visit</p>
<h1 data-node-id="I965:7506;764:946" class="c-heading" data-part="heading">Getting here</h1>
<p data-node-id="I965:7506;764:948" data-part="paragraph" class="current-lede">Three hours by car from San José, two and a half from Liberia, or fly Sansa into La Fortuna.</p></div></section>
<section data-name="Description and info 60/40" data-node-id="965:7507" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I965:7507;756:1501" data-part="eyebrow">From Liberia (LIR)</p>
<p data-node-id="I965:7507;756:1467" data-part="paragraph" class="current-lede">[x] hours by road. This is the easier airport if you are flying from North America, and most people use it.</p>
<p data-part="paragraph" class="current-lede">We will send a driver for [x] each way, up to [x] people and luggage. Book it when you book your room and we will be waiting at arrivals with your name on a sign.</p>
<p data-part="paragraph" class="current-lede">A rental car takes the same roads. The drive is paved the whole way and straightforward in daylight.</p></div>
<div data-part="rate"><p data-node-id="I965:7507;756:1469" data-part="eyebrow">Transfer from Liberia</p>
<h2 data-node-id="I965:7507;756:1470" class="c-heading" data-part="heading">[x] each way</h2>
<p data-node-id="I965:7507;756:1493" data-part="paragraph">Up to [x] people and luggage. Book it with your room.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I965:7507;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Book a transfer — destination not supplied">Book a transfer</button></div></div></section>
<section data-name="Description and info 60/40" data-node-id="965:7508" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I965:7508;756:1501" data-part="eyebrow">From San José (SJO)</p>
<p data-node-id="I965:7508;756:1467" data-part="paragraph" class="current-lede">There are also small planes into La Fortuna from San José, [x] minutes, [x] per person, with [x] flights a day in high season. From the airstrip to us is [x] minutes and we will collect you for [x].</p></div>
<div data-part="rate"><p data-node-id="I965:7508;756:1469" data-part="eyebrow">Transfer from San José</p>
<h2 data-node-id="I965:7508;756:1470" class="c-heading" data-part="heading">[x] each way</h2>
<p data-node-id="I965:7508;756:1493" data-part="paragraph">[x] minutes, [x] per person, [x] flights a day in high season. Airstrip pickup [x].</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I965:7508;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Book a transfer — destination not supplied">Book a transfer</button></div></div></section>
<section data-name="Section - 50/50 image text" data-node-id="965:7509" data-role="split" data-layout="image-first" data-variant="editorial"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/bc1c3e7f217cc52b0c86.webp" alt="A golf cart on the gravel track through the forest" loading="lazy" decoding="async" width="1854" height="2400"></figure>
<div data-part="copy"><p data-node-id="" data-part="eyebrow">Driving yourself</p>
<h2 data-node-id="" class="c-heading" data-part="heading">The last stretch is not lit</h2>
<p data-part="paragraph">The road to the property is [x]. There is parking for [x] cars.{' '}If you are arriving after dark, tell us.</p></div></section>
<section data-name="included" data-node-id="965:7510" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">Final access road</p>
<p data-part="paragraph">[Paved, gravel or both]</p></div><div data-part="fact"><p data-part="eyebrow">Four-wheel drive</p>
<p data-part="paragraph">[Needed, or nice to have]</p></div><div data-part="fact"><p data-part="eyebrow">Parking</p>
<p data-part="paragraph">[x] cars</p></div><div data-part="fact"><p data-part="eyebrow">After dark</p>
<p data-part="paragraph">Tell us. The last stretch is not lit.</p></div></div></section>
<section data-name="Hero text only" data-node-id="965:7511" data-role="text-hero"><div data-part="copy"><p data-node-id="I965:7511;764:945" data-part="eyebrow">Arriving and leaving</p>
<h2 data-node-id="I965:7511;764:946" class="c-heading" data-part="heading">Arrive early and we will hold your bags</h2>
<p data-node-id="I965:7511;764:948" data-part="paragraph" class="current-lede">If your flight lands early we will hold your bags and you can use the Hearth, the river and the trails before your room is ready.</p></div></section>
<section data-name="included" data-node-id="965:7512" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-part="eyebrow">check in</p>
<p data-part="paragraph">[x]</p></div><div data-part="fact"><p data-part="eyebrow">check out</p>
<p data-part="paragraph">[x]</p></div><div data-part="fact"><p data-part="eyebrow">early arrival</p>
<p data-part="paragraph">We hold your bags; use the Hearth, the river and the trails</p></div><div data-part="fact"><p data-part="eyebrow">late arrival</p>
<p data-part="paragraph">Tell us; the last stretch is not lit</p></div></div></section>
<section data-name="Section - 40/60 text image" data-node-id="965:7513" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">The address</p>
<h2 data-node-id="" class="c-heading" data-part="heading">The pin that{' '}actually works</h2>
<p data-part="paragraph">[Full address]</p>
<p data-part="paragraph">GPS: [lat, long]</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I965:7513;748:584;750:1289;750:1257" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Open in Google Maps — destination not supplied">Open in Google Maps</button></div></div>
<figure data-part="media" data-aspect="landscape"><img src="{base}/media/11358b370ad895b42644.webp" alt="The pool and the main house among the trees, with the Dome beyond" loading="lazy" decoding="async" width="2400" height="1798"></figure></section>
<Next pageIndex={27} />
<Newsletter pageIndex={27} />

