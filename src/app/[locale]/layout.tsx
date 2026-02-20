import {notFound} from 'next/navigation';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import {Toaster} from '@/components/ui/toaster';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({locale});
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={direction} lang={locale} className="min-h-screen">
        {children}
        <Toaster />
      </div>
    </NextIntlClientProvider>
  );
}
