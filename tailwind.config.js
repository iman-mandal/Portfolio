export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 48px rgba(99, 102, 241, 0.25)',
      },
      colors: {
        surface: '#090a10',
        panel: 'rgba(15, 23, 42, 0.72)',
        accent: '#8b5cf6',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(59,130,246,0.22), transparent 36%), radial-gradient(circle at bottom right, rgba(139,92,246,0.24), transparent 28%)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
