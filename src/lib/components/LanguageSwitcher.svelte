<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let isOpen = false;
	let selectedLanguage = $locale;

	const languages = [
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'id', name: 'Indonesia', flag: '🇮🇩' }
	];

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLanguage(langCode: string) {
		selectedLanguage = langCode;
		locale.set(langCode);
		isOpen = false;
		dispatch('change', { language: langCode });
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-switcher')) {
			isOpen = false;
		}
	}

	// Close dropdown when clicking outside
	if (typeof window !== 'undefined') {
		window.addEventListener('click', handleClickOutside);
	}
</script>

<div class="language-switcher relative">
	<!-- Language Button -->
	<button 
		on:click={toggleDropdown}
		class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 min-w-0"
		aria-label="Select language"
		aria-expanded={isOpen}
		aria-haspopup="listbox"
	>
		<div class="flex items-center gap-2">
			<span class="text-base flex-shrink-0">
				{languages.find(lang => lang.code === selectedLanguage)?.flag || '🌐'}
			</span>
			<span class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate hidden sm:block">
				{languages.find(lang => lang.code === selectedLanguage)?.name || 'Language'}
			</span>
			<svg class="w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 {isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</button>

	<!-- Language Dropdown -->
	{#if isOpen}
		<div 
			class="absolute bottom-full right-0 mb-2 card p-2 min-w-40 z-50 animate-fade-in"
			role="listbox"
			aria-label="Language options"
		>
			{#each languages as language}
				<button 
					on:click={() => selectLanguage(language.code)}
					class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 focus {selectedLanguage === language.code ? 'bg-gray-100 dark:bg-gray-700' : ''}"
					role="option"
					aria-selected={selectedLanguage === language.code}
				>
					<span class="text-base flex-shrink-0">{language.flag}</span>
					<span class="text-sm font-medium text-gray-900 dark:text-white truncate">
						{language.name}
					</span>
					{#if selectedLanguage === language.code}
						<svg class="w-4 h-4 ml-auto text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
