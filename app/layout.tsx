import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  keywords: [
    "Arnav Mana",
    "AI health research",
    "computational biology",
    "cardiac critical care",
    "machine learning",
  ],
  authors: [{ name: "Arnav Mana" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Arnav Mana — AI & Health Research",
    description:
      "Research at the intersection of machine intelligence and cardiovascular medicine.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Arnav Mana — AI & Health Research",
    description:
      "Research at the intersection of machine intelligence and cardiovascular medicine.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
