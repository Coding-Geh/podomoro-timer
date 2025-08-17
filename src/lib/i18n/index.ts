import { init, register, getLocaleFromNavigator, waitLocale } from 'svelte-i18n';

// Register locales
register('en', () => import('./locales/en.json'));
register('id', () => import('./locales/id.json'));

// Initialize i18n with proper fallback
init({
	fallbackLocale: 'en',
	initialLocale: 'en', // Always start with 'en' to avoid hydration issues
	beforeLocaleChange: () => {
		// Optional: Add any logic before locale changes
	},
	afterLocaleChange: () => {
		// Optional: Add any logic after locale changes
	}
});

// Export waitLocale for use in components
export { waitLocale };
