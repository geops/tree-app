import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const percentageClasses = {
  "1/2": "50%",
  "1/4": "25%",
  "1/5": "20%",
  "3/10": "30%",
  "3/4": "75%",
  "3/5": "60%",
  "4/5": "80%",
  "7/10": "70%",
  "9/10": "90%",
};

const config: Config = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./components/ForestTypeModal/ForestTypeDescription/styles.ts",
  ],
  plugins: [
    require("@tailwindcss/container-queries"),
    function (api: PluginAPI) {
      const borderImageSource: Record<string, string> =
        api.theme("borderImageSource");
      const utilities = Object.fromEntries(
        Object.entries(borderImageSource).map(([key, value]) => [
          `.border-image-${key}`,
          { "border-image-source": value },
        ]),
      );
      api.addUtilities(utilities);
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderImageSource: {
        "3d": "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      boxShadow: {
        "3d": "0px 1px 2px 0px rgba(16, 24, 40, 0.05),0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset,0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset",
      },
      colors: {
        diagram: {
          medium: "#b7ddae",
          often: "#74bd70",
          rare: "#f7f7f7",
        },
        gray: {
          100: "#eeeeee",
          200: "#dddddd",
          300: "#cccccc",
          400: "#bbbbbb",
          500: "#aaaaaa",
          600: "#999999",
          700: "#888888",
          800: "#777777",
          900: "#666666",
        },
        primary: {
          100: "#00a2a9",
          200: "#009096",
          300: "#007d83",
          400: "#007076",
          500: "#006268",
          600: "#00565b",
          700: "#004a4d",
          800: "#003a3d",
          900: "#002a2c",
        },
        recommendation: {
          yellow: "#fbf0b2",
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      height: percentageClasses,
      maxHeight: percentageClasses,
      maxWidth: percentageClasses,
      minHeight: percentageClasses,
      minWidth: percentageClasses,
      width: percentageClasses,
    },
  },
};
export default config;
