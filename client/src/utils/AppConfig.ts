import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'always';

export const AppConfig = {
  name: 'Scrape Media',
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix,
};

export const MAP_LOCALE: { [x: string]: string } = {
  'en': 'en_US'
}