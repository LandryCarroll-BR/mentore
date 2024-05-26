/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				accent: {
					// Backgrounds
					1: 'var(--accent-1)',
					2: 'var(--accent-2)',

					// Interactive components
					3: 'var(--accent-3)',
					4: 'var(--accent-4)',
					5: 'var(--accent-5)',

					// Borders and separators
					6: 'var(--accent-6)',
					7: 'var(--accent-7)',
					8: 'var(--accent-8)',

					// Solid colors
					9: 'var(--accent-9)',
					10: 'var(--accent-10)',

					// Accessible text
					11: 'var(--accent-11)',
					12: 'var(--accent-12)',

					// Functional colors
					surface: 'var(--accent-surface)',
					indicator: 'var(--accent-indicator)',
					track: 'var(--accent-track)',
					contrast: 'var(--accent-contrast)',
				},
				gray: {
					// Backgrounds
					1: 'var(--gray-1)',
					2: 'var(--gray-2)',

					// Interactive components
					3: 'var(--gray-3)',
					4: 'var(--gray-4)',
					5: 'var(--gray-5)',

					// Borders and separators
					6: 'var(--gray-6)',
					7: 'var(--gray-7)',
					8: 'var(--gray-8)',

					// Solid colors
					9: 'var(--gray-9)',
					10: 'var(--gray-10)',

					// Accessible text
					11: 'var(--gray-11)',
					12: 'var(--gray-12)',

					// Functional colors
					surface: 'var(--gray-surface)',
					indicator: 'var(--gray-indicator)',
					track: 'var(--gray-track)',
					contrast: 'var(--gray-contrast)',
				},
				red: {
					// Backgrounds
					1: 'var(--red-1)',
					2: 'var(--red-2)',

					// Interactive components
					3: 'var(--red-3)',
					4: 'var(--red-4)',
					5: 'var(--red-5)',

					// Borders and separators
					6: 'var(--red-6)',
					7: 'var(--red-7)',
					8: 'var(--red-8)',

					// Solid colors
					9: 'var(--red-9)',
					10: 'var(--red-10)',

					// Accessible text
					11: 'var(--red-11)',
					12: 'var(--red-12)',

					// Functional colors
					surface: 'var(--red-surface)',
					indicator: 'var(--red-indicator)',
					track: 'var(--red-track)',
					contrast: 'var(--red-contrast)',
				},
				sage: {
					// Backgrounds
					1: 'var(--sage-1)',
					2: 'var(--sage-2)',

					// Interactive components
					3: 'var(--sage-3)',
					4: 'var(--sage-4)',
					5: 'var(--sage-5)',

					// Borders and separators
					6: 'var(--sage-6)',
					7: 'var(--sage-7)',
					8: 'var(--sage-8)',

					// Solid colors
					9: 'var(--sage-9)',
					10: 'var(--sage-10)',

					// Accessible text
					11: 'var(--sage-11)',
					12: 'var(--sage-12)',

					// Functional colors
					surface: 'var(--sage-surface)',
					indicator: 'var(--sage-indicator)',
					track: 'var(--sage-track)',
					contrast: 'var(--sage-contrast)',
				},
				jade: {
					// Backgrounds
					1: 'var(--jade-1)',
					2: 'var(--jade-2)',

					// Interactive components
					3: 'var(--jade-3)',
					4: 'var(--jade-4)',
					5: 'var(--jade-5)',

					// Borders and separators
					6: 'var(--jade-6)',
					7: 'var(--jade-7)',
					8: 'var(--jade-8)',

					// Solid colors
					9: 'var(--jade-9)',
					10: 'var(--jade-10)',

					// Accessible text
					11: 'var(--jade-11)',
					12: 'var(--jade-12)',

					// Functional colors
					surface: 'var(--jade-surface)',
					indicator: 'var(--jade-indicator)',
					track: 'var(--jade-track)',
					contrast: 'var(--jade-contrast)',
				},
				background: {
					// Page background
					default: 'var(--color-background)',

					// Panel backgrouns, such as cards, tables, popovers, dropdowns, etc.
					'panel-translucent': 'var(--color-panel-translucent)',
					'panel-solid': 'var(--color-panel-solid)',

					// Form component backgrounds, such as text fields, checkboxes, select, etc.
					'color-surface': 'var(--color-surface)',

					// Dialog overlays
					'color-overlay': 'var(--color-overlay)',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
