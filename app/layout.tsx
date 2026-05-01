import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NexaAI — AI-Powered Earning & Education Platform",
  description:
    "India's #1 AI-powered earning education platform. Unlock ₹60–₹125/day earning potential with intelligent AI-driven strategies. Start your financial journey today.",
  keywords: "AI earning platform India, online earning India, AI education, passive income India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="streak-bg antialiased">{children}</body>
    </html>
  );
}
