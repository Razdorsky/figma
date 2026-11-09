<script lang="ts">
  import Newsletter from '#lib/pr/components/Newsletter.svelte';

  let { edition, base = '' }: { edition: 'figma-pr'; base?: string } = $props();
</script>

<section data-name="Hero Section" data-node-id="814:7298" data-role="photo-hero"><figure data-part="hero-image" data-aspect="landscape" data-film-box><img data-clip-frame src="{base}/bp/video/loop-dome.webp" alt="The Frequency Experience" loading="eager" decoding="async" fetchpriority="high" width="1600" height="900"><video data-loop muted loop playsinline preload="auto" poster="{base}/bp/video/loop-dome.webp" aria-hidden="true" tabindex="-1" data-full="{base}/bp/video/film-programming.mp4" data-start="56.5" data-end="72.6"><source media="(max-width: 767px)" src="{base}/enhanced/clips/loop-dome-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-dome.mp4" type="video/mp4"></video></figure><div data-part="hero-copy"><p data-node-id="I814:7298;756:1065" data-part="eyebrow">The Frequency Experience</p>
<h1 data-node-id="I814:7298;756:1066" class="c-heading" data-part="heading">[x] minutes{' '}<br data-frame-break>in the Dome</h1></div></section>
<section data-name="Description and info 60/40" data-node-id="814:7299" data-role="split" data-layout="copy-first" data-variant="description"><div data-part="copy"><p data-node-id="I814:7299;756:1501" data-part="eyebrow">get into the dome</p>
<p data-node-id="I814:7299;756:1467" data-part="paragraph" class="current-lede">You lie down on the floor of the Dome. The lights go low. For the next [x] minutes sound moves through the room and through the floor, so the low end arrives in your body before it arrives in your ears. Someone is running it live, watching the room, not pressing play on a file.</p></div>
<div data-part="rate"><p data-node-id="I814:7299;756:1469" data-part="eyebrow">price</p>
<h2 data-node-id="I814:7299;756:1470" class="c-heading" data-part="heading">[Price] a person</h2>
<p data-part="paragraph">[price] for guests staying with us.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7299;756:1490" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="book a session — destination not supplied">book a session</button></div></div></section>
<section data-name="included" data-node-id="814:7300" data-role="facts"><div data-part="facts"><div data-part="fact"><p data-node-id="I814:7300;804:3094" data-part="eyebrow">sessions</p>
<p data-node-id="I814:7300;804:3095" data-part="paragraph">[days and times]</p></div><div data-part="fact"><p data-node-id="I814:7300;804:3161" data-part="eyebrow">capacity</p>
<p data-node-id="I814:7300;804:3162" data-part="paragraph">[x] people at a time</p></div><div data-part="fact"><p data-node-id="I814:7300;804:3164" data-part="eyebrow">duration</p>
<p data-node-id="I814:7300;804:3165" data-part="paragraph">[x] minutes door to door</p></div><div data-part="fact"><p data-node-id="I814:7300;804:3167" data-part="eyebrow">Afterwards</p>
<p data-node-id="I814:7300;804:3168" data-part="paragraph">[x] minutes of tea</p></div></div></section>
<section data-name="Section - 50/50 text image" data-node-id="814:7301" data-role="split" data-layout="copy-first" data-variant="editorial"><div data-part="copy"><p data-node-id="I814:7301;748:575;748:551" data-part="eyebrow">The lights go low.</p>
<h2 data-node-id="I814:7301;748:575;748:552" class="c-heading" data-part="heading">Into the Dome</h2>
<p data-part="paragraph">You keep your clothes on. There is water, and there are blankets, and you can leave at any point without explaining yourself. Nobody will talk to you about your chakras.</p>
<p data-part="paragraph">We are not going to tell you what this will do for you. People come out of it quiet, and most of them sit outside for a while before they say anything. What that was worth is yours to decide.</p></div>
<figure data-part="media" data-aspect="portrait" data-film-box><img data-clip-frame src="{base}/bp/video/loop-inside.webp" alt="The Frequency Experience" loading="lazy" decoding="async" width="1600" height="900"><video data-loop muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-full="{base}/bp/video/film-overview.mp4" data-start="95.8" data-end="106.6"><source media="(max-width: 767px)" src="{base}/bp/video/loop-inside-m.mp4" type="video/mp4"><source src="{base}/bp/video/loop-inside.mp4" type="video/mp4"></video></figure></section>
<section data-name="Callout" data-node-id="814:7302" data-role="callout"><div data-part="callout-panel"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/74d24d2bc43b341ebc91.webp" alt="The Frequency Experience" loading="lazy" decoding="async" width="471" height="374"></figure><div data-part="copy"><p data-node-id="I814:7302;748:405" data-part="eyebrow">Before you book</p>
<p data-node-id="I814:7302;748:406" data-part="paragraph">If you are pregnant, have a pacemaker or another implanted device, or have a history of seizures, write to us first. There are a few things we will ask you to check with a doctor, and a few we will say no to, and we would rather say it now than at the door.</p>
<div data-part="actions"><button data-name="CTA" data-node-id="I814:7302;748:407" class="current-action" data-part="action" type="button" data-pending-link="" aria-label="book a session — destination not supplied">book a session</button></div></div></div></section>
<Newsletter pageIndex={9} />
