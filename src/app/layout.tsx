import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Oneir Solutions - ERP & Accounting Software",
    template: "%s | Oneir Solutions"
  },
  description: "Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions.",
  keywords: [
    "ERP software",
    "accounting software", 
    "business management",
    "financial reporting",
    "enterprise solutions",
    "business automation",
    "Oneir Solutions",
    "ERP integration",
    "accounting systems",
    "business software"
  ],
  authors: [{ name: "Oneir Solutions" }],
  creator: "Oneir Solutions",
  publisher: "Oneir Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://oneirsolutions.com'),
  icons: {
    icon: [
      { url: '/oneir.svg', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oneirsolutions.com',
    siteName: 'Oneir Solutions',
    title: 'Oneir Solutions - ERP & Accounting Software',
    description: 'Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Oneir Solutions - ERP & Accounting Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oneir Solutions - ERP & Accounting Software',
    description: 'Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions.',
    images: ['/twitter-image'],
    creator: '@oneirsolutions',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oneir Solutions",
    "url": "https://oneirsolutions.com",
    "logo": "https://oneirsolutions.com/oneir.svg",
    "description": "Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-877-322-3580",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": ["English", "French"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/oneir-solutions",
      "https://twitter.com/oneirsolutions",
      "https://www.facebook.com/oneirsolutions",
      "https://www.instagram.com/oneirsolutions",
      "https://www.youtube.com/oneirsolutions"
    ],
    "foundingDate": "1999",
    "numberOfEmployees": "25-50",
    "industry": "Software",
    "services": [
      "ERP Software",
      "Accounting Software", 
      "Business Management Solutions",
      "Financial Reporting",
      "E-Commerce Integration",
      "Custom Software Development"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
