import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://homeroofprogram.com'),
  title: {
    default: 'Home Roof Program | Check Your Eligibility for 2025 Restoration Benefits',
    template: '%s | Home Roof Program'
  },
  description: 'Discover if you qualify for state-approved housing restoration benefits. Free eligibility check for homeowners in TX, CO, OK, KS, NE, MO, FL, MN, and IL. Over $2.4B in benefits claimed.',
  keywords: ['housing benefits', 'restoration benefits', 'storm damage', 'roof repair', 'hail damage', 'insurance claims', 'home restoration', 'property damage'],
  authors: [{ name: 'Home Roof Program' }],
  creator: 'Home Roof Program',
  publisher: 'Home Roof Program',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://homeroofprogram.com',
    siteName: 'Home Roof Program',
    title: 'Home Roof Program | Check Your Eligibility for 2025 Restoration Benefits',
    description: 'Discover if you qualify for state-approved housing restoration benefits. Free eligibility check for homeowners.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Roof Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Roof Program | Check Your Eligibility',
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
      <head>
        {/* Microsoft Clarity - MUST HAVE for heatmaps & session recordings */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || 'YOUR_CLARITY_ID'}");`}
        </Script>
        
        {/* Google Analytics 4 - Conversion tracking */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID || 'YOUR_GA4_ID'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID || 'YOUR_GA4_ID'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
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
