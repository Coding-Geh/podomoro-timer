<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Timer from '$lib/components/Timer.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isFullscreen = false;

	function toggleFullscreen() {
		if (browser) {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
				isFullscreen = true;
			} else {
				document.exitFullscreen();
				isFullscreen = false;
			}
		}
	}

	function handleFullscreenChange() {
		isFullscreen = !!document.fullscreenElement;
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('fullscreenchange', handleFullscreenChange);
		}

		return () => {
			if (browser) {
				document.removeEventListener('fullscreenchange', handleFullscreenChange);
			}
		};
	});
</script>

<svelte:head>
	<title>{$_('app.title')}</title>
	<meta name="description" content={$_('app.description')} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#if isFullscreen}
	<Timer {isFullscreen} {toggleFullscreen} />
{:else}
	<div class="elegant-bg">
		<!-- Floating Background Elements -->
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		
		<div class="container-responsive max-w-7xl mx-auto min-h-screen flex flex-col relative z-10">
			<!-- Compact Header -->
			<header class="flex items-center justify-between py-3 px-3 sm:px-4 lg:px-6 flex-shrink-0">
				<div class="flex items-center gap-2 min-w-0">
					<span class="text-lg sm:text-xl flex-shrink-0">🍅</span>
					<h1 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
						{$_('app.title')}
					</h1>
				</div>
				
				<div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
					<a 
						href="/docs" 
						class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						aria-label="Keyboard shortcuts documentation"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</a>
					<LanguageSwitcher />
					<ThemeToggle />
				</div>
			</header>

			<!-- Main Content with Sidebar -->
			<main class="flex-1 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 overflow-hidden">
				<div class="flex flex-col lg:flex-row gap-4 h-full">
					<!-- Timer - Main Content (Center) - DOMINANT -->
					<div class="flex-1 min-h-0 animate-fade-in">
						<Timer {isFullscreen} {toggleFullscreen} />
					</div>

					<!-- Sidebar - Tasks & Stats (Right) - COMPACT -->
					<div class="w-full lg:w-72 xl:w-80 animate-fade-in flex flex-col gap-4">
						<!-- Tasks Card -->
						<div class="card p-3 flex-1 overflow-y-auto">
							<TaskList />
						</div>
						
						<!-- Stats Card -->
						<div class="card p-3 flex-shrink-0">
							<Stats />
						</div>
					</div>
				</div>
			</main>

			<!-- Footer -->
			<footer class="text-center py-3 px-3 sm:px-4 lg:px-6 flex-shrink-0">
				<p class="text-xs text-gray-500 dark:text-gray-400">
					{$_('app.footer')} • © 2024 <span class="font-semibold text-blue-500">CodingGeh</span>
				</p>
			</footer>
		</div>
	</div>
{/if}


