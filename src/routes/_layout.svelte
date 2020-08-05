<script context="module">
  import { waitLocale } from 'svelte-i18n'

  export async function preload() {
    // awaits for the loading of the 'en-US' and 'en' dictionaries
    return waitLocale()
  }
</script>

<script>
	import Header from '../components/Header.svelte';
	// import { setupI18n, isLocaleLoaded, locale, dir } from '../services/i18n/i18n.service';

	// $: if (!$isLocaleLoaded) {
  //       setupI18n({ withLocale: 'en' });
	// }
	// $: { document.dir = $dir; }
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Header />

<main>
	<slot></slot>
</main>
