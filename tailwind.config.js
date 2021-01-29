module.exports = {
  darkMode: "class",
  purge: {
    enabled: true,
    content: ["./src/**/*.svelte"],
  },

  theme: {
    extend: {
      colors: {
        dark: "#24283b",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.blue.700"),
              "&:hover": {
                color: theme("colors.blue.700"),
                textDecoration: "none",
              },
            },
          },
        },

        dark: {
          css: {
            color: "white",
            h1: { color: "white" },
            h2: { color: "white" },
            h3: { color: "white" },
            code: { color: "white" },
            strong: { color: "white" },
            a: {
              color: theme("colors.gray.100"),
              "&:hover": {
                color: "#9ECE6A",
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
