<script lang="ts">
  import Newsletter from '#lib/enhanced/components/Newsletter.svelte';
  import Next from '#lib/enhanced/components/Next.svelte';

  let { edition, base = '' }: { edition: 'figma-enhanced'; base?: string } = $props();
</script>

<div class="rise" data-rise><section data-name="Hero Section" data-node-id="884:8988" data-role="photo-hero" data-film-box><figure data-part="hero-image" data-aspect="landscape"><img data-clip-frame src="{base}/bp/video/loop-retreat.webp" alt="A group sitting on mats facing two teachers in the Dome" loading="eager" decoding="async" fetchpriority="high" width="1600" height="900"><video data-loop muted loop playsinline preload="auto" poster="{base}/bp/video/loop-retreat.webp" aria-hidden="true" tabindex="-1" data-full="{base}/bp/video/film-programming.mp4" data-start="66.3" data-end="76.2"><source media="(max-width: 767px)" src="{base}/bp/video/loop-retreat-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-retreat.mp4" type="video/mp4"></video></figure><button type="button" class="film-play" data-film-play aria-label="Play this scene from the start, with sound"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor"/></svg><span>Play with sound</span></button><div class="film-controls" data-film-controls hidden><button type="button" data-film-toggle aria-label="Pause the film"><svg class="icon-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor"/></svg><svg class="icon-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor"/></svg></button><button type="button" data-film-mute aria-label="Mute the film"><svg class="icon-sound" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" fill="none" stroke="currentColor" stroke-width="1.2"/></svg><svg class="icon-muted" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 6l3.5 4M14.5 6L11 10" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></button></div><div data-part="hero-copy"><p data-node-id="I884:8988;756:1065" data-part="eyebrow">Retreats</p>
<h1 data-node-id="I884:8988;756:1066" class="c-heading" data-part="heading">Bring your people, use our dome</h1></div></section>
<section data-name="Description and info 60/40" data-rise-panel data-node-id="884:8989" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I884:8989;756:1501" data-part="eyebrow">make your Retreats</p>
<p data-node-id="I884:8989;756:1467" data-part="paragraph" class="current-lede">Facilitators run retreats here because the Dome does something a hotel conference room cannot, and because the property is small enough that the group is not sharing it with strangers.</p></div>
<div data-part="rate"><p data-node-id="I884:8989;756:1469" data-part="eyebrow">What it costs</p>
<h2 data-node-id="I884:8989;756:1470" class="c-heading" data-part="heading">[x] per person per night</h2>
<p data-node-id="I884:8989;756:1493" data-part="paragraph">For the full property, all meals included, with a [x]-night minimum and a [x]-person minimum. Deposit is [x] percent at booking, balance [x] days out.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8989;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Enquire about a retreat — destination not supplied">Enquire about a retreat</button></div></div></section></div>
<section data-name="Hero text only" data-node-id="884:8990" data-role="text-hero"><div data-part="copy"><p data-node-id="I884:8990;764:945" data-part="eyebrow">What you get</p>
<h2 data-node-id="I884:8990;764:946" class="c-heading" data-part="heading">The Dome on your schedule, and everything around it</h2></div></section>
<section data-name="3 col info" data-node-id="884:8991" data-role="facts"><div data-part="facts"><div data-part="fact"><h3 data-node-id="I884:8991;0" class="c-heading" data-part="heading">The Dome</h3>
<p data-part="paragraph" class="current-lede">For your sessions, on your schedule.</p></div><div data-part="fact"><h3 data-node-id="I884:8991;1" class="c-heading" data-part="heading">Fourteen units</h3>
<p data-part="paragraph" class="current-lede">Sleeping [x].</p></div><div data-part="fact"><h3 data-node-id="I884:8991;2" class="c-heading" data-part="heading">The Hearth</h3>
<p data-part="paragraph" class="current-lede">For meals and for the parts of a retreat that happen around a fire rather than in a room.</p></div></div></section>
<section data-name="3 col info" data-node-id="884:8992" data-role="facts"><div data-part="facts"><div data-part="fact"><h3 data-node-id="I884:8992;0" class="c-heading" data-part="heading">The kitchen</h3>
<p data-part="paragraph" class="current-lede">Working to your plan, including however you want to handle fasting, dietary protocols or late meals.</p></div><div data-part="fact"><h3 data-node-id="I884:8992;1" class="c-heading" data-part="heading">Our facilitators</h3>
<p data-part="paragraph" class="current-lede">Available if you want them and out of the way if you do not.</p></div><div data-part="fact"><h3 data-node-id="I884:8992;2" class="c-heading" data-part="heading">Airport transfers</h3>
<p data-part="paragraph" class="current-lede">From Liberia or San José, arranged.</p></div></div></section>
<section data-name="Galery slider" data-node-id="884:8993" data-role="gallery" data-gallery="1" aria-label="Retreats gallery"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/c772a2b9229d783c42f1.webp" alt="Guests lying in a circle in the Dome under a blue projection" loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1800"><button type="button" data-gallery-open="" data-part="gallery-prev" aria-label="Open Retreats gallery"></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button></figure></section>
<section data-name="Section - 50/50 text image" data-node-id="884:8994" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="" data-part="eyebrow">What we need from you</p>
<h2 data-node-id="" class="c-heading" data-part="heading">Dates, headcount, and what your days look like</h2>
<p data-part="paragraph">Whether you are bringing your own facilitators or using ours. Whether you need the recording studio. Whether anything in your programme involves [x], because there are some things we host and some things we do not, and we will tell you straight away rather than three months in.</p>
<div data-part="actions"><button data-name="CTA" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="Enquire about a retreat — destination not supplied">Enquire about a retreat</button></div></div>
<figure data-part="media" data-aspect="portrait"><img src="{base}/media/9772fed083830cf825f9.webp" alt="Arenal Volcano above the rainforest and the infinity pool" loading="lazy" decoding="async" width="1024" height="1536"></figure></section>
<section data-name="Hero text only" data-node-id="884:8995" data-role="text-hero"><div data-part="copy"><p data-node-id="I884:8995;764:945" data-part="eyebrow">Retreats already on the calendar</p>
<h2 data-node-id="I884:8995;764:946" class="c-heading" data-part="heading">Open retreats</h2>
<p data-node-id="I884:8995;764:948" data-part="paragraph" class="current-lede">Some retreats here are open to anyone who wants to join, not just to a facilitator&#x27;s existing group. Those are listed with dates, prices and who is running them.</p></div></section>
<section data-name="Table" data-node-id="884:8996" data-role="events"><article data-part="event"><p data-node-id="I884:8996;814:10245" data-part="paragraph">[Date]</p>
<p data-node-id="I884:8996;814:10246" data-part="paragraph">[Retreat name]</p>
<p data-node-id="I884:8996;814:10247" data-part="paragraph">[Who is running it, one line]</p>
<p data-node-id="I884:8996;814:10248" data-part="paragraph">[Price]</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8996;814:10259" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="details — destination not supplied">details</button></div></article>
<article data-part="event"><p data-node-id="I884:8996;814:10263" data-part="paragraph">[Date]</p>
<p data-node-id="I884:8996;814:10264" data-part="paragraph">[Retreat name]</p>
<p data-node-id="I884:8996;814:10265" data-part="paragraph">[Who is running it, one line]</p>
<p data-node-id="I884:8996;814:10266" data-part="paragraph">[Price]</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I884:8996;814:10267" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="details — destination not supplied">details</button></div></article></section>
<Next pageIndex={23} />
<Newsletter pageIndex={23} />

