'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Navigate to the new locale
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value as Locale)}
        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale === 'en' ? 'English' : 'Français'}
          </option>
        ))}
      </select>
    </div>
  );
}
