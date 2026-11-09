<script lang="ts">
  import Newsletter from '#lib/pr/components/Newsletter.svelte';

  let { edition, base = '' }: { edition: 'figma-pr'; base?: string } = $props();
</script>

<section data-name="Hero text only" data-node-id="814:7338" data-role="text-hero"><div data-part="copy"><p data-node-id="I814:7338;764:945" data-part="eyebrow">RATES &amp; OFFERS</p>
<h1 data-node-id="I814:7338;764:946" class="c-heading" data-part="heading">What is open, and what it costs</h1>
<p data-node-id="I814:7338;764:948" data-part="paragraph" class="current-lede">Booking here directly is always the cheapest way to stay, and it is the only way to add an experience or a table at dinner to the same reservation.</p></div></section>
<section data-name="Price and offers" data-node-id="814:7339" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Room Card" data-node-id="I814:7339;812:5263"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/90e7a43ef89cdaa5b7f6.webp" alt="Stay longer" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><p data-part="paragraph">OFFER</p>
<h3 data-node-id="I814:7339;812:5263;768:1991" class="c-heading" data-part="heading">Stay longer</h3>
<p data-node-id="I814:7339;812:5263;768:1992" data-part="highlight">Four nights or more [Starting at Rate]</p>
<p data-node-id="I814:7339;812:5263;768:1993" data-part="paragraph">The land takes a day to get used to, and most people say the third day is when they stop checking their phone.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I814:7339;812:5263;768:1994" class="current-action" data-part="action" href="https://reservations.orbebooking.com/Search/Init/PAS6c/en/" target="_blank" rel="noopener noreferrer">check availability</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="I814:7339;812:5355"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/38bd44acd09f7a1caa67.webp" alt="Green season" loading="lazy" decoding="async" width="1800" height="2400"></figure><div data-part="copy"><p data-part="paragraph">OFFER</p>
<h3 data-node-id="I814:7339;812:5355;768:1991" class="c-heading" data-part="heading">Green season</h3>
<p data-node-id="I814:7339;812:5355;768:1992" data-part="highlight">May to November [rate] a night</p>
<p data-node-id="I814:7339;812:5355;768:1993" data-part="paragraph">It rains in the afternoon and stops. The river runs full, everything is loud and growing, and there are far fewer people in the valley.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I814:7339;812:5355;768:1994" class="current-action" data-part="action" href="https://reservations.orbebooking.com/Search/Init/PAS6c/en/" target="_blank" rel="noopener noreferrer">check availability</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="I814:7339;812:5639"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/1cf43cba02fcc0f90ae8.webp" alt="Couples" loading="lazy" decoding="async" width="2400" height="1410"></figure><div data-part="copy"><p data-part="paragraph">OFFER</p>
<h3 data-node-id="I814:7339;812:5639;768:1991" class="c-heading" data-part="heading">Couples</h3>
<p data-node-id="I814:7339;812:5639;768:1992" data-part="highlight">From [rate] a night</p>
<p data-node-id="I814:7339;812:5639;768:1993" data-part="paragraph">which includes [inclusions] and a session in the Dome for two.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I814:7339;812:5639;768:1994" class="current-action" data-part="action" href="https://reservations.orbebooking.com/Search/Init/PAS6c/en/" target="_blank" rel="noopener noreferrer">check availability</a></div></div></article></div></section>
<section data-name="2 Rooms cards" data-node-id="814:7340" data-role="cards" data-columns="2" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="50 card" data-node-id="I814:7340;757:1847"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/0ef67cbaf17027aee6cb.webp" alt="The Dome, with your room" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><p data-part="paragraph">OFFER</p>
<h3 data-node-id="I814:7340;757:1847;768:2012" class="c-heading" data-part="heading">The Dome, with your room</h3>
<p data-node-id="I814:7340;757:1847;768:2013" data-part="highlight">[offer]</p>
<p data-node-id="I814:7340;757:1847;768:2014" data-part="paragraph">Add any experience to your stay at [offer] rather than the walk-up rate.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I814:7340;757:1847;768:2015" class="current-action" data-part="action" href="https://reservations.orbebooking.com/Search/Init/PAS6c/en/" target="_blank" rel="noopener noreferrer">check availability</a></div></div></article>
<article data-part="card" data-name="50 card" data-node-id="I814:7340;757:1858"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/0ef67cbaf17027aee6cb.webp" alt="Last-minute" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><p data-part="paragraph">OFFER</p>
<h3 data-node-id="I814:7340;757:1858;768:2012" class="c-heading" data-part="heading">Last-minute</h3>
<p data-node-id="I814:7340;757:1858;768:2013" data-part="highlight">Add any experience to your stay at [offer]</p>
<p data-node-id="I814:7340;757:1858;768:2014" data-part="paragraph">for the room nobody took, inside [x] days.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I814:7340;757:1858;768:2015" class="current-action" data-part="action" href="https://reservations.orbebooking.com/Search/Init/PAS6c/en/" target="_blank" rel="noopener noreferrer">check availability</a></div></div></article></div></section>
<section data-name="Callout" data-node-id="814:7341" data-role="callout"><div data-part="callout-panel"><figure data-part="media" data-aspect="portrait"><img src="{base}/media/53aa5ba8e622d63f0ff1.webp" alt="Rates and offers" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><p data-node-id="I814:7341;748:405" data-part="eyebrow">what every rate includes</p>
<p data-node-id="I814:7341;748:406" data-part="paragraph">Every rate includes breakfast, wifi and the run of the property. Taxes are shown before you pay. Cancellation terms are on each rate at checkout and written out in full in our policies.</p></div></div></section>
<section data-name="Price and offers" data-node-id="755:607" data-role="cards" data-columns="3" data-tone="white"><div data-part="card-grid"><article data-part="card" data-name="Room Card" data-node-id="812:5263"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/90e7a43ef89cdaa5b7f6.webp" alt="The Villas" loading="lazy" decoding="async" width="2400" height="1600"></figure><div data-part="copy"><h3 data-node-id="I812:5263;750:2528" class="c-heading" data-part="heading">The Villas</h3>
<p data-node-id="I812:5263;764:1128" data-part="highlight">From [rate] a night</p>
<p data-node-id="I812:5263;750:2529" data-part="paragraph">Sleeps [x]. Walls, a door that shuts, the most space and the most shelter when it rains.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5263;750:2535" class="current-action" data-part="action" href="{base}/{edition}/villas/">See the villas</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="812:5355"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/38bd44acd09f7a1caa67.webp" alt="The Treehouse" loading="lazy" decoding="async" width="1800" height="2400"></figure><div data-part="copy"><h3 data-node-id="I812:5355;750:2528" class="c-heading" data-part="heading">The Treehouse</h3>
<p data-node-id="I812:5355;764:1128" data-part="highlight">From [rate] a night</p>
<p data-node-id="I812:5355;750:2529" data-part="paragraph">Sleeps [x]. One unit, built up into the canopy. It books out first, every season.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5355;750:2535" class="current-action" data-part="action" href="{base}/{edition}/treehouse/">See the treehouse</a></div></div></article>
<article data-part="card" data-name="Room Card" data-node-id="812:5639"><figure data-part="media" data-aspect="landscape"><img src="{base}/media/1cf43cba02fcc0f90ae8.webp" alt="Glamping Tents" loading="lazy" decoding="async" width="2400" height="1410"></figure><div data-part="copy"><h3 data-node-id="I812:5639;750:2528" class="c-heading" data-part="heading">Glamping Tents</h3>
<p data-node-id="I812:5639;764:1128" data-part="highlight">From [rate] a night</p>
<p data-node-id="I812:5639;750:2529" data-part="paragraph">Sleeps [x]. Canvas, a real bed, a private bathroom, forest on three sides.</p>
<div data-part="actions"><a data-name="Link arrow button" data-node-id="I812:5639;750:2535" class="current-action" data-part="action" href="{base}/{edition}/glamping-tents/">See the glamping tents</a></div></div></article></div></section>
<Newsletter pageIndex={6} />
