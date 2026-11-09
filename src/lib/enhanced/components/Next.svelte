<script lang="ts">
  // Step 2.6 (docs/figma-enhanced-step2.md): the open door at the end of the page (/blueprint/ 452c7d0, reference 7).
  // The next page's name and one line of it, then its opening picture, which opens from the Dome's arch as it comes
  // into view (interactions.js, setupNext). The way through is a button inside the picture, on frosted glass (the
  // owner's correction). The whole block takes the click; a click carries the picture into the next page's opening
  // (+layout.svelte, motion.css).
  import { base, route } from '#lib/enhanced/site.ts';
  import { door } from '#lib/enhanced/next.ts';
  type Props = { pageIndex: number };
  let { pageIndex }: Props = $props();
  let next = $derived(door(pageIndex));
  let media = $derived(next.media);
</script>

<section class="next-page" data-name="Next page" data-next aria-labelledby="next-page-title">
  <div class="next-head">
    <h2 id="next-page-title" class="next-name">{next.name}</h2>
    <p class="next-line">{next.line}</p>
  </div>
  <a class="next-door" href={route('figma-enhanced', next.page.slug, base)}>
    <span class="next-frame">
      <span class="next-media" data-next-media>
        {#if 'loop' in media}
          <!-- Speed, stage 2: the clip's first frame as a lazy picture beneath it, so it waits with the other pictures
               below the first screen (clips-first.js); the clip loads on approach (interactions.js, setupClipsFirst). -->
          <img data-clip-frame src={`${base}/bp/video/${media.loop}.webp`} alt="" loading="lazy" decoding="async" />
          <video data-loop muted loop playsinline preload="none" aria-hidden="true" tabindex="-1">
            <source media="(max-width: 767px)" src={`${base}${media.mobile}`} type="video/mp4" />
            <source src={`${base}/bp/video/${media.loop}.mp4`} type="video/mp4" />
          </video>
        {:else}
          <img src={`${base}/media/${media.photo}.webp`} alt="" loading="lazy" decoding="async" width={media.width} height={media.height} style={media.position ? `object-position: ${media.position}` : undefined} />
        {/if}
      </span>
      <span class="next-go"><span class="next-label">{next.label}</span><span class="next-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 12h14.5M13 6l6 6-6 6" /></svg></span></span>
    </span>
  </a>
</section>
