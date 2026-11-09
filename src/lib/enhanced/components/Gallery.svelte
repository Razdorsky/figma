<script lang="ts">
  import { tr, type Locale } from '#lib/enhanced/i18n.ts';
  let { locale = 'en' }: { locale?: Locale } = $props();
</script>

<dialog id="photo-gallery" class="gallery-dialog" aria-label={tr(locale, 'Photo gallery')} data-lenis-prevent>
  <span class="gallery-count" aria-live="polite"></span>
  <button type="button" class="icon-button gallery-close" aria-label={tr(locale, 'Close gallery')}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  </button>
  <div class="gallery-stage">
    <img alt="" />
    <button type="button" class="gallery-edge left" aria-label={tr(locale, 'Previous photo')}></button>
    <button type="button" class="gallery-edge right" aria-label={tr(locale, 'Next photo')}></button>
  </div>
  <button type="button" class="icon-button gallery-arrow gallery-prev" aria-label={tr(locale, 'Previous photo')}>←</button>
  <button type="button" class="icon-button gallery-arrow gallery-next" aria-label={tr(locale, 'Next photo')}>→</button>
  <div class="gallery-thumbnails"></div>
</dialog>
