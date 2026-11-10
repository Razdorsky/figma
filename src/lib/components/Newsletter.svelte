<script lang="ts">
  import { tr, type Locale } from '#lib/i18n.ts';
  type Props = { pageIndex: number; locale?: Locale };
  let { pageIndex, locale = 'en' }: Props = $props();
  let events = $derived(pageIndex === 13);
  let status = $state('');
  function submit(event:SubmitEvent){
    event.preventDefault();
    const form=event.currentTarget as HTMLFormElement;
    if(form.reportValidity())status=tr(locale, 'Subscriptions are not connected in this local preview. Your address has not been sent or saved.');
  }
</script>

<section
  class:newsletter-events={events}
  class="site-newsletter newsletter"
  aria-labelledby="newsletter-title"
>
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
    <form class="newsletter-form" onsubmit={submit}>
      <label class="sr-only" for="newsletter-email">{tr(locale, 'Email address')}</label>
      <input id="newsletter-email" type="email" autocomplete="email" placeholder="ronnie@aave.com" required />
      <button type="submit">{tr(locale, 'SUBSCRIBE')}</button>
      <p class="newsletter-status" aria-live="polite">{status}</p>
    </form>
  </div>
</section>
