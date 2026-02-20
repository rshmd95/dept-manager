'use client';

import {usePathname, useRouter} from '@/i18n/navigation';

export function LanguageSwitcher({currentLocale}: {currentLocale: 'ar' | 'fr'}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="switch language"
      className="rounded-md border border-slate-300 px-2 py-1 text-sm"
      value={currentLocale}
      onChange={(e) => router.replace(pathname, {locale: e.target.value as 'ar' | 'fr'})}
    >
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
    </select>
  );
}
