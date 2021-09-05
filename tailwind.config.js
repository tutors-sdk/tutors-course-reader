module.exports = {
  darkMode: "class",
  purge: {
    content: [
      "./src/**/*.{svelte,js,ts}",
    ],
    options: {
      safelist: [
        /data-theme$/, /info$/, /success$/, /warning$/, /error$/, /blue$/, /font$/
      ]
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp"), require('daisyui')],

  daisyui: {
    styled: true,
    themes: [
      {
        'tutors': {
          'primary': '#37919B',
          'primary-focus': '#234d92',
          'primary-content': '#ffffff',
          'secondary': '#cb31b8',
          'secondary-focus': '#68195f',
          'secondary-content': '#ffffff',
          'accent': '#33d447',
          'accent-focus': '#21a92e',
          'accent-content': '#ffffff',
          'neutral': '#2d2a32',
          'neutral-focus': '#383b48',
          'neutral-content': '#ffffff',
          'base-100': '#fbfbfc',
          'base-200': '#E5E7EB',
          'base-300': '#f2f3f5',
          'base-content': '#1f2937',
          'info': '#37919b',
          'success': '#557927',
          'warning': '#d27711',
          'error': '#ba5150',
          'font-family': ['Inter, sans-serif'],
        },
      },  'dark', 'black', 'cyberpunk', 'lofi', 'pastel', 'dracula',
    ],
  },

  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },

};
