<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { timerStore } from '$lib/stores/timer';
	import { taskStore } from '$lib/stores/tasks';
	import { onMount } from 'svelte';

	let currentQuoteIndex = 0;
	let motivationQuotes = [
		$_('stats.motivation.1'),
		$_('stats.motivation.2'),
		$_('stats.motivation.3'),
		$_('stats.motivation.4'),
		$_('stats.motivation.5')
	];

	onMount(() => {
		// Rotate motivation quotes every 10 seconds
		const interval = setInterval(() => {
			currentQuoteIndex = (currentQuoteIndex + 1) % motivationQuotes.length;
		}, 10000);

		return () => clearInterval(interval);
	});

	$: timer = $timerStore;
	$: taskStats = taskStore.getStats();
	$: focusProgress = timer.totalSessions > 0 ? (timer.completedSessions / timer.totalSessions) * 100 : 0;
	$: taskProgress = taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0;
</script>

<div class="animate-fade-in h-full overflow-hidden flex flex-col">
	<!-- Header -->
	<div class="flex items-center gap-2 sm:gap-3 mb-4 flex-shrink-0">
		<span class="text-xl flex-shrink-0">📊</span>
		<h2 class="text-lg font-bold text-gray-900 dark:text-white truncate">
			{$_('stats.title')}
		</h2>
	</div>

	<!-- Focus Progress -->
	<div class="mb-4 flex-shrink-0">
		<div class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
			<span class="font-medium truncate">{$_('stats.focusProgress')}</span>
			<span class="font-bold text-base flex-shrink-0">{Math.round(focusProgress)}%</span>
		</div>
		<div class="progress h-2">
			<div 
				class="progress-fill"
				style="width: {focusProgress}%; background: var(--success);"
			></div>
		</div>
	</div>

	<!-- Key Stats Grid -->
	<div class="grid grid-cols-2 gap-3 mb-4 flex-shrink-0">
		<div class="card p-3 text-center">
			<div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
				<span class="text-white text-sm font-bold">{timer.completedSessions}</span>
			</div>
			<div class="text-xs text-gray-600 dark:text-gray-400 truncate">
				{$_('stats.sessions')}
			</div>
		</div>

		<div class="card p-3 text-center">
			<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
				<span class="text-white text-sm font-bold">{Math.floor(timer.totalFocusTime / 60)}</span>
			</div>
			<div class="text-xs text-gray-600 dark:text-gray-400 truncate">
				{$_('stats.focusHours')}
			</div>
		</div>

		<div class="card p-3 text-center">
			<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
				<span class="text-white text-sm font-bold">{taskStats.completed}</span>
			</div>
			<div class="text-xs text-gray-600 dark:text-gray-400 truncate">
				{$_('stats.tasksCompleted')}
			</div>
		</div>

		<div class="card p-3 text-center">
			<div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
				<span class="text-white text-sm font-bold">{Math.round(taskProgress)}%</span>
			</div>
			<div class="text-xs text-gray-600 dark:text-gray-400 truncate">
				{$_('stats.completionRate')}
			</div>
		</div>
	</div>

	<!-- Task Progress -->
	<div class="mb-4 flex-shrink-0">
		<div class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
			<span class="font-medium truncate">{$_('stats.taskProgress')}</span>
			<span class="font-bold text-base flex-shrink-0">{Math.round(taskProgress)}%</span>
		</div>
		<div class="progress h-2">
			<div 
				class="progress-fill"
				style="width: {taskProgress}%; background: var(--primary);"
			></div>
		</div>
	</div>

	<!-- Motivation Quote -->
	<div class="flex-1 flex items-center justify-center min-h-0">
		<div class="text-center p-4">
			<div class="text-3xl mb-3">💪</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
				{motivationQuotes[currentQuoteIndex]}
			</p>
		</div>
	</div>

	<!-- Summary -->
	<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
		<div class="text-xs text-gray-500 dark:text-gray-400 text-center">
			{$_('stats.summary')}: {timer.completedSessions} {$_('stats.sessions')} • {taskStats.completed} {$_('stats.tasks')}
		</div>
	</div>
</div>
