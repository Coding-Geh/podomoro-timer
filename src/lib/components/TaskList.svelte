<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { taskStore } from '$lib/stores/tasks';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let newTask = '';
	let draggedTaskId: string | null = null;
	let draggedOverTaskId: string | null = null;

	function addTask() {
		if (newTask.trim()) {
			taskStore.addTask(newTask.trim());
			newTask = '';
		}
	}

	function toggleTask(id: string) {
		taskStore.toggleTask(id);
	}

	function deleteTask(id: string) {
		taskStore.deleteTask(id);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTask();
		}
	}

	function handleDragStart(event: DragEvent, taskId: string) {
		if (event.dataTransfer) {
			draggedTaskId = taskId;
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/plain', taskId);
		}
	}

	function handleDragOver(event: DragEvent, taskId: string) {
		event.preventDefault();
		if (draggedTaskId !== taskId) {
			draggedOverTaskId = taskId;
		}
	}

	function handleDragLeave() {
		draggedOverTaskId = null;
	}

	function handleDrop(event: DragEvent, taskId: string) {
		event.preventDefault();
		if (draggedTaskId && draggedTaskId !== taskId) {
			taskStore.moveTask(draggedTaskId, taskId);
		}
		draggedTaskId = null;
		draggedOverTaskId = null;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement) return;
		
		switch (event.key) {
			case 'n':
			case 'N':
				event.preventDefault();
				const input = document.querySelector('input[aria-label="New task input"]') as HTMLInputElement;
				if (input) {
					input.focus();
				}
				break;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeyDown);
		}
	});

	$: taskStats = taskStore.getStats();
</script>

<div class="animate-fade-in h-full overflow-hidden flex flex-col">
	<!-- Header -->
	<div class="flex items-center gap-2 sm:gap-3 mb-4 flex-shrink-0">
		<span class="text-xl flex-shrink-0">📋</span>
		<h2 class="text-lg font-bold text-gray-900 dark:text-white truncate">
			{$_('tasks.title')}
		</h2>
	</div>
	
	<!-- Add Task Form -->
	<div class="flex flex-col sm:flex-row gap-2 mb-4 flex-shrink-0">
		<input 
			type="text" 
			bind:value={newTask}
			on:keypress={handleKeyPress}
			placeholder={$_('tasks.addPlaceholder')}
			aria-label="New task input"
			class="flex-1 min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
		>
		<button 
			on:click={addTask}
			class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
		>
			{$_('tasks.add')}
		</button>
	</div>

	<!-- Task Stats -->
	<div class="flex items-center justify-between mb-4 flex-shrink-0">
		<div class="text-sm text-gray-600 dark:text-gray-400">
			{$_('tasks.total')}: <span class="font-semibold text-gray-900 dark:text-white">{taskStats.total}</span>
		</div>
		<div class="text-sm text-gray-600 dark:text-gray-400">
			{$_('tasks.completed')}: <span class="font-semibold text-gray-900 dark:text-white">{taskStats.completed}</span>
		</div>
	</div>

	<!-- Task List -->
	<div class="flex-1 overflow-y-auto min-h-0">
		{#if $taskStore.length === 0}
			<div class="text-center py-8">
				<div class="text-4xl mb-4">📝</div>
				<p class="text-gray-500 dark:text-gray-400 text-sm">
					{$_('tasks.empty')}
				</p>
			</div>
		{:else}
			<div class="space-y-2">
				{#each $taskStore as task (task.id)}
					<div 
						class="card p-3 transition-all cursor-move group {task.completed ? 'opacity-60' : ''} {draggedOverTaskId === task.id ? 'ring-2 ring-blue-500' : ''}"
						draggable="true"
						role="button"
						tabindex="0"
						on:dragstart={(e) => handleDragStart(e, task.id)}
						on:dragover={(e) => handleDragOver(e, task.id)}
						on:dragleave={handleDragLeave}
						on:drop={(e) => handleDrop(e, task.id)}
					>
						<div class="flex items-start gap-3">
							<button 
								on:click={() => toggleTask(task.id)}
								class="flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {task.completed ? 'bg-blue-500 border-blue-500' : 'hover:border-blue-500'}"
								aria-label={task.completed ? $_('tasks.uncomplete') : $_('tasks.complete')}
							>
								{#if task.completed}
									<svg class="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
									</svg>
								{/if}
							</button>
							
							<div class="flex-1 min-w-0">
								<p class="text-sm text-gray-900 dark:text-white {task.completed ? 'line-through' : ''} break-words">
									{task.text}
								</p>
								<div class="flex items-center gap-2 mt-2">
									<span class="text-xs text-gray-500 dark:text-gray-400">
										{task.createdAt.toLocaleDateString()}
									</span>
									{#if task.completed}
										<span class="text-xs text-green-600 dark:text-green-400">
											{$_('tasks.completed')}
										</span>
									{/if}
								</div>
							</div>
							
							<button 
								on:click={() => deleteTask(task.id)}
								class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"
								aria-label={$_('tasks.delete')}
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Keyboard Shortcuts -->
	<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
		<p class="text-xs text-gray-500 dark:text-gray-400">
			{$_('tasks.shortcuts')}: <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">N</kbd> {$_('tasks.shortcutsNew')}
		</p>
	</div>
</div>
