import { theme } from './src/styles/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: theme.colors.background,
          800: theme.colors.card,
        },
        text: {
          100: theme.colors.text,
        },
        muted: {
          300: theme.colors.muted,
        },
        primary: {
          500: theme.colors.primary,
          700: theme.colors.primary_end,
        },
        accent: {
          warm: theme.colors.accent,
        },
        success: theme.colors.success,
        danger: theme.colors.danger,
      },
      borderRadius: {
        lg: theme.radius.lg,
        md: theme.radius.md,
      },
      spacing: theme.spacing,
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #B42ACF 0%, #6D49FF 100%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
