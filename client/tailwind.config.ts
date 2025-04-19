// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: '#0056D2', // Coursera blue
			dark: '#004BB4',    // Darker blue for hover states
			light: '#D8E8FF',   // Light blue for backgrounds
		  },
		  customgreys: {
			dirtyGrey: '#9DA0A4',
		  },
		  background: '#F5F7FA',
		  border: '#EEF0F2',
		},
		fontFamily: {
		  sans: ['var(--font-dm-sans)', 'sans-serif'],
		},
		boxShadow: {
		  'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
		  'nav': '0 2px 10px rgba(0, 0, 0, 0.05)',
		},
	  },
	},
	plugins: [],
  };
  