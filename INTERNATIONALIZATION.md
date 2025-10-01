# Internationalization (i18n) Setup

This Next.js application supports French and English languages with automatic locale detection and routing.

## Features

- ✅ Automatic locale detection based on browser preferences
- ✅ URL-based routing (`/en/` and `/fr/`)
- ✅ Language switcher component
- ✅ Translation files for both languages
- ✅ Middleware for locale handling

## File Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Locale-specific layout
│   │   └── page.tsx        # Homepage with translations
│   ├── layout.tsx          # Root layout (redirects to default locale)
│   └── page.tsx           # Root page (redirects to default locale)
├── components/
│   └── LanguageSwitcher.tsx # Language switching component
├── lib/
│   └── translations.ts     # Translation utilities
├── locales/
│   ├── en.json            # English translations
│   └── fr.json            # French translations
└── middleware.ts          # Locale detection and routing
```

## Usage

### Adding New Translations

1. Add new keys to both `src/locales/en.json` and `src/locales/fr.json`
2. Use the translation in your components:

```tsx
import { getTranslations, getNestedTranslation } from '@/lib/translations';

export default function MyComponent({ params }: { params: { locale: string } }) {
  const t = getTranslations(params.locale as Locale);
  
  return (
    <h1>{getNestedTranslation(t, 'homepage.title')}</h1>
  );
}
```

### Adding New Languages

1. Add the new locale to `src/lib/translations.ts`:
   ```ts
   export type Locale = 'en' | 'fr' | 'es'; // Add new locale
   export const locales: Locale[] = ['en', 'fr', 'es']; // Add to array
   ```

2. Create a new translation file: `src/locales/es.json`
3. Update the language switcher component if needed

## Routes

- `/` → Redirects to `/en/`
- `/en/` → English homepage
- `/fr/` → French homepage

## Development

Run the development server:

```bash
npm run dev
```

Visit:
- http://localhost:3000 (redirects to /en/)
- http://localhost:3000/en
- http://localhost:3000/fr

The language switcher in the header allows users to switch between languages while maintaining the current page context.
