import type { Config } from 'tailwindcss';
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // Your existing fonts
        sans: ["var(--font-inter)"],
        playfair: ["var(--font-playfair-display)", "serif"],
        // NEW FONT:
        fraunces: ["var(--font-fraunces)", "serif"],
      },
      colors: {
        "portfolio-cream": "#ffffff", 
        "portfolio-dark": "#020617", // Slate-950 (Deep dark background)
        "portfolio-amber": "#f59e0b", // Amber-600 (Primary Brand Color)
        "portfolio-amber-dark": "#b45309",
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'underline-grow': {
'0%': { transform: 'scaleX(0)' },
'100%': { transform: 'scaleX(1)' },
},
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'slideInHoldOut': {
          '0%': { transform: 'translateX(100%)' },
          '45%': { transform: 'translateX(0)' },
          '70%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'letterBounce': {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '40%': { opacity: '1', transform: 'translateY(-20px)' }, // Big overshoot
          '80%': { opacity: '1', transform: 'translateY(5px)' },  // Correction
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        vanish: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        fadeIn: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
      },
      animation: {
        'underline-grow': 'underline-grow 0.8s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'loader-slide': 'slideInHoldOut 4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'letter-bounce': 'letterBounce 0.6s ease-out forwards',
        'curtain-vanish': 'vanish 0.1s linear forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
