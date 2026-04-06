import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { defaultLocale, locales, type Locale } from "@/lib/translations";
import ScrollToTopBottom from "@/components/ui/ScrollToTopBottom";
import DemoModalProviderWrapper from "@/components/providers/DemoModalProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
          url: '/opengraph-image',
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
      images: ['/twitter-image'],
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
        <DemoModalProviderWrapper locale={locale}>
          <div className="min-h-screen">
            {children}
          </div>
          <ScrollToTopBottom bottomOffset={24} rightOffset={24} />
        </DemoModalProviderWrapper>
      </body>
    </html>
  );
}
