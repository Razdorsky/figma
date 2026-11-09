<script lang="ts">
  type Props = { pageIndex: number };
  let { pageIndex }: Props = $props();
  let events = $derived(pageIndex === 13);
  let status = $state('');
  function submit(event:SubmitEvent){
    event.preventDefault();
    const form=event.currentTarget as HTMLFormElement;
    if(form.reportValidity())status='Subscriptions are not connected in this local preview. Your address has not been sent or saved.';
  }
</script>

<section
  class:newsletter-events={events}
  class="site-newsletter newsletter pr-newsletter"
  aria-labelledby="newsletter-title"
>
  <div class="newsletter-inner">
    <div>
      <p class="newsletter-eyebrow">{events ? 'Coming events' : 'Best time to visit us'}</p>
      <h2 id="newsletter-title">{events ? 'Tell me what is coming up' : 'Three or four emails a year'}</h2>
      <p>
        {events
          ? 'Nothing on tonight is a normal state of affairs. The calendar runs [how often], and we announce new nights by email first, because they are small and they sell out.'
          : 'What is open, who is playing, what the river is doing. Nothing else.'}
      </p>
    </div>
    <form class="newsletter-form" onsubmit={submit}>
      <label class="sr-only" for="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" autocomplete="email" placeholder="ronnie@aave.com" required />
      <button type="submit">SUBSCRIBE</button>
      <p class="newsletter-status" aria-live="polite">{status}</p>
    </form>
  </div>
</section>
