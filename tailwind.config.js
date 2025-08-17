/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Custom color palette for better consistency
				primary: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
				},
				accent: {
					50: '#fef7ee',
					100: '#fdedd4',
					200: '#fbd7a8',
					300: '#f8bb71',
					400: '#f59538',
					500: '#f2741e',
					600: '#e35a13',
					700: '#bc4412',
					800: '#963715',
					900: '#7a3016',
				}
			},
			fontFamily: {
				// Custom font stack for better readability
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			animation: {
				// Custom animations
				'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'timer-progress': 'timer-progress 0.5s ease-out',
				'loading-spinner': 'loading-spinner 1s linear infinite',
			},
			keyframes: {
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'timer-progress': {
					'from': { strokeDashoffset: '283' },
					'to': { strokeDashoffset: '0' },
				},
				'loading-spinner': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			spacing: {
				// Custom spacing for better responsive design
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			screens: {
				// Custom breakpoints for better mobile experience
				'xs': '475px',
				'3xl': '1600px',
			},
			boxShadow: {
				// Custom shadows for better depth
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'strong': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			},
		},
	},
	plugins: [
		// Custom plugin for better responsive utilities
		function({ addUtilities, theme }) {
			const newUtilities = {
				'.text-responsive-xs': {
					fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
				},
				'.text-responsive-sm': {
					fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
				},
				'.text-responsive-base': {
					fontSize: 'clamp(1rem, 3vw, 1.125rem)',
				},
				'.text-responsive-lg': {
					fontSize: 'clamp(1.125rem, 3.5vw, 1.25rem)',
				},
				'.text-responsive-xl': {
					fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
				},
			}
			addUtilities(newUtilities)
		}
	],
};
