<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { timerStore } from '$lib/stores/timer';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let isFullscreen = false;
	export let toggleFullscreen: () => void;

	let customMinutes = 25;
	let customSeconds = 0;
	let audioContext: AudioContext | null = null;
	let notificationSound: AudioBuffer | null = null;

	$: timer = $timerStore;
	$: progress = timer.totalTime > 0 ? ((timer.totalTime - timer.timeLeft) / timer.totalTime) * 100 : 0;
	$: timeDisplay = formatTime(timer.timeLeft);
	$: statusText = timer.isRunning 
		? (timer.mode === 'focus' ? $_('timer.focusing') : $_('timer.break'))
		: timer.timeLeft === timer.totalTime 
			? $_('timer.ready') 
			: $_('timer.paused');

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function handleStart() {
		timerStore.start();
	}

	function handlePause() {
		timerStore.pause();
	}

	function handleReset() {
		timerStore.reset();
	}

	function handleModeChange(mode: 'focus' | 'shortBreak' | 'longBreak') {
		timerStore.setMode(mode);
	}

	function handleCustomTime() {
		const totalSeconds = customMinutes * 60 + customSeconds;
		if (totalSeconds > 0) {
			timerStore.setCustomTime(totalSeconds);
		}
	}

	function requestNotificationPermission() {
		if ('Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission();
		}
	}

	function playNotificationSound() {
		if (audioContext && notificationSound) {
			const source = audioContext.createBufferSource();
			source.buffer = notificationSound;
			source.connect(audioContext.destination);
			source.start();
		}
	}

	function createNotificationSound() {
		if (browser && 'AudioContext' in window) {
			audioContext = new AudioContext();
			const sampleRate = audioContext.sampleRate;
			const duration = 0.5;
			const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
			const data = buffer.getChannelData(0);

			for (let i = 0; i < buffer.length; i++) {
				const t = i / sampleRate;
				data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 3) * 0.3;
			}

			notificationSound = buffer;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement) return;
		
		switch (event.key) {
			case ' ':
			case 'Enter':
				event.preventDefault();
				if (timer.isRunning) {
					handlePause();
				} else {
					handleStart();
				}
				break;
			case 'r':
			case 'R':
				event.preventDefault();
				handleReset();
				break;
			case 'f':
			case 'F':
				event.preventDefault();
				toggleFullscreen();
				break;
			case '1':
				event.preventDefault();
				handleModeChange('focus');
				break;
			case '2':
				event.preventDefault();
				handleModeChange('shortBreak');
				break;
			case '3':
				event.preventDefault();
				handleModeChange('longBreak');
				break;
		}
	}

	// Watch for timer completion
	$: if (timer.timeLeft === 0 && timer.totalTime > 0) {
		playNotificationSound();
		if ('Notification' in window && Notification.permission === 'granted') {
			const title = timer.mode === 'focus' ? 'Focus Session Complete!' : 'Break Time!';
			const body = timer.mode === 'focus' ? 'Great job! Time for a break.' : 'Break is over. Ready to focus?';
			new Notification(title, { body, icon: '/favicon.svg' });
		}
	}

	onMount(() => {
		requestNotificationPermission();
		createNotificationSound();
		if (browser) {
			document.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeyDown);
		}
	});
</script>

{#if isFullscreen}
	<!-- Fullscreen Timer -->
	<div class="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
		<!-- Animated Background -->
		<div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"></div>
		<div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 animate-pulse"></div>
		
		<!-- Floating Elements for Fullscreen -->
		<div class="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full animate-pulse"></div>
		<div class="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full animate-pulse" style="animation-delay: -2s;"></div>
		<div class="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-blue-500/10 dark:from-pink-500/20 dark:to-blue-500/20 rounded-full animate-pulse" style="animation-delay: -4s;"></div>
		<div class="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full animate-pulse" style="animation-delay: -6s;"></div>
		
		<div class="text-center animate-fade-in w-full max-w-4xl relative z-10">
			<!-- Close Button - Top Right -->
			<button 
				on:click={toggleFullscreen}
				class="absolute top-4 right-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center w-12 h-12 transition-all duration-200 z-20"
				aria-label="Exit Fullscreen Mode"
			>
				<svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Timer Circle - 80% of screen -->
			<div class="relative inline-block mb-8 sm:mb-12">
				<svg class="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
					<circle cx="50" cy="50" r="45" fill="none" stroke="var(--gray-200)" class="dark:stroke-gray-600" stroke-width="2" />
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="var(--primary)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-dasharray="283"
						stroke-dashoffset="{283 - (progress * 283 / 100)}"
						style="transition: stroke-dashoffset var(--transition-slow);"
					/>
				</svg>
				
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="text-center">
						<div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 dark:text-white mb-3 sm:mb-6 font-mono animate-pulse">
							{timeDisplay}
						</div>
						<div class="text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium">
							{statusText}
						</div>
					</div>
				</div>
			</div>

			<!-- Controls -->
			<div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
				{#if !timer.isRunning}
					<button 
						on:click={handleStart}
						class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200"
					>
						<svg class="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M8 5v14l11-7z"/>
						</svg>
						<span class="hidden sm:inline text-lg">{$_('timer.start')}</span>
					</button>
				{:else}
					<button 
						on:click={handlePause}
						class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200"
					>
						<svg class="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
						</svg>
						<span class="hidden sm:inline text-lg">{$_('timer.pause')}</span>
					</button>
				{/if}
				
				<button 
					on:click={handleReset}
					class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200"
				>
					<svg class="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					<span class="hidden sm:inline text-lg">{$_('timer.reset')}</span>
				</button>
			</div>
		</div>
	</div>
{:else}
	<!-- Normal Timer -->
	<div class="card p-4 sm:p-6 lg:p-8 animate-fade-in h-full overflow-hidden relative flex flex-col">
		<!-- Timer Controls - Responsive Layout -->
		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
			<!-- Timer Modes - Responsive Grid -->
			<div class="grid grid-cols-3 gap-1 sm:gap-2 flex-1">
				<button 
					on:click={() => handleModeChange('focus')}
					class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-all focus min-w-0 h-12 {timer.mode === 'focus' ? 'bg-red-500 text-white border-red-600' : 'card text-gray-900 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900/20'}"
				>
					<span class="text-base sm:text-lg flex-shrink-0">🍅</span>
					<div class="text-left min-w-0 flex-1">
						<div class="font-semibold text-xs truncate">{$_('timer.modes.focus')}</div>
						<div class="text-xs opacity-80 truncate">{$_('timer.durations.focus')}</div>
					</div>
				</button>
				
				<button 
					on:click={() => handleModeChange('shortBreak')}
					class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-all focus min-w-0 h-12 {timer.mode === 'shortBreak' ? 'bg-emerald-500 text-white border-emerald-600' : 'card text-gray-900 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}"
				>
					<span class="text-base sm:text-lg flex-shrink-0">☕</span>
					<div class="text-left min-w-0 flex-1">
						<div class="font-semibold text-xs truncate">{$_('timer.modes.shortBreak')}</div>
						<div class="text-xs opacity-80 truncate">{$_('timer.durations.shortBreak')}</div>
					</div>
				</button>
				
				<button 
					on:click={() => handleModeChange('longBreak')}
					class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-all focus min-w-0 h-12 {timer.mode === 'longBreak' ? 'bg-amber-500 text-white border-amber-600' : 'card text-gray-900 dark:text-gray-100 hover:bg-amber-50 dark:hover:bg-amber-900/20'}"
				>
					<span class="text-base sm:text-lg flex-shrink-0">🌴</span>
					<div class="text-left min-w-0 flex-1">
						<div class="font-semibold text-xs truncate">{$_('timer.modes.longBreak')}</div>
						<div class="text-xs opacity-80 truncate">{$_('timer.durations.longBreak')}</div>
					</div>
				</button>
			</div>

			<!-- Custom Timer & Fullscreen - Responsive Row -->
			<div class="flex items-center gap-2 sm:gap-3">
				<!-- Custom Timer - Simple Card Design -->
				<div class="card p-2 flex items-center gap-1 sm:gap-2 h-12 flex-1 sm:flex-shrink-0">
					<input 
						type="number" 
						bind:value={customMinutes}
						min="1" 
						max="120" 
						placeholder="25"
						aria-label="Custom minutes"
						class="w-12 sm:w-16 text-center font-mono text-xs sm:text-sm h-8 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
					>
					<span class="text-gray-500 dark:text-gray-400 font-mono text-xs sm:text-sm">:</span>
					<input 
						type="number" 
						bind:value={customSeconds}
						min="0" 
						max="59" 
						placeholder="0"
						aria-label="Custom seconds"
						class="w-12 sm:w-16 text-center font-mono text-xs sm:text-sm h-8 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
					>
					<button 
						on:click={handleCustomTime}
						class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-2 sm:px-3 text-xs sm:text-sm h-8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{$_('timer.set')}
					</button>
				</div>

				<!-- Fullscreen Button - Fixed Width -->
				<button 
					on:click={toggleFullscreen}
					class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center flex-shrink-0 h-12 w-12 transition-all duration-200"
					aria-label="Enter Fullscreen Mode"
				>
					<svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Timer Display -->
		<div class="text-center mb-6 sm:mb-8">
			<div class="relative inline-block">
				<svg class="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="var(--gray-200)"
						class="dark:stroke-gray-600"
						stroke-width="2"
					/>
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="var(--primary)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-dasharray="283"
						stroke-dashoffset="{283 - (progress * 283 / 100)}"
						style="transition: stroke-dashoffset var(--transition-slow);"
					/>
				</svg>
				
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="text-center">
						<div class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 dark:text-white mb-2 sm:mb-4 font-mono animate-pulse">
							{timeDisplay}
						</div>
						<div class="text-gray-700 dark:text-gray-300 text-base sm:text-lg lg:text-xl xl:text-2xl font-medium">
							{statusText}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Timer Controls -->
		<div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
			{#if !timer.isRunning}
				<button 
					on:click={handleStart}
					class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					<svg class="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M8 5v14l11-7z"/>
					</svg>
					<span class="text-base sm:text-lg font-semibold">{$_('timer.start')}</span>
				</button>
			{:else}
				<button 
					on:click={handlePause}
					class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					<svg class="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
					</svg>
					<span class="text-base sm:text-lg font-semibold">{$_('timer.pause')}</span>
				</button>
			{/if}
			
			<button 
				on:click={handleReset}
				class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-3 w-full sm:w-auto transition-all duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				<span class="text-base sm:text-lg font-semibold">{$_('timer.reset')}</span>
			</button>
		</div>
	</div>
{/if}
