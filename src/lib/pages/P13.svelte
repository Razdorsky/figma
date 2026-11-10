<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  import Newsletter from '#lib/components/Newsletter.svelte';

  let { edition, base = '', locale = 'en' }: { edition: 'blueprint' | 'figma'; base?: string; locale?: Locale } = $props();
  const lp = $derived(locale === 'es' ? 'es/' : '');
</script>

<section data-name="Hero text only" data-node-id="814:10150" data-role="text-hero"><div data-part="copy"><p data-node-id="I814:10150;764:945" data-part="eyebrow">{tr(locale, "The Vessyl Presents")}</p>
<h1 data-node-id="I814:10150;764:946" class="c-heading" data-part="heading">{#if locale === 'es'}{tr(locale, "Whoever is playing, in the best room we have")}{:else}Whoever is playing,{' '}<br data-frame-break>in the best room we have{/if}</h1>
<p data-node-id="I814:10150;764:948" data-part="paragraph" class="current-lede">{tr(locale, "Musicians, films, talks, and nights that do not have a name yet. The Dome is a good room, so people say yes to playing in it, and the audience is [x] people sitting on the floor rather than four hundred standing in the dark.")}</p></div></section>
<section data-name="Table" data-node-id="862:15584" data-role="events"><h2 data-node-id="814:10234" class="c-heading" data-part="heading">{tr(locale, "What is coming up")}</h2>
<article data-part="event"><p data-node-id="814:10245" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10246" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10247" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10248" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10259" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10263" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10264" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10265" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10266" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10267" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10270" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10271" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10272" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10273" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10274" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article>
<article data-part="event"><p data-node-id="814:10277" data-part="paragraph">{tr(locale, "[Date]")}</p>
<p data-node-id="814:10278" data-part="paragraph">{tr(locale, "[Artist or Event]")}</p>
<p data-node-id="814:10279" data-part="paragraph">{tr(locale, "[One line on who they are]")}</p>
<p data-node-id="814:10280" data-part="paragraph">{tr(locale, "[Price] | Free to guests")}</p>
<div data-part="actions"><button data-name="CTA" data-node-id="814:10281" class="current-action" data-part="action" type="button" data-pending-link="" aria-label={tr(locale, "book — destination not supplied")}>{tr(locale, "book")}</button></div></article></section>
<Newsletter pageIndex={13} {locale} />
<section data-name="Heading title" data-node-id="814:9962" data-role="copy" data-tone="white"><div data-part="copy"><h2 data-node-id="I814:9962;768:1391" class="c-heading" data-part="heading">{tr(locale, "If you make something and you want to make it here, write to [address]. We have [what we can offer: the room, the system, somewhere to sleep], and we are interested.")}</h2></div></section>
<section data-name="Galery slider" data-node-id="814:10383" data-role="gallery" data-gallery="1" aria-label={tr(locale, "The Vessyl Presents gallery")}><figure data-part="media" data-aspect="landscape"><img src="{base}/media/df44479df6d2cfd7b1f9.webp" alt={tr(locale, "The Vessyl Presents")} loading="lazy" decoding="async" data-gallery-image="" width="2400" height="1600">{#if edition === 'figma'}<button type="button" data-gallery-open="" data-part="gallery-prev" aria-label={tr(locale, "Open The Vessyl Presents gallery")}></button><button type="button" data-gallery-open="" data-part="gallery-next" tabindex="-1" aria-hidden="true"></button><span data-part="gallery-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>{:else}<button type="button" data-gallery-open="" data-part="gallery-open" aria-label={tr(locale, "Open The Vessyl Presents gallery")}>{tr(locale, "View gallery")}</button>{/if}</figure></section>
