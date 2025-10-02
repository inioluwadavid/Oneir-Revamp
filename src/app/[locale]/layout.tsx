import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { defaultLocale, type Locale } from "@/lib/translations";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (localeParam || defaultLocale) as Locale;
  
  const isEnglish = locale === 'en';
  
  return {
    title: {
      default: isEnglish 
        ? "Oneir Solutions - ERP & Accounting Software" 
        : "Oneir Solutions - Logiciels ERP et Comptables",
      template: isEnglish 
        ? "%s | Oneir Solutions" 
        : "%s | Oneir Solutions"
    },
    description: isEnglish
      ? "Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions."
      : "Oneir Solutions fournit des solutions ERP et comptables complètes. Partenaires avec nous pour la gestion d'entreprise avancée, les rapports financiers et les solutions spécifiques à l'industrie.",
    keywords: isEnglish
      ? [
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
        ]
      : [
          "logiciel ERP",
          "logiciel comptable",
          "gestion d'entreprise",
          "rapports financiers",
          "solutions d'entreprise",
          "automatisation d'entreprise",
          "Oneir Solutions",
          "intégration ERP",
          "systèmes comptables",
          "logiciel d'entreprise"
        ],
    alternates: {
      canonical: `https://oneirsolutions.com/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'fr_CA',
      url: `https://oneirsolutions.com/${locale}`,
      siteName: 'Oneir Solutions',
      title: isEnglish 
        ? "Oneir Solutions - ERP & Accounting Software"
        : "Oneir Solutions - Logiciels ERP et Comptables",
      description: isEnglish
        ? "Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions."
        : "Oneir Solutions fournit des solutions ERP et comptables complètes. Partenaires avec nous pour la gestion d'entreprise avancée, les rapports financiers et les solutions spécifiques à l'industrie.",
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEnglish 
            ? 'Oneir Solutions - ERP & Accounting Software'
            : 'Oneir Solutions - Logiciels ERP et Comptables',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish 
        ? "Oneir Solutions - ERP & Accounting Software"
        : "Oneir Solutions - Logiciels ERP et Comptables",
      description: isEnglish
        ? "Oneir Solutions provides comprehensive ERP and accounting software solutions. Partner with us for advanced business management, financial reporting, and industry-specific solutions."
        : "Oneir Solutions fournit des solutions ERP et comptables complètes. Partenaires avec nous pour la gestion d'entreprise avancée, les rapports financiers et les solutions spécifiques à l'industrie.",
      images: ['/twitter-image.jpg'],
      creator: '@oneirsolutions',
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || defaultLocale) as Locale;

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
