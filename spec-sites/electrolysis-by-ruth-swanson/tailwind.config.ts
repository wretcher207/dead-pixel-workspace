import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F4',
          50: '#FEFEFE',
          100: '#FAF8F4',
          200: '#F2EDE6',
          300: '#E8DDD1',
        },
        parchment: '#E8DDD1',
        blush: {
          light: '#EFE0D9',
          DEFAULT: '#D4B5A8',
          dark: '#BF9A8C',
        },
        rose: {
          DEFAULT: '#B8907A',
          dark: '#9A7260',
          light: '#D4B5A8',
        },
        sage: {
          light: '#B5C6B7',
          DEFAULT: '#8A9E8C',
          dark: '#6B7E6D',
        },
        sand: {
          light: '#E2D5C4',
          DEFAULT: '#C9B49A',
          dark: '#A8936E',
        },
        charcoal: {
          DEFAULT: '#2A2522',
          light: '#3D3936',
          lighter: '#524E4B',
        },
        'warm-gray': '#6B6260',
        mist: '#9E9894',
        linen: '#F5F0E8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2' }],
        'heading-md': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25' }],
        'heading-sm': ['clamp(1.1rem, 1.5vw, 1.375rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
        'section-lg': '8rem',
      },
      maxWidth: {
        'site': '1200px',
        'prose-wide': '72ch',
        'prose-narrow': '58ch',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(42, 37, 34, 0.06)',
        'card': '0 4px 30px rgba(42, 37, 34, 0.08)',
        'elevated': '0 8px 40px rgba(42, 37, 34, 0.12)',
        'inset-subtle': 'inset 0 1px 3px rgba(42, 37, 34, 0.06)',
      },
      backgroundImage: {
        'texture-linen': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23FAF8F4'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23F0ECE5' opacity='0.4'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23F0ECE5' opacity='0.3'/%3E%3C/svg%3E\")",
        'gradient-warm': 'linear-gradient(135deg, #FAF8F4 0%, #F2EDE6 100%)',
        'gradient-parchment': 'linear-gradient(135deg, #F2EDE6 0%, #E8DDD1 100%)',
        'gradient-hero': 'linear-gradient(120deg, #FAF8F4 0%, #F5EDE3 40%, #EDE0D5 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [typography],
}

export default config
