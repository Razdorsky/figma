<script lang="ts">
import {base,route} from '#lib/enhanced/site.ts';
import {tr} from '#lib/enhanced/i18n.ts';
import Header from '#lib/enhanced/components/Header.svelte';
import Footer from '#lib/enhanced/components/Footer.svelte';
import Menu from '#lib/enhanced/components/Menu.svelte';
import Gallery from '#lib/enhanced/components/Gallery.svelte';
import {canvas} from '#lib/enhanced/site.ts';
import type {PageData} from './$types';
import P01 from '#lib/enhanced/pages/P01.svelte';
import P02 from '#lib/enhanced/pages/P02.svelte';
import P03 from '#lib/enhanced/pages/P03.svelte';
import P04 from '#lib/enhanced/pages/P04.svelte';
import P05 from '#lib/enhanced/pages/P05.svelte';
import P06 from '#lib/enhanced/pages/P06.svelte';
import P07 from '#lib/enhanced/pages/P07.svelte';
import P08 from '#lib/enhanced/pages/P08.svelte';
import P09 from '#lib/enhanced/pages/P09.svelte';
import P10 from '#lib/enhanced/pages/P10.svelte';
import P11 from '#lib/enhanced/pages/P11.svelte';
import P12 from '#lib/enhanced/pages/P12.svelte';
import P13 from '#lib/enhanced/pages/P13.svelte';
import P14 from '#lib/enhanced/pages/P14.svelte';
import P15 from '#lib/enhanced/pages/P15.svelte';
import P16 from '#lib/enhanced/pages/P16.svelte';
import P17 from '#lib/enhanced/pages/P17.svelte';
import P18 from '#lib/enhanced/pages/P18.svelte';
import P19 from '#lib/enhanced/pages/P19.svelte';
import P20 from '#lib/enhanced/pages/P20.svelte';
import P21 from '#lib/enhanced/pages/P21.svelte';
import P22 from '#lib/enhanced/pages/P22.svelte';
import P23 from '#lib/enhanced/pages/P23.svelte';
import P24 from '#lib/enhanced/pages/P24.svelte';
import P25 from '#lib/enhanced/pages/P25.svelte';
import P26 from '#lib/enhanced/pages/P26.svelte';
import P27 from '#lib/enhanced/pages/P27.svelte';
import P28 from '#lib/enhanced/pages/P28.svelte';
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
