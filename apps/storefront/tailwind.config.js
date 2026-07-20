const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // NUTA Design System Colors
      colors: {
        // Primary - Warm Peanut Brown
        nuta: {
          50: "#FDF8F3",
          100: "#FAF0E6",
          200: "#F5E1C8",
          300: "#E8D5C4",
          400: "#D4A574",
          500: "#C4956A",
          600: "#A0522D",
          700: "#8B4513",
          800: "#6B3410",
          900: "#4A2A0C",
        },
        // Accent - Natural Green
        nutaGreen: {
          50: "#F0F7EF",
          100: "#D9EDDA",
          200: "#B3DBB5",
          300: "#7DC27D",
          400: "#4E8B41",
          500: "#3D7033",
          600: "#2F5828",
          700: "#23411D",
        },
        // Cream Background
        cream: {
          50: "#FEFEFE",
          100: "#FAF8F2",
          200: "#FFF8F0",
          300: "#FFF5E6",
        },
        // Text Colors
        nutaText: {
          primary: "#2B2B2B",
          secondary: "#666666",
          muted: "#999999",
        },
        // Semantic Colors
        nutaSuccess: "#22C55E",
        nutaWarning: "#F59E0B",
        nutaError: "#EF4444",
        // UI Semantic (from Medusa)
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      // NUTA Typography
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        display: [
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      // NUTA Border Radius
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        full: "9999px",
        circle: "9999px",
      },
      // NUTA Shadows
      boxShadow: {
        soft: "0 2px 8px -2px rgba(139, 69, 19, 0.08), 0 4px 16px -4px rgba(139, 69, 19, 0.12)",
        DEFAULT: "0 4px 12px -2px rgba(139, 69, 19, 0.1), 0 8px 24px -4px rgba(139, 69, 19, 0.15)",
        md: "0 8px 24px -4px rgba(139, 69, 19, 0.12), 0 16px 48px -8px rgba(139, 69, 19, 0.18)",
        lg: "0 12px 32px -4px rgba(139, 69, 19, 0.15), 0 24px 64px -8px rgba(139, 69, 19, 0.2)",
        xl: "0 20px 48px -8px rgba(139, 69, 19, 0.2), 0 32px 80px -12px rgba(139, 69, 19, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      },
      // NUTA Spacing Scale
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      // NUTA Animation Keyframes
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        // NUTA specific animations
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        // NUTA animations
        "slide-up": "slide-up 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
