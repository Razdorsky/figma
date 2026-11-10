<script lang="ts">
import {base,route} from '#lib/site.ts';
import {tr} from '#lib/i18n.ts';
import Header from '#lib/components/Header.svelte';
import Footer from '#lib/components/Footer.svelte';
import Menu from '#lib/components/Menu.svelte';
import Gallery from '#lib/components/Gallery.svelte';
import {canvas} from '#lib/site.ts';
import type {PageData} from './$types';
import P01 from '#lib/pages/P01.svelte';
import P02 from '#lib/pages/P02.svelte';
import P03 from '#lib/pages/P03.svelte';
import P04 from '#lib/pages/P04.svelte';
import P05 from '#lib/pages/P05.svelte';
import P06 from '#lib/pages/P06.svelte';
import P07 from '#lib/pages/P07.svelte';
import P08 from '#lib/pages/P08.svelte';
import P09 from '#lib/pages/P09.svelte';
import P10 from '#lib/pages/P10.svelte';
import P11 from '#lib/pages/P11.svelte';
import P12 from '#lib/pages/P12.svelte';
import P13 from '#lib/pages/P13.svelte';
import P14 from '#lib/pages/P14.svelte';
import P15 from '#lib/pages/P15.svelte';
import P16 from '#lib/pages/P16.svelte';
import P17 from '#lib/pages/P17.svelte';
import P18 from '#lib/pages/P18.svelte';
import P19 from '#lib/pages/P19.svelte';
import P20 from '#lib/pages/P20.svelte';
import P21 from '#lib/pages/P21.svelte';
import P22 from '#lib/pages/P22.svelte';
import P23 from '#lib/pages/P23.svelte';
import P24 from '#lib/pages/P24.svelte';
import P25 from '#lib/pages/P25.svelte';
import P26 from '#lib/pages/P26.svelte';
import P27 from '#lib/pages/P27.svelte';
import P28 from '#lib/pages/P28.svelte';
let {data}: {data:PageData}=$props();
const components=[P01,P02,P03,P04,P05,P06,P07,P08,P09,P10,P11,P12,P13,P14,P15,P16,P17,P18,P19,P20,P21,P22,P23,P24,P25,P26,P27,P28];
let Content=$derived(components[data.page.index-1]);
</script>
<svelte:head><title>{tr(data.locale,data.page.name)} — The Vessyl</title><meta name="description" content={`${tr(data.locale,data.page.name)} — ${tr(data.locale,'The Vessyl in Arenal, Costa Rica')}`}/><link rel="alternate" hreflang="en" href={route(data.edition,data.page.slug,base,'en')}/><link rel="alternate" hreflang="es" href={route(data.edition,data.page.slug,base,'es')}/><meta name="theme-color" content={canvas(data.edition,data.page.index)}/></svelte:head>
<a class="skip-link" href="#content">{tr(data.locale,'Skip to content')}</a>
<Header edition={data.edition} page={data.page} {base} locale={data.locale}/>
<main class="current-page" id="content" data-page={data.page.slug||'home'} data-index={String(data.page.index).padStart(2,'0')}><Content edition={data.edition} {base} locale={data.locale}/></main>
<Footer edition={data.edition} page={data.page} {base} locale={data.locale}/>
<Menu edition={data.edition} page={data.page} {base} locale={data.locale}/>
<Gallery locale={data.locale}/>
