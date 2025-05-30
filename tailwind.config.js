/* Exemplo de conteúdo para tailwind.config.js - substitua pelo conteúdo real se necessário */
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'brand-purple': '#5b3a8c',
  			'brand-green': '#86c540',
  			'brand-light-green': '#eaf4d8',
  			'brand-hover-purple': '#9a68c9',
  			'brand-hover-green': '#6a9b33',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		fontFamily: {
  			futuru: [
  				'Futuru',
  				'sans-serif'
  			],
  			behindnineties: [
  				'BehindTheNineties',
  				'sans-serif'
  			]
  		},
  		typography: (theme) => ({
  			DEFAULT: {
  				css: {
  					color: theme('colors.gray.700'),
  					a: {
  						color: theme('colors.brand-green'),
  						'&:hover': {
  							color: theme('colors.brand-hover-green'),
  						},
  						textDecoration: 'none',
  					},
  					'h1, h2, h3, h4, h5, h6': {
  						fontFamily: theme('fontFamily.futuru', ['Futuru', 'sans-serif']).join(', '),
  						color: theme('colors.brand-purple'),
  					},
  					strong: {
  						color: theme('colors.brand-purple'),
  					},
  					blockquote: {
  						borderColor: theme('colors.brand-light-green'),
  						color: theme('colors.gray.600'),
  					},
  				},
  			},
  		}),
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

