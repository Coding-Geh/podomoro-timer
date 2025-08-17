<script>
	import '../lib/i18n';
	import '../app.css';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Ensure locale is set on client side
	onMount(() => {
		if (browser) {
			// Set default locale if not already set
			if (!$locale) {
				locale.set('en');
			}
		}
	});
</script>

<slot />
