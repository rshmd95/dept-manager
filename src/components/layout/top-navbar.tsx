import {getLocale, getTranslations} from 'next-intl/server';
import {LanguageSwitcher} from './language-switcher';

export async function TopNavbar() {
  const locale = await getLocale();
  const t = await getTranslations('app');

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-800">{t('dashboard')}</h2>
        <LanguageSwitcher currentLocale={locale as 'ar' | 'fr'} />
      </div>
    </header>
  );
}
