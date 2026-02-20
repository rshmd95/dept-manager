import {redirect} from '@/i18n/navigation';

export default async function LocaleIndexPage({params}: {params: Promise<{locale: 'ar' | 'fr'}>}) {
  const {locale} = await params;
  redirect({href: '/dashboard', locale});
}
