<script>
	import '../lib/i18n';
	import '../app.css';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let i18nReady = false;

	// Simple approach: set ready after mount
	onMount(() => {
		if (browser) {
			// Set default locale if not already set
			if (!$locale) {
				locale.set('en');
			}
			// Mark as ready after a short delay to ensure i18n is loaded
			setTimeout(() => {
				i18nReady = true;
			}, 100);
		} else {
			// Server-side: mark as ready immediately
			i18nReady = true;
		}
	});
</script>

{#if i18nReady}
	<slot />
{:else}
	<!-- Loading state -->
	<div class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white flex items-center justify-center transition-colors duration-300">
		<div class="text-center">
			<div class="text-lg sm:text-xl font-light text-gray-900 dark:text-white mb-4">Loading Pomodoro Timer...</div>
			<div class="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin mx-auto"></div>
		</div>
	</div>
{/if}
