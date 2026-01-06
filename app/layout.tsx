// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * NOTE:
 * - We keep Geist for now (clean, stable).
 * - We set a robust metadataBase using NEXT_PUBLIC_SITE_URL when provided.
 * - We add icons, referrer policy, and sensible OpenGraph defaults for a single-page consultant site.
 * - We avoid any Tailwind-only body classes.
 */

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap"
});

// Prefer a real URL in prod; fall back safely for local/dev builds.
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteUrl = rawSiteUrl.replace(/\/+$/, "");
const siteName = "Dr Victor Hrymak";
const defaultTitle = "Dr Victor Hrymak | Environmental Health & Safety Consulting";
const defaultDescription =
  "Environmental Health & Safety consulting covering workplace inspections, safety auditing, risk assessment, safety management systems, and fire safety support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }]
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_GB"
    // If you later add /public/og.png:
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: defaultTitle }]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription
    // If you later add /public/og.png:
    // images: ["/og.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
