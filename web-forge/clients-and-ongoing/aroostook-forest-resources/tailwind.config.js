/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        'secondary-accent': 'var(--secondary-accent)',
        border: 'var(--border)',
        input: 'var(--input)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      letterSpacing: {
        tighterest: '-0.06em',
        tighter: '-0.04em',
        body: '-0.01em',
        widerest: '0.2em',
      },
      lineHeight: {
        snugger: '1.1',
        relaxedest: '1.75',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.25, 0, 0, 1)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
