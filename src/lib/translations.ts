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

export function getNestedTranslation(translations: any, key: string): string {
  return key.split('.').reduce((obj, key) => obj?.[key], translations) || key;
}
