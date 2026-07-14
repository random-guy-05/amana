import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arnav Mana — AI & Health Research",
  description:
    "Arnav Mana is a student researcher working across cardiac critical care, computational biology, and translational medicine.",
  keywords: ["Arnav Mana", "AI health research", "computational biology", "cardiac critical care"],
  authors: [{ name: "Arnav Mana" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Arnav Mana — AI & Health Research",
    description: "Cardiac critical care, computational biology, and translational medicine.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arnav Mana — AI & Health Research",
    description: "Cardiac critical care, computational biology, and translational medicine.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
