import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeo exacto de la paleta de Stitch
        background: '#000c43',
        surface: {
          DEFAULT: '#000c43',
          dim: '#000c43',
          bright: '#2a356a',
          container: {
            lowest: '#000837',
            low: '#09164b',
            DEFAULT: '#0e1a4f',
            high: '#1a255a',
            highest: '#263165',
          }
        },
        primary: {
          DEFAULT: '#98cbff',
          on: '#003354',
          container: '#1f97e7',
          'on-container': '#002c49',
        },
        secondary: {
          DEFAULT: '#e6b4ff',
          on: '#4f0076',
          container: '#a300ec',
          'on-container': '#f8e0ff',
        },
        neon: {
          white: '#f7f7f7',
          accent: '#5aa8ff', // El azul claro para opacidades de cristal
        },

        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },

        outline: {
          DEFAULT: '#89919c',
          variant: '#3f4851',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        hanken: ['Hanken Grotesk', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },

      boxShadow: {
        // Resplandores neón solicitados para botones y z-axis offsets
        'primary-glow': '0 0 15px rgba(152, 203, 255, 0.4)',
        'primary-glow-hover': '0 0 25px rgba(152, 203, 255, 0.7)',
        'ambient-blue': '0 10px 30px rgba(18, 146, 226, 0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
