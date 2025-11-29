import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  ReactLenis from 'lenis/react'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixiefie",
  description: "Bring life to your social media handles",
  verification: {
    google: "mIo3P0IZTuqEjLnewHE-0WMcJrPieDymtHbCfXZnflw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis root>
        {children}
        </ReactLenis>
        <Analytics />
      </body>
    </html>
  );
}