import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        heart: {
          DEFAULT: "hsl(var(--heart-red))",
          glow: "hsl(var(--heart-glow))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-heart": {
          "0%": { transform: "translateY(100vh) rotate(0deg) scale(0)", opacity: "0" },
          "10%": { opacity: "1", transform: "translateY(90vh) rotate(10deg) scale(1)" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(-10vh) rotate(-10deg) scale(0.8)", opacity: "0" },
        },
        "pulse-heart": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(352, 100%, 50%, 0.4)" },
          "50%": { boxShadow: "0 0 50px hsla(352, 100%, 50%, 0.8)" },
        },
        "typewriter": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "blink-cursor": {
          "0%, 50%": { borderColor: "hsl(var(--primary))" },
          "51%, 100%": { borderColor: "transparent" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-heart": "float-heart 8s ease-in-out infinite",
        "pulse-heart": "pulse-heart 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "typewriter": "typewriter 3s steps(40) forwards",
        "blink-cursor": "blink-cursor 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
