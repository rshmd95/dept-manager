import {getTranslations} from 'next-intl/server';
import {PageHeader} from '@/components/shared/page-header';
import {EmptyState} from '@/components/shared/empty-state';
import {prisma} from '@/lib/db/prisma';

export default async function CategoriesPage() {
  const t = await getTranslations();
  const categories = await prisma.category.findMany({orderBy: {name: 'asc'}});

  return (
    <section className="space-y-4">
      <PageHeader title={t('categories.title')} />
      {categories.length === 0 ? <EmptyState label={t('app.empty')} /> : <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><table className="data-table w-full text-sm"><thead><tr><th>{t('categories.name')}</th><th>{t('categories.description')}</th></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><td>{category.name}</td><td>{category.description || '-'}</td></tr>)}</tbody></table></div>}
    </section>
  );
}
