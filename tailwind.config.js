/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#0F0D0A',
        'bg-surface':  '#161310',
        'bg-elevated': '#1E1A15',
        'bg-card':     '#1A1612',
        'accent':      '#FF5C1A',
        'accent-dim':  'rgba(255,92,26,0.12)',
        'text-primary':'#F5F0E8',
        'text-secondary':'#C4B99A',
        'text-muted':  '#7A6F5E',
      },
      fontFamily: {
        syne:   ['"Syne"', 'sans-serif'],
        dm:     ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'marquee':    'marquee 35s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'blob':       'blob 10s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob:     { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(20px,-20px) scale(1.04)' }, '66%': { transform: 'translate(-10px,10px) scale(0.97)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
