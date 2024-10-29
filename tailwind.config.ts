import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

const config = withMT({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        bg_image: "url('../public/assets/images/hero-image.png')",
        greencard: "url('../public/assets/images/greencardbg.png')",
        bluecard: "url('../public/assets/images/bluecardbg.png')",
      },
      colors: {
        'background-gray': '#F2F4F7',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: '#248048',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontSize: {
        xsm: ['13px', '16px'],
        xxs: ['10px', '16px'],
      },
      height: {
        layout: 'calc(100vh - 85px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}) satisfies Config;

export default config;
