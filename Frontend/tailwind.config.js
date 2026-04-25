/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "dark",
      "light",
      "halloween",
      "luxury",
      "coffee",
      "retro",
      "wireframe",
      "forest",
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
};
