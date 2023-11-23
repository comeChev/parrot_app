/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        subtitle: ["Lora", "serif"],
        body: ["Assistant", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(-120deg)" },
          "90%": { transform: "rotate(180deg)" },
        },
        wait: {
          to: { rotate: "360deg" },
        },
      },
      animation: {
        wiggle: "wiggle 1.5s linear infinite",
        wait: "wait 1.7s linear infinite",
      },
    },
  },
  plugins: [],
};
