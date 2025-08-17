import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

// Register locales
register('en', () => import('./locales/en.json'));
register('id', () => import('./locales/id.json'));

// Initialize i18n with proper fallback
init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator() || 'en', // Use navigator locale or fallback to 'en'
	beforeLocaleChange: () => {
		// Optional: Add any logic before locale changes
	},
	afterLocaleChange: () => {
		// Optional: Add any logic after locale changes
	}
});
