import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
	if (browser) {
		const saved = localStorage.getItem('theme');
		if (saved) return saved;
		
		// Check system preference
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
	}
	return 'light';
};

export const theme = writable<'light' | 'dark'>(getInitialTheme());

// Subscribe to theme changes and save to localStorage
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		
		// Update document class for Tailwind dark mode
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}

export function toggleTheme() {
	theme.update(current => current === 'light' ? 'dark' : 'light');
}
