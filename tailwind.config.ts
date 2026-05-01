import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extracted from reference — dark navy base
        brand: {
          bg:         "#03060F",   // deepest background
          bgCard:     "#080D1A",   // card background
          bgLight:    "#0D1528",   // slightly elevated surface
          border:     "#1A2540",   // subtle border
          borderGlow: "#2A4080",   // glowing border
          blue:       "#3B6EF7",   // primary CTA blue
          blueBright: "#5B8DFF",   // hover / accent blue
          blueGlow:   "#1D4ED8",   // glow shadow blue
          text:       "#FFFFFF",   // primary text
          muted:      "#8899B8",   // secondary text
          dim:        "#4A5A7A",   // dimmer text
          gold:       "#F5A623",   // highlight / badge
          green:      "#22C55E",   // positive indicator
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,110,247,0.25) 0%, transparent 70%)",
        "card-glow":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,110,247,0.12) 0%, transparent 70%)",
        "streak-left":
          "linear-gradient(180deg, transparent 0%, rgba(59,110,247,0.15) 30%, rgba(59,110,247,0.08) 60%, transparent 100%)",
        "streak-right":
          "linear-gradient(180deg, transparent 0%, rgba(91,141,255,0.12) 30%, rgba(59,110,247,0.06) 60%, transparent 100%)",
      },
      boxShadow: {
        "glow-sm":  "0 0 20px rgba(59,110,247,0.25)",
        "glow-md":  "0 0 40px rgba(59,110,247,0.30)",
        "glow-lg":  "0 0 80px rgba(59,110,247,0.35)",
        "card":     "0 4px 24px rgba(0,0,0,0.60)",
        "card-hover":"0 8px 40px rgba(59,110,247,0.20), 0 4px 24px rgba(0,0,0,0.60)",
      },
      borderRadius: {
        "xl2": "1rem",
        "xl3": "1.5rem",
      },
      animation: {
        "ticker":     "ticker 30s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59,110,247,0.25)" },
          "50%":       { boxShadow: "0 0 50px rgba(59,110,247,0.50)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
