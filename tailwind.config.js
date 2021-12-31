module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{svelte,js,ts}"
  ],
  safelist: [{
    pattern: /border|text/
  }],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp"), require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        "tutors": {
          "primary": "#37919B",
          "primary-focus": "#2C747C",
          "primary-content": "#ffffff",
          "secondary": "#cb31b8",
          "secondary-focus": "#68195f",
          "secondary-content": "#ffffff",
          "accent": "#33d447",
          "accent-focus": "#21a92e",
          "accent-content": "#ffffff",
          "neutral": "#2d2a32",
          "neutral-focus": "#383b48",
          "neutral-content": "#ffffff",
          "base-100": "#fbfbfc",
          "base-200": "#E5E7EB",
          "base-300": "#f2f3f5",
          "base-content": "#1f2937",
          "info": "#37919b",
          "success": "#557927",
          "warning": "#d27711",
          "error": "#ba5150",
          "font-family": ["Inter, sans-serif"]
        }, "tutors-dark": {
          "primary": "#37919b",
          "primary-focus": "#2C747C",
          "primary-content": "#ffffff",
          "secondary": "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          "neutral": "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ebecf0",
          "base-100": "#3d4451",
          "base-200": "#2a2e37",
          "base-300": "#16181d",
          "base-content": "#ebecf0",
          "info": "#37919b",
          "success": "#557927",
          "warning": "#d27711",
          "error": "#ba5150",
          "font-family": ["Inter, sans-serif"]
        }, "tutors-dyslexia": {
          "primary": "#37919B",
          "primary-focus": "#2C747C",
          "primary-content": "#ffffff",
          "secondary": "#cb31b8",
          "secondary-focus": "#68195f",
          "secondary-content": "#ffffff",
          "accent": "#33d447",
          "accent-focus": "#21a92e",
          "accent-content": "#ffffff",
          "neutral": "#e5e5b9",
          "neutral-focus": "#cccca4",
          "neutral-content": "#1f2937",
          "base-100": "#ffffce",
          "base-200": "#e5e5b9",
          "base-300": "#f2f3f5",
          "base-content": "#1f2937",
          "info": "#37919b",
          "success": "#557927",
          "warning": "#d27711",
          "error": "#ba5150",
          "font-family": ["OpenDyslexic, sans-serif"]
        },
        "wireframe": {
          "fontFamily": "Chalkboard,comic sans ms,\"sanssecondaryerif\"",
          "primary": "#b8b8b8",
          "primary-focus": "#b8b8b8",
          "primary-content": "#000000",
          "secondary": "#b8b8b8",
          "secondary-focus": "#b8b8b8",
          "secondary-content": "#000000",
          "accent": "#b8b8b8",
          "accent-focus": "#b8b8b8",
          "accent-content": "#000000",
          "base-100": "#ffffff",
          "base-200": "#ffffff",
          "base-300": "#ffffff",
          "base-content": "#000000",
          "neutral": "#ebebeb",
          "neutral-focus": "#ebebeb",
          "neutral-content": "#000000",
          "info": "#37919b",
          "success": "#557927",
          "warning": "#d27711",
          "error": "#ba5150",
          "--border-color": "#000000",
          "--rounded-box": "0.2rem",
          "--rounded-btn": "0.2rem",
          "--rounded-badge": "0.2rem",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.2rem",
          "*": {
            "border-color": "var(--border-color) !important",
            "--tw-border-opacity": "1 !important",
            "--tw-text-opacity": "1 !important",
            "--tw-shadow": "0 0 0 1px var(--border-color) !important"
          }
        }
      }, "black"
    ]
  }
};
