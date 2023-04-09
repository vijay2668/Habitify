/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#66CC8A",

          secondary: "#D926AA",

          accent: "#ea5234",

          neutral: "#191D24",

          "base" : "#FFFFFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272"
        }
      }
    ]
  },
  corePlugins: {
    // ...
    transition: true,
  },
  plugins: [require("daisyui")]
};
