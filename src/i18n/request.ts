import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  const selectedLocale = routing.locales.includes(locale as 'ar' | 'fr')
    ? locale
    : routing.defaultLocale;

  return {
    locale: selectedLocale,
    messages: (await import(`../../messages/${selectedLocale}.json`)).default
  };
});
