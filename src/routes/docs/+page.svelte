<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let i18nReady = false;

	onMount(() => {
		setTimeout(() => {
			i18nReady = true;
		}, 100);
	});

	function goBack() {
		goto('/');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			goBack();
		}
	}
</script>

<svelte:head>
	<title>{i18nReady ? 'Keyboard Shortcuts - Pomodoro Timer' : 'Keyboard Shortcuts'}</title>
	<meta name="description" content="Complete guide to keyboard shortcuts for Pomodoro Timer" />
</svelte:head>

{#if i18nReady}
	<main class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
		<div class="container mx-auto px-4 py-6 max-w-4xl">
			<!-- Header -->
			<div class="flex items-center justify-between mb-8">
				<div class="flex items-center gap-4">
					<button 
						on:click={goBack}
						class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus-ring"
						aria-label="Go back to timer"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<div>
						<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
							⌨️ Keyboard Shortcuts
						</h1>
						<p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
							Master your productivity with these powerful shortcuts
						</p>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<ThemeToggle />
					<LanguageSwitcher />
				</div>
			</div>

			<!-- Keyboard Shortcuts Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<!-- Timer Controls -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						⏱️ Timer Controls
					</h2>
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Start/Pause Timer</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Toggle timer state</div>
							</div>
							<div class="flex gap-1">
								<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">Space</kbd>
								<span class="text-gray-400">or</span>
								<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">Enter</kbd>
							</div>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Reset Timer</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Reset to initial time</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">R</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Toggle Fullscreen</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Enter/exit fullscreen mode</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">F</kbd>
						</div>
					</div>
				</div>

				<!-- Timer Modes -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						🎯 Timer Modes
					</h2>
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div class="flex items-center gap-2">
								<span class="text-lg">🍅</span>
								<div>
									<div class="font-medium text-gray-900 dark:text-white">Focus Mode</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">25 minutes</div>
								</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">1</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div class="flex items-center gap-2">
								<span class="text-lg">☕</span>
								<div>
									<div class="font-medium text-gray-900 dark:text-white">Short Break</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">5 minutes</div>
								</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">2</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div class="flex items-center gap-2">
								<span class="text-lg">🌴</span>
								<div>
									<div class="font-medium text-gray-900 dark:text-white">Long Break</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">15 minutes</div>
								</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">3</kbd>
						</div>
					</div>
				</div>

				<!-- Navigation -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						🧭 Navigation
					</h2>
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Toggle Sidebar</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Show/hide tasks & stats</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">S</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">New Task Input</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Focus on task input field</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">N</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Exit Fullscreen</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Return to normal view</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">Esc</kbd>
						</div>
					</div>
				</div>

				<!-- Task Management -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						📋 Task Management
					</h2>
					<div class="space-y-3">
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Add Task</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Submit new task</div>
							</div>
							<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-500 rounded">Enter</kbd>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Drag & Drop</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Reorder tasks</div>
							</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Mouse</div>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<div class="font-medium text-gray-900 dark:text-white">Toggle Task</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">Mark as complete</div>
							</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Click</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Tips Section -->
			<div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
				<h2 class="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
					💡 Pro Tips
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div class="space-y-2">
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Use <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">Space</kbd> for quick start/pause during work</span>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Press <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">F</kbd> for distraction-free fullscreen mode</span>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Use number keys <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">1</kbd><kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">2</kbd><kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">3</kbd> to switch modes quickly</span>
						</div>
					</div>
					<div class="space-y-2">
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Press <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">N</kbd> to quickly add new tasks</span>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Use <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">S</kbd> to toggle sidebar visibility</span>
						</div>
						<div class="flex items-start gap-2">
							<span class="text-blue-600 dark:text-blue-400">•</span>
							<span class="text-blue-800 dark:text-blue-200">Press <kbd class="px-1 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 rounded">Esc</kbd> to exit any mode quickly</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Back Button -->
			<div class="text-center mt-8">
				<button 
					on:click={goBack}
					class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 focus-ring"
				>
					← Back to Timer
				</button>
			</div>
		</div>
	</main>
{:else}
	<!-- Loading state -->
	<main class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white flex items-center justify-center transition-colors duration-300">
		<div class="text-center">
			<div class="text-lg sm:text-xl font-light text-gray-900 dark:text-white mb-4">Loading...</div>
			<div class="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full loading-spinner mx-auto"></div>
		</div>
	</main>
{/if}
