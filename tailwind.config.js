module.exports = {
  darkMode: "class",
  purge: ['./index.html', './src/**/*.{svelte,js,ts}'],

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp"), require('daisyui')],

  daisyui: {
    styled: true,
    themes: [
        'light',
        'dark'
    ],
  },

};
