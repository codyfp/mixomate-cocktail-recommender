import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'custom-orange': 'rgb(250, 145, 39)',
      },
      colors: {
        'custom-orange': 'rgb(250, 145, 39)',
        'brand': 'rgb(250, 145, 39)',
        'dark-orange': 'rgb(200, 116, 31)',
      },
    },
  },
  plugins: [],
}
export default config
