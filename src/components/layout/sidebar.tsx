import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

const links = [
  {href: '/dashboard', key: 'dashboard'},
  {href: '/customers', key: 'customers'},
  {href: '/debts', key: 'debts'},
  {href: '/vendors', key: 'vendors'},
  {href: '/products', key: 'products'},
  {href: '/categories', key: 'categories'}
] as const;

export async function Sidebar() {
  const t = await getTranslations('nav');
  const appT = await getTranslations('app');

  return (
    <aside className="hidden w-64 border-e border-slate-200 bg-white p-4 md:block">
      <h1 className="mb-6 text-lg font-bold text-brand-600">{appT('name')}</h1>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
