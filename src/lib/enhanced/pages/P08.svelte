<script lang="ts">
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '' }: { edition: 'figma-enhanced'; base?: string } = $props();
</script>

<div class="rise" data-rise><section data-name="Hero Section" data-node-id="814:7288" data-role="photo-hero" data-hero-text="glass"><figure data-part="hero-image" data-aspect="landscape"><img data-clip-frame src="{base}/bp/video/loop-rancho-pool.webp" alt="A table set under El Rancho's high roof, Arenal Volcano beyond the pool" loading="eager" decoding="async" fetchpriority="high" width="1600" height="900"><video data-loop muted loop playsinline preload="auto" poster="{base}/bp/video/loop-rancho-pool.webp" aria-hidden="true" tabindex="-1"><source media="(max-width: 767px)" src="{base}/bp/video/loop-rancho-pool-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-rancho-pool.mp4" type="video/mp4"></video></figure><div data-part="hero-copy"><p data-node-id="I814:7288;756:1065" data-part="eyebrow">The Day and the Half Day</p>
<h1 data-node-id="I814:7288;756:1066" class="c-heading" data-part="heading">Spend the day{' '}here without{' '}staying the night</h1></div></section>
<section data-name="Description and info 60/40" data-rise-panel data-node-id="814:7289" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I814:7289;756:1501" data-part="eyebrow">the vessyl experience</p>
<p data-part="paragraph" class="current-lede">You get the property: the pool, the river, the trails, a lounger nobody will move you off, lunch from the kitchen, and a session in the Dome if you add one. It is the simplest way to see whether you want to come back and sleep here.</p>
<p data-part="paragraph"><span data-part="term">The half day</span> Runs [start] to [end]. It includes [inclusions] and lunch.</p>
<p data-part="paragraph"><span data-part="term">The full day</span> Runs [start] to [end]. It includes everything above plus [inclusions], and you can stay for dinner if you book a table.</p></div>
<div data-part="rate"><p data-node-id="I814:7289;756:1469" data-part="eyebrow">price</p>
<h2 data-node-id="I814:7289;756:1470" class="c-heading" data-part="heading">Half Day [Price] – Full Day [Price]</h2>
<p data-part="paragraph" data-node-id="I814:7289;756:1493">Free cancellation up to [hours] before.{' '}After that we charge in full, because the kitchen has already shopped.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7289;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="BOOK A DAY HERE — destination not supplied">BOOK A DAY HERE</button></div></div></section></div>
<section data-name="included" data-node-id="814:7290" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-node-id="I814:7290;804:3094" data-part="eyebrow">half day</p>
<p data-node-id="I814:7290;804:3095" data-part="paragraph">[Start] to [end]</p></div><div data-part="fact"><p data-node-id="I814:7290;804:3155" data-part="eyebrow">full day</p>
<p data-node-id="I814:7290;804:3156" data-part="paragraph">[Start] to [end]</p></div><div data-part="fact"><p data-node-id="I814:7290;804:3161" data-part="eyebrow">maximum</p>
<p data-node-id="I814:7290;804:3162" data-part="paragraph">[x] people a day</p></div><div data-part="fact"><p data-node-id="I814:7290;804:3164" data-part="eyebrow">children</p>
<p data-node-id="I814:7290;804:3165" data-part="paragraph">[age], [price]</p></div><div data-part="fact"><p data-node-id="I814:7290;804:3167" data-part="eyebrow">cancellation</p>
<p data-node-id="I814:7290;804:3168" data-part="paragraph">Free up to [hours] before</p></div></div></section>
<section data-name="Slider with overlay" data-node-id="814:7291" data-role="overlay" data-gallery="1" aria-label="The Day and the Half Day gallery"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/4152c317a8ab599ba9a6.webp" alt="Guests talking on the path outside the Dome" loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1600"></figure><div data-part="copy"><p data-node-id="I814:7291;756:1715;748:551" data-part="eyebrow">getting around</p>
<h2 data-node-id="I814:7291;756:1715;748:552" class="c-heading" data-part="heading">Bring a swimsuit,</h2>
<p data-node-id="I814:7291;756:1715;748:553" data-part="paragraph">shoes you do not mind getting muddy, and something warm for the end of the afternoon. Everything else is here.</p></div><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label="Open The Day and the Half Day gallery"></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button></section>
<section data-name="Heading title" data-node-id="814:7292" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:7292;768:1391" class="c-heading" data-part="heading">Maximum [x] people a day, because the property is small and we would rather it stayed that way.</h2></div></section>
<section data-name="2 Rooms cards" data-node-id="814:7293" data-role="cards" data-columns="2" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="50 card" data-node-id="I814:7293;757:1847"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/5d6a60bd75812dff113a.webp" alt="A woman at the edge of the infinity pool facing the hills" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="I814:7293;757:1847;757:1836" class="c-heading" data-part="heading">Half Day</h3>
<p data-node-id="I814:7293;757:1847;768:1436" data-part="highlight">[Price]</p>
<p data-node-id="I814:7293;757:1847;757:1837" data-part="paragraph">Runs [start] to [end]. It includes [inclusions] and lunch.</p>
<div data-part="actions"><button data-name="Link arrow button" data-node-id="I814:7293;757:1847;757:1842" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="BOOK half DAY HERE — destination not supplied">BOOK half DAY HERE</button></div></div></article>
<article data-part="card" data-name="50 card" data-node-id="I814:7293;757:1858"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/f5ec5ec1897cef56ade3.webp" alt="A table set under El Rancho's high roof, Arenal Volcano beyond the pool" loading="lazy" decoding="async" width="1800" height="2400"></figure><div data-part="copy"><h3 data-node-id="I814:7293;757:1858;757:1836" class="c-heading" data-part="heading">Full Day</h3>
<p data-node-id="I814:7293;757:1858;768:1436" data-part="highlight">[offer]</p>
<p data-node-id="I814:7293;757:1858;757:1837" data-part="paragraph">Runs [start] to [end]. It includes everything above plus [inclusions], and you can stay for dinner if you book a table.</p>
<div data-part="actions"><button data-name="Link arrow button" data-node-id="I814:7293;757:1858;757:1842" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="BOOK a full DAY HERE — destination not supplied">BOOK a full DAY HERE</button></div></div></article></div></section>
<Next pageIndex={8} />
<Newsletter pageIndex={8} />
