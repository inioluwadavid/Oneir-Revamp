import en from '../locales/en.json';
import fr from '../locales/fr.json';

export type Locale = 'en' | 'fr';

export const locales: Locale[] = ['en', 'fr'];

export const defaultLocale: Locale = 'en';

export const translations = {
  en,
  fr,
} as const;

export type TranslationKeys = typeof en;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getNestedTranslation(translations: Record<string, unknown>, key: string): string {
  return key.split('.').reduce((obj: unknown, key: string) => {
    if (obj && typeof obj === 'object' && key in obj) {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, translations) as string || key;
}
