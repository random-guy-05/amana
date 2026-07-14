import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Arnav Mana — AI × Health Researcher",
    description:
      "Arnav Mana is a student researcher working across cardiac critical care, computational biology, and translational medicine.",
    keywords: [
      "Arnav Mana",
      "AI health researcher",
      "computational biology",
      "cardiac critical care",
      "machine learning",
    ],
    authors: [{ name: "Arnav Mana" }],
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: "Arnav Mana — AI × Health Researcher",
      description: "Building AI for the moments medicine can't miss.",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Arnav Mana — AI × Health Researcher" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Arnav Mana — AI × Health Researcher",
      description: "Building AI for the moments medicine can't miss.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
