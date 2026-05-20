/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e1a',
          darker: '#060912',
          blue: '#00d4ff',
          red: '#ff3860',
          green: '#00ff88',
          yellow: '#ffdd00',
          purple: '#7c3aed',
          gray: '#1a2235',
          light: '#2a3a5c',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00d4ff, 0 0 20px #00d4ff40',
        'neon-red': '0 0 10px #ff3860, 0 0 20px #ff386040',
        'neon-green': '0 0 10px #00ff88, 0 0 20px #00ff8840',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff40' },
          '100%': { boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff60' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
