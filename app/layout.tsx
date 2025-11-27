import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://housingbenefitcheck.org'),
  title: {
    default: 'Housing Benefit Check | Check Your Eligibility for 2025 Restoration Benefits',
    template: '%s | Housing Benefit Check'
  },
  description: 'Discover if you qualify for state-approved housing restoration benefits. Free eligibility check for homeowners in TX, CO, OK, KS, NE, MO, FL, MN, and IL. Over $2.4B in benefits claimed.',
  keywords: ['housing benefits', 'restoration benefits', 'storm damage', 'roof repair', 'hail damage', 'insurance claims', 'home restoration', 'property damage'],
  authors: [{ name: 'Housing Benefit Check' }],
  creator: 'Housing Benefit Check',
  publisher: 'Housing Benefit Check',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://housingbenefitcheck.org',
    siteName: 'Housing Benefit Check',
    title: 'Housing Benefit Check | Check Your Eligibility for 2025 Restoration Benefits',
    description: 'Discover if you qualify for state-approved housing restoration benefits. Free eligibility check for homeowners.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Housing Benefit Check',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Housing Benefit Check | Check Your Eligibility',
    description: 'Discover if you qualify for state-approved housing restoration benefits.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased flex flex-col", inter.variable)}>
        <Header />
        <div className="flex-1 pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
