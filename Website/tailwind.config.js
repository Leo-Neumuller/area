/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
      extend: {
        colors: {
            primary: '#D9C6F4',
            gray: '#373637',
            customWhite: '#F3F3F3',
        },
        fontFamily: {
            SpaceGrotesk: ['Space Grotesk'],
            Logo: ['Zen Tokyo Zoo'],
        },
    },
  },
  plugins: [],
}

