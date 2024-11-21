/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
//const aspectRatio = require("@tailwindcss/aspect-ratio");
const nextColors = nextui().config.theme.extend.colors;

const colors = {
  gunmetal: {
    DEFAULT: "#1A1A1A",
    50: "#F5F5F5",
    100: "#E6E6E6",
    200: "#BFBFBF",
    300: "#999999",
    400: "#4D4D4D",
    500: "#2E2E2E",
    600: "#252525",
    700: "#1C1C1C",
    800: "#141414",
    900: "#0A0A0A",
  },
  khaki: {
    DEFAULT: "#F5DEB3",
    50: "#FFF8EF",
    100: "#FEF4DF",
    200: "#FDE9C0",
    300: "#FBDCA0",
    400: "#F7CA7F",
    500: "#F5DEB3", // Default
    600: "#D5B67A",
    700: "#B4925F",
    800: "#937349",
    900: "#755838",
  },
};

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      backgroundImage: {
        radial: `repeating-conic-gradient(
          from 0deg at 50% 25%,
          ${colors.gunmetal[700]} 0deg,
          ${colors.gunmetal[700]} 10deg,
          ${colors.gunmetal[600]} 10deg,
          ${colors.gunmetal[600]} 20deg,
          ${colors.gunmetal[700]} 20deg)`,
      },
      backgroundSize: {
        radial: "100% 100%",
      },
      borderRadius: {
        card: "0.25rem",
      },
      fontFamily: {
        headline: ["var(--font-bokor)", "system-ui", "sans-serif"],
        body: ["var(--font-exo)", "system-ui", "sans-serif"],
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      aspectRatio: {
        "2/3": "2 / 3", // Add the custom ratio
      },
      animation: {
        // Fade up, down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "fade-in": "fade-in 1.5s ease-out",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        // Gradient Pulse
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        // Spin Radial Background
        "spin-bg": "spin-bg 5s linear infinite",
      },
      keyframes: {
        // Fade up, down, in
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: 0,
            transform: "translate(-10px, -10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translate(0px, 0px)",
          },
        },
        "pulse-subtle": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.8,
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "spin-bg": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "360deg 0%" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({ defaultTheme: "dark" }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
