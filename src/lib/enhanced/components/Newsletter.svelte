<script lang="ts">
  import {base} from '#lib/enhanced/site.ts';
  import { tr, type Locale } from '#lib/enhanced/i18n.ts';
  type Props = { pageIndex: number; locale?: Locale };
  let { pageIndex, locale = 'en' }: Props = $props();
  let events = $derived(pageIndex === 13);
  // The closing photograph the footer melts into (docs/figma-enhanced-plan.md, step 1.5; Legacy reference 13). Placement
  // map, 2026-11-08: it belongs to the page's world and never repeats a photograph already on the page; each has a
  // dark lower edge, and the footer takes that edge's colour (closing.css, data-closing).
  const night = {src: 'fe78e39c5c2e5fd2d9bc.webp', width: 2048, height: 1281, tone: 'night', position: '50% 45%'};
  const moloka = {src: '9203238de1f599aa3053.webp', width: 2400, height: 1603, tone: 'candle', position: '50% 55%'};
  const closings: Record<number, typeof night> = {
    // Step 2.6: the next-page block stands just above, so the closing never repeats its subject. El Rancho's block
    // shows Moloka's table and Things to do's block the pool under Arenal, so both close on the Dome at night.
    10: moloka, 19: moloka,
    14: {src: 'df44479df6d2cfd7b1f9.webp', width: 2400, height: 1600, tone: 'amber', position: '50% 40%'},
    21: {src: '217d8eafeb5342a6cc73.webp', width: 1800, height: 2400, tone: 'candle', position: '50% 62%'},
    25: {src: '09cc93d75115d2f71e88.webp', width: 1603, height: 2400, tone: 'candle', position: '50% 58%'},
    27: {src: '21ac2d49d2ab56699e04.webp', width: 2400, height: 1668, tone: 'night', position: '50% 38%'}
  };
  let closing = $derived(closings[pageIndex] || night);
  let status = $state('');
  let formState = $state<'' | 'error' | 'notice'>('');
  function submit(event:SubmitEvent){
    event.preventDefault();
    const form=event.currentTarget as HTMLFormElement;
    const input=form.elements.namedItem('email') as HTMLInputElement;
    if(!input.checkValidity()){
      formState='error';
      status=input.value?tr(locale, 'This address is incomplete. Check it, for example name@example.com.'):tr(locale, 'Enter your email address, for example name@example.com.');
      input.focus();
      return;
    }
    formState='notice';
    status=tr(locale, 'Subscriptions are not connected in this local preview. Your address has not been sent or saved.');
  }
  function edit(){if(formState==='error'){formState='';status='';}}
</script>

<section
  class:newsletter-events={events}
  class:newsletter-closing={!events}
  class="site-newsletter newsletter"
  data-closing={events ? undefined : closing.tone}
  aria-labelledby="newsletter-title"
>
  {#if !events}
    <figure class="newsletter-photo" aria-hidden="true">
      <img src={`${base}/media/${closing.src}`} alt="" loading="lazy" decoding="async" width={closing.width} height={closing.height} style={`object-position: ${closing.position}`} />
    </figure>
  {/if}
  <div class="newsletter-inner">
    <div>
      <p class="newsletter-eyebrow">{events ? tr(locale, 'Coming events') : tr(locale, 'Best time to visit us')}</p>
      <h2 id="newsletter-title">{events ? tr(locale, 'Tell me what is coming up') : tr(locale, 'Three or four emails a year')}</h2>
      <p>
        {events
          ? tr(locale, 'Nothing on tonight is a normal state of affairs. The calendar runs [how often], and we announce new nights by email first, because they are small and they sell out.')
          : tr(locale, 'What is open, who is playing, what the river is doing. Nothing else.')}
      </p>
    </div>
    <form class="newsletter-form" novalidate onsubmit={submit} data-state={formState || undefined}>
      <label class="sr-only" for="newsletter-email">{tr(locale, 'Email address')}</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="ronnie@aave.com"
        required
        aria-invalid={formState === 'error' ? 'true' : undefined}
        aria-describedby="newsletter-status"
        oninput={edit}
      />
      <button type="submit">{tr(locale, 'SUBSCRIBE')}</button>
      <p id="newsletter-status" class="newsletter-status" aria-live="polite">{status}</p>
    </form>
  </div>
</section>
