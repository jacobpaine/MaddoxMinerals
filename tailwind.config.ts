import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mineral: {
          dark: '#1a0f2e',
          mid: '#2d1b5e',
          light: '#4a2d8a',
          gold: '#f0c040',
          gem: '#40c0f0',
          earth: '#8b6340',
        },
      },
      fontFamily: {
        display: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
