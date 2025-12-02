// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
// import Footer from "@/components/Footer"; // IŠJUNGIAM GLOBALŲ FOOTERĮ - PUSLAPIS TURI SAVO
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://homeroofprogram.com'),
  title: {
    default: 'Home Roof Program | Official Eligibility Portal',
    template: '%s | HRP'
  },
  description: 'Secure verification portal for homeowners insurance policy allowances. Check eligibility for roof restoration benefits in your region.',
  keywords: ['roof allowance', 'insurance claim', 'storm damage', 'eligibility check', 'homeowner benefits'],
  // ... kiti metadata lieka tokie patys
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0B1120', // SVARBU: Mobilaus naršyklės juosta bus tamsi
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || 'YOUR_CLARITY_ID'}");`}
        </Script>
        
        {/* GA4 */}
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
      
      {/* 
         FIX:
         1. bg-[#0B1120] -> Nustato tamsų pagrindą visai aplikacijai.
         2. text-slate-200 -> Užtikrina, kad tekstas būtų įskaitomas.
         3. selection:bg-emerald-500/30 -> Premium jausmas žymint tekstą.
      */}
      <body className={cn(
        "min-h-screen bg-[#0B1120] text-slate-200 font-sans antialiased selection:bg-emerald-500/30", 
        inter.variable
      )}>
        
        <Header />
        
        {/* 
           FIX: Pašalintas 'pt-16'. 
           Dabar turinys prasideda nuo pat viršaus (po permatomu headeriu).
           Tai leidžia mūsų 'Hero' sekcijai kontroliuoti visą erdvę.
        */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* <Footer /> -> Footeris valdomas individualiuose puslapiuose (page.tsx) */}
      </body>
    </html>
  );
}